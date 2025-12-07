import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { sendBookingEmails } from './services/emailService.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Serve gallery images
app.use('/gallery', express.static(path.join(__dirname, 'public/gallery')));

// Ensure gallery directory exists
const galleryDir = path.join(__dirname, 'public/gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

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
  const metadataPath = path.join(__dirname, 'public/gallery-data.json');
  if (fs.existsSync(metadataPath)) {
    const data = fs.readFileSync(metadataPath, 'utf8');
    return JSON.parse(data);
  }
  return { images: [] };
};

// Save gallery metadata
const saveGalleryMetadata = (metadata) => {
  const metadataPath = path.join(__dirname, 'public/gallery-data.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
};

// API Routes

// Booking Confirmation endpoint (No AI - Simple dynamic response)
app.post('/api/ai/booking-confirmation', async (req, res) => {
  try {
    const { name, appliance, issue, email, phone } = req.body;

    // Validate input
    if (!name || !appliance || !issue) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, appliance, and issue are required' 
      });
    }

    // Generate booking reference
    const bookingRef = 'CR-' + Math.floor(100000 + Math.random() * 900000);

    // Generate professional confirmation message without AI
    const confirmationText = `Thank you, ${name}! We've received your service request for your ${appliance}. Your booking reference is ${bookingRef}. Our expert technician will contact you within the next 2-3 business hours to schedule a convenient appointment time. We appreciate your trust in Care Refrigeration and look forward to resolving your appliance issue promptly.`;

    // Send emails (customer + business notification)
    const emailResults = await sendBookingEmails({
      name,
      email,
      phone,
      appliance,
      issue,
      confirmationMessage: confirmationText,
      bookingRef,
    });

    console.log('📧 Email results:', emailResults);

    res.json({ 
      success: true, 
      confirmation: confirmationText,
      bookingRef,
      emailSent: {
        customer: emailResults.customer?.success || false,
        business: emailResults.business?.success || false,
      }
    });

  } catch (error) {
    console.error('Error generating booking confirmation:', error);
    
    // Provide fallback message
    const { name, appliance, email, phone } = req.body;
    const bookingRef = 'CR-' + Math.floor(100000 + Math.random() * 900000);
    
    const fallbackMessage = `Dear ${name},

Thank you for contacting Care Refrigeration! We have received your service request for ${appliance} repair.

Your booking reference is: ${bookingRef}

Our technical team has been notified and will contact you within 2-3 business hours to schedule a convenient appointment time.

If you need immediate assistance, please call us directly at +91 9819 124 194.

Best regards,
Care Refrigeration Team`;

    // Still try to send emails even with fallback message
    try {
      const emailResults = await sendBookingEmails({
        name,
        email,
        phone,
        appliance,
        issue,
        confirmationMessage: fallbackMessage,
        bookingRef,
      });
      
      console.log('📧 Fallback email results:', emailResults);
    } catch (emailError) {
      console.error('Error sending fallback emails:', emailError);
    }

    res.json({ 
      success: true, 
      confirmation: fallbackMessage,
      bookingRef,
      usedFallback: true 
    });
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
app.post('/api/gallery/upload', upload.single('image'), (req, res) => {
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
app.delete('/api/gallery/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
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
app.post('/api/gallery/reset', (req, res) => {
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

// Catch-all route to serve index.html for client-side routing (must be last)
if (process.env.NODE_ENV === 'production') {
  app.get(/^\/(?!api|gallery).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Gallery directory: ${galleryDir}`);
});
