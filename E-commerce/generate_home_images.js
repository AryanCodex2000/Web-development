const fs = require('fs');
const path = require('path');

// Function to generate SVG content for home & living images
function generateHomeSVG(name, color1, color2) {
  return `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="400" fill="${color1}" />
    <rect x="50" y="100" width="200" height="150" fill="${color2}" opacity="0.3" />
    <circle cx="150" cy="200" r="40" fill="white" opacity="0.5" />
    <text x="150" y="350" font-family="Arial" font-size="20" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
}

// Generate home & living images
const homeProducts = [
  { name: 'Sofa Set', colors: ['#8B4513', '#D2B48C'] },
  { name: 'Dining Table', colors: ['#654321', '#DEB887'] },
  { name: 'Bedding Set', colors: ['#4682B4', '#87CEEB'] },
  { name: 'Lamp', colors: ['#2F4F4F', '#708090'] },
  { name: 'Curtains', colors: ['#9370DB', '#BA55D3'] },
  { name: 'Rug', colors: ['#CD853F', '#DAA520'] }
];

homeProducts.forEach(product => {
  const svgContent = generateHomeSVG(product.name, product.colors[0], product.colors[1]);
  const fileName = product.name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'assets/images/home', fileName), svgContent);
});

console.log('Home & Living images generated successfully!');