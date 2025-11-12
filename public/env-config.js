/**
 * Environment Configuration Loader
 * Loads environment variables for client-side use
 * 
 * For Vercel deployment:
 * 1. Add environment variables in Vercel dashboard
 * 2. Prefix with NEXT_PUBLIC_ or use build-time injection
 * 3. This file will be auto-generated during build
 */

window.ENV = {
    SUPABASE_URL: '__SUPABASE_URL__',
    SUPABASE_ANON_KEY: '__SUPABASE_ANON_KEY__'
};

// For local development, you can override here:
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // IMPORTANT: Replace these with your actual Supabase credentials for local testing
    // DO NOT commit real credentials to git!
    window.ENV = {
        SUPABASE_URL: 'https://dsmathkrbbyfxalgsuel.supabase.co',
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo'
    };
}
