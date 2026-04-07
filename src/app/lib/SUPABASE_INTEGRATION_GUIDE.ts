/**
 * ========================================
 * SUPABASE INTEGRATION GUIDE
 * ========================================
 * 
 * This file contains all the information needed to implement
 * Supabase backend functionality for this portfolio website.
 * 
 * Follow these steps in order to successfully integrate Supabase.
 */

// ============================================
// STEP 1: SETUP & INSTALLATION
// ============================================

/**
 * 1.1 Install Supabase Client
 * Run: npm install @supabase/supabase-js
 * 
 * 1.2 Create Environment Variables
 * Create a `.env.local` file in your project root:
 * 
 * VITE_SUPABASE_URL=https://your-project.supabase.co
 * VITE_SUPABASE_ANON_KEY=your-anon-key
 * 
 * ⚠️ NEVER commit .env.local to version control!
 * Add it to .gitignore
 */

// ============================================
// STEP 2: CREATE SUPABASE CLIENT
// ============================================

/**
 * Create this file: /src/app/lib/supabase.ts
 * 
 * import { createClient } from '@supabase/supabase-js'
 * import { SUPABASE_CONFIG } from '../constants'
 * 
 * export const supabase = createClient(
 *   SUPABASE_CONFIG.url,
 *   SUPABASE_CONFIG.anonKey
 * )
 */

// ============================================
// STEP 3: DATABASE SCHEMA
// ============================================

/**
 * Run these SQL commands in your Supabase SQL Editor
 * to create all necessary tables with proper structure:
 */

const DATABASE_SCHEMA = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  views INTEGER DEFAULT 0,
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  category TEXT NOT NULL DEFAULT 'Web App',
  demo_video_url TEXT,
  completion_date TEXT,
  featured_on_homepage BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured_on_homepage);

-- ============================================
-- MESSAGES TABLE (Contact Form Submissions)
-- ============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  unread BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_messages_unread ON messages(unread);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- ============================================
-- WORKSPACE IMAGES TABLE
-- ============================================
CREATE TABLE workspace_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt TEXT,
  order_index INTEGER DEFAULT 0,
  file_size INTEGER,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for ordering
CREATE INDEX idx_workspace_images_order ON workspace_images(order_index);

-- ============================================
-- ALBUMS TABLE (Heavy Rotation)
-- ============================================
CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  artist TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for ordering
CREATE INDEX idx_albums_order ON albums(order_index);

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (name, tagline, bio, email, github_url, linkedin_url, twitter_url)
VALUES (
  'Samir Mahmoud',
  'Full-Stack Developer & Designer',
  'I build elegant solutions that blend functionality with beautiful design. Specializing in React, TypeScript, and modern web technologies.',
  'hello@samirmahmoud.dev',
  'https://github.com/samirmahmoud',
  'https://linkedin.com/in/samirmahmoud',
  'https://twitter.com/samirmahmoud'
);

-- ============================================
-- PAGE VIEWS TABLE (Analytics)
-- ============================================
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for analytics queries
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Public read access for projects (only published)
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'Published');

-- Authenticated users (admin) can do everything with projects
CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Public can view site settings
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Authenticated users can update site settings
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Public can insert messages (contact form)
CREATE POLICY "Public can submit contact form"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view and manage messages
CREATE POLICY "Authenticated users can manage messages"
  ON messages FOR ALL
  USING (auth.role() = 'authenticated');

-- Public can view workspace images and albums
CREATE POLICY "Public can view workspace images"
  ON workspace_images FOR SELECT
  USING (true);

CREATE POLICY "Public can view albums"
  ON albums FOR SELECT
  USING (true);

-- Authenticated users can manage media
CREATE POLICY "Authenticated users can manage workspace images"
  ON workspace_images FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage albums"
  ON albums FOR ALL
  USING (auth.role() = 'authenticated');

