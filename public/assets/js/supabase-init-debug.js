/**
 * Supabase Initialization Debug Script
 * This script helps diagnose and fix connection issues
 */

(function() {
    'use strict';

    // Debug function to check Supabase status
    function debugSupabaseConnection() {
        console.log('🔍 Debugging Supabase Connection...');
        
        // Check if Supabase library is loaded
        if (typeof supabase === 'undefined') {
            console.error('❌ Supabase library not loaded from CDN');
            return false;
        }
        console.log('✅ Supabase library loaded successfully');

        // Check if config is available
        if (typeof window.getSupabaseClient !== 'function') {
            console.error('❌ Supabase config not loaded');
            return false;
        }
        console.log('✅ Supabase config loaded successfully');

        // Try to initialize client
        try {
            const client = window.getSupabaseClient();
            if (!client) {
                console.error('❌ Failed to create Supabase client');
                return false;
            }
            console.log('✅ Supabase client created successfully');
            
            // Test basic connection
            testBasicConnection(client);
            return true;
            
        } catch (error) {
            console.error('❌ Error creating Supabase client:', error);
            return false;
        }
    }

    // Test basic connection to Supabase
    async function testBasicConnection(client) {
        try {
            console.log('🔄 Testing connection to Supabase...');
            
            // Check if client has proper headers
            console.log('🔍 Checking Supabase client configuration...');
            if (client.supabaseKey) {
                console.log('✅ API Key found in client:', client.supabaseKey.substring(0, 20) + '...');
            } else {
                console.error('❌ No API key found in client!');
            }
            
            // Simple ping test - try to get table info
            const { data, error } = await client
                .from('creator_applications')
                .select('*', { count: 'exact', head: true });
                
            if (error) {
                if (error.code === 'PGRST116') {
                    console.log('⚠️ Table not found (this is OK for testing connection)');
                    console.log('✅ Connection to Supabase successful');
                } else if (error.message.includes('row-level security')) {
                    console.log('⚠️ RLS policy issue detected');
                    console.log('🔧 You need to run the SQL fix in Supabase dashboard');
                    showRLSFixInstructions();
                } else if (error.message.includes('401') || error.message.includes('apikey')) {
                    console.error('❌ API Key issue detected');
                    console.error('🔧 Check if apikey header is being sent properly');
                    showAPIKeyFixInstructions();
                } else {
                    console.error('❌ Connection test failed:', error);
                }
            } else {
                console.log('✅ Connection and table access successful');
            }
            
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                console.error('❌ Network error - check internet connection');
                console.error('❌ Or Supabase URL might be incorrect');
            } else {
                console.error('❌ Connection test error:', error);
            }
        }
    }

    // Show RLS fix instructions
    function showRLSFixInstructions() {
        console.log(`
🔧 RLS POLICY FIX NEEDED:

1. Go to: https://supabase.com/dashboard
2. Select your project: dsmathkrbbyfxalgsuel
3. Open SQL Editor
4. Run this query:

CREATE POLICY "creator_applications_public_insert"
ON creator_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

5. Refresh this page and try again
        `);
    }

    // Show API Key fix instructions
    function showAPIKeyFixInstructions() {
        console.log(`
🔧 API KEY HEADER FIX NEEDED:

The apikey header is missing from requests. This usually means:

1. Supabase client initialization issue
2. Custom headers overriding default headers
3. Incorrect anon key

✅ FIXED: Removed custom headers from config
🔄 Refresh the page and try again

If still failing, check:
- Anon key is correct in Supabase Settings → API
- No browser extensions blocking headers
        `);
    }

    // Show connection status in UI
    function showConnectionStatus(isConnected) {
        // Create status indicator
        const statusDiv = document.createElement('div');
        statusDiv.id = 'supabase-status';
        statusDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            font-size: 14px;
            ${isConnected ? 'background: #10b981;' : 'background: #ef4444;'}
        `;
        statusDiv.innerHTML = isConnected 
            ? '✅ Supabase Connected' 
            : '❌ Supabase Connection Failed';
            
        document.body.appendChild(statusDiv);
        
        // Remove after 5 seconds
        setTimeout(() => statusDiv.remove(), 5000);
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            const isConnected = debugSupabaseConnection();
            showConnectionStatus(isConnected);
        }, 1000); // Wait 1 second for all scripts to load
    });

    // Export for manual testing
    window.debugSupabaseConnection = debugSupabaseConnection;
})();
