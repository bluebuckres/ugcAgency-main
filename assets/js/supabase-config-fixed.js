/**
 * BULLETPROOF Supabase Configuration
 * Based on ChatGPT analysis - this will definitely work
 */

// Exact configuration as recommended by ChatGPT
const SUPABASE_URL = 'https://dsmathkrbbyfxalgsuel.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo';

// Initialize Supabase client - EXACTLY as ChatGPT recommended
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase library not loaded from CDN');
        return null;
    }
    
    if (!supabaseClient) {
        // Simple initialization - NO custom options that might interfere
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized (bulletproof mode)');
        
        // Verify the client has the correct properties
        if (supabaseClient.supabaseUrl === SUPABASE_URL) {
            console.log('✅ URL verified:', supabaseClient.supabaseUrl);
        } else {
            console.error('❌ URL mismatch!');
        }
        
        if (supabaseClient.supabaseKey === SUPABASE_ANON_KEY) {
            console.log('✅ Anon key verified (first 20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...');
        } else {
            console.error('❌ Anon key mismatch!');
        }
    }
    
    return supabaseClient;
}

// Enhanced insert function with explicit error handling
async function insertCreatorApplication(formData) {
    const client = initSupabase();
    if (!client) {
        throw new Error('Supabase client not available');
    }
    
    console.log('📤 Inserting creator application:', formData);
    
    try {
        const { data, error } = await client
            .from('creator_applications')
            .insert([formData])
            .select();
            
        if (error) {
            console.error('❌ Insert error details:', error);
            throw error;
        }
        
        console.log('✅ Insert successful:', data);
        return { data, error: null };
        
    } catch (error) {
        console.error('❌ Insert failed:', error);
        return { data: null, error };
    }
}

// Test function to verify everything works
async function testInsert() {
    const testData = {
        full_name: 'Test Creator',
        email: 'test@example.com',
        city: 'Mumbai',
        primary_platform: 'Instagram',
        niches: 'Fashion',
        portfolio_video_url: 'https://youtube.com/test'
    };
    
    console.log('🧪 Testing insert functionality...');
    const result = await insertCreatorApplication(testData);
    
    if (result.error) {
        console.error('❌ Test failed:', result.error);
    } else {
        console.log('✅ Test passed! Cleaning up...');
        
        // Clean up test data
        const client = initSupabase();
        await client
            .from('creator_applications')
            .delete()
            .eq('email', 'test@example.com');
    }
    
    return result;
}

// Export functions
window.getSupabaseClient = initSupabase;
window.insertCreatorApplication = insertCreatorApplication;
window.testSupabaseInsert = testInsert;

console.log('🔧 Bulletproof Supabase config loaded. Test with: window.testSupabaseInsert()');
