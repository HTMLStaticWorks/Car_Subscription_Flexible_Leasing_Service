const { Jimp, intToRGBA } = require('jimp');

async function processImage() {
  const image = await Jimp.read('assets/images/website-logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log(`Loaded image: ${w}x${h}`);

  console.log('Sample (10, 10):', intToRGBA(image.getPixelColor(10, 10)));
  console.log('Sample (512, 50):', intToRGBA(image.getPixelColor(512, 50)));
  console.log('Sample (512, 280):', intToRGBA(image.getPixelColor(512, 280)));
  console.log('Sample (512, 600):', intToRGBA(image.getPixelColor(512, 600)));
  console.log('Sample (512, 800):', intToRGBA(image.getPixelColor(512, 800)));
}

processImage().catch(console.error);
