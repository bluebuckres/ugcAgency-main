// Authentication Protection Script
// Include this script on protected pages

function checkAuthentication() {
    const currentUser = localStorage.getItem('ugc_current_user');
    
    if (!currentUser) {
        // Not logged in, redirect to auth page with current page as redirect parameter
        const currentPage = window.location.pathname.split('/').pop() || 'resources.html';
        window.location.href = `auth.html?redirect=${currentPage}`;
        return false;
    }
    
    try {
        const user = JSON.parse(currentUser);
        
        // Check if session is still valid (24 hours)
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
            // Session expired
            localStorage.removeItem('ugc_current_user');
            alert('Your session has expired. Please sign in again.');
            window.location.href = `auth.html?redirect=${window.location.pathname.split('/').pop()}`;
            return false;
        }
        
        // Valid session, show user info if needed
        showUserInfo(user);
        return true;
        
    } catch (error) {
        // Corrupted session data
        localStorage.removeItem('ugc_current_user');
        window.location.href = `auth.html?redirect=${window.location.pathname.split('/').pop()}`;
        return false;
    }
}

function showUserInfo(user) {
    // Add user info to the page if there's a designated area
    const userInfoArea = document.getElementById('user-info');
    if (userInfoArea) {
        userInfoArea.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.15); border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <a href="resources.html" style="color: var(--color-cream); text-decoration: none; font-size: 12px; opacity: 0.9;">← Back to Resources</a>
                    <div>
                        <strong>Welcome back, ${user.name}!</strong>
                        ${user.company ? `<br><small style="opacity: 0.7;">${user.company}</small>` : ''}
                    </div>
                </div>
                <button onclick="logout()" style="padding: 6px 12px; background: rgba(255,255,255,0.2); color: var(--color-cream); border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; font-size: 12px; cursor: pointer;">
                    Sign Out
                </button>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem('ugc_current_user');
    alert('You have been signed out successfully.');
    window.location.href = 'auth.html';
}

// Auto-check authentication when script loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
});

// Check authentication periodically (every 5 minutes)
setInterval(function() {
    const currentUser = localStorage.getItem('ugc_current_user');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            const loginTime = new Date(user.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
            
            if (hoursSinceLogin > 24) {
                logout();
            }
        } catch (error) {
            logout();
        }
    }
}, 5 * 60 * 1000); // Check every 5 minutes