-- Public can insert page views for analytics
CREATE POLICY "Public can track page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view analytics
CREATE POLICY "Authenticated users can view analytics"
  ON page_views FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for projects table
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for site_settings table
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment project views
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE projects
    SET views = views + 1
    WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

// ============================================
// STEP 4: STORAGE BUCKETS
// ============================================

/**
 * Create these storage buckets in your Supabase Dashboard:
 * 
 * 1. project-images (Public)
 *    - For project screenshots and images
 *    - Max file size: 5MB
 *    - Allowed types: image/jpeg, image/png, image/webp
 * 
 * 2. workspace-images (Public)
 *    - For workspace evolution photos
 *    - Max file size: 5MB
 *    - Allowed types: image/jpeg, image/png, image/webp
 * 
 * 3. album-covers (Public)
 *    - For heavy rotation album covers
 *    - Max file size: 2MB
 *    - Allowed types: image/jpeg, image/png, image/webp
 * 
 * Storage Policies:
 * - Everyone can view files (public buckets)
 * - Only authenticated users can upload/delete files
 */

// ============================================
// STEP 5: AUTHENTICATION SETUP
// ============================================

/**
 * Configure Authentication in Supabase Dashboard:
 * 
 * 1. Enable Email Provider:
 *    - Go to Authentication > Providers
 *    - Enable Email provider
 *    - Configure email templates (optional)
 * 
 * 2. Enable OAuth Providers (Optional):
 *    - Google, GitHub, etc.
 *    - Follow Supabase documentation for each provider
 * 
 * 3. Add Site URL:
 *    - Go to Authentication > URL Configuration
 *    - Add your production URL
 *    - Add http://localhost:5173 for development
 * 
 * 4. Configure Redirect URLs:
 *    - Add allowed redirect URLs for auth callbacks
 */

// ============================================
// STEP 6: API INTEGRATION POINTS
// ============================================

/**
 * REPLACE MOCK DATA WITH SUPABASE IN THESE FILES:
 * 
 * 1. /src/app/pages/Admin.tsx
 *    - Replace useState with Supabase queries
 *    - Implement real CRUD operations
 *    - Add error handling with try-catch
 *    - Add loading states
 * 
 * 2. /src/app/pages/Projects.tsx
 *    - Fetch projects from Supabase
 *    - Filter by status = 'Published'
 *    - Implement search and filtering
 * 
 * 3. /src/app/pages/About.tsx
 *    - Fetch workspace images from Supabase
 *    - Fetch albums from Supabase
 * 
 * 4. /src/app/pages/Home.tsx
 *    - Fetch featured projects
 *    - Display site settings from Supabase
 * 
 * Key Changes Needed:
 * - Replace all useState arrays with useEffect + Supabase queries
 * - Add proper TypeScript types (already defined in /types/index.ts)
 * - Implement error boundaries
 * - Add loading skeletons
 * - Handle network errors gracefully
 */

// ============================================
// STEP 7: EXAMPLE API CALLS
// ============================================

