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
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_PROJECT_URL', // e.g., https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // Your public anon key
};

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded. Make sure to include the CDN script.');
        return null;
    }
    
    if (!supabaseClient) {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    }
    
    return supabaseClient;
}

// Export for use in other scripts
window.getSupabaseClient = initSupabase;
