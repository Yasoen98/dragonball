import fs from 'fs';
import path from 'path';

// Detect if running from /workspaces/dragonball or /workspaces/dragonball/projekt
const cwd = process.cwd();
const baseDir = cwd.endsWith('projekt') ? cwd : path.join(cwd, 'projekt');

const dataPath = path.resolve(baseDir, 'src/data/characters.ts');
const assetsDir = path.resolve(baseDir, 'public/assets/characters');

console.log('Base dir:', baseDir);
console.log('Data path:', dataPath);
console.log('Assets dir:', assetsDir);

let src = fs.readFileSync(dataPath, 'utf8');

src = src.replace(/portraitUrl:\s*'\/assets\/characters\/([^']+?)\.(png|svg)'/g, (m, id, ext) => {
  const svgPath = path.join(assetsDir, id + '.svg');
  if (fs.existsSync(svgPath)) {
    console.log(`✓ ${id}.svg exists - switching from ${ext} to svg`);
    return `portraitUrl: '/assets/characters/${id}.svg'`;
  }
  return m;
});

fs.writeFileSync(dataPath, src, 'utf8');
console.log('\n✅ Updated portraitUrl entries to use .svg where available');
