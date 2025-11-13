// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu if it doesn't exist
  if (!document.querySelector('.mobile-menu')) {
    const mobileMenuHTML = `
      <div class="mobile-menu-overlay"></div>
      <div class="mobile-menu">
        <div class="mobile-menu-header">
          <h3>Menu</h3>
          <button class="mobile-menu-close">&times;</button>
        </div>
        <div class="mobile-menu-nav">
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/services.html">Services</a></li>
            <li><a href="/creators.html">Creators</a></li>
            <li><a href="/blog.html">Blog</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/resources.html">Resources</a></li>
            <li><a href="/contact.html" class="active">Contact</a></li>
          </ul>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
  }

  // Add event listeners for mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuToggle && mobileMenu) {
    // Toggle menu when hamburger is clicked
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.toggle('active');
      }
      document.body.classList.toggle('menu-open');
    });

    // Close menu when X button is clicked
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
      });
    }

    // Close menu when overlay is clicked
    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
      }
    });
  }
});
