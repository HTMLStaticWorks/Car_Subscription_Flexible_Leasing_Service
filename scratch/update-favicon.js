const fs = require('fs');
const logoB64 = fs.readFileSync('assets/images/website-logo.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <image href="data:image/png;base64,${logoB64}" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid meet" />
</svg>`;
fs.writeFileSync('assets/favicon.svg', svg);
console.log('Updated assets/favicon.svg with website-logo.png');
