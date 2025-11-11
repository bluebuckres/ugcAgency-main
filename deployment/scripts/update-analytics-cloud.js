// Quick script to update all HTML files with cloud analytics
// Run this after getting your tracking script from Umami Cloud

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration - Update these after setting up cloud analytics
const CLOUD_CONFIG = {
    // Replace with your actual values from Umami Cloud
    websiteId: 'YOUR_UMAMI_CLOUD_WEBSITE_ID',
    scriptUrl: 'https://cloud.umami.is/script.js', // or your custom domain
    apiUrl: 'https://cloud.umami.is/api/collect' // or your custom domain
};

const NEW_ANALYTICS_CONFIG = `
    <!-- Umami Cloud Analytics -->
    <script>
        window.UMAMI_CONFIG = {
            websiteId: '${CLOUD_CONFIG.websiteId}',
            scriptUrl: '${CLOUD_CONFIG.scriptUrl}',
            apiUrl: '${CLOUD_CONFIG.apiUrl}',
            trackingEnabled: true,
            debug: false
        };
    </script>
    
    <!-- Enhanced Analytics Script -->
    <script src="analytics-setup.js" defer></script>`;

function updateHtmlFiles() {
    console.log('🔄 Updating HTML files with cloud analytics...');
    
    const htmlFiles = glob.sync('*.html');
    let updatedCount = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            
            // Replace localhost URLs with cloud URLs
            const oldPattern = /websiteId:\s*['"](YOUR_WEBSITE_ID_HERE|[^'"]*)['"]/g;
            const scriptPattern = /scriptUrl:\s*['"][^'"]*localhost[^'"]*['"]/g;
            const apiPattern = /apiUrl:\s*['"][^'"]*localhost[^'"]*['"]/g;
            
            if (content.match(oldPattern) || content.match(scriptPattern) || content.match(apiPattern)) {
                content = content.replace(oldPattern, `websiteId: '${CLOUD_CONFIG.websiteId}'`);
                content = content.replace(scriptPattern, `scriptUrl: '${CLOUD_CONFIG.scriptUrl}'`);
                content = content.replace(apiPattern, `apiUrl: '${CLOUD_CONFIG.apiUrl}'`);
                
                fs.writeFileSync(file, content, 'utf8');
                console.log(`✅ Updated: ${file}`);
                updatedCount++;
            } else {
                console.log(`⏭️  Skipped: ${file} (no analytics config found)`);
            }
        } catch (error) {
            console.log(`❌ Error updating ${file}: ${error.message}`);
        }
    });
    
    console.log(`\n🎉 Updated ${updatedCount} HTML files`);
    console.log('\n📋 Next steps:');
    console.log('1. Test any page in your browser');
    console.log('2. Check your Umami Cloud dashboard for data');
    console.log('3. Analytics should be tracking immediately!');
}

if (require.main === module) {
    if (CLOUD_CONFIG.websiteId === 'YOUR_UMAMI_CLOUD_WEBSITE_ID') {
        console.log('❌ Please update the CLOUD_CONFIG in this script first!');
        console.log('   1. Sign up at https://cloud.umami.is');
        console.log('   2. Add your website');
        console.log('   3. Get your website ID');
        console.log('   4. Update CLOUD_CONFIG in this script');
        console.log('   5. Run: node update-analytics-cloud.js');
    } else {
        updateHtmlFiles();
    }
}

module.exports = { updateHtmlFiles, CLOUD_CONFIG };
