document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (currentTheme == 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // RTL Management
  const rtlToggle = document.getElementById('rtl-toggle');
  const currentDir = localStorage.getItem('dir');
  if (currentDir == 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  if(rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      if (dir === 'rtl') {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  }

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
