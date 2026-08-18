const fs = require('fs');
const filePath = 'apps/web/src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Strip UTF-8 BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
  console.log('Stripped UTF-8 BOM');
}

const lines = content.split('\n');

// Print line 3237 (index 3236)
console.log('Original line 3237:', lines[3236]);

// Fix line 3237 directly
lines[3236] = '                                    <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>';

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed line 3237 successfully!');
