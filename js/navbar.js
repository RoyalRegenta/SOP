/**
 * Navigation Bar - Dropdown & Mobile Menu Logic
 * SOP Portal - Royal Orchid & Regenta Hotels
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  highlightActivePage();
});

function initNavbar() {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navContainer = document.getElementById('navContainer');

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener('click', () => {
      navContainer.classList.toggle('open');
      const icon = mobileToggle.querySelector('.hamburger-icon');
      if (icon) {
        icon.textContent = navContainer.classList.contains('open') ? '✕' : '☰';
      }
    });
  }

  // Dropdown handling
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');

    // Click toggle for mobile
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const wasOpen = item.classList.contains('open');

        // Close all other dropdowns
        dropdownItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });

        item.classList.toggle('open', !wasOpen);
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      dropdownItems.forEach(item => item.classList.remove('open'));
    }
  });

  // Close mobile menu on link click (non-dropdown)
  document.querySelectorAll('.nav-link:not(.has-dropdown .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
      if (navContainer) navContainer.classList.remove('open');
    });
  });

  // Keyboard accessibility
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        item.classList.remove('open');
      }
    });
  });
}

function highlightActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', ''))) {
      link.classList.add('active');
    }
  });

  // Default: highlight Home if on index
  if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
    const homeLink = document.querySelector('.nav-link[href="index.html"], .nav-link[href="./index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
}
