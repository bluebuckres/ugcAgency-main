#!/usr/bin/env node

/**
 * Production Issues Fix Script
 * Fixes Tailwind CDN and Favicon issues across all HTML files
 */

const fs = require('fs');
const path = require('path');

// Find all HTML files
function findHtmlFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            findHtmlFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Fix individual HTML file
function fixHtmlFile(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix 1: Replace Tailwind CDN with local CSS
    if (content.includes('cdn.tailwindcss.com')) {
        content = content.replace(
            /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
            '<link rel="stylesheet" href="/assets/css/tailwind-production.css">'
        );
        modified = true;
        console.log(`  ✅ Fixed Tailwind CDN in ${path.basename(filePath)}`);
    }
    
    // Fix 2: Standardize favicon paths
    const faviconRegex = /<link rel="icon"[^>]*>/g;
    const appleTouchRegex = /<link rel="apple-touch-icon"[^>]*>/g;
    
    if (!content.includes('rel="icon"') || !content.includes('/assets/images/makeugclogo-01.svg')) {
        // Add favicon if missing or fix path
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex !== -1) {
            const faviconHtml = `
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/makeugclogo-01.svg">
    <link rel="apple-touch-icon" href="/assets/images/makeugclogo-01.svg">
    `;
            
            // Remove existing favicon links
            content = content.replace(faviconRegex, '');
            content = content.replace(appleTouchRegex, '');
            
            // Insert new favicon before </head>
            content = content.slice(0, headEndIndex) + faviconHtml + content.slice(headEndIndex);
            modified = true;
            console.log(`  ✅ Fixed favicon in ${path.basename(filePath)}`);
        }
    }
    
    // Fix 3: Remove Tailwind config scripts (they won't work with local CSS)
    const tailwindConfigRegex = /<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/g;
    if (tailwindConfigRegex.test(content)) {
        content = content.replace(tailwindConfigRegex, '<!-- Tailwind config removed - using production CSS -->');
        modified = true;
        console.log(`  ✅ Removed Tailwind config script in ${path.basename(filePath)}`);
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  💾 Saved changes to ${path.basename(filePath)}`);
    } else {
        console.log(`  ⏭️  No changes needed for ${path.basename(filePath)}`);
    }
    
    return modified;
}

// Main execution
function main() {
    console.log('🚀 Starting Production Issues Fix...\n');
    
    const publicDir = path.join(__dirname, 'public');
    const htmlFiles = findHtmlFiles(publicDir);
    
    console.log(`Found ${htmlFiles.length} HTML files to process:\n`);
    
    let totalFixed = 0;
    
    for (const file of htmlFiles) {
        if (fixHtmlFile(file)) {
            totalFixed++;
        }
        console.log(''); // Empty line for readability
    }
    
    console.log('📊 Summary:');
    console.log(`  Total files processed: ${htmlFiles.length}`);
    console.log(`  Files modified: ${totalFixed}`);
    console.log(`  Files unchanged: ${htmlFiles.length - totalFixed}`);
    
    console.log('\n✅ Production issues fix completed!');
    console.log('\n🎯 Next steps:');
    console.log('  1. Test your site locally');
    console.log('  2. Commit and push changes');
    console.log('  3. Deploy to production');
}

if (require.main === module) {
    main();
}

module.exports = { findHtmlFiles, fixHtmlFile };
