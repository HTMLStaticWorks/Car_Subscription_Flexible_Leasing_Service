document.addEventListener('DOMContentLoaded', () => {
  // Mileage Progress Animation
  const mileageFill = document.getElementById('mileageFill');
  if (mileageFill) {
    setTimeout(() => {
      mileageFill.style.width = '75%'; // Example progress
    }, 500);
  }

  // Dashboard Tabs (Demo functionality)
  const navItems = document.querySelectorAll('.dash-nav-item');
  const sections = document.querySelectorAll('.dash-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = item.getAttribute('href').substring(1);
      if(targetId === 'logout') {
        openModal('logoutModal');
        return;
      }
      
      // Update active nav
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update active section
      sections.forEach(sec => {
        sec.classList.remove('active');
        if(sec.id === targetId) sec.classList.add('active');
      });

      // Close sidebar automatically on mobile/tablet view
      const sidebar = document.getElementById('dashSidebar');
      if(sidebar) sidebar.classList.remove('open');
    });
  });

  // Modal Logic
  window.openModal = (id) => {
    const modal = document.getElementById(id);
    if(modal) modal.classList.add('active');
  };

  window.closeModal = (id) => {
    const modal = document.getElementById(id);
    if(modal) modal.classList.remove('active');
  };

  // Close modals on outside click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if(e.target === this) {
        this.classList.remove('active');
      }
    });
  });
  
  // Specific Actions
  const btnSwap = document.getElementById('btnConfirmSwap');
  if(btnSwap) {
    btnSwap.addEventListener('click', () => {
      closeModal('swapModal');
      alert("Swap requested successfully! We will contact you to arrange delivery.");
    });
  }

  const btnMaint = document.getElementById('btnScheduleMaint');
  if(btnMaint) {
    btnMaint.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('maintModal');
    });
  }
});
