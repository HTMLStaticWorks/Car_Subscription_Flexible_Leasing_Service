const { Jimp } = require('jimp');

async function createDarkInvertedLogo() {
  const image = await Jimp.read('assets/images/website-logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log(`Loaded website-logo.png: ${w}x${h}`);

  const darkImage = image.clone();
  darkImage.invert(); // Inverts colors: black becomes white, white becomes black!

  await darkImage.write('assets/images/website-logo-dark.png');
  console.log('Saved assets/images/website-logo-dark.png');
}

createDarkInvertedLogo().catch(console.error);
