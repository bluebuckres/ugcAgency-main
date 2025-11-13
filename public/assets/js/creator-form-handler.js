/**
 * Creator Application Form Handler with Supabase Integration
 * Handles form submission, validation, and database insertion
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('creatorApplicationForm');
        const submitBtn = document.getElementById('submitBtn');
        const applicationSection = document.getElementById('applicationSection');
        const successMessage = document.getElementById('successMessage');

        if (!form) {
            console.error('Creator application form not found');
            return;
        }

        // Form submission handler
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Get Supabase client
            const client = window.getSupabaseClient();
            if (!client) {
                showError('कुछ गलत हो गया! Configuration error. Please contact support.');
                return;
            }

            // Show loading state
            setLoadingState(true);

            // Collect form data
            const formData = {
                full_name: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim() || null,
                city: document.getElementById('city').value.trim(),
                primary_platform: document.getElementById('platform').value,
                social_handle: document.getElementById('handle').value.trim() || null,
                content_experience: document.getElementById('experience').value.trim() || null,
                niches: document.getElementById('interests').value.trim(),
                instagram_url: document.getElementById('instagram_url').value.trim() || null,
                youtube_url: document.getElementById('youtube_url').value.trim() || null,
                portfolio_video_url: document.getElementById('portfolio_link').value.trim(),
                additional_links: document.getElementById('additional_links').value.trim() || null,
                submitted_at: new Date().toISOString()
            };

            try {
                // Use enhanced insert with retry logic
                const { data, error } = window.supabaseInsertWithRetry 
                    ? await window.supabaseInsertWithRetry('creator_applications', formData)
                    : await client.from('creator_applications').insert([formData]).select();

                if (error) {
                    throw error;
                }

                // Success! Show success message
                console.log('Application submitted successfully:', data);
                showSuccess();
                
                // Track event if analytics is available
                if (window.ugcAnalytics && typeof window.ugcAnalytics.trackEvent === 'function') {
                    window.ugcAnalytics.trackEvent('creator_application_submitted', {
                        platform: formData.primary_platform,
                        city: formData.city
                    });
                }

            } catch (error) {
                console.error('Error submitting application:', error);
                
                let errorMessage = getErrorMessage(error);
                showError(errorMessage);
            } finally {
                setLoadingState(false);
            }
        });

        // Enhanced error message function
        function getErrorMessage(error) {
            console.log('Error details:', error);
            
            // RLS Policy Error
            if (error.code === '42501' || error.message.includes('row-level security policy')) {
                return 'Database access issue detected. कृपया कुछ देर बाद try करें या हमसे contact करें।';
            }
            
            // Duplicate entry
            if (error.message.includes('duplicate') || error.code === '23505') {
                return 'आपने पहले ही apply किया है! You have already submitted an application with this email.';
            }
            
            // Network/Connection errors
            if (error.message.includes('network') || error.message.includes('fetch') || error.name === 'NetworkError') {
                return 'Internet connection issue. कृपया अपना connection check करें और फिर से try करें।';
            }
            
            // Authentication errors
            if (error.message.includes('401') || error.message.includes('unauthorized')) {
                return 'Authentication issue. कृपया page को refresh करें और फिर से try करें।';
            }
            
            // Validation errors
            if (error.message.includes('violates') || error.message.includes('constraint')) {
                return 'कुछ जानकारी गलत है। कृपया सभी fields को सही तरीके से भरें।';
            }
            
            // Generic error
            return 'कुछ गलत हो गया! Please try again or contact us directly at hello@makeugc.in';
        }

        // Helper Functions
        function setLoadingState(isLoading) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                `;
                form.classList.add('loading');
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Submit Application</span>
                    <div class="icon-wrapper size-xs" style="margin-left: 0.5rem;">
                        <i data-lucide="arrow-right"></i>
                    </div>
                `;
                form.classList.remove('loading');
                
                // Reinitialize Lucide icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }

        function showSuccess() {
            applicationSection.style.display = 'none';
            successMessage.classList.add('active');
            
            // Reinitialize Lucide icons for success message
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset form
            form.reset();
        }

        function showError(message) {
            // Create error notification
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-notification';
            errorDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
                z-index: 9999;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            `;
            errorDiv.innerHTML = `
                <div style="display: flex; align-items: start; gap: 0.75rem;">
                    <svg style="width: 24px; height: 24px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <strong style="display: block; margin-bottom: 0.25rem;">Error</strong>
                        <p style="margin: 0; font-size: 0.9rem;">${message}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(errorDiv);
            
            // Remove after 5 seconds
            setTimeout(() => {
                errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => errorDiv.remove(), 300);
            }, 5000);
        }
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();
