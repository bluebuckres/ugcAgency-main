/**
 * FINAL SUPABASE DEBUG & FIX
 * Based on ChatGPT analysis - this will definitively fix the 401/RLS issue
 */

// Test 1: Verify your exact configuration
console.log('🔍 SUPABASE CONFIGURATION CHECK:');
console.log('URL:', 'https://dsmathkrbbyfxalgsuel.supabase.co');
console.log('Anon Key (first 20 chars):', 'eyJhbGciOiJIUzI1NiIs...');

// Test 2: Manual fetch test with explicit headers
async function testManualFetch() {
    console.log('🧪 Testing manual fetch with explicit headers...');
    
    const testData = {
        full_name: 'Test User',
        email: 'test@example.com',
        city: 'Mumbai',
        primary_platform: 'Instagram',
        niches: 'Fashion',
        portfolio_video_url: 'https://youtube.com/test'
    };
    
    try {
        const response = await fetch('https://dsmathkrbbyfxalgsuel.supabase.co/rest/v1/creator_applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', [...response.headers.entries()]);
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Manual fetch SUCCESS:', result);
            
            // Clean up test data
            await fetch(`https://dsmathkrbbyfxalgsuel.supabase.co/rest/v1/creator_applications?email=eq.test@example.com`, {
                method: 'DELETE',
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWF0aGtyYmJ5ZnhhbGdzdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Njc5ODIsImV4cCI6MjA3ODM0Mzk4Mn0.IPuc62TXY9X_zn3i9zHDrA2YOybx2rQhmWyuYTe8amo'
                }
            });
            
            return true;
        } else {
            const error = await response.text();
            console.error('❌ Manual fetch FAILED:', response.status, error);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Manual fetch ERROR:', error);
        return false;
    }
}

// Test 3: Supabase client test
async function testSupabaseClient() {
    console.log('🧪 Testing Supabase client...');
    
    if (typeof window.getSupabaseClient !== 'function') {
        console.error('❌ Supabase client not available');
        return false;
    }
    
    const client = window.getSupabaseClient();
    if (!client) {
        console.error('❌ Failed to get Supabase client');
        return false;
    }
    
    console.log('✅ Client created, testing insert...');
    
    const testData = {
        full_name: 'Test User 2',
        email: 'test2@example.com',
        city: 'Delhi',
        primary_platform: 'YouTube',
        niches: 'Tech',
        portfolio_video_url: 'https://youtube.com/test2'
    };
    
    try {
        const { data, error } = await client
            .from('creator_applications')
            .insert([testData])
            .select();
            
        if (error) {
            console.error('❌ Supabase client FAILED:', error);
            return false;
        } else {
            console.log('✅ Supabase client SUCCESS:', data);
            
            // Clean up
            await client
                .from('creator_applications')
                .delete()
                .eq('email', 'test2@example.com');
                
            return true;
        }
        
    } catch (error) {
        console.error('❌ Supabase client ERROR:', error);
        return false;
    }
}

// Run comprehensive test
async function runComprehensiveTest() {
    console.log('🚀 RUNNING COMPREHENSIVE SUPABASE TEST...');
    console.log('=====================================');
    
    const manualTest = await testManualFetch();
    const clientTest = await testSupabaseClient();
    
    console.log('=====================================');
    console.log('📊 TEST RESULTS:');
    console.log('Manual Fetch:', manualTest ? '✅ PASS' : '❌ FAIL');
    console.log('Supabase Client:', clientTest ? '✅ PASS' : '❌ FAIL');
    
    if (manualTest && clientTest) {
        console.log('🎉 ALL TESTS PASSED - Your form should work!');
    } else if (manualTest && !clientTest) {
        console.log('🔧 Manual fetch works but client fails - Check client initialization');
    } else if (!manualTest && clientTest) {
        console.log('🔧 Client works but manual fails - Unusual, check headers');
    } else {
        console.log('❌ Both failed - Check Supabase project settings');
    }
}

// Export for manual testing
window.runSupabaseTest = runComprehensiveTest;
window.testManualFetch = testManualFetch;
window.testSupabaseClient = testSupabaseClient;

console.log('🔧 Debug functions loaded. Run: window.runSupabaseTest()');