/**
 * Example: Fetching Projects
 * 
 * import { supabase } from '../lib/supabase';
 * import { Project } from '../types';
 * 
 * async function fetchProjects(): Promise<Project[]> {
 *   const { data, error } = await supabase
 *     .from('projects')
 *     .select('*')
 *     .eq('status', 'Published')
 *     .order('created_at', { ascending: false });
 *   
 *   if (error) {
 *     console.error('Error fetching projects:', error);
 *     throw error;
 *   }
 *   
 *   return data || [];
 * }
 * 
 * 
 * Example: Creating a Project
 * 
 * async function createProject(project: Partial<Project>): Promise<Project> {
 *   const { data, error } = await supabase
 *     .from('projects')
 *     .insert([project])
 *     .select()
 *     .single();
 *   
 *   if (error) {
 *     console.error('Error creating project:', error);
 *     throw error;
 *   }
 *   
 *   return data;
 * }
 * 
 * 
 * Example: Updating a Project
 * 
 * async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
 *   const { data, error } = await supabase
 *     .from('projects')
 *     .update(updates)
 *     .eq('id', id)
 *     .select()
 *     .single();
 *   
 *   if (error) {
 *     console.error('Error updating project:', error);
 *     throw error;
 *   }
 *   
 *   return data;
 * }
 * 
 * 
 * Example: Deleting a Project
 * 
 * async function deleteProject(id: string): Promise<void> {
 *   const { error } = await supabase
 *     .from('projects')
 *     .delete()
 *     .eq('id', id);
 *   
 *   if (error) {
 *     console.error('Error deleting project:', error);
 *     throw error;
 *   }
 * }
 * 
 * 
 * Example: File Upload
 * 
 * async function uploadProjectImage(file: File, projectId: string): Promise<string> {
 *   const fileExt = file.name.split('.').pop();
 *   const fileName = `${projectId}-${Date.now()}.${fileExt}`;
 *   const filePath = `projects/${fileName}`;
 *   
 *   const { data, error } = await supabase.storage
 *     .from('project-images')
 *     .upload(filePath, file);
 *   
 *   if (error) {
 *     console.error('Error uploading file:', error);
 *     throw error;
 *   }
 *   
 *   // Get public URL
 *   const { data: { publicUrl } } = supabase.storage
 *     .from('project-images')
 *     .getPublicUrl(filePath);
 *   
 *   return publicUrl;
 * }
 * 
 * 
 * Example: Authentication Check
 * 
 * import { useEffect, useState } from 'react';
 * 
 * function useAuth() {
 *   const [session, setSession] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *   
 *   useEffect(() => {
 *     // Get initial session
 *     supabase.auth.getSession().then(({ data: { session } }) => {
 *       setSession(session);
 *       setLoading(false);
 *     });
 *     
 *     // Listen for auth changes
 *     const { data: { subscription } } = supabase.auth.onAuthStateChange(
 *       (_event, session) => {
 *         setSession(session);
 *       }
 *     );
 *     
 *     return () => subscription.unsubscribe();
 *   }, []);
 *   
 *   return { session, loading };
 * }
 */

// ============================================
// STEP 8: SECURITY BEST PRACTICES
// ============================================

/**
 * 1. Never expose sensitive keys
 *    - Use environment variables
 *    - Never commit .env files
 *    - Use anon key for client-side
 * 
 * 2. Validate all user inputs
 *    - Use the validation functions in /utils/index.ts
 *    - Sanitize HTML content
 *    - Check file types and sizes before upload
 * 
 * 3. Implement proper RLS policies
 *    - Already defined in database schema above
 *    - Test policies thoroughly
 * 
 * 4. Rate limiting
 *    - Consider implementing rate limiting for contact form
 *    - Use Supabase Edge Functions if needed
 * 
 * 5. Error handling
 *    - Never expose detailed error messages to users
 *    - Log errors for debugging
 *    - Show user-friendly error messages
 */

// ============================================
// STEP 9: TESTING
// ============================================

/**
 * Test these scenarios before going to production:
 * 
 * 1. Authentication:
 *    - Sign up new user
 *    - Sign in existing user
 *    - Sign out
 *    - Session persistence
 * 
 * 2. CRUD Operations:
 *    - Create project
 *    - Read projects (published only for public)
 *    - Update project
 *    - Delete project
 * 
 * 3. File Uploads:
 *    - Upload image
 *    - View uploaded image
 *    - Delete image
 *    - File size limits
 *    - File type validation
 * 
 * 4. Contact Form:
 *    - Submit message
 *    - View messages (admin only)
 *    - Mark as read
 * 
 * 5. Settings:
 *    - Update site settings
 *    - View settings (public)
 */

// ============================================
// STEP 10: DEPLOYMENT
// ============================================

/**
 * 1. Set production environment variables in your hosting platform
 * 2. Update Supabase URL configuration with production domain
 * 3. Test authentication flow in production
 * 4. Monitor error logs
 * 5. Set up database backups in Supabase dashboard
 */

export const SUPABASE_INTEGRATION_COMPLETE = true;
