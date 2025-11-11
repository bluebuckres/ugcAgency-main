// Resource Download Modal System
// Handles email capture, preview, and sharing for downloadable resources

function openResourceModal(resourceName, resourceType) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.id = 'resourceModal';
    modal.style.animation = 'fadeIn 0.3s ease';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full p-8 relative" style="animation: slideUp 0.3s ease;">
            <button onclick="closeResourceModal()" class="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="download" class="w-8 h-8 text-sage"></i>
                </div>
                <h3 class="font-crimson text-2xl font-bold mb-2">Download ${resourceType === 'ebook' ? 'E-book' : 'Guide'}</h3>
                <p class="text-charcoal/70 text-sm">${resourceName}</p>
            </div>
            <form onsubmit="handleResourceDownload(event, '${resourceName}', '${resourceType}')" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                    <input type="email" name="email" required placeholder="your@email.com" 
                        class="w-full px-4 py-3 border border-sage/30 rounded-lg focus:outline-none focus:border-sage transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-charcoal mb-2">Name (Optional)</label>
                    <input type="text" name="name" placeholder="Your name" 
                        class="w-full px-4 py-3 border border-sage/30 rounded-lg focus:outline-none focus:border-sage transition-colors">
                </div>
                <div class="flex items-start gap-2">
                    <input type="checkbox" required id="terms-${resourceType}" class="mt-1 w-4 h-4 text-sage">
                    <label for="terms-${resourceType}" class="text-xs text-charcoal/70 leading-relaxed">
                        I agree to receive UGC insights and marketing updates. Unsubscribe anytime.
                    </label>
                </div>
                <button type="submit" class="btn-primary w-full py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    Download Now
                </button>
            </form>
            <p class="text-xs text-center text-charcoal/50 mt-4 flex items-center justify-center gap-1">
                <span>🔒</span> Your data is secure. No spam, ever.
            </p>
        </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
}

function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => modal.remove(), 200);
    }
}

function handleResourceDownload(event, resourceName, resourceType) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const name = form.querySelector('input[name="name"]').value;
    
    // Show success message
    const successMsg = `✅ Success!\n\nWe've sent the download link to:\n${email}\n\nResource: ${resourceName}\n\nCheck your inbox (and spam folder) in the next few minutes.`;
    alert(successMsg);
    
    closeResourceModal();
    
    // Track download event
    if (window.ugcAnalytics) {
        window.ugcAnalytics.trackEvent('resource_download', {
            resource: resourceName,
            type: resourceType,
            email: email
        });
    }
    
    // In production, this would send data to your backend
    console.log('Resource download:', { resourceName, resourceType, email, name });
}

function previewResource(resourceId) {
    const previews = {
        'hook-scripts': 'This e-book contains 50+ proven hook scripts including:\n\n• "Stop scrolling if..." hooks\n• Question-based hooks\n• Curiosity gap hooks\n• Social proof hooks\n\nEach with performance data and optimization tips!',
        'platform-guide': 'This guide covers:\n\n• Instagram Reels best practices\n• TikTok optimization strategies\n• YouTube Shorts guidelines\n• Meta Ads UGC formats\n\nWith platform-specific timing and format recommendations!'
    };
    
    const preview = previews[resourceId] || 'Preview content coming soon!';
    alert(`📖 Preview\n\n${preview}\n\nDownload the full resource to get all the details!`);
}

function shareResource(resourceId) {
    const url = window.location.href;
    const shareData = {
        title: 'Check out this free resource from MakeUGC',
        text: 'I found this helpful UGC resource - thought you might like it!',
        url: url
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(() => {
            // Fallback to clipboard
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('🔗 Link copied to clipboard!\n\nShare it with your team or save it for later.');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('🔗 Link copied to clipboard!');
    }
}

// Close modal on escape key or background click
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeResourceModal();
});

document.addEventListener('click', function(e) {
    if (e.target.id === 'resourceModal') closeResourceModal();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
