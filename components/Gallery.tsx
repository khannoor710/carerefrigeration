import { useState, useEffect } from 'react';
import { getGalleryImages } from '../services/galleryService';
import { GalleryImage } from '../types';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
    
    // Listen for custom event when admin updates
    const handleGalleryUpdate = () => {
      loadImages();
    };
    
    window.addEventListener('gallery-updated', handleGalleryUpdate as EventListener);
    
    // Poll for updates every 10 seconds
    const pollInterval = setInterval(loadImages, 10000);
    
    return () => {
      window.removeEventListener('gallery-updated', handleGalleryUpdate as EventListener);
      clearInterval(pollInterval);
    };
  }, []);

  const loadImages = async () => {
    try {
      const loadedImages = await getGalleryImages();
      setImages(loadedImages);
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Work in Action</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the quality and care we put into every repair.
          </p>
        </div>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            <p className="mt-4 text-slate-600">Loading gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative w-full" style={{ paddingTop: '100%' }}> {/* 1:1 Aspect Ratio */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;