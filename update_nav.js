const fs = require('fs');
const path = require('path');

const dir = 'd:/September websites/Car Subscription & Flexible Leasing Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldRtlIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 12l6-6M3 12l6 6"/></svg>';
const newRtlIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 9H3m14-4l4 4-4 4M3 15h18M7 11l-4 4 4 4"/></svg>';

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Replace RTL icon in all places (header, mobile, dashboard sidebar)
  content = content.replace(new RegExp(oldRtlIcon.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newRtlIcon);

  // If it's a page with the main navbar
  if (content.includes('<nav class="navbar">')) {
    
    // Replace .nav-actions block
    const navActionsRegex = /<div class="nav-actions">([\s\S]*?)<\/div>/;
    const newNavActions = `<div class="nav-actions">
        <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        </button>
        <button id="rtl-toggle" class="icon-btn" aria-label="Toggle RTL">
          ${newRtlIcon}
        </button>
        <a href="login.html" class="btn btn-primary">Login</a>
      </div>`;
    content = content.replace(navActionsRegex, newNavActions);

    // Replace desktop nav-links
    const getActive = (page) => file === page ? ' active' : '';
    const isHomeActive = (file === 'index.html' || file === 'home-2.html') ? ' active' : '';
    const newNavLinks = `<ul class="nav-links">
        <li class="nav-dropdown">
          <a href="#" class="nav-link${isHomeActive}" style="display: inline-flex; align-items: center; gap: 0.25rem;">Home <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="dropdown-menu">
            <a href="index.html" class="dropdown-item${getActive('index.html')}">Home 1</a>
            <a href="home-2.html" class="dropdown-item${getActive('home-2.html')}">Home 2</a>
          </div>
        </li>
        <li><a href="about.html" class="nav-link${getActive('about.html')}">About</a></li>
        <li><a href="services.html" class="nav-link${getActive('services.html')}">Services</a></li>
        <li><a href="fleet.html" class="nav-link${getActive('fleet.html')}">Fleet</a></li>
        <li><a href="pricing.html" class="nav-link${getActive('pricing.html')}">Pricing</a></li>
        <li><a href="how-it-works.html" class="nav-link${getActive('how-it-works.html')}">How It Works</a></li>
        <li><a href="locations.html" class="nav-link${getActive('locations.html')}">Locations</a></li>
        <li><a href="contact.html" class="nav-link${getActive('contact.html')}">Contact</a></li>
        <li><a href="dashboard.html" class="nav-link${getActive('dashboard.html')}">Dashboard</a></li>
      </ul>`;

    // Replace the first <ul class="nav-links">...</ul> (which is the main navbar)
    content = content.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, newNavLinks);

    // Replace the second <ul class="nav-links">...</ul> (which is the mobile menu) if it exists
    const mobileLinksMatch = content.match(/<ul class="nav-links">[\s\S]*?<\/ul>/g);
    if (mobileLinksMatch && mobileLinksMatch.length > 1) {
       // Just replace the second match using indexOf
       let firstIndex = content.indexOf('<ul class="nav-links">');
       let secondIndex = content.indexOf('<ul class="nav-links">', firstIndex + 1);
       if (secondIndex !== -1) {
         let endSecondIndex = content.indexOf('</ul>', secondIndex) + 5;
         content = content.substring(0, secondIndex) + newNavLinks + content.substring(endSecondIndex);
       }
    }

    // Remove the extra "Get Started" button in mobile menu if it exists
    content = content.replace(/<a href="register.html" class="btn btn-primary btn-full"[^>]*>Get Started<\/a>/, '<a href="login.html" class="btn btn-primary btn-full" style="margin-top: 2rem;">Login</a>');

  }

  // Handle specific dashboard logo size adjustment if needed
  if (file === 'dashboard.html') {
    // The user wanted to reduce logo size. In dashboard, it's <div class="sidebar-header"> <img src="..." style="height: 32px">
    // Actually the css is `.sidebar-header img { height: 32px; }`. I'll update it directly in the file.
    content = content.replace('.sidebar-header img { height: 32px; }', '.sidebar-header img { height: 24px; }');
  }

  // Save the file
  fs.writeFileSync(path.join(dir, file), content, 'utf8');
});

console.log("Updated HTML files.");
