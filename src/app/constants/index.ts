/**
 * APPLICATION CONSTANTS
 *
 * SUPABASE INTEGRATION:
 * - Add your Supabase URL and anon key to environment variables
 * - Never commit API keys to version control
 */

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
