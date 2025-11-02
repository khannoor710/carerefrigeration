import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
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

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Gallery directory: ${galleryDir}`);
});
