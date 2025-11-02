import { FC, SVGProps } from 'react';

/**
 * Type definition for SVG icon components
 */
export type IconComponent = FC<SVGProps<SVGSVGElement>>;

/**
 * Service offering with icon, description and features
 */
export interface Service {
  icon: IconComponent;
  title: string;
  description: string;
  features: string[];
}

/**
 * Why Choose Us feature point
 */
export interface WhyChooseUsPoint {
  icon: IconComponent;
  title: string;
  description: string;
}

/**
 * Annual Maintenance Contract (AMC) benefit
 */
export interface AmcBenefit {
  icon: IconComponent;
  title: string;
  description: string;
}

/**
 * Customer testimonial
 */
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  avatarUrl: string;
}

/**
 * Gallery image item
 */
export interface GalleryImage {
  src: string;
  title: string;
  alt: string;
}

/**
 * Navigation link
 */
export interface NavLink {
  href: string;
  label: string;
}

/**
 * Admin authentication credentials
 */
export interface AdminCredentials {
  username: string;
  password: string;
}

/**
 * Admin session data
 */
export interface AdminSession {
  isAuthenticated: boolean;
  expiresAt: number;
}