/**
 * APPLICATION CONSTANTS
 * 
 * Centralized constants for the application.
 * This prevents magic strings and makes the codebase more maintainable.
 * 
 * SUPABASE INTEGRATION:
 * - Add your Supabase URL and anon key to environment variables
 * - Never commit API keys to version control
 */

// ============================================
// SUPABASE CONFIGURATION
// ============================================

/**
 * TODO: Set these in your environment variables (.env.local)
 * 
 * VITE_SUPABASE_URL=your-project-url.supabase.co
 * VITE_SUPABASE_ANON_KEY=your-anon-key
 */
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

// ============================================
// DATABASE TABLE NAMES
// ============================================

/**
 * Database table names for Supabase
 * Use these constants instead of hardcoding table names
 */
export const TABLES = {
  PROJECTS: 'projects',
  MESSAGES: 'messages',
  WORKSPACE_IMAGES: 'workspace_images',
  ALBUMS: 'albums',
  SITE_SETTINGS: 'site_settings',
  PAGE_VIEWS: 'page_views', // For analytics
} as const;

// ============================================
// STORAGE BUCKETS
// ============================================

/**
 * Supabase Storage bucket names
 * Create these buckets in your Supabase dashboard
 */
export const STORAGE_BUCKETS = {
  PROJECT_IMAGES: 'project-images',
  WORKSPACE_IMAGES: 'workspace-images',
  ALBUM_COVERS: 'album-covers',
} as const;

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  ADMIN: '/admin',
  NOT_FOUND: '*',
} as const;

// ============================================
// PROJECT CATEGORIES
// ============================================

export const PROJECT_CATEGORIES = [
  'Web App',
  'Mobile App',
  'Design',
  'Productivity',
  'E-Commerce',
  'Other',
] as const;

// ============================================
// PROJECT STATUS
// ============================================

export const PROJECT_STATUSES = ['Published', 'Draft'] as const;

// ============================================
// ADMIN TABS
// ============================================

export const ADMIN_TABS = {
  PROJECTS: 'projects',
  ANALYTICS: 'analytics',
  INBOX: 'inbox',
  MEDIA: 'media',
  SETTINGS: 'settings',
} as const;

// ============================================
// VALIDATION RULES
// ============================================

export const VALIDATION = {
  PROJECT_TITLE_MAX_LENGTH: 100,
  PROJECT_DESCRIPTION_MAX_LENGTH: 500,
  MESSAGE_MAX_LENGTH: 5000,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_REGEX: /^https?:\/\/.+/,
} as const;

// ============================================
// UI CONSTANTS
// ============================================

export const UI = {
  TOAST_DURATION: 3000, // milliseconds
  ANIMATION_DURATION: 200, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds for search
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
} as const;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  // Auth errors
  AUTH_FAILED: 'Authentication failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  
  // Validation errors
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_URL: 'Please enter a valid URL',
  
  // API errors
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  
  // Form errors
  FORM_VALIDATION_FAILED: 'Please fix the errors before submitting',
  
  // File upload errors
  FILE_TOO_LARGE: 'File is too large. Maximum size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload an image.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  IMAGE_UPLOADED: 'Image uploaded successfully!',
  IMAGE_DELETED: 'Image deleted successfully!',
  MESSAGE_MARKED_READ: 'Message marked as read',
  ALBUM_ADDED: 'Album added successfully!',
  ALBUM_DELETED: 'Album deleted successfully!',
} as const;
