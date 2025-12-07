import { GalleryImage } from '../types';

/**
 * Get the API base URL based on environment
 */
function getApiBaseUrl(): string {
  // In development, use localhost backend
  if (import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  // In production, use same origin (Railway serves both frontend and backend)
  return '';
}

/**
 * Get all gallery images from the server
 */
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const apiUrl = `${getApiBaseUrl()}/api/gallery`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery images');
    }
    const data = await response.json();
    
    // Return latest 6 images
    return data.images.slice(0, 6);
  } catch (error) {
    console.error('Error loading gallery images:', error);
    
    // Return default images if API fails
    return [
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
    ];
  }
};

/**
 * Upload a new image to the server
 */
export const uploadGalleryImage = async (
  file: File,
  title: string,
  alt: string
): Promise<{ success: boolean; message: string; totalImages: number }> => {
  const apiUrl = `${getApiBaseUrl()}/api/gallery/upload`;
  
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('alt', alt);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete an image by index
 */
export const deleteGalleryImage = async (index: number): Promise<{ success: boolean; message: string }> => {
  const apiUrl = `${getApiBaseUrl()}/api/gallery/${index}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete image');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Reset gallery to default images
 */
export const resetGallery = async (): Promise<{ success: boolean; message: string }> => {
  const apiUrl = `${getApiBaseUrl()}/api/gallery/reset`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to reset gallery');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error resetting gallery:', error);
    throw error;
  }
};
