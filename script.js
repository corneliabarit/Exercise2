const sharedHeader = `
  <header>
    <div class="navbar">
      <a class="brand" href="index.html">Responsive Brand</a>
      <nav class="nav-links" aria-label="Primary navigation">
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

function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
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
  setActiveLink();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectLayout);
} else {
  injectLayout();
}
