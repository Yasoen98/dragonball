import fs from 'fs';

const filePath = 'projekt/src/data/characters.ts';
let tsData = fs.readFileSync(filePath, 'utf8');

// Add iconUrl to techniques
tsData = tsData.replace(/(\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?description:\s*'[^']+')/g, (match, prefix, sid) => {
    if (match.includes('iconUrl:')) return match;
    return match + `,\n                iconUrl: '/assets/techniques/${sid}.svg'`;
});

// Add iconUrl to dodge blocks
tsData = tsData.replace(/(dodge:\s*\{\s*name:\s*'([^']+)',[\s\S]*?description:\s*'[^']+')/g, (match, prefix, dname) => {
    if (match.includes('iconUrl:')) return match;
    // use character id + _dodge as a fallback icon name
    const charIdMatch = match.match(/id:\s*'([^']+)'/);
    const charId = charIdMatch ? charIdMatch[1] : 'unknown';
    return match + `,\n            iconUrl: '/assets/techniques/${charId}_dodge.svg'`;
});

fs.writeFileSync(filePath, tsData);
console.log('Updated techniques and dodge iconUrl entries in', filePath);
