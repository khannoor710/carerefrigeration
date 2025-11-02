import { GoogleGenAI } from "@google/genai";

/**
 * Gemini AI model identifier
 */
const GEMINI_MODEL = "gemini-2.5-flash" as const;

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
 * Validates that the API key is configured
 * @throws {GeminiServiceError} If API key is not set
 */
function validateApiKey(): void {
  if (!process.env.GEMINI_API_KEY) {
    throw new GeminiServiceError(
      "GEMINI_API_KEY environment variable not set. Please configure your API key in .env.local"
    );
  }
}

/**
 * Generates a personalized booking confirmation message using Gemini AI
 * 
 * @param name - Customer's full name
 * @param appliance - Type of appliance needing repair
 * @param issue - Description of the issue
 * @returns Promise resolving to the confirmation message
 * @throws {GeminiServiceError} If the API call fails
 */
export async function generateBookingConfirmation(
  name: string,
  appliance: string,
  issue: string
): Promise<string> {
  validateApiKey();

  const apiKey = process.env.GEMINI_API_KEY as string;

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a friendly and professional customer service agent for an appliance repair company called "Care Refrigeration".
      A customer has just submitted a service request form. Your task is to generate a warm, reassuring, and professional confirmation message.

      Customer Details:
      - Name: ${name}
      - Appliance: ${appliance}
      - Issue Description: ${issue}

      Instructions for the response:
      1. Address the customer by their name.
      2. Confirm receipt of their service request for the specified appliance.
      3. Reassure them that a technician will be in touch shortly (within the next 2-3 business hours) to schedule a specific appointment time.
      4. Provide a unique, fictional booking reference number (e.g., CR-XXXXXX).
      5. Keep the tone positive and professional.
      6. Do not ask any questions.
      7. The response should be a single paragraph.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const confirmationText = response.text;
    
    if (!confirmationText || confirmationText.trim().length === 0) {
      throw new GeminiServiceError('Received empty response from AI service');
    }

    return confirmationText;
  } catch (error) {
    console.error('Error generating confirmation:', error);
    
    if (error instanceof GeminiServiceError) {
      throw error;
    }
    
    // Provide a graceful fallback message for users
    return `Dear ${name},

Thank you for contacting Care Refrigeration! We have received your service request for ${appliance} repair.

Your booking reference is: CR-${generateBookingReference()}

Our technical team has been notified and will contact you within 2-3 business hours to schedule a convenient appointment time.

If you need immediate assistance, please call us directly at +91 9819 124 194.

Best regards,
Care Refrigeration Team`;
  }
}

/**
 * Generates a random booking reference number
 * @returns 6-digit booking reference
 */
function generateBookingReference(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}