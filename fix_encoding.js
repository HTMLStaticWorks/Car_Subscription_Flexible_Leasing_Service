const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Car Subscription & Flexible Leasing Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = {
  'âœ“': '✓',
  'âœ”': '✔',
  'â†’': '→',
  'â˜…': '★',
  'â€”': '—',
  'â€™': '’',
  'â€œ': '“',
  'â€': '”'
};

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the known bad strings
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }
  
  // Replace dangling â€ that missed the  character
  // Make sure not to match if it's already replaced (order doesn't matter since we replaced the longer ones first, but to be safe)
  content = content.replace(/â€/g, '”');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed HTML files');
