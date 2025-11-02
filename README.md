<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Care Refrigeration - Appliance Repair Service

A modern, professional website for an appliance repair business in Mumbai. Built with React, TypeScript, Vite, and Tailwind CSS, featuring AI-powered booking confirmations using Google's Gemini API.

## ✨ Features

- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🤖 **AI-Powered**: Gemini AI generates personalized booking confirmations
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels
- 🔒 **Type-Safe**: Full TypeScript support with strict mode
- 🛡️ **Error Handling**: Global error boundary and graceful degradation
- 🎯 **SEO Friendly**: Semantic HTML and proper meta tags
- 🖼️ **Admin Gallery Management**: Upload and manage gallery images dynamically
- 🔐 **Secure Admin Portal**: Protected admin access for gallery updates

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 8+

### Installation

1. **Clone the repository** (or download the source)
   ```bash
   git clone <repository-url>
   cd care-refrigeration-appliance-repair
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   PORT=3001
   ```
   Get your API key from: https://ai.google.dev/

4. **Run the application**
   
   **Option A: Run both frontend and backend together** (Recommended)
   ```bash
   npm run dev:all
   ```
   
   **Option B: Run separately**
   
   Terminal 1 - Backend server:
   ```bash
   npm run server
   ```
   
   Terminal 2 - Frontend:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Main site: http://localhost:5173
   - Admin panel: http://localhost:5173/admin

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Admin Gallery Management

Access the admin portal to manage gallery images:

1. **Navigate to Admin Page**
   ```
   http://localhost:5173/admin
   ```

2. **Login Credentials**
   - **Username**: `admin`
   - **Password**: `CareRefrig2024!`
   
   ⚠️ **IMPORTANT**: Change these credentials in production by setting environment variables:
   ```
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_secure_password
   ```

3. **Upload Images**
   - Maximum file size: 5MB
   - Supported formats: JPG, PNG, WebP, GIF
   - Images are stored in browser localStorage
   - New images replace the oldest ones (max 6 images)

4. **Features**
   - ✅ Upload new images with title and alt text
   - ✅ Preview before uploading
   - ✅ Delete individual images
   - ✅ Reset to default images
   - ✅ Real-time gallery updates
   - ✅ 24-hour session persistence

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
care-refrigeration-appliance-repair/
├── components/          # React components
│   ├── icons/          # SVG icon components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services showcase
│   ├── BookingForm.tsx # AI-powered booking form
│   ├── ErrorBoundary.tsx # Error handling
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useBookingForm.ts
│   ├── useHeaderState.ts
│   └── useSmoothScroll.ts
├── services/           # External services
│   └── geminiService.ts # Gemini AI integration
├── utils/              # Utility functions
│   └── validation.ts   # Input validation
├── config/             # Configuration
│   └── app.config.ts   # App settings
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── App.tsx             # Root component
└── index.tsx           # Entry point
```

## 🎨 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3
- **AI**: Google Gemini API
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript Strict Mode

## 🔐 Security

- ✅ Environment variables for sensitive data
- ✅ Input sanitization and validation
- ✅ TypeScript strict mode for type safety
- ✅ No hardcoded credentials
- ✅ HTTPS-only API calls

## ♿ Accessibility

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ WCAG AA color contrast ratios

## 📊 Performance

- ✅ Component memoization with `React.memo()`
- ✅ Lazy loading for heavy components
- ✅ Optimized bundle size
- ✅ Fast Vite HMR
- ✅ Production-ready builds

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is private and proprietary.

## 📧 Contact

- **Email**: asadcare94@gmail.com
- **Phone**: +91 9819 124 194
- **Location**: Mumbai, India

## 🔗 Links

- **AI Studio**: https://ai.studio/apps/drive/1dX_oMIC64fdDHdkHKM_kyf-hOa2AhBhA
- **Gemini API Docs**: https://ai.google.dev/

---

Made with ❤️ for Care Refrigeration
