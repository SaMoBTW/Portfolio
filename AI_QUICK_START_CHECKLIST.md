/**
 * ⚡ QUICK START CHECKLIST FOR AI ASSISTANTS
 * 
 * Copy this checklist when starting Supabase integration
 * Check off items as you complete them
 */

## 📋 PRE-INTEGRATION CHECKLIST

### Files to Read First (IN THIS ORDER):
1. [ ] `/BACKEND_INTEGRATION_README.md` - Overview and audit results
2. [ ] `/src/app/lib/SUPABASE_INTEGRATION_GUIDE.ts` - Detailed integration steps
3. [ ] `/src/app/types/index.ts` - Type definitions to use
4. [ ] `/src/app/constants/index.ts` - Constants to reference
5. [ ] `/src/app/utils/index.ts` - Utilities available
6. [ ] `/src/app/hooks/index.ts` - Hooks available

### Understanding Current State:
- [ ] Admin.tsx uses mock data with useState
- [ ] All CRUD operations work with local state
- [ ] No backend persistence yet
- [ ] Authentication is mocked
- [ ] Type definitions are ready but not imported yet

---

## 🚀 INTEGRATION STEPS (Follow sequentially)

### STEP 1: Install & Setup
```bash
npm install @supabase/supabase-js
```

- [ ] Create `.env.local` with:
  ```
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```
- [ ] Add `.env.local` to `.gitignore`
- [ ] Create `/src/app/lib/supabase.ts`:
  ```typescript
  import { createClient } from '@supabase/supabase-js'
  import { SUPABASE_CONFIG } from '../constants'
  
  export const supabase = createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
  )
  ```

### STEP 2: Database Setup
- [ ] Go to Supabase SQL Editor
- [ ] Copy SQL from `/src/app/lib/SUPABASE_INTEGRATION_GUIDE.ts`
- [ ] Run the entire schema (tables + RLS policies + triggers)
- [ ] Verify tables created: projects, messages, workspace_images, albums, site_settings, page_views
- [ ] Verify RLS enabled on all tables

### STEP 3: Storage Setup
- [ ] Go to Supabase Storage
- [ ] Create buckets: `project-images`, `workspace-images`, `album-covers`
- [ ] Set all buckets to public
- [ ] Configure upload policies (auth required)

### STEP 4: Authentication
- [ ] Enable Email provider in Supabase Dashboard
- [ ] Add site URLs (localhost:5173 and production)
- [ ] Create `useAuth` hook:
  ```typescript
  import { useState, useEffect } from 'react';
  import { supabase } from '../lib/supabase';
  
  export function useAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );
      
      return () => subscription.unsubscribe();
    }, []);
    
    return { session, loading };
  }
  ```
- [ ] Update Admin.tsx to use real auth

### STEP 5: Projects API
- [ ] Create `/src/app/api/projects.ts` with CRUD functions:
  ```typescript
  import { supabase } from '../lib/supabase';
  import { Project } from '../types';
  import { TABLES } from '../constants';
  
  export async function fetchProjects() {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
  
  export async function createProject(project: Partial<Project>) {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  export async function updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  export async function deleteProject(id: string) {
    const { error } = await supabase
      .from(TABLES.PROJECTS)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
  ```

### STEP 6: Update Admin.tsx - Projects Tab
- [ ] Import types: `import { Project } from '../types';`
- [ ] Import API functions: `import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projects';`
- [ ] Replace useState with useEffect + API calls:
  ```typescript
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  async function loadProjects() {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }
  ```
- [ ] Update handleSubmit to use API
- [ ] Update handleDelete to use API
- [ ] Add loading skeletons
- [ ] Test CRUD operations

### STEP 7: Messages/Inbox
- [ ] Create `/src/app/api/messages.ts`
- [ ] Implement fetch, mark as read functions
- [ ] Update Admin.tsx Inbox tab
- [ ] Test functionality

### STEP 8: Media Management
- [ ] Create `/src/app/api/media.ts`
- [ ] Implement upload to Supabase Storage
- [ ] Implement workspace images CRUD
- [ ] Implement albums CRUD
- [ ] Update Admin.tsx Media tab
- [ ] Test uploads and deletions

