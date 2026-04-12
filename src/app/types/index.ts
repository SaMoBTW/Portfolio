/**
 * GLOBAL TYPE DEFINITIONS
 * 
 * These types define the data models for the entire application.
 * When implementing Supabase, ensure your database schema matches these types.
 * 
 * SUPABASE INTEGRATION NOTES:
 * - Each type corresponds to a database table
 * - Add `created_at` and `updated_at` timestamps to all tables
 * - Use UUID for `id` fields in production
 * - Implement Row Level Security (RLS) policies for all tables
 */

// ============================================
// PROJECT TYPES
// ============================================

export interface Project {
  id: string | number;
  title: string;
  description: string;
  longDescription?: string;
  status: ProjectStatus;
  views: number;
  lastUpdated?: string;
  created_at?: string;
  technologies: string[];
  imageUrl: string;
  galleryImages?: string[];
  projectUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  
  // Optional fields added in admin
  demoVideoUrl?: string; // Match DB column
  completionDate?: string; // Match DB column
  featuredOnHomepage?: boolean; // Match DB column
}

export type ProjectStatus = "Published" | "Draft";

export type ProjectCategory = 
  | "Web App" 
  | "Mobile App" 
  | "Design" 
  | "Productivity" 
  | "E-Commerce" 
  | "Other";

export interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  technologies: string; // Comma-separated string, needs to be parsed
  imageUrl: string;
  galleryImages: string[];
  demoVideoUrl: string;
  projectUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  status: ProjectStatus;
  completionDate: string;
  featuredOnHomepage: boolean;
}

// ============================================
// MESSAGE/INBOX TYPES
// ============================================

export interface Message {
  id: number; // TODO: Change to string (UUID) when implementing Supabase
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string; // ISO date string
  unread: boolean;
  
  // TODO: Add these fields for Supabase implementation
  // created_at?: string;
  // user_id?: string; // Reference to admin user
}

// ============================================
// MEDIA TYPES
// ============================================

export interface WorkspaceImage {
  id: number; // TODO: Change to string (UUID) when implementing Supabase
  url: string;
  alt?: string;
  order?: number; // For sorting images
  
  // TODO: Add for Supabase
  // created_at?: string;
  // file_size?: number;
  // file_type?: string;
}

export interface Album {
  id: number; // TODO: Change to string (UUID) when implementing Supabase
  url: string;
  title: string;
  artist?: string;
  order?: number; // For sorting albums
  
  // TODO: Add for Supabase
  // created_at?: string;
}

// ============================================
// SETTINGS TYPES
// ============================================

export interface SiteSettings {
  id?: number; // TODO: Change to string (UUID) when implementing Supabase
  name: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  
  // TODO: Add for Supabase
  // updated_at?: string;
  // user_id?: string; // Reference to admin user
}



// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface User {
  id: string; // Supabase UUID
  email: string;
  created_at?: string;
  
  // Supabase Auth will provide additional fields:
  // - app_metadata
  // - user_metadata
  // - role
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Standard API response wrapper
 * Use this pattern for all Supabase queries
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// ============================================
// FORM VALIDATION TYPES
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
}
