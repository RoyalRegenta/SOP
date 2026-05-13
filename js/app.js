/**
 * Main Application Logic
 * SOP Portal - Royal Orchid & Regenta Hotels
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Intersection Observer for scroll animations
  initScrollAnimations();

  // Initialize change password modal
  initChangePasswordModal();

  // Initialize logout
  initLogout();
}

/**
 * Scroll-triggered animations using IntersectionObserver
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Change Password Modal
 */
function initChangePasswordModal() {
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const modal = document.getElementById('changePasswordModal');
  const closeBtn = modal?.querySelector('.modal-close');
  const cancelBtn = modal?.querySelector('.btn-cancel');
  const form = modal?.querySelector('form');

  if (changePasswordBtn && modal) {
    changePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });

    const closeModal = () => modal.classList.remove('active');

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Password changed successfully!', 'success');
      closeModal();
      form.reset();
    });
  }
}

/**
 * Logout functionality
 */
function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('sop_auth');
        showToast('Logged out successfully', 'success');
        // Redirect to login page if exists
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 500);
      }
    });
  }
}

/**
 * Toast notification system
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <span style="font-size: 1.2em; font-weight: bold;">${icons[type] || icons.info}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add fadeOut animation dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeOut {
    to { opacity: 0; transform: translateX(20px); }
  }
`;
document.head.appendChild(styleSheet);
