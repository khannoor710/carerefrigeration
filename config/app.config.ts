/**
 * Application Configuration
 * Centralized configuration for the Care Refrigeration application
 */

export const APP_CONFIG = {
  /**
   * Company Information
   */
  company: {
    name: 'Care Refrigeration',
    tagline: 'Fast, Reliable Appliance Repair in Mumbai',
    email: 'asadcare94@gmail.com',
    phone: '+91 9819 124 194',
    location: 'Mumbai, India',
  },

  /**
   * Navigation Settings
   */
  navigation: {
    headerOffset: 80, // Fixed header height for smooth scrolling
  },

  /**
   * Service Settings
   */
  service: {
    responseTime: '2-3 business hours',
    serviceArea: 'Mumbai',
  },
} as const;

export type AppConfig = typeof APP_CONFIG;