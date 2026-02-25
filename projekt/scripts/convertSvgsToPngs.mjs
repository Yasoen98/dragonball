import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

async function findSvgs(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await findSvgs(p));
    else if (e.isFile() && e.name.toLowerCase().endsWith('.svg')) files.push(p);
  }
  return files;
}

function parseViewBox(svg) {
  const m = svg.match(/viewBox\s*=\s*"([0-9.\-+eE\s]+)"/);
  if (!m) return null;
  const parts = m[1].trim().split(/\s+/).map(Number);
  if (parts.length === 4) return { w: parts[2], h: parts[3] };
  return null;
}

(async () => {
  const base = path.resolve(process.cwd(), 'public/assets');
  const svgs = await findSvgs(base);
  if (!svgs.length) {
    console.log('No SVG files found under', base);
    return;
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  for (const file of svgs) {
    try {
      const svg = await fs.promises.readFile(file, 'utf8');
      const vb = parseViewBox(svg);
      const W = vb ? Math.round(vb.w) : 512;
      const H = vb ? Math.round(vb.h) : 512;

      const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:100%;height:100%}</style></head><body>${svg}</body></html>`;
      await page.setViewport({ width: Math.max(16, W), height: Math.max(16, H) });
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // screenshot the svg element
      const svgHandle = await page.$('svg');
      const outPath = file.replace(/\.svg$/i, '.png');
      if (svgHandle) {
        await svgHandle.screenshot({ path: outPath, omitBackground: true });
        console.log('Converted', file, '→', outPath);
      } else {
        // fallback: screenshot full page
        await page.screenshot({ path: outPath, omitBackground: true });
        console.log('Converted (page) ', file, '→', outPath);
      }
    } catch (err) {
      console.error('Error converting', file, err.message || err);
    }
  }

  await browser.close();
  console.log('Conversion complete');
  process.exit(0);
})();
