/**
 * Utility functions for HTML content processing
 */

/**
 * Decodes HTML entities in a string
 * @param text - The text containing HTML entities
 * @returns The decoded text
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  
  // Create a temporary DOM element to decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Cleans and formats HTML content for display
 * @param content - The HTML content to clean
 * @returns Cleaned and formatted text
 */
export function cleanHtmlContent(content: string): string {
  if (!content) return content;
  
  // First decode HTML entities
  let cleaned = decodeHtmlEntities(content);
  
  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n\s*\n/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}
