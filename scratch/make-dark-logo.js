const { Jimp } = require('jimp');

async function makeDarkLogo() {
  const image = await Jimp.read('assets/images/website-logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log(`Processing image ${w}x${h}...`);

  const data = image.bitmap.data;

  // Background detection:
  // In website-logo.png, background is white/near-white (low saturation, high brightness)
  function isWhiteBg(x, y) {
    const idx = (y * w + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    // Pure white or slight JPEG artifact near-white:
    // Brightness > 230 and saturation < 30
    return min > 220 && sat < 35;
  }

  // BFS from corners and border edges
  const isBg = new Uint8Array(w * h);
  const queue = [];

  function addSeed(x, y) {
    if (x >= 0 && x < w && y >= 0 && y < h && !isBg[y * w + x] && isWhiteBg(x, y)) {
      isBg[y * w + x] = 1;
      queue.push(x, y);
    }
  }

  for (let x = 0; x < w; x++) {
    addSeed(x, 0);
    addSeed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    addSeed(0, y);
    addSeed(w - 1, y);
  }

  // Also seed gap between arrow and car:
  addSeed(512, 130);
  addSeed(512, 140);
  // Also seed gap between key blade and bottom wave:
  addSeed(650, 680);
  addSeed(550, 680);

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!isBg[nidx] && isWhiteBg(nx, ny)) {
          isBg[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  console.log(`Identified ${queue.length / 2} background pixels out of ${w * h}`);

  // Create dark version
  const darkImage = image.clone();
  const darkData = darkImage.bitmap.data;

  // Background color for dark mode: pure black #000000 or sleek dark #111111
  // The user requested: "in dark mode keep the website logo in white background colour in black ok"
  // Let's set it to black (#000000)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (isBg[y * w + x]) {
        darkData[idx] = 0;
        darkData[idx + 1] = 0;
        darkData[idx + 2] = 0;
        darkData[idx + 3] = 255;
      }
    }
  }

  // Smooth edge antialiasing near black background
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      if (!isBg[y * w + x]) {
        const r = darkData[idx];
        const g = darkData[idx + 1];
        const b = darkData[idx + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max - min;
        // If it's a fringe pixel bordering background with high brightness and low saturation
        let hasBgNeighbor = isBg[y * w + (x - 1)] || isBg[y * w + (x + 1)] || isBg[(y - 1) * w + x] || isBg[(y + 1) * w + x];
        if (hasBgNeighbor && min > 190 && sat < 50) {
          darkData[idx] = 0;
          darkData[idx + 1] = 0;
          darkData[idx + 2] = 0;
        }
      }
    }
  }

  await darkImage.write('assets/images/website-logo-dark.png');
  console.log('Saved assets/images/website-logo-dark.png');
}

makeDarkLogo().catch(console.error);
