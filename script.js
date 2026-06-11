const sharedHeader = `
  <header>
    <div class="navbar">
      <a class="brand" href="index.html">Responsive Brand</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation menu">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <nav id="primary-navigation" class="nav-links" aria-label="Primary navigation">
        <a href="index.html">Home</a>
        <a href="about.html">About / Features</a>
        <a href="services.html">Services / Products</a>
        <a href="contact.html">Contact / FAQ</a>
      </nav>
    </div>
  </header>
`;

const sharedFooter = `
  <footer>
    <div class="footer-content">
      <p>© 2026 Responsive Business. All rights reserved.</p>
      <nav aria-label="Footer links">
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </footer>
`;

const sharedModal = `
  <div class="modal-backdrop" hidden>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <h2 id="modal-title">Request a quote</h2>
        <button class="modal-close" aria-label="Close modal">×</button>
      </div>
      <div class="modal-body">
        <p>Tell us about your project and we will get back to you within one business day.</p>
        <form class="modal-form">
          <div class="form-row">
            <label class="form-label" for="modal-name">Name</label>
            <input class="form-control" type="text" id="modal-name" name="name" placeholder="Your name" required>
          </div>
          <div class="form-row">
            <label class="form-label" for="modal-email">Email</label>
            <input class="form-control" type="email" id="modal-email" name="email" placeholder="you@example.com" required>
          </div>
          <div class="form-row">
            <label class="form-label" for="modal-message">Message</label>
            <textarea class="form-control" id="modal-message" name="message" rows="4" placeholder="What would you like to build?"></textarea>
          </div>
          <div class="hero-actions">
            <button class="btn btn-primary" type="submit">Send request</button>
            <button class="btn btn-secondary" type="button" data-cancel-modal>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function toggleNavigation() {
  const nav = document.querySelector('.nav-links');
  const button = document.querySelector('.nav-toggle');
  if (!nav || !button) return;

  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
}

function closeNavigation() {
  const nav = document.querySelector('.nav-links');
  const button = document.querySelector('.nav-toggle');
  if (!nav || !button) return;

  button.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}

function openModal() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;
  backdrop.hidden = false;
  document.body.classList.add('no-scroll');
}

function closeModal() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;
  backdrop.hidden = true;
  document.body.classList.remove('no-scroll');
}

function setupModal() {
  const openers = document.querySelectorAll('[data-open-modal]');
  const closeButton = document.querySelector('.modal-close');
  const backdrop = document.querySelector('.modal-backdrop');

  openers.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  document.querySelectorAll('[data-cancel-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  }

  // Allow closing modal with the Escape key for better accessibility
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function setupAlerts() {
  document.querySelectorAll('.alert-close').forEach((button) => {
    button.addEventListener('click', () => {
      const alert = button.closest('.alert');
      if (alert) {
        alert.remove();
      }
    });
  });
}

function setupAccordion() {
  document.querySelectorAll('.accordion-button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      item.classList.toggle('open', !expanded);
    });
  });
}

function injectLayout() {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  if (headerContainer) {
    headerContainer.innerHTML = sharedHeader;
  }
  if (footerContainer) {
    footerContainer.innerHTML = sharedFooter;
  }

  if (!document.querySelector('.modal-backdrop')) {
    document.body.insertAdjacentHTML('beforeend', sharedModal);
  }

  setActiveLink();
  setupAlerts();
  setupAccordion();
  setupModal();

  const toggleButton = document.querySelector('.nav-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleNavigation);
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectLayout);
} else {
  injectLayout();
}
