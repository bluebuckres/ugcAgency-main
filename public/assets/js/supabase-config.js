/**
 * Supabase Configuration for MakeUGC Website
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Get your project URL and anon key from Settings > API
 * 3. Replace the values below with your actual credentials
 * 4. For production, use environment variables via Netlify
 */

// Supabase Configuration
// For production: Set these via Vercel environment variables
const SUPABASE_CONFIG = {
    url: window.ENV?.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL', // e.g., https://xxxxx.supabase.co
    anonKey: window.ENV?.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY' // Your public anon key
};

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded. Make sure to include the CDN script.');
        return null;
    }
    
    // Validate configuration
    if (!SUPABASE_CONFIG.url || SUPABASE_CONFIG.url === 'YOUR_SUPABASE_PROJECT_URL') {
        console.error('Supabase URL not configured. Please set SUPABASE_URL environment variable.');
        return null;
    }
    
    if (!SUPABASE_CONFIG.anonKey || SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.error('Supabase anon key not configured. Please set SUPABASE_ANON_KEY environment variable.');
        return null;
    }
    
    if (!supabaseClient) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        } catch (error) {
            console.error('Failed to initialize Supabase client:', error);
            return null;
        }
    }
    
    return supabaseClient;
}

// Export for use in other scripts
window.getSupabaseClient = initSupabase;
