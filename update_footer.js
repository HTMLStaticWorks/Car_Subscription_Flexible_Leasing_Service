const fs = require('fs');
const path = require('path');

const dir = 'd:/September websites/Car Subscription & Flexible Leasing Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newFooter = `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/brand-mark.svg" alt="ORVEXA">
          <p>The premium car subscription service designed for modern flexibility. Drive more, commit less.</p>
          <div class="social-links">
            <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" aria-label="X (Twitter)"><svg width="18" height="18" viewBox="-1.5 -1.5 27 27" fill="currentColor" stroke="none"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Company</h4>
          <div class="footer-links">
            <a href="about.html">About Us</a>
            <a href="how-it-works.html">How It Works</a>
            <a href="locations.html">Locations</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Services</h4>
          <div class="footer-links">
            <a href="fleet.html">Our Fleet</a>
            <a href="pricing.html">Pricing Plans</a>
            <a href="services.html">Maintenance</a>
            <a href="dashboard.html">Subscriber Portal</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Legal</h4>
          <div class="footer-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ORVEXA Mobility. All rights reserved.</p>
        <p>Designed for Flexibility.</p>
      </div>
    </div>
    
    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" class="scroll-to-top" aria-label="Scroll to top">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  </footer>`;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (content.includes('<footer class="footer">')) {
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, newFooter);
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
  }
});
console.log("Updated footers");