### STEP 9: Settings
- [ ] Create `/src/app/api/settings.ts`
- [ ] Implement fetch and update
- [ ] Update Admin.tsx Settings tab
- [ ] Test saving settings

### STEP 10: Public Pages
- [ ] Update Home.tsx to fetch featured projects
- [ ] Update Projects.tsx to fetch published projects
- [ ] Update About.tsx to fetch media
- [ ] Add loading states
- [ ] Test public views

### STEP 11: Testing
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Test file uploads
- [ ] Test RLS policies (try accessing as unauthenticated)
- [ ] Test on mobile
- [ ] Test error states
- [ ] Test loading states

### STEP 12: Deployment
- [ ] Set production environment variables
- [ ] Update Supabase URL config
- [ ] Deploy
- [ ] Test in production
- [ ] Set up database backups

---

## ⚠️ COMMON MISTAKES TO AVOID

1. **DON'T** skip the database schema setup
2. **DON'T** forget to enable RLS on tables
3. **DON'T** use service_role key on client-side
4. **DON'T** skip input validation
5. **DON'T** forget error handling and try-catch blocks
6. **DON'T** skip loading states
7. **DON'T** create new types - use ones in `/types/index.ts`
8. **DON'T** hardcode strings - use `/constants/index.ts`
9. **DON'T** reinvent utilities - use `/utils/index.ts`
10. **DON'T** forget to test RLS policies

---

## 🎯 SUCCESS CRITERIA

Your integration is complete when:
- [ ] Can sign in to admin panel with real Supabase auth
- [ ] Can create, edit, delete projects (persisted to DB)
- [ ] Can upload images to Supabase Storage
- [ ] Can manage workspace images and albums
- [ ] Can update site settings (persisted to DB)
- [ ] Can view and manage contact messages
- [ ] Public pages load data from Supabase
- [ ] Unauthenticated users can't access admin features (RLS working)
- [ ] No console errors
- [ ] Loading states show during data fetching
- [ ] Error messages display when operations fail
- [ ] Mobile responsive still works
- [ ] All features tested end-to-end

---

## 📚 REFERENCE DURING DEVELOPMENT

### Import Patterns:
```typescript
// Types
import { Project, Message, Album, WorkspaceImage, SiteSettings } from '../types';

// Constants
import { TABLES, STORAGE_BUCKETS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

// Utils
import { getErrorMessage, formatDate, isValidEmail, parseCommaSeparatedString } from '../utils';

// Hooks
import { useAsync, useForm, useDebounce } from '../hooks';

// Supabase client
import { supabase } from '../lib/supabase';
```

### Supabase Query Patterns:
```typescript
// SELECT
const { data, error } = await supabase
  .from(TABLES.PROJECTS)
  .select('*')
  .eq('status', 'Published')
  .order('created_at', { ascending: false });

// INSERT
const { data, error } = await supabase
  .from(TABLES.PROJECTS)
  .insert([{ ...projectData }])
  .select()
  .single();

// UPDATE
const { data, error } = await supabase
  .from(TABLES.PROJECTS)
  .update({ ...updates })
  .eq('id', id)
  .select()
  .single();

// DELETE
const { error } = await supabase
  .from(TABLES.PROJECTS)
  .delete()
  .eq('id', id);

// UPLOAD FILE
const { data, error } = await supabase.storage
  .from(STORAGE_BUCKETS.PROJECT_IMAGES)
  .upload(filePath, file);

// GET PUBLIC URL
const { data } = supabase.storage
  .from(STORAGE_BUCKETS.PROJECT_IMAGES)
  .getPublicUrl(filePath);
```

---

## ✅ FINAL CHECKLIST BEFORE MARKING COMPLETE

- [ ] All features work end-to-end
- [ ] No hardcoded mock data remains
- [ ] All API calls have error handling
- [ ] All operations show loading states
- [ ] Toast notifications work for all actions
- [ ] RLS policies tested and working
- [ ] Mobile responsive on all pages
- [ ] No console errors or warnings
- [ ] Code follows existing patterns
- [ ] Types imported from `/types/index.ts`
- [ ] Constants imported from `/constants/index.ts`
- [ ] Comments added where needed
- [ ] Production environment variables set
- [ ] Tested in production environment

**🎉 CONGRATULATIONS! Your portfolio is now full-stack! 🎉**
