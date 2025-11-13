// Mobile Menu Debug Script
console.log('Mobile Menu Debug Script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Check if mobile menu elements exist
  const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  
  console.log('Mobile Menu Toggle exists:', !!mobileMenuToggle);
  console.log('Mobile Menu exists:', !!mobileMenu);
  console.log('Mobile Menu Overlay exists:', !!mobileMenuOverlay);
  console.log('Mobile Menu Close exists:', !!mobileMenuClose);
  
  if (mobileMenuToggle) {
    console.log('Adding click event listener to mobile menu toggle');
    
    // Add a more direct click handler for debugging
    mobileMenuToggle.addEventListener('click', function(e) {
      console.log('Mobile menu toggle clicked');
      e.stopPropagation(); // Prevent event bubbling
      
      // If mobile menu doesn't exist, create it
      if (!document.querySelector('.mobile-menu')) {
        console.log('Creating mobile menu');
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
                <li><a href="/contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
        
        // Get the newly created elements
        const newMobileMenu = document.querySelector('.mobile-menu');
        const newMobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const newMobileMenuClose = document.querySelector('.mobile-menu-close');
        
        // Toggle menu
        if (newMobileMenu) {
          console.log('Toggling newly created mobile menu');
          newMobileMenu.classList.add('active');
          if (newMobileMenuOverlay) {
            newMobileMenuOverlay.classList.add('active');
          }
          document.body.classList.add('menu-open');
          
          // Add close handlers
          if (newMobileMenuClose) {
            newMobileMenuClose.addEventListener('click', function() {
              console.log('Close button clicked');
              newMobileMenu.classList.remove('active');
              if (newMobileMenuOverlay) {
                newMobileMenuOverlay.classList.remove('active');
              }
              document.body.classList.remove('menu-open');
            });
          }
          
          if (newMobileMenuOverlay) {
            newMobileMenuOverlay.addEventListener('click', function() {
              console.log('Overlay clicked');
              newMobileMenu.classList.remove('active');
              newMobileMenuOverlay.classList.remove('active');
              document.body.classList.remove('menu-open');
            });
          }
        }
      } else {
        // Toggle existing menu
        const existingMenu = document.querySelector('.mobile-menu');
        const existingOverlay = document.querySelector('.mobile-menu-overlay');
        
        console.log('Toggling existing mobile menu');
        existingMenu.classList.toggle('active');
        if (existingOverlay) {
          existingOverlay.classList.toggle('active');
        }
        document.body.classList.toggle('menu-open');
      }
    });
  }
  
  // Log any click on the document for debugging
  document.addEventListener('click', function(e) {
    console.log('Document clicked:', e.target);
  });
});
