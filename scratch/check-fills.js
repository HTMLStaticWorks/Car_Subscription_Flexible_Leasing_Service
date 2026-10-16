const fs = require('fs');
const content = fs.readFileSync('assets/brand-mark.svg', 'utf8');
const fills = content.match(/fill="[^"]+"/g) || [];
console.log('Unique fills:', [...new Set(fills)]);
