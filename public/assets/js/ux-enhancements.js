/* ===============================================
   UX Enhancement JavaScript
   Modern Interactions & Conversion Optimization
   =============================================== */

// ============ MOBILE MENU CONTROLLER ============
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    this.createMobileMenu();
    this.bindEvents();
  }

  createMobileMenu() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    // Create mobile menu HTML
    const mobileMenuHTML = `
      <div class="mobile-menu-overlay"></div>
      <div class="mobile-menu">
        <div class="flex items-center justify-between mb-8">
          <span class="text-xl font-bold">Menu</span>
          <button class="mobile-menu-close btn btn-ghost p-2">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <nav class="mobile-nav-links">
          <a href="index.html" class="mobile-nav-link">Home</a>
          <a href="services.html" class="mobile-nav-link">Services</a>
          <a href="creators.html" class="mobile-nav-link">Creators</a>
          <a href="blog.html" class="mobile-nav-link">Blog</a>
          <a href="about.html" class="mobile-nav-link">About</a>
          <a href="resources.html" class="mobile-nav-link">Resources</a>
          <a href="contact.html" class="mobile-nav-link btn btn-primary">Get Started</a>
        </nav>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
  }

  bindEvents() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-lucide="menu"]')) {
        this.openMenu();
      }
      if (e.target.closest('.mobile-menu-close') || e.target.closest('.mobile-menu-overlay')) {
        this.closeMenu();
      }
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  }

  openMenu() {
    document.querySelector('.mobile-menu').classList.add('open');
    document.querySelector('.mobile-menu-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    document.querySelector('.mobile-menu').classList.remove('open');
    document.querySelector('.mobile-menu-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ============ SCROLL ANIMATIONS ============
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.createObserver();
    this.animateCounters();
  }

  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Stagger child animations
          const children = entry.target.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, index * 100);
          });
        }
      });
    }, options);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      this.observer.observe(el);
    });
  }

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const start = performance.now();
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// ============ FORM ENHANCEMENTS ============
class FormEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceFormInputs();
    this.addFormValidation();
  }

  enhanceFormInputs() {
    document.querySelectorAll('.form-input').forEach(input => {
      // Add focus/blur effects
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        this.validateField(input);
      });

      // Real-time validation
      input.addEventListener('input', () => {
        this.validateField(input);
      });
    });
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;

    // Reset classes
    input.classList.remove('error', 'success');

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    // Phone validation
    if (input.name === 'phone' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      isValid = phoneRegex.test(value.replace(/\s/g, ''));
    }

    // Required field validation
    if (input.required && !value) {
      isValid = false;
    }

    // Apply validation classes
    if (value) {
      input.classList.add(isValid ? 'success' : 'error');
    }

    return isValid;
  }

  addFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        const inputs = form.querySelectorAll('.form-input[required]');
        
        inputs.forEach(input => {
          if (!this.validateField(input)) {
            isFormValid = false;
          }
        });

        if (isFormValid) {
          this.submitForm(form);
        } else {
          this.showFormError('Please fill in all required fields correctly.');
        }
      });
    });
  }

  submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = `
      <div class="loading-spinner"></div>
      Submitting...
    `;
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showSuccessMessage('Thank you! We\'ll get back to you within 24 hours.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  showFormError(message) {
    this.showNotification(message, 'error');
  }

  showSuccessMessage(message) {
    this.showNotification(message, 'success');
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// ============ CTA OPTIMIZATION ============
class CTAOptimization {
  constructor() {
    this.init();
  }

  init() {
    this.addUrgencyIndicators();
    this.trackCTAClicks();
    this.addSocialProof();
  }

  addUrgencyIndicators() {
    // Add urgency to primary CTAs
    document.querySelectorAll('.btn-cta').forEach(btn => {
      const urgencyTexts = [
        '🔥 Limited Time',
        '⚡ Book Today',
        '🎯 Get Results Fast'
      ];
      
      const urgencyText = urgencyTexts[Math.floor(Math.random() * urgencyTexts.length)];
      const urgencyBadge = document.createElement('span');
      urgencyBadge.className = 'urgency-badge';
      urgencyBadge.textContent = urgencyText;
      
      btn.insertAdjacentElement('beforebegin', urgencyBadge);
    });
  }

  trackCTAClicks() {
    document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_click', {
            'cta_text': btn.textContent.trim(),
            'cta_location': this.getCTALocation(btn)
          });
        }

        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      });
    });
  }

  getCTALocation(btn) {
    const section = btn.closest('section');
    if (section) {
      return section.className.includes('hero') ? 'hero' : 
             section.className.includes('footer') ? 'footer' : 'content';
    }
    return 'unknown';
  }

  addSocialProof() {
    // Show recent activity notifications
    const proofMessages = [
      '🎉 Sarah just booked a strategy call!',
      '✅ TechBrand increased ROI by 250%',
      '🚀 5 new creators joined today',
      '💰 ₹50K revenue generated this week'
    ];

    let currentIndex = 0;
    
    const showProof = () => {
      const message = proofMessages[currentIndex];
      const notification = document.createElement('div');
      notification.className = 'social-proof';
      notification.innerHTML = `
        <i data-lucide="users" class="w-4 h-4"></i>
        ${message}
      `;
      
      document.body.appendChild(notification);
      
      // Position notification
      notification.style.position = 'fixed';
      notification.style.bottom = '100px';
      notification.style.left = '20px';
      notification.style.zIndex = '1000';
      
      // Remove after 4 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
      }, 4000);
      
      currentIndex = (currentIndex + 1) % proofMessages.length;
    };

    // Show social proof every 15 seconds
    setInterval(showProof, 15000);
    
    // Show first one after 5 seconds
    setTimeout(showProof, 5000);
  }
}

// ============ PERFORMANCE MONITORING ============
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    this.monitorPageLoad();
    this.monitorUserEngagement();
  }

  monitorPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
      
      // Track Core Web Vitals
      this.trackCoreWebVitals();
    });
  }

  trackCoreWebVitals() {
    // Largest Contentful Paint
    if ('web-vital' in window) {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcp = entries[entries.length - 1];
        console.log('LCP:', lcp.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  monitorUserEngagement() {
    let scrollDepth = 0;
    let timeOnPage = Date.now();
    
    window.addEventListener('scroll', () => {
      const currentScroll = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
      scrollDepth = Math.max(scrollDepth, currentScroll);
    });
    
    window.addEventListener('beforeunload', () => {
      const engagement = {
        timeOnPage: Date.now() - timeOnPage,
        scrollDepth: Math.round(scrollDepth),
        interactions: this.interactionCount || 0
      };
      
      // Send to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'user_engagement', engagement);
      }
    });
  }
}

// ============ ACCESSIBILITY ENHANCEMENTS ============
class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceKeyboardNavigation();
    this.addSkipLinks();
    this.improveScreenReaderSupport();
  }

  enhanceKeyboardNavigation() {
    // Focus management for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.manageFocus(e);
      }
    });

    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only';
    
    document.body.insertAdjacentElement('afterbegin', skipLink);
  }

  improveScreenReaderSupport() {
    // Add proper ARIA labels
    document.querySelectorAll('button[data-lucide]').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        const icon = btn.getAttribute('data-lucide');
        btn.setAttribute('aria-label', `${icon} button`);
      }
    });

    // Announce dynamic content changes
    this.createLiveRegion();
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    
    document.body.appendChild(liveRegion);
  }

  announce(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all enhancements
  new MobileMenu();
  new ScrollAnimations();
  new FormEnhancements();
  new CTAOptimization();
  new PerformanceMonitor();
  new AccessibilityEnhancements();

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Add reveal-on-scroll class to elements
  document.querySelectorAll('.card, .stat-card, .section-header').forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  console.log('🎉 UX Enhancements initialized successfully!');
});

// ============ UTILITY FUNCTIONS ============
// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
