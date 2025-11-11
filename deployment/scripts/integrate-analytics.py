#!/usr/bin/env python3
"""
Professional Analytics Integration Script for MakeUGC
This script automatically integrates Umami analytics into all HTML files
"""

import os
import re
import glob
from pathlib import Path

# Analytics configuration to inject
ANALYTICS_CONFIG = '''
    <!-- Professional Umami Analytics Integration -->
    <script>
        // Configuration - Update these values after setting up Umami
        window.UMAMI_CONFIG = {
            websiteId: 'YOUR_WEBSITE_ID_HERE', // Get this from Umami dashboard
            scriptUrl: 'http://localhost:3000/script.js', // Update to your domain in production
            apiUrl: 'http://localhost:3000/api/collect', // Update to your domain in production
            trackingEnabled: true,
            debug: false // Set to true for development
        };
    </script>
    
    <!-- Enhanced Analytics Script -->
    <script src="analytics-setup.js" defer></script>'''

PRIVACY_NOTICE_STYLES = '''
    <!-- Privacy-compliant Analytics Notice -->
    <style>
        .analytics-notice {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1f2937;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 350px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
        }
        
        .analytics-notice.show {
            display: block;
            animation: slideIn 0.3s ease-out;
        }
        
        .analytics-notice .notice-buttons {
            margin-top: 12px;
            display: flex;
            gap: 10px;
        }
        
        .analytics-notice button {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .analytics-notice .accept-btn {
            background: #3b82f6;
            color: white;
        }
        
        .analytics-notice .decline-btn {
            background: #6b7280;
            color: white;
        }
        
        .analytics-notice button:hover {
            transform: translateY(-1px);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    </style>'''

PRIVACY_NOTICE_HTML = '''
    <!-- Privacy Notice HTML -->
    <div id="analytics-notice" class="analytics-notice">
        <div>
            <strong>Analytics & Privacy</strong>
            <p style="margin: 8px 0; line-height: 1.4;">
                We use privacy-friendly analytics to improve your experience. No personal data is collected.
            </p>
            <div class="notice-buttons">
                <button class="accept-btn" onclick="acceptAnalytics()">Accept</button>
                <button class="decline-btn" onclick="declineAnalytics()">Decline</button>
            </div>
        </div>
    </div>'''

CONSENT_MANAGEMENT_SCRIPT = '''
        // Privacy-compliant analytics consent management
        function showAnalyticsNotice() {
            const hasConsent = localStorage.getItem('analytics-consent');
            if (!hasConsent) {
                document.getElementById('analytics-notice').classList.add('show');
            } else if (hasConsent === 'accepted') {
                // Analytics is already accepted, ensure tracking is enabled
                if (window.UMAMI_CONFIG) {
                    window.UMAMI_CONFIG.trackingEnabled = true;
                }
            }
        }

        function acceptAnalytics() {
            localStorage.setItem('analytics-consent', 'accepted');
            document.getElementById('analytics-notice').classList.remove('show');
            
            // Enable tracking
            if (window.UMAMI_CONFIG) {
                window.UMAMI_CONFIG.trackingEnabled = true;
            }
            
            // Reinitialize analytics if already loaded
            if (window.ugcAnalytics) {
                window.ugcAnalytics.trackingEnabled = true;
                window.ugcAnalytics.init();
            }
        }

        function declineAnalytics() {
            localStorage.setItem('analytics-consent', 'declined');
            document.getElementById('analytics-notice').classList.remove('show');
            
            // Disable tracking
            if (window.UMAMI_CONFIG) {
                window.UMAMI_CONFIG.trackingEnabled = false;
            }
            
            if (window.ugcAnalytics) {
                window.ugcAnalytics.trackingEnabled = false;
            }
        }

        // Check consent on page load
        document.addEventListener('DOMContentLoaded', function() {
            const consent = localStorage.getItem('analytics-consent');
            if (!consent) {
                setTimeout(showAnalyticsNotice, 2000); // Show after 2 seconds
            } else if (consent === 'declined') {
                // Disable tracking
                if (window.UMAMI_CONFIG) {
                    window.UMAMI_CONFIG.trackingEnabled = false;
                }
            }
        });'''

