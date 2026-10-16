const fs = require('fs');

let svg = fs.readFileSync('scratch/website-logo-vector.svg', 'utf8');

// Replace opening svg tag to ensure viewBox
svg = svg.replace('<svg xmlns="http://www.w3.org/2000/svg" width="1254" height="1254">', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" width="1254" height="1254" fill="none">');

// Remove white background rectangle if present
svg = svg.replace(/<path fill="#[fF][dD][fF][dD][fF][dD]" d="M0 0h1254v1254H0Z"\/>/g, '');
svg = svg.replace(/<path fill="#ffffff" d="M0 0h1254v1254H0Z"\/>/gi, '');

fs.writeFileSync('assets/logo.svg', svg);
console.log('Saved assets/logo.svg');
