import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { GalleryImage } from '../types';
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  resetGallery,
} from '../services/galleryService';

const AdminGalleryManager: React.FC = () => {
  const { logout } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const loadedImages = await getGalleryImages();
      setImages(loadedImages);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load images' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select an image' });
      return;
    }

    if (!title.trim() || !alt.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const result = await uploadGalleryImage(selectedFile, title, alt);
      setMessage({ 
        type: 'success', 
        text: `Image uploaded successfully! Total images: ${result.totalImages}` 
      });
      
      // Reload images from server
      await loadImages();
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setTitle('');
      setAlt('');
      
      // Clear file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Notify other tabs/windows
      window.dispatchEvent(new Event('gallery-updated'));
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to upload image'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryImage(index);
        await loadImages();
        setMessage({ type: 'success', text: 'Image deleted successfully' });
        window.dispatchEvent(new Event('gallery-updated'));
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete image' });
      }
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset to default images? This will delete all uploaded images.')) {
      try {
        await resetGallery();
        await loadImages();
        setMessage({ type: 'success', text: 'Gallery reset to default images' });
        window.dispatchEvent(new Event('gallery-updated'));
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to reset gallery' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gallery Management</h1>
              <p className="mt-1 text-sm text-slate-600">Upload and manage gallery images</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Upload New Image</h2>
          <p className="text-sm text-slate-600 mb-4">
            Upload as many images as you want. The latest 6 images will be displayed on the website.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-slate-700 mb-2">
                Select Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary-dark transition-all"
              />
            </div>

            {previewUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Preview</label>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Image Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., AC Repair Service"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="alt" className="block text-sm font-medium text-slate-700 mb-2">
                Alt Text (for accessibility)
              </label>
              <input
                id="alt"
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="e.g., Technician repairing air conditioner"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all"
              >
                Reset to Default
              </button>
            </div>
          </form>
        </div>

        {/* Current Images */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Current Gallery (Showing latest 6 of {images.length} total)
          </h2>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
              <p className="mt-4 text-slate-600">Loading images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(index)}
                      className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-slate-900">{image.title}</p>
                    <p className="text-xs text-slate-600">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryManager;