document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const revealItems = document.querySelectorAll('.reveal');
  const year = document.getElementById('year');
  const form = document.getElementById('whatsappForm');

  if (year) year.textContent = new Date().getFullYear();

  const setHeaderState = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  navToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));

  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !message) return;

    const text = [
      'السلام عليكم، لدي استفسار عبر موقع شركة ملكة الغذاء:',
      '',
      `الاسم: ${name}`,
      `رقم الهاتف: ${phone}`,
      email ? `البريد الإلكتروني: ${email}` : null,
      `الرسالة: ${message}`
    ].filter(Boolean).join('\n');

    const whatsappNumber = '218915281462';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
