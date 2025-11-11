/**
 * Professional Umami Analytics Integration for MakeUGC
 * This script handles analytics tracking with enhanced features
 */

class UGCAnalytics {
    constructor(options = {}) {
        this.websiteId = options.websiteId || '';
        this.scriptUrl = options.scriptUrl || '';
        this.apiUrl = options.apiUrl || '';
        this.trackingEnabled = options.trackingEnabled !== false;
        this.debug = options.debug || false;
        
        // Initialize tracking
        if (this.trackingEnabled && this.websiteId && this.scriptUrl) {
            this.init();
        }
    }

    init() {
        // Load Umami script
        this.loadScript();
        
        // Set up enhanced tracking
        this.setupEnhancedTracking();
        
        // Track initial page view
        this.trackPageView();
        
        if (this.debug) {
            console.log('UGC Analytics initialized');
        }
    }

    loadScript() {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = this.scriptUrl;
        script.setAttribute('data-website-id', this.websiteId);
        script.setAttribute('data-domains', 'makeugc.in');
        script.setAttribute('data-do-not-track', 'true');
        
        // Add to head
        document.head.appendChild(script);
    }

    setupEnhancedTracking() {
        // Track CTA clicks
        this.trackCTAClicks();
        
        // Track form submissions
        this.trackFormSubmissions();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track page engagement time
        this.trackEngagementTime();
        
        // Track downloads
        this.trackDownloads();
    }

    trackCTAClicks() {
        document.addEventListener('click', (e) => {
            const element = e.target.closest('.btn-cta, .btn-primary, [data-track="cta"]');
            if (element) {
                const buttonText = element.textContent.trim();
                const buttonType = element.className.includes('btn-cta') ? 'primary-cta' : 'secondary-cta';
                
                this.trackEvent('cta-click', {
                    button_text: buttonText,
                    button_type: buttonType,
                    page_url: window.location.pathname
                });

                if (this.debug) {
                    console.log('CTA Click tracked:', buttonText);
                }
            }
        });
    }

    trackFormSubmissions() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                const formName = form.name || form.id || 'unnamed-form';
                const formAction = form.action || window.location.href;
                
                this.trackEvent('form-submit', {
                    form_name: formName,
                    form_action: formAction,
                    page_url: window.location.pathname
                });

                if (this.debug) {
                    console.log('Form submission tracked:', formName);
                }
            }
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        let scrollThresholds = [25, 50, 75, 90, 100];
        let trackedThresholds = new Set();

        const trackScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                scrollThresholds.forEach(threshold => {
                    if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                        trackedThresholds.add(threshold);
                        this.trackEvent('scroll-depth', {
                            depth: threshold,
                            page_url: window.location.pathname
                        });
                    }
                });
            }
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    trackScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    trackEngagementTime() {
        let startTime = Date.now();
        let isActive = true;
        let totalTime = 0;

        // Track when user becomes inactive
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        const resetTimer = () => {
            if (!isActive) {
                startTime = Date.now();
                isActive = true;
            }
        };

        events.forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });

        // Track when user becomes inactive (after 30 seconds)
        setInterval(() => {
            if (isActive && Date.now() - startTime > 30000) {
                isActive = false;
                totalTime += Date.now() - startTime;
            }
        }, 30000);

        // Track engagement on page unload
        window.addEventListener('beforeunload', () => {
            if (isActive) {
                totalTime += Date.now() - startTime;
            }
            
            if (totalTime > 10000) { // Only track if engaged for more than 10 seconds
                this.trackEvent('engagement-time', {
                    time_seconds: Math.round(totalTime / 1000),
                    page_url: window.location.pathname
                });
            }
        });
    }

    trackDownloads() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar'];
                const isDownload = downloadExtensions.some(ext => 
                    link.href.toLowerCase().includes(ext)
                );
                
                if (isDownload || link.download) {
                    const fileName = link.href.split('/').pop() || 'unknown-file';
                    this.trackEvent('file-download', {
                        file_name: fileName,
                        file_url: link.href,
                        page_url: window.location.pathname
                    });

                    if (this.debug) {
                        console.log('Download tracked:', fileName);
                    }
                }
            }
        });
    }

    trackPageView(url = null) {
        if (typeof window.umami !== 'undefined') {
            window.umami.track(url || window.location.pathname);
        }
    }

    trackEvent(eventName, eventData = {}) {
        if (typeof window.umami !== 'undefined') {
            window.umami.track(eventName, eventData);
        } else if (this.debug) {
            console.log('Umami not loaded, event would be:', eventName, eventData);
        }
    }

    // Manual tracking methods for specific use cases
    trackCustomEvent(name, data) {
        this.trackEvent(name, data);
    }

    trackConversion(value, currency = 'INR') {
        this.trackEvent('conversion', {
            value: value,
            currency: currency,
            page_url: window.location.pathname
        });
    }

    trackGoal(goalName, value = null) {
        const eventData = { goal: goalName, page_url: window.location.pathname };
        if (value !== null) {
            eventData.value = value;
        }
        
        this.trackEvent('goal-achieved', eventData);
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Configuration will be set via global variables in HTML
    if (typeof window.UMAMI_CONFIG !== 'undefined') {
        window.ugcAnalytics = new UGCAnalytics(window.UMAMI_CONFIG);
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UGCAnalytics;
}