def find_html_files():
    """Find all HTML files in the current directory"""
    html_files = glob.glob("*.html")
    # Exclude already processed files
    html_files = [f for f in html_files if not f.startswith('analytics-')]
    return html_files

def has_analytics_already(content):
    """Check if analytics is already integrated"""
    return 'UMAMI_CONFIG' in content or 'analytics-setup.js' in content

def integrate_analytics_into_file(file_path):
    """Integrate analytics into a single HTML file"""
    print(f"Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has analytics
    if has_analytics_already(content):
        print(f"  ✅ Analytics already integrated in {file_path}")
        return
    
    # Find the head closing tag and insert analytics config
    head_pattern = r'(</head>)'
    if re.search(head_pattern, content):
        content = re.sub(head_pattern, f'{ANALYTICS_CONFIG}\n\\1', content)
        print(f"  📊 Added analytics configuration to {file_path}")
    else:
        print(f"  ⚠️  Could not find </head> tag in {file_path}")
        return
    
    # Find a good place to insert privacy notice (before last script or before </body>)
    body_end_pattern = r'(</body>)'
    if re.search(body_end_pattern, content):
        # Insert privacy notice styles and HTML before </body>
        content = re.sub(body_end_pattern, f'{PRIVACY_NOTICE_STYLES}\n\n{PRIVACY_NOTICE_HTML}\n\n\\1', content)
        print(f"  🔒 Added privacy notice to {file_path}")
    
    # Find the last script tag or </body> to insert consent management
    last_script_pattern = r'(.*)(</script>\s*</body>)'
    if re.search(last_script_pattern, content, re.DOTALL):
        content = re.sub(last_script_pattern, f'\\1{CONSENT_MANAGEMENT_SCRIPT}\n    </script>\n</body>', content, flags=re.DOTALL)
        print(f"  ⚙️  Added consent management to {file_path}")
    else:
        # Fallback: add before </body>
        content = re.sub(body_end_pattern, f'    <script>{CONSENT_MANAGEMENT_SCRIPT}\n    </script>\n\\1', content)
        print(f"  ⚙️  Added consent management (fallback) to {file_path}")
    
    # Write the updated content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Successfully integrated analytics into {file_path}")

def main():
    """Main function to integrate analytics into all HTML files"""
    print("🚀 MakeUGC Analytics Integration Script")
    print("=====================================")
    
    # Check if analytics-setup.js exists
    if not os.path.exists('analytics-setup.js'):
        print("❌ Error: analytics-setup.js not found!")
        print("Please run this script from the website root directory.")
        return
    
    # Find all HTML files
    html_files = find_html_files()
    
    if not html_files:
        print("❌ No HTML files found in current directory")
        return
    
    print(f"📁 Found {len(html_files)} HTML files:")
    for file in html_files:
        print(f"   - {file}")
    
    print("\n🔧 Integrating analytics...")
    
    processed = 0
    for file_path in html_files:
        try:
            integrate_analytics_into_file(file_path)
            processed += 1
        except Exception as e:
            print(f"❌ Error processing {file_path}: {str(e)}")
    
    print(f"\n✅ Integration complete!")
    print(f"📊 Processed {processed} out of {len(html_files)} files")
    print("\n📋 Next Steps:")
    print("1. Run the setup script: ./setup-analytics.sh")
    print("2. Open http://localhost:3000 to access Umami dashboard")
    print("3. Login with admin/umami and change password")
    print("4. Add your website and get the tracking ID")
    print("5. Update 'YOUR_WEBSITE_ID_HERE' in all HTML files")
    print("6. Update script URLs for production deployment")

if __name__ == "__main__":
    main()
