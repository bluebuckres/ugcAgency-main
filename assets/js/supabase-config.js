/**
 * Enhanced Supabase Configuration for MakeUGC Website
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Get your project URL and anon key from Settings > API
 * 3. Replace the values below with your actual credentials
 * 4. For production, use environment variables via Netlify
 */

// Supabase Configuration
const SUPABASE_CONFIG = {
    url: 'https://dsmathkrbbyfxalgsuel.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo',
    options: {
        auth: {
            autoRefreshToken: true,
            persistSession: false, // Don't persist session for anonymous users
            detectSessionInUrl: false
        }
        // Removed global headers override - let Supabase handle apikey automatically
    }
};

// Initialize Supabase client
let supabaseClient = null;
let connectionStatus = 'disconnected';

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded. Make sure to include the CDN script.');
        return null;
    }
    
    if (!supabaseClient) {
        try {
            supabaseClient = supabase.createClient(
                SUPABASE_CONFIG.url, 
                SUPABASE_CONFIG.anonKey,
                SUPABASE_CONFIG.options
            );
            
            // Test connection
            testConnection();
            
            console.log('✅ Supabase client initialized successfully');
            connectionStatus = 'connected';
            
        } catch (error) {
            console.error('❌ Failed to initialize Supabase client:', error);
            connectionStatus = 'error';
            return null;
        }
    }
    
    return supabaseClient;
}

// Test Supabase connection
async function testConnection() {
    if (!supabaseClient) return false;
    
    try {
        // Simple query to test connection
        const { data, error } = await supabaseClient
            .from('creator_applications')
            .select('count', { count: 'exact', head: true });
            
        if (error && error.code !== 'PGRST116') { // PGRST116 is "relation does not exist" which is ok for testing
            console.warn('⚠️ Supabase connection test warning:', error.message);
            return false;
        }
        
        console.log('✅ Supabase connection test successful');
        connectionStatus = 'connected';
        return true;
        
    } catch (error) {
        console.error('❌ Supabase connection test failed:', error);
        connectionStatus = 'error';
        return false;
    }
}

// Enhanced insert with retry logic
async function insertWithRetry(table, data, maxRetries = 3) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase client not available');
    }
    
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`📤 Attempting to insert into ${table} (attempt ${attempt}/${maxRetries})`);
            
            const { data: result, error } = await client
                .from(table)
                .insert([data])
                .select();
                
            if (error) {
                throw error;
            }
            
            console.log(`✅ Successfully inserted into ${table}:`, result);
            return { data: result, error: null };
            
        } catch (error) {
            lastError = error;
            console.error(`❌ Insert attempt ${attempt} failed:`, error);
            
            // Don't retry on certain errors
            if (error.code === '42501' || error.message.includes('duplicate')) {
                break;
            }
            
            // Wait before retry (exponential backoff)
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
                console.log(`⏳ Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    return { data: null, error: lastError };
}

// Get connection status
function getConnectionStatus() {
    return connectionStatus;
}

// Export functions for use in other scripts
window.getSupabaseClient = initSupabase;
window.supabaseInsertWithRetry = insertWithRetry;
window.getSupabaseConnectionStatus = getConnectionStatus;
window.testSupabaseConnection = testConnection;
