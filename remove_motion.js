const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\lenovo\\OneDrive\\Desktop\\Sudarshan_Crafts_Website\\src\\components';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove import
  content = content.replace(/import\s+\{[^}]*\}\s+from\s+['"]framer-motion['"];?\n?/g, '');

  // Replace tags
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

  // Remove AnimatePresence wrapper tags
  content = content.replace(/<AnimatePresence[^>]*>\s*/g, '');
  content = content.replace(/<\/AnimatePresence>\s*/g, '');

  const propsToRemove = ['initial', 'animate', 'transition', 'exit', 'whileInView', 'viewport', 'variants', 'layoutId', 'layout'];
  
  for (const prop of propsToRemove) {
    if (prop === 'layout') {
      content = content.replace(/\s+layout(?=[\s>])/g, '');
      continue;
    }
    // Match prop={{...}}, prop={...}, prop="..."
    const propRegex = new RegExp(`\\s+${prop}=(?:\\{[^{}]*\\{[^{}]*\\}[^{}]*\\}|\\{[^{}]*\\}|"[^"]*"|'[^']*')`, 'gs');
    content = content.replace(propRegex, '');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done');
