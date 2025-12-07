/**
 * Custom error for API-related issues
 */
export class GeminiServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

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
 * Generates a personalized booking confirmation message using Gemini AI
 * Now calls the backend API instead of Gemini directly for security
 * 
 * @param name - Customer's full name
 * @param email - Customer's email address
 * @param phone - Customer's phone number
 * @param appliance - Type of appliance needing repair
 * @param issue - Description of the issue
 * @returns Promise resolving to the confirmation message
 * @throws {GeminiServiceError} If the API call fails
 */
export async function generateBookingConfirmation(
  name: string,
  email: string,
  phone: string,
  appliance: string,
  issue: string
): Promise<string> {
  const apiUrl = `${getApiBaseUrl()}/api/ai/booking-confirmation`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, appliance, issue }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new GeminiServiceError(
        errorData.error || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    if (!data.success || !data.confirmation) {
      throw new GeminiServiceError('Invalid response from API');
    }

    return data.confirmation;
  } catch (error) {
    console.error('Error generating confirmation:', error);
    
    if (error instanceof GeminiServiceError) {
      throw error;
    }
    
    // Network or fetch errors - provide fallback
    throw new GeminiServiceError(
      'Unable to connect to booking service. Please try again or call us directly.',
      error
    );
  }
}