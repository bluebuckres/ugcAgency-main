/**
 * Contact Form Handler with Supabase Integration
 * Handles business inquiry form submission, validation, and database insertion
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form[name="contact"]');
        
        if (!form) {
            console.error('Contact form not found');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;

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
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const companyInput = form.querySelector('input[name="company"]');
            const budgetInput = form.querySelector('select[name="budget"]');
            const messageInput = form.querySelector('textarea[name="message"]');
            const contactTypeInput = form.querySelector('input[name="contact_type"]');
            
            // Collect selected services (checkboxes)
            const servicesCheckboxes = form.querySelectorAll('input[name="services"]:checked');
            const selectedServices = Array.from(servicesCheckboxes).map(cb => cb.value);

            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                company: companyInput.value.trim() || null,
                budget_range: budgetInput.value || null,
                services: selectedServices.length > 0 ? selectedServices : null,
                message: messageInput.value.trim(),
                contact_type: contactTypeInput.value || null,
                submitted_at: new Date().toISOString()
            };

            try {
                // Insert data into Supabase
                const { data, error } = await client
                    .from('contact_inquiries')
                    .insert([formData])
                    .select();

                if (error) {
                    throw error;
                }

                // Success! Show success message
                console.log('Contact inquiry submitted successfully:', data);
                showSuccess();
                
                // Track event if analytics is available
                if (window.ugcAnalytics && typeof window.ugcAnalytics.trackEvent === 'function') {
                    window.ugcAnalytics.trackEvent('contact_form_submitted', {
                        contact_type: formData.contact_type,
                        services_count: selectedServices.length
                    });
                }

                // Reset form after short delay
                setTimeout(() => {
                    form.reset();
                    document.getElementById('selected-type-display')?.classList.add('hidden');
                    document.querySelectorAll('.contact-type-card').forEach(card => {
                        card.classList.remove('ring-4', 'ring-sage/30', 'bg-sage/5');
                    });
                }, 1500);

            } catch (error) {
                console.error('Error submitting contact form:', error);
                
                let errorMessage = 'कुछ गलत हो गया! Please try again or contact us directly at contact@makeugc.in';
                
                if (error.message.includes('network')) {
                    errorMessage = 'Internet connection issue. कृपया अपना connection check करें।';
                } else if (error.message.includes('duplicate')) {
                    errorMessage = 'You have already submitted a similar inquiry recently. We will get back to you soon!';
                }
                
                showError(errorMessage);
            } finally {
                setLoadingState(false);
            }
        });

        // Helper Functions
        function setLoadingState(isLoading) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                `;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                
                // Reinitialize Lucide icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }

        function showSuccess() {
            // Create success notification
            const successDiv = document.createElement('div');
            successDiv.className = 'success-notification';
            successDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #9CAF88 0%, #7A8471 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(156, 175, 136, 0.4);
                z-index: 9999;
                max-width: 450px;
                animation: slideInRight 0.4s ease-out;
            `;
            successDiv.innerHTML = `
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg style="width: 28px; height: 28px; color: #9CAF88;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div>
                        <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Message Sent Successfully! 🎉</strong>
                        <p style="margin: 0; font-size: 0.95rem; opacity: 0.95;">Thank you for reaching out! We'll respond within 4 hours on business days.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(successDiv);
            
            // Remove after 6 seconds
            setTimeout(() => {
                successDiv.style.animation = 'slideOutRight 0.4s ease-out';
                setTimeout(() => successDiv.remove(), 400);
            }, 6000);
        }

        function showError(message) {
            // Create error notification
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-notification';
            errorDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(239, 68, 68, 0.4);
                z-index: 9999;
                max-width: 450px;
                animation: slideInRight 0.4s ease-out;
            `;
            errorDiv.innerHTML = `
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg style="width: 28px; height: 28px; color: #ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Oops! Something went wrong</strong>
                        <p style="margin: 0; font-size: 0.95rem; opacity: 0.95;">${message}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(errorDiv);
            
            // Remove after 7 seconds
            setTimeout(() => {
                errorDiv.style.animation = 'slideOutRight 0.4s ease-out';
                setTimeout(() => errorDiv.remove(), 400);
            }, 7000);
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
