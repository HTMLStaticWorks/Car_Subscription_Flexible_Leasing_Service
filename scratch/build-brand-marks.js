const fs = require('fs');

// Read the vector paths of the emblem from scratch/website-logo-vector.svg
let emblemRaw = fs.readFileSync('scratch/website-logo-vector.svg', 'utf8');

// Strip outer <svg ...> and </svg>
let innerPaths = emblemRaw
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>/, '')
  .trim();

// Remove white background rectangle if present
innerPaths = innerPaths.replace(/<path fill="#[fF][dD][fF][dD][fF][dD]" d="M0 0h1254v1254H0Z"\/>/g, '');
innerPaths = innerPaths.replace(/<path fill="#ffffff" d="M0 0h1254v1254H0Z"\/>/gi, '');

// Build brand-mark.svg (Light Theme)
const brandMarkLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 92" fill="none" width="460" height="92">
  <!-- SVG Model of website-logo.png (Positioned BEFORE website name) -->
  <g transform="translate(6, 6) scale(0.0638)">
${innerPaths}
  </g>

  <!-- Website Name (Kept intact, logo positioned right before it) -->
  <g transform="translate(98, 0)">
    <text x="0" y="54" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif" font-size="44" font-weight="700" letter-spacing="2.5" fill="#111111">ORVEXA</text>
    <text x="2" y="74" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#F26A21">CAR SUBSCRIPTION</text>
    <circle cx="146" cy="71" r="2" fill="#111111" opacity="0.35" />
    <text x="156" y="74" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="500" letter-spacing="3" fill="#666666">FLEXIBLE LEASING</text>
  </g>
</svg>`;

// Build brand-mark-dark.svg (Dark Theme)
const brandMarkDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 92" fill="none" width="460" height="92">
  <!-- SVG Model of website-logo.png (Positioned BEFORE website name) -->
  <g transform="translate(6, 6) scale(0.0638)">
${innerPaths}
  </g>

  <!-- Website Name in White for Dark Mode (Kept intact, logo positioned right before it) -->
  <g transform="translate(98, 0)">
    <text x="0" y="54" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif" font-size="44" font-weight="700" letter-spacing="2.5" fill="#FFFFFF">ORVEXA</text>
    <text x="2" y="74" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#F26A21">CAR SUBSCRIPTION</text>
    <circle cx="146" cy="71" r="2" fill="#FFFFFF" opacity="0.4" />
    <text x="156" y="74" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="500" letter-spacing="3" fill="#D0D0D0">FLEXIBLE LEASING</text>
  </g>
</svg>`;

// Build favicon.svg
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1400" fill="none" width="1400" height="1400">
  <rect width="1400" height="1400" rx="300" fill="#111111" />
  <g transform="translate(73, 73)">
${innerPaths}
  </g>
</svg>`;

fs.writeFileSync('assets/brand-mark.svg', brandMarkLight);
fs.writeFileSync('assets/brand-mark-dark.svg', brandMarkDark);
fs.writeFileSync('assets/favicon.svg', faviconSvg);

console.log('Successfully generated assets/brand-mark.svg, assets/brand-mark-dark.svg, and assets/favicon.svg');
