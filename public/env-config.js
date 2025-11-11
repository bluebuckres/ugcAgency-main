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
        SUPABASE_URL: 'YOUR_SUPABASE_URL_HERE',
        SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY_HERE'
    };
}
