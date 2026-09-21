const fs = require('fs');
const glob = require('fs').readdirSync('.');

const htmlFiles = glob.filter(f => f.endsWith('.html') && f !== 'dashboard.html');

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find mobile menu block
  const mobileMenuMatch = content.match(/<div class="mobile-menu" id="mobile-menu">[\s\S]*?<\/div>\s*<div class="overlay" id="overlay">/);
  
  if (mobileMenuMatch) {
    let mm = mobileMenuMatch[0];
    
    // Reset all active classes inside mobile menu to prevent duplicates
    mm = mm.replace(/class="nav-link active"/g, 'class="nav-link"');
    mm = mm.replace(/class="dropdown-item active"/g, 'class="dropdown-item"');
    
    // Add active class back based on current file
    if (file === 'index.html') {
      mm = mm.replace(/<a href="#" class="nav-link"/, '<a href="#" class="nav-link active"');
      mm = mm.replace(/<a href="index.html" class="dropdown-item"/, '<a href="index.html" class="dropdown-item active"');
    } else if (file === 'home-2.html') {
      mm = mm.replace(/<a href="#" class="nav-link"/, '<a href="#" class="nav-link active"');
      mm = mm.replace(/<a href="home-2.html" class="dropdown-item"/, '<a href="home-2.html" class="dropdown-item active"');
    } else {
      const regexStr = `<a href="${file}" class="nav-link"`;
      const regex = new RegExp(regexStr);
      mm = mm.replace(regex, `<a href="${file}" class="nav-link active"`);
    }
    
    content = content.replace(mobileMenuMatch[0], mm);
    fs.writeFileSync(file, content);
    console.log('Fixed active link in ' + file);
  }
}
