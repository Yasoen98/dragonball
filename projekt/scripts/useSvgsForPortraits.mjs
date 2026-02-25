import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(process.cwd(), 'src/data/characters.ts');
const assetsDir = path.resolve(process.cwd(), 'public/assets/characters');

let src = fs.readFileSync(dataPath, 'utf8');

src = src.replace(/portraitUrl:\s*'\/assets\/characters\/([^']+?)\.(png|svg)'/g, (m, id, ext) => {
  const svgPath = path.join(assetsDir, id + '.svg');
  if (fs.existsSync(svgPath)) {
    return `portraitUrl: '/assets/characters/${id}.svg'`;
  }
  return m; // keep original
});

fs.writeFileSync(dataPath, src, 'utf8');
console.log('Updated portraitUrl to .svg where SVG exists');
