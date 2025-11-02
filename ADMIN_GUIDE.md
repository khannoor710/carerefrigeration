# Admin Gallery Management Guide

This guide explains how to use the admin portal to manage gallery images for the Care Refrigeration website.

## 📋 Table of Contents

- [Accessing the Admin Portal](#accessing-the-admin-portal)
- [Uploading Images](#uploading-images)
- [Managing Images](#managing-images)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)

---

## 🔐 Accessing the Admin Portal

### URL
Navigate to: `http://your-domain.com/admin` or `http://localhost:5173/admin` for local development

### Default Credentials
- **Username**: `admin`
- **Password**: `CareRefrig2024!`

### Session Management
- Sessions last for **24 hours**
- You'll be automatically logged out after session expiry
- Session persists across browser refreshes
- Closing the browser tab does NOT log you out

---

## 📤 Uploading Images

### Step-by-Step Process

1. **Click "Choose File"** or drag and drop an image
2. **Preview** the image to ensure it looks correct
3. **Enter Image Title** (e.g., "AC Unit Servicing")
4. **Enter Alt Text** for accessibility (e.g., "Technician servicing air conditioner")
5. **Click "Upload Image"**

### Image Requirements

| Requirement | Details |
|-------------|---------|
| **Max File Size** | 5MB |
| **Supported Formats** | JPG, PNG, WebP, GIF |
| **Recommended Size** | 1200x1200px (1:1 ratio) |
| **Max Images** | 6 total |
| **Replacement** | Oldest image is automatically replaced |

### Best Practices

✅ **DO:**
- Use high-quality, professional images
- Write descriptive alt text for accessibility
- Keep titles concise (under 50 characters)
- Use images in 1:1 aspect ratio for best display
- Compress images before uploading (under 1MB recommended)

❌ **DON'T:**
- Upload low-quality or blurry images
- Use copyrighted images without permission
- Include sensitive customer information
- Upload inappropriate content
- Exceed 5MB file size

---

## 🖼️ Managing Images

### Current Gallery View
- Displays all 6 gallery images
- Shows title and alt text for each image
- Hover to see delete option

### Deleting Images
1. Hover over the image you want to delete
2. Click the **"Delete"** button that appears
3. Confirm deletion in the popup
4. Image is immediately removed

### Reset to Default
- Click **"Reset to Default"** button
- Confirms with a popup warning
- Restores original 6 stock images
- All uploaded images are permanently deleted

---

## 🔒 Security Considerations

### Production Deployment

⚠️ **CRITICAL**: Change default credentials before deploying to production!

#### Method 1: Environment Variables (Recommended)
```bash
# In your .env.local file
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_strong_password_here
```

#### Method 2: Modify Code
Edit `hooks/useAuth.ts`:
```typescript
const ADMIN_CREDENTIALS = {
  username: 'your_username',
  password: 'your_strong_password',
};
```

### Password Requirements
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Don't use common words or patterns
- Change regularly (every 90 days)

### Additional Security Measures
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Add IP whitelisting if possible
- ✅ Monitor admin access logs
- ✅ Use 2FA (future enhancement)

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "Image size must be less than 5MB"
**Solution**: Compress your image using tools like:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac)

#### 2. "Failed to upload image. Storage may be full."
**Solution**: Browser localStorage has limits (~5-10MB). Delete some images or reset to default.

#### 3. Images not updating on public site
**Solution**: 
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check if images uploaded successfully in admin panel

#### 4. Can't login
**Solution**:
- Verify credentials (case-sensitive)
- Clear browser cookies and try again
- Check if session expired (wait 24 hours from last login)

#### 5. Upload button disabled
**Solution**:
- Ensure file is selected
- Fill in both Title and Alt Text fields
- Check file size is under 5MB

---

## 🛠️ Technical Details

### Storage Mechanism
- **Method**: Browser localStorage
- **Key**: `gallery_images`
- **Format**: Base64-encoded images in JSON
- **Limit**: ~5-10MB (varies by browser)
- **Persistence**: Until manually cleared or reset

### Image Flow
```
1. User selects image file
2. Convert to base64 (client-side)
3. Store in localStorage with metadata
4. Display in gallery immediately
5. Persist across page reloads
```

### Data Structure
```typescript
interface GalleryImage {
  src: string;      // Base64 or URL
  title: string;    // Image title
  alt: string;      // Accessibility text
}
```

### Browser Compatibility
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ | Full support |
| Firefox | ✅ | Full support |
| Safari | ✅ | Full support |
| Edge | ✅ | Full support |
| IE11 | ❌ | Not supported |

### Limitations
- Images stored only in browser (not server-side)
- Different browsers/devices don't sync
- Clearing browser data removes images
- No backup/restore functionality (yet)

---

## 📝 Future Enhancements

Planned features:
- [ ] Server-side image storage
- [ ] Image optimization on upload
- [ ] Bulk upload capability
- [ ] Drag-and-drop reordering
- [ ] Image cropping tool
- [ ] Cloud backup integration
- [ ] Multi-admin support
- [ ] Audit logs

---

## 📞 Support

For issues or questions:
- **Email**: asadcare94@gmail.com
- **Phone**: +91 9819 124 194

---

**Last Updated**: November 2, 2025
**Version**: 1.0.0