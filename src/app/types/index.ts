/**
 * GLOBAL TYPE DEFINITIONS
 * 
 * These types define the data models for the entire application.
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
  demoVideoUrl?: string;
  completionDate?: string;
  featuredOnHomepage?: boolean;
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
  id: string; // Updated to UUID string for Supabase
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string; // ISO date string
  unread: boolean;
  created_at?: string;
}

// ============================================
// MEDIA TYPES
// ============================================

export interface WorkspaceImage {
  id: string; // Updated to UUID string for Supabase
  url: string;
  alt?: string;
  order?: number; // For sorting images
  created_at?: string;
}

export interface Album {
  id: string; // Updated to UUID string for Supabase
  url: string;
  title: string;
  artist?: string;
  order?: number; // For sorting albums
  created_at?: string;
}

// ============================================
// SETTINGS TYPES
// ============================================

export interface SiteSettings {
  id?: string; // Updated to UUID string for Supabase
  name: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  updated_at?: string;
  user_id?: string;
}

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface User {
  id: string; // Supabase UUID
  email: string;
  created_at?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// ============================================
// FORM VALIDATION TYPES
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}
