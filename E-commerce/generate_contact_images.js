const fs = require('fs');
const path = require('path');

// Function to generate SVG content for contact page images
function generateContactSVG(name, color) {
  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="${color}" />
    <circle cx="200" cy="100" r="50" fill="white" opacity="0.3" />
    <rect x="150" y="170" width="100" height="80" fill="white" opacity="0.3" />
    <text x="200" y="280" font-family="Arial" font-size="20" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
}

// Generate contact page images
const contactImages = [
  { name: 'Store Location', color: '#4ECDC4' },
  { name: 'Customer Service', color: '#FF6B6B' },
  { name: 'Headquarters', color: '#45B7D1' }
];

contactImages.forEach(image => {
  const svgContent = generateContactSVG(image.name, image.color);
  const fileName = image.name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'assets/images', fileName), svgContent);
});

console.log('Contact page images generated successfully!');