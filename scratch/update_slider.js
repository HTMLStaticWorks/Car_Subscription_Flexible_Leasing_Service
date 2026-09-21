const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(file, 'utf8');

// 1. Update CSS for fleet-card and fleet-scroll
const oldCSS = `      .fleet-scroll {
        display: flex;
        gap: 2rem;
        overflow-x: auto;
        padding: 2rem 0;
        scrollbar-width: none; /* Firefox */
      }
      .fleet-scroll::-webkit-scrollbar { display: none; } /* Chrome */
      .fleet-card {
        flex: 0 0 350px;
        background: var(--color-surface);`;

const newCSS = `      .fleet-scroll {
        display: flex;
        gap: 2rem;
        overflow-x: auto;
        padding: 2rem 0;
        scrollbar-width: none; /* Firefox */
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
      }
      .fleet-scroll::-webkit-scrollbar { display: none; } /* Chrome */
      .fleet-card {
        flex: 0 0 calc((100% - 4rem) / 3);
        scroll-snap-align: start;
        background: var(--color-surface);`;

content = content.replace(oldCSS, newCSS);

// Add media query for fleet-card if not exists
const mediaQueryInsert = `      .flex-center h2 { font-size: 2.5rem; }`;
if (content.includes(mediaQueryInsert)) {
    content = content.replace(mediaQueryInsert, `      .fleet-card { flex: 0 0 calc((100% - 2rem) / 2); }\n      .flex-center h2 { font-size: 2.5rem; }`);
}
// and for mobile
const mediaQueryMobile = `      .stats-layout { grid-template-columns: 1fr; }`;
if (content.includes(mediaQueryMobile)) {
    content = content.replace(mediaQueryMobile, `      .fleet-card { flex: 0 0 100%; }\n      .stats-layout { grid-template-columns: 1fr; }`);
}

// 2. Update the HTML to add the arrows and 6th card
const oldHeader = `      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3rem;" class="fade-up">
        <div>
          <span class="eyebrow">Our Vehicles</span>
          <h2 class="heading-lg">Featured Fleet</h2>
        </div>
        <a href="fleet.html" class="btn btn-secondary">View All Vehicles</a>
      </div>`;

const newHeader = `      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3rem;" class="fade-up">
        <div>
          <span class="eyebrow">Our Vehicles</span>
          <h2 class="heading-lg">Featured Fleet</h2>
        </div>
        <div style="display:flex; align-items:center; gap: 1rem;">
          <div class="slider-arrows" style="display:flex; gap: 0.5rem;">
            <button id="fleet-prev" class="icon-btn" aria-label="Previous" style="border:1px solid var(--color-border); background:var(--color-surface); width:40px; height:40px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
            <button id="fleet-next" class="icon-btn" aria-label="Next" style="border:1px solid var(--color-border); background:var(--color-surface); width:40px; height:40px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
          </div>
          <a href="fleet.html" class="btn btn-secondary">View All Vehicles</a>
        </div>
      </div>`;

content = content.replace(oldHeader, newHeader);

const vehicle6 = `        <!-- Vehicle 6 -->
        <div class="fleet-card">
          <div class="fleet-img">
            <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop" alt="Luxury Coupe">
          </div>
          <div class="fleet-info">
            <div style="color:var(--color-text-muted); font-size:0.875rem; margin-bottom:0.25rem;">Luxury Coupe</div>
            <div class="fleet-title">Mercedes C-Class</div>
            <div class="fleet-price">$949<span style="font-size:1rem; font-weight:400; color:var(--color-text-muted)">/mo</span></div>
            <div class="spec-row">
              <span>Automatic</span>
              <span>Gasoline</span>
              <span>1,200 mi/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

// Replace the end of the fleet scroll with the 6th card
content = content.replace(`        </div>
      </div>
    </div>
  </section>`, vehicle6);

// 3. Add Javascript
const jsInsert = `  <script>
    // Theme Toggle`;
const newJs = `  <script>
    // Fleet Slider
    const fleetScroll = document.querySelector('.fleet-scroll');
    const btnPrev = document.getElementById('fleet-prev');
    const btnNext = document.getElementById('fleet-next');

    if (fleetScroll && btnPrev && btnNext) {
      btnPrev.addEventListener('click', () => {
        // Calculate the width of one card + gap (2rem = 32px)
        const cardWidth = fleetScroll.querySelector('.fleet-card').offsetWidth;
        fleetScroll.scrollBy({ left: -(cardWidth + 32) * 3, behavior: 'smooth' });
      });
      btnNext.addEventListener('click', () => {
        const cardWidth = fleetScroll.querySelector('.fleet-card').offsetWidth;
        fleetScroll.scrollBy({ left: (cardWidth + 32) * 3, behavior: 'smooth' });
      });
    }

    // Theme Toggle`;

content = content.replace(jsInsert, newJs);

fs.writeFileSync(file, content);
console.log('Successfully updated index.html slider logic');
