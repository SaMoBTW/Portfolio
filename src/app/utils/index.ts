/**
 * Reusable helper functions for common operations.
 */

import { VALIDATION } from '../constants';

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty URLs are allowed (optional fields)
  return VALIDATION.URL_REGEX.test(url);
}

/**
 * Validates required fields
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validates string length
 */
export function isWithinLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Converts a comma-separated string to an array
 * Used for technologies field in projects
 */
export function parseCommaSeparatedString(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Converts an array to a comma-separated string
 */
export function arrayToCommaSeparated(arr: string[]): string {
  return arr.join(', ');
}

/**
 * Truncates a string to a maximum length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

/**
 * Generates a slug from a string
 * Useful for creating URL-friendly identifiers
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Formats a date string to a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date to ISO format (for database storage)
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Gets today's date in ISO format
 */
export function getTodayISO(): string {
  return toISODate(new Date());
}

/**
 * Calculates relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Formats a number with thousands separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Formats a number to a compact format (e.g., 1.2K, 3.4M)
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
}

// ============================================
// FILE UTILITIES
// ============================================

/**
 * Validates file size
 */
export function isValidFileSize(file: File, maxSizeInBytes: number): boolean {
  return file.size <= maxSizeInBytes;
}

/**
 * Validates file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Generates a unique filename using timestamp
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const extension = getFileExtension(originalFilename);
  const nameWithoutExt = originalFilename.replace(`.${extension}`, '');
  const slug = slugify(nameWithoutExt);
  return `${slug}-${timestamp}.${extension}`;
}

// ============================================
// DEBOUNCE UTILITY
// ============================================

/**
 * Debounces a function call
 * Useful for search inputs and expensive operations
 * 
 * Usage:
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query);
 * }, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

/**
 * Safely gets an item from localStorage
 * Returns null if item doesn't exist or parsing fails
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return null;
  }
}

/**
 * Safely sets an item in localStorage
 */
export function setToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
  }
}

/**
 * Removes an item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
  }
}

// ============================================
// ERROR HANDLING UTILITIES
// ============================================

/**
 * Extracts error message from various error types
 * Useful for handling Supabase errors
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}

/**
 * Type guard to check if error is a Supabase error
 */
export function isSupabaseError(error: unknown): error is { message: string; code?: string } {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

// ============================================
// SANITIZATION UTILITIES
// ============================================

/**
 * Sanitizes user input by removing dangerous characters
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

