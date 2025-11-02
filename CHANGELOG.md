# Changelog

All notable changes to the Care Refrigeration project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **TypeScript Strict Mode**: Enabled strict type checking for better code quality
- **Error Boundary**: Added global error boundary component for graceful error handling
- **Type Definitions**: Comprehensive TypeScript types for all components and utilities
- **Validation Utilities**: Input validation functions with proper error messages
- **Application Config**: Centralized configuration file for app settings
- **Environment Variables**: Proper environment variable handling with .env.local.example
- **Code Quality Tools**: ESLint and Prettier configurations
- **Documentation**: CONTRIBUTING.md for development guidelines
- **Enhanced Error Handling**: Improved error handling in Gemini service with fallbacks
- **Accessibility Improvements**: Added ARIA labels and semantic HTML
- **SEO**: Added meta description in index.html

### Changed
- **constants.tsx → constants.ts**: Renamed to .ts as it doesn't contain JSX
- **Type Safety**: Improved type safety across all hooks and components
- **Package Scripts**: Added lint, format, and type-check scripts
- **Service Layer**: Enhanced geminiService with better error handling
- **TypeScript Config**: Cleaned up and organized tsconfig.json
- **Vite Config**: Simplified configuration, removed duplicate API_KEY reference
- **Git Ignore**: Enhanced with better organization and coverage
- **Index HTML**: Improved formatting, added SEO meta tags, removed unused CSS reference

### Removed
- **Unused Components**: Removed empty Brands.tsx component
- **Unused Icons**: Removed VoltasLogo, SamsungLogo, LgLogo, DaikinLogo, CarrierLogo, WrenchIcon, GooglePlusIcon, DribbbleIcon
- **Metadata.json**: Removed unused metadata file
- **Redundant Config**: Removed unused config options from app.config.ts
- **Duplicate References**: Removed process.env.API_KEY in favor of GEMINI_API_KEY only
- **Unused TypeScript Options**: Removed experimentalDecorators and useDefineForClassFields
- **Index.css Reference**: Removed non-existent CSS file reference

### Fixed
- **TypeScript Errors**: Resolved all implicit any types and unused parameters
- **Form Validation**: Better error messages in booking form
- **API Error Handling**: Graceful fallback when Gemini API fails
- **Code Duplication**: Eliminated duplicate environment variable handling

### Security
- **Input Sanitization**: Added input sanitization utilities
- **Environment Variables**: Standardized on GEMINI_API_KEY only
- **Type Safety**: Strict TypeScript mode prevents common security issues

## [0.0.0] - 2025-11-02

### Initial Release
- Basic React + Vite setup
- Landing page with services showcase
- Booking form with Gemini AI integration
- AMC (Annual Maintenance Contract) section
- Testimonials and gallery sections
- Responsive design with Tailwind CSS