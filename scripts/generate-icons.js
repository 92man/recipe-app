const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/icon.svg');
const svg = fs.readFileSync(svgPath);

const sizes = [192, 512];

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // favicon도 생성
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));
  console.log('Generated favicon.png');

  // Apple Touch Icon
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');
}

generateIcons().then(() => {
  console.log('All icons generated!');
}).catch(err => {
  console.error('Error:', err);
});
