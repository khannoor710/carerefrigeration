/**
 * Validation Utilities
 * Centralized validation functions for form inputs and data
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates that a string is not empty
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
}

/**
 * Validates a name field
 */
export function validateName(name: string): ValidationResult {
  const requiredCheck = validateRequired(name, 'Name');
  if (!requiredCheck.isValid) {
    return requiredCheck;
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters long',
    };
  }

  if (name.trim().length > 100) {
    return {
      isValid: false,
      error: 'Name must not exceed 100 characters',
    };
  }

  return { isValid: true };
}

/**
 * Validates an issue description
 */
export function validateIssueDescription(description: string): ValidationResult {
  const requiredCheck = validateRequired(description, 'Issue description');
  if (!requiredCheck.isValid) {
    return requiredCheck;
  }

  if (description.trim().length < 10) {
    return {
      isValid: false,
      error: 'Please provide at least 10 characters describing the issue',
    };
  }

  if (description.trim().length > 1000) {
    return {
      isValid: false,
      error: 'Description must not exceed 1000 characters',
    };
  }

  return { isValid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  const requiredCheck = validateRequired(email, 'Email');
  if (!requiredCheck.isValid) {
    return requiredCheck;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  return { isValid: true };
}

/**
 * Validates Indian phone number format
 */
export function validatePhone(phone: string): ValidationResult {
  const requiredCheck = validateRequired(phone, 'Phone number');
  if (!requiredCheck.isValid) {
    return requiredCheck;
  }

  // Remove spaces, dashes, and parentheses
  const cleanedPhone = phone.replace(/[\s\-()]/g, '');
  
  // Indian phone number: 10 digits, optionally starting with +91 or 0
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  
  if (!phoneRegex.test(cleanedPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid Indian phone number',
    };
  }

  return { isValid: true };
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}