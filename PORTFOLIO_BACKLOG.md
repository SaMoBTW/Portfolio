# Portfolio Future Implementation Backlog

This backlog contains identified capabilities that are supported or planned but not yet deeply implemented in the UI.

## Analytics & Tracking Pipeline
- **Supabase Tracking**: The database already has a `page_views` table with `increment_project_views` logic available. 
- **Frontend Tracking**: We need to wire a hook or route interceptor to register unique page views.
- **Admin Dashboard**: The Admin portal should be upgraded to pull this analytics data and display graphs or raw metrics of portfolio engagement and popular project views.

## Experience Management System
- Currently, `Experience.tsx` represents job history and timelines entirely through hardcoded React arrays. 
- **Action**: Create an `experiences` database table in Supabase, develop CRUD controls within the Admin portal, and replace the hardcoded front-end array with a live data fetcher.

## Resume File Uploads
- Resumes are served from `public/` directory (static files).
- **Action**: Extend Admin UI to securely upload new PDFs to a dedicated Supabase `resume` storage bucket, and update the Experience CTA buttons to pull the live URL instead of hardcoded paths.

## Inspiration List (Creative Influences)
- The grid of designers and creators on the `About.tsx` page is hardcoded.
- **Action**: Assess if these should be managed in the database (creating an `inspirations` table) or left as localized static configuration.
