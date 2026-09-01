// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const expanded = mainNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ---------- Mark active nav link ----------
(function markActive(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// ---------- Catalog filters (products.html) ----------
const chips = document.querySelectorAll('.filter-chip');
const catCards = document.querySelectorAll('.cat-card');
if (chips.length && catCards.length) {
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.filter;
      catCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---------- Contact form (contact.html) ----------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const status = document.getElementById('form-status');
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();

    if (!name || !email) {
      status.textContent = 'Please fill in your name and email so we can get back to you.';
      status.classList.add('show');
      return;
    }

    // Builds a pre-filled email since this static site has no backend yet.
    const subject = encodeURIComponent('Enquiry from Prachaar Traders website');
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${document.getElementById('cf-phone').value.trim()}`,
      `Product interest: ${document.getElementById('cf-product').value}`,
      `Quantity: ${document.getElementById('cf-qty').value.trim()}`,
      '',
      document.getElementById('cf-message').value.trim()
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:prachaartraders@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email app to send this enquiry to prachaartraders@gmail.com...';
    status.classList.add('show');
    contactForm.reset();
  });
}

// ---------- Footer year ----------
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
