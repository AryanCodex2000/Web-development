const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'assets/images/products',
  'assets/images/categories',
  'assets/images/banners',
  'assets/images/team'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Function to generate SVG content for product images
function generateProductSVG(name, color1, color2) {
  return `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="400" fill="${color1}" />
    <circle cx="150" cy="150" r="80" fill="${color2}" />
    <text x="150" y="350" font-family="Arial" font-size="20" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
}

// Function to generate SVG content for category images
function generateCategorySVG(name, color) {
  return `<svg width="250" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="250" height="300" fill="${color}" />
    <circle cx="125" cy="125" r="60" fill="white" opacity="0.3" />
    <text x="125" y="250" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
}

// Function to generate SVG content for banner images
function generateBannerSVG(text, color1, color2) {
  return `<svg width="1200" height="500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="500" fill="url(#grad1)" />
    <text x="600" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle">${text}</text>
    <text x="600" y="270" font-family="Arial" font-size="24" fill="white" text-anchor="middle">Fashion Collection 2025</text>
  </svg>`;
}

// Function to generate SVG content for team images
function generateTeamSVG(name, color) {
  return `<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="${color}" />
    <circle cx="75" cy="60" r="30" fill="white" opacity="0.5" />
    <rect x="45" y="100" width="60" height="40" fill="white" opacity="0.5" />
    <text x="75" y="140" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
}

// Generate product images
const productNames = [
  'Casual T-Shirt', 'Designer Jeans', 'Sports Shoes', 'Summer Dress',
  'Elegant Blouse', 'Summer Floral Dress', 'Skinny Jeans', 'Denim Jacket',
  'Knit Sweater', 'A-Line Skirt', 'Formal Shirt', 'Business Suit',
  'Evening Gown', 'Leather Boots', 'Sunglasses', 'Handbag'
];

const productColors = [
  ['#F0F8FF', '#4ecdc4'], ['#FFE4E1', '#ff6b6b'], ['#F5F5DC', '#ffa502'], ['#E0FFFF', '#9b59b6'],
  ['#FFD700', '#2c3e50'], ['#87CEEB', '#e74c3c'], ['#98FB98', '#3498db'], ['#DDA0DD', '#2ecc71']
];

productNames.forEach((name, index) => {
  const colorPair = productColors[index % productColors.length];
  const svgContent = generateProductSVG(name, colorPair[0], colorPair[1]);
  const fileName = name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'assets/images/products', fileName), svgContent);
});

// Generate category images
const categories = [
  { name: 'Women', color: '#FFD700' },
  { name: 'Men', color: '#87CEEB' },
  { name: 'Kids', color: '#98FB98' },
  { name: 'Beauty', color: '#DDA0DD' },
  { name: 'Home', color: '#FFA07A' },
  { name: 'Accessories', color: '#9370DB' }
];

categories.forEach(category => {
  const svgContent = generateCategorySVG(category.name, category.color);
  const fileName = category.name.toLowerCase() + '.svg';
  fs.writeFileSync(path.join(__dirname, 'assets/images/categories', fileName), svgContent);
});

// Generate banner images
const banners = [
  { text: 'Summer Collection', colors: ['#4ecdc4', '#ff6b6b'] },
  { text: 'New Arrivals', colors: ['#ff6b6b', '#ffa502'] },
  { text: 'Special Offers', colors: ['#ffa502', '#4ecdc4'] },
  { text: 'Studio Collection', colors: ['#9b59b6', '#3498db'] }
];

banners.forEach((banner, index) => {
  const svgContent = generateBannerSVG(banner.text, banner.colors[0], banner.colors[1]);
  const fileName = `banner-${index + 1}.svg`;
  fs.writeFileSync(path.join(__dirname, 'assets/images/banners', fileName), svgContent);
});

// Generate team images
const teamMembers = [
  'Alex Johnson', 'Maria Garcia', 'James Wilson', 'Sarah Davis',
  'Robert Miller', 'Lisa Brown', 'Michael Taylor', 'Jennifer Moore'
];

const teamColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#d35400', '#34495e'];

teamMembers.forEach((name, index) => {
  const color = teamColors[index % teamColors.length];
  const svgContent = generateTeamSVG(name.split(' ')[0], color);
  const fileName = name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'assets/images/team', fileName), svgContent);
});

console.log('Sample images generated successfully!');