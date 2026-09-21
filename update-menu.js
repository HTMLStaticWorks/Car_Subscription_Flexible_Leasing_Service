const fs = require('fs');
const glob = require('fs').readdirSync('.');

const htmlFiles = glob.filter(f => f.endsWith('.html') && f !== 'dashboard.html');

const newMenu = `  <div class="mobile-menu" id="mobile-menu">
    <button class="icon-btn" id="close-menu" style="position:absolute; top:2rem; right:2rem;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <ul class="nav-links">
        <li class="nav-dropdown">
          <a href="#" class="nav-link" style="display: inline-flex; align-items: center; gap: 0.25rem;">Home <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="dropdown-menu">
            <a href="index.html" class="dropdown-item">Home 1</a>
            <a href="home-2.html" class="dropdown-item">Home 2</a>
          </div>
        </li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="services.html" class="nav-link">Services</a></li>
        <li><a href="fleet.html" class="nav-link">Fleet</a></li>
        <li><a href="pricing.html" class="nav-link">Pricing</a></li>
        <li><a href="how-it-works.html" class="nav-link">How It Works</a></li>
        <li><a href="locations.html" class="nav-link">Locations</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
        <li><a href="dashboard.html" class="nav-link">Dashboard</a></li>
    </ul>
    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; margin-bottom: 2rem; width: 100%;">
      <button id="theme-toggle-mob" class="icon-btn" aria-label="Toggle Theme">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
      </button>
      <button id="rtl-toggle-mob" class="icon-btn" aria-label="Toggle RTL">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 9H3m14-4l4 4-4 4M3 15h18M7 11l-4 4 4 4"/></svg>
      </button>
    </div>
    <a href="login.html" class="btn btn-primary btn-full">Login</a>
  </div>`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find <div class="mobile-menu" id="mobile-menu"> up to </div> followed by <div class="overlay"
  const regex = /<div class="mobile-menu" id="mobile-menu">[\s\S]*?<\/div>\s*<div class="overlay" id="overlay">/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, newMenu + '\n  <div class="overlay" id="overlay">');
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  } else {
    console.log('Pattern not found in ' + file);
  }
}
