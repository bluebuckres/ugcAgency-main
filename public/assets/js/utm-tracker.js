/**
 * UTM Parameter Tracker
 * Captures UTM parameters from URL and stores them for form submissions
 * Essential for tracking Meta Ads campaign performance
 */

(function() {
    'use strict';
    
    // Capture UTM parameters from URL
    function captureUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};
        
        // List of UTM parameters to capture
        const utmKeys = [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_term',
            'utm_content',
            'utm_id',
            'fbclid',  // Facebook Click ID
            'gclid'    // Google Click ID
        ];
        
        // Capture each parameter if present
        utmKeys.forEach(key => {
            if (urlParams.has(key)) {
                utmParams[key] = urlParams.get(key);
            }
        });
        
        // Store in sessionStorage if any UTM params found
        if (Object.keys(utmParams).length > 0) {
            sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
            
            // Also store timestamp
            utmParams.captured_at = new Date().toISOString();
            sessionStorage.setItem('utm_params_full', JSON.stringify(utmParams));
            
            // Debug log (remove in production)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('UTM Parameters captured:', utmParams);
            }
        }
    }
    
    // Add UTM parameters to forms
    function addUTMToForms() {
        const forms = document.querySelectorAll('form[data-netlify="true"]');
        const storedUtm = sessionStorage.getItem('utm_params');
        
        if (!storedUtm || forms.length === 0) {
            return;
        }
        
        const utmData = JSON.parse(storedUtm);
        
        forms.forEach(form => {
            // Check if UTM fields already added
            if (form.querySelector('input[name="utm_source"]')) {
                return;
            }
            
            // Add hidden input for each UTM parameter
            Object.keys(utmData).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = utmData[key];
                form.appendChild(input);
            });
            
            // Add landing page URL
            const landingPageInput = document.createElement('input');
            landingPageInput.type = 'hidden';
            landingPageInput.name = 'landing_page';
            landingPageInput.value = window.location.href;
            form.appendChild(landingPageInput);
            
            // Debug log
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('UTM parameters added to form:', form.getAttribute('name'));
            }
        });
    }
    
    // Track page view with UTM parameters
    function trackPageView() {
        const storedUtm = sessionStorage.getItem('utm_params');
        
        if (storedUtm && window.umami) {
            const utmData = JSON.parse(storedUtm);
            window.umami.track('page-view-with-utm', utmData);
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            captureUTMParameters();
            addUTMToForms();
            trackPageView();
        });
    } else {
        captureUTMParameters();
        addUTMToForms();
        trackPageView();
    }
    
    // Re-add UTM parameters if forms are dynamically loaded
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                addUTMToForms();
            }
        });
    });
    
    // Start observing
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Expose utility function to get UTM parameters
    window.getUTMParameters = function() {
        const stored = sessionStorage.getItem('utm_params');
        return stored ? JSON.parse(stored) : null;
    };
    
})();
