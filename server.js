import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { sendBookingEmails } from './services/emailService.js';
import { adminSession, loginAdmin, logoutAdmin, requireAdmin } from './services/adminAuth.js';
import { markBusinessEmailSent, saveBooking } from './services/bookingStore.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;

// Middleware
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

// Serve static files from the Vite build (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// DATA_DIR should point to a persistent volume in production.
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(__dirname, 'public');
const galleryDir = path.join(dataDir, 'gallery');
const bundledGalleryDir = path.join(__dirname, 'public/gallery');
const metadataPath = path.join(dataDir, 'gallery-data.json');
fs.mkdirSync(galleryDir, { recursive: true });
if (!fs.existsSync(metadataPath)) fs.copyFileSync(path.join(__dirname, 'public/gallery-data.json'), metadataPath);
app.use('/gallery', express.static(galleryDir), express.static(bundledGalleryDir));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get gallery metadata
const getGalleryMetadata = () => {
  if (fs.existsSync(metadataPath)) {
    const data = fs.readFileSync(metadataPath, 'utf8');
    return JSON.parse(data);
  }
  return { images: [] };
};

// Save gallery metadata
const saveGalleryMetadata = (metadata) => {
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
};

// API Routes

app.post('/api/admin/login', loginAdmin);
app.get('/api/admin/session', (req, res) => res.json({ authenticated: adminSession(req) }));
app.post('/api/admin/logout', logoutAdmin);

const bookingAttempts = new Map();
const applianceTypes = new Set([
  'Refrigerator Repair', 'Washing Machine Repair', 'Air Conditioner Repair',
  'Microwave Oven Repair', 'Geyser Repair', 'RO Water Purifier'
]);

app.post('/api/booking', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim();
    const phone = String(req.body?.phone || '').trim();
    const area = String(req.body?.area || '').trim();
    const appliance = String(req.body?.appliance || '').trim();
    const issue = String(req.body?.issue || '').trim();
    if (name.length < 2 || name.length > 100 || area.length < 3 || area.length > 160 || issue.length < 10 || issue.length > 1000 ||
        !applianceTypes.has(appliance) || (!email && !phone) ||
        (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
        (phone && !/^(\+91|91|0)?[6-9]\d{9}$/.test(phone.replace(/[\s()-]/g, '')))) {
      return res.status(400).json({ error: 'Please enter a valid name, issue, service, and phone or email.' });
    }

    const key = req.ip || 'unknown';
    const attempt = bookingAttempts.get(key) || { count: 0, reset: Date.now() + 60 * 60 * 1000 };
    if (Date.now() > attempt.reset) { attempt.count = 0; attempt.reset = Date.now() + 60 * 60 * 1000; }
    if (attempt.count >= 5) return res.status(429).json({ error: 'Too many requests. Please call us instead.' });
    attempt.count += 1;
    bookingAttempts.set(key, attempt);

    const bookingRef = `CR-${randomUUID().slice(0, 12).toUpperCase()}`;
    const confirmationText = `Thank you, ${name}. Your ${appliance.toLowerCase()} request has been received. Reference: ${bookingRef}. We will contact you to arrange a visit.`;
    const booking = { name, email, phone, area, appliance, issue, bookingRef, confirmationMessage: confirmationText };
    try {
      await saveBooking(booking);
    } catch (storageError) {
      console.error('Booking database failed:', storageError);
    }
    const emailResults = await sendBookingEmails(booking);
    if (!emailResults.business?.success) {
      return res.status(503).json({ error: 'We could not confirm your request right now. Please call +91 9819 124 194.' });
    }
    try { await markBusinessEmailSent(bookingRef); } catch (error) { console.error('Booking email status update failed:', error); }
    return res.json({ success: true, confirmation: confirmationText, bookingRef });
  } catch (error) {
    console.error('Booking request failed:', error);
    return res.status(503).json({ error: 'We could not confirm your request right now. Please call +91 9819 124 194.' });
  }
});

// Get all gallery images
app.get('/api/gallery', (req, res) => {
  try {
    const metadata = getGalleryMetadata();
    res.json(metadata);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Upload new image
app.post('/api/gallery/upload', requireAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { title, alt } = req.body;
    
    if (!title || !alt) {
      // Delete uploaded file if metadata is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Title and alt text are required' });
    }

    const metadata = getGalleryMetadata();
    
    // Add new image to the beginning (most recent first)
    const newImage = {
      src: `/gallery/${req.file.filename}`,
      title,
      alt,
      uploadedAt: new Date().toISOString()
    };
    
    metadata.images.unshift(newImage);
    saveGalleryMetadata(metadata);
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: newImage,
      totalImages: metadata.images.length
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete image
app.delete('/api/gallery/:index', requireAdmin, (req, res) => {
  try {
    if (!/^\d+$/.test(req.params.index)) return res.status(400).json({ error: 'Invalid image index' });
    const index = Number(req.params.index);
    const metadata = getGalleryMetadata();
    
    if (index < 0 || index >= metadata.images.length) {
      return res.status(400).json({ error: 'Invalid image index' });
    }
    
    const imageToDelete = metadata.images[index];
    const filename = path.basename(imageToDelete.src);
    const filePath = path.join(galleryDir, filename);
    
    // Delete file from disk (but keep default images)
    if (fs.existsSync(filePath) && !filename.includes('AC Unit') && 
        !filename.includes('Fridge repair') && !filename.includes('Outdoor')) {
      fs.unlinkSync(filePath);
    }
    
    // Remove from metadata
    metadata.images.splice(index, 1);
    saveGalleryMetadata(metadata);
    
    res.json({
      success: true,
      message: 'Image deleted successfully',
      totalImages: metadata.images.length
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Reset gallery to defaults
app.post('/api/gallery/reset', requireAdmin, (req, res) => {
  try {
    const metadata = getGalleryMetadata();
    
    // Delete all uploaded files (keep default images)
    metadata.images.forEach(image => {
      const filename = path.basename(image.src);
      if (!filename.includes('AC Unit') && !filename.includes('Fridge repair') && 
          !filename.includes('Outdoor')) {
        const filePath = path.join(galleryDir, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });
    
    // Reset to default images
    const defaultMetadata = {
      images: [
        {
          src: '/gallery/AC Unit Servicing.png',
          title: 'AC Unit Servicing',
          alt: 'Professional technician servicing an air conditioner unit.'
        },
        {
          src: '/gallery/Fridge repair.png',
          title: 'Refrigerator Repair',
          alt: 'Expert refrigerator repair and maintenance service.'
        },
        {
          src: '/gallery/Outdoor Unit Repair.png',
          title: 'Outdoor Unit Repair',
          alt: 'Outdoor AC unit repair and maintenance.'
        },
        {
          src: '/gallery/Outdoor Repair.png',
          title: 'Outdoor Repair',
          alt: 'Regular outdoor unit maintenance and inspection.'
        }
      ]
    };
    
    saveGalleryMetadata(defaultMetadata);
    
    res.json({
      success: true,
      message: 'Gallery reset to defaults',
      totalImages: defaultMetadata.images.length
    });
  } catch (error) {
    console.error('Error resetting gallery:', error);
    res.status(500).json({ error: 'Failed to reset gallery' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.get('/admin', (req, res) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use((req, res) => res.status(404).send('Not found'));

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Gallery directory: ${galleryDir}`);
});
