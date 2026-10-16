document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMob = document.getElementById('theme-toggle-mob');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const updateLogos = (theme) => {
    const isDark = theme === 'dark';
    const logos = document.querySelectorAll('.brand-logo-img, .nav-logo img, .footer-brand img, .sidebar-header img, img[src*="website-logo"], img[src*="brand-mark"]');
    logos.forEach(img => {
      img.src = isDark ? 'assets/images/website-logo-dark.png' : 'assets/images/website-logo.png';
    });
  };
  
  let currentTheme = localStorage.getItem('theme');
  if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateLogos(currentTheme);

  const toggleTheme = () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateLogos(nextTheme);
  };

  if(themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if(themeToggleMob) themeToggleMob.addEventListener('click', toggleTheme);

  // RTL Management
  const rtlToggle = document.getElementById('rtl-toggle');
  const rtlToggleMob = document.getElementById('rtl-toggle-mob');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);

  const toggleRtl = () => {
    let dir = document.documentElement.getAttribute('dir');
    let nextDir = dir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem('dir', nextDir);
  };

  if(rtlToggle) rtlToggle.addEventListener('click', toggleRtl);
  if(rtlToggleMob) rtlToggleMob.addEventListener('click', toggleRtl);

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const closeMenuBtn = document.getElementById('close-menu');

  const openMenu = () => {
    if(mobileMenu && overlay) {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    if(mobileMenu && overlay) {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if(hamburger) hamburger.addEventListener('click', openMenu);
  if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if(overlay) overlay.addEventListener('click', closeMenu);
  
  // Close menu on link click
  const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown && link.getAttribute('href') === '#') {
        e.preventDefault();
        dropdown.classList.toggle('active');
      } else {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
  });

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up');
  animatedElements.forEach(el => observer.observe(el));

  // Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fleet Slider
  const fleetScroll = document.querySelector('.fleet-scroll');
  const btnPrev = document.getElementById('fleet-prev');
  const btnNext = document.getElementById('fleet-next');

  if (fleetScroll && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      const cardWidth = fleetScroll.querySelector('.fleet-card').offsetWidth;
      fleetScroll.scrollBy({ left: -(cardWidth + 32) * 3, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      const cardWidth = fleetScroll.querySelector('.fleet-card').offsetWidth;
      fleetScroll.scrollBy({ left: (cardWidth + 32) * 3, behavior: 'smooth' });
    });
  }
});
