import fs from 'fs';
import path from 'path';

const baseDir = '/workspaces/dragonball/projekt/public/assets';

// Characters with their colors
const characters = [
  { id: 'goku', color: '#f97316', name: 'Son Goku' },
  { id: 'vegeta', color: '#3b82f6', name: 'Vegeta' },
  { id: 'piccolo', color: '#22c55e', name: 'Piccolo' },
  { id: 'frieza', color: '#c084fc', name: 'Frieza' },
  { id: 'cell', color: '#84cc16', name: 'Perfect Cell' },
  { id: 'buu', color: '#f472b6', name: 'Majin Buu' },
  { id: 'gohan', color: '#60a5fa', name: 'Son Gohan' },
  { id: 'trunks', color: '#818cf8', name: 'Future Trunks' },
  { id: 'krillin', color: '#fb923c', name: 'Krillin' },
  { id: 'tien', color: '#14b8a6', name: 'Tien Shinhan' },
  { id: 'android17', color: '#10b981', name: 'Android 17' },
  { id: 'android16', color: '#059669', name: 'Android 16' },
  { id: 'bardock', color: '#b91c1c', name: 'Bardock' },
  { id: 'broly', color: '#a3e635', name: 'Broly' },
  { id: 'cooler', color: '#581c87', name: 'Cooler' },
  { id: 'raditz', color: '#1e3a8a', name: 'Raditz' },
  { id: 'nappa', color: '#ca8a04', name: 'Nappa' },
  { id: 'ginyu', color: '#7e22ce', name: 'Ginyu' },
  { id: 'recoome', color: '#ea580c', name: 'Recoome' },
  { id: 'chichi', color: '#c41f5f', name: 'Chi-Chi' },
];

// Techniques (most commonly used)
const techniques = [
  { id: 'kamehameha', name: 'Kamehameha', type: 'ki' },
  { id: 'final_flash', name: 'Final Flash', type: 'ki' },
  { id: 'galick_ho', name: 'Galick Gun', type: 'ki' },
  { id: 'kamehameha_yamcha', name: 'Kamehameha', type: 'ki' },
  { id: 'masenko', name: 'Masenko', type: 'ki' },
  { id: 'special_beam_cannon', name: 'Special Beam', type: 'ki' },
  { id: 'demon_hand', name: 'Demon Hand', type: 'physical' },
  { id: 'light_grenade', name: 'Light Grenade', type: 'ki' },
  { id: 'death_beam', name: 'Death Beam', type: 'ki' },
  { id: 'death_ball', name: 'Death Ball', type: 'energy' },
  { id: 'telekenesis', name: 'Telekinesis', type: 'special' },
  { id: 'solar_kamehameha', name: 'Solar Kamehameha', type: 'ki' },
  { id: 'energy_absorb', name: 'Energy Drain', type: 'ki' },
  { id: 'candy_beam', name: 'Candy Beam', type: 'special' },
  { id: 'spirit_bomb', name: 'Spirit Bomb', type: 'ki' },
  { id: 'meteor_smash', name: 'Meteor Smash', type: 'physical' },
  { id: 'destructo_disc', name: 'Destructo Disc', type: 'ki' },
  { id: 'solar_flare', name: 'Solar Flare', type: 'special' },
  { id: 'tri_beam', name: 'Tri-Beam', type: 'ki' },
  { id: 'wolf_fang_fist', name: 'Wolf Fang Fist', type: 'physical' },
  { id: 'burning_attack', name: 'Burning Attack', type: 'ki' },
  { id: 'heat_dome', name: 'Heat Dome', type: 'ki' },
  { id: 'shining_sword_attack', name: 'Sword Attack', type: 'physical' },
  { id: 'hells_flash', name: 'Hell\'s Flash', type: 'ki' },
  { id: 'rocket_punch', name: 'Rocket Punch', type: 'physical' },
];

function generateCharacterSVG(id, color, name) {
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <defs>
    <linearGradient id="g_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
  </defs>
  <rect width="160" height="160" rx="20" fill="url(#g_${id})" stroke="#fff" stroke-width="2" stroke-opacity="0.3"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#fff" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${initials}</text>
</svg>`;
}

function generateTechniqueSVG(id, name, type) {
  const colorMap = {
    ki: { grad1: '#3b82f6', grad2: '#0ea5e9' },
    energy: { grad1: '#ef4444', grad2: '#dc2626' },
    physical: { grad1: '#f97316', grad2: '#ea580c' },
    special: { grad1: '#a855f7', grad2: '#7e22ce' }
  };
  const colors = colorMap[type] || colorMap.ki;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="12" fill="#0b1320"/>
  <defs>
    <linearGradient id="tg_${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${colors.grad1}"/>
      <stop offset="1" stop-color="${colors.grad2}"/>
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="112" height="112" rx="10" fill="url(#tg_${id})" stroke="#aaa" stroke-width="2"/>
  <circle cx="64" cy="64" r="40" fill="#fff" opacity="0.1"/>
  <circle cx="64" cy="64" r="25" fill="#fff" opacity="0.15"/>
</svg>`;
}

// Ensure directories exist
if (!fs.existsSync(path.join(baseDir, 'characters'))) {
  fs.mkdirSync(path.join(baseDir, 'characters'), { recursive: true });
}
if (!fs.existsSync(path.join(baseDir, 'techniques'))) {
  fs.mkdirSync(path.join(baseDir, 'techniques'), { recursive: true });
}

// Generate missing character SVGs
let charCount = 0;
characters.forEach(char => {
  const svgPath = path.join(baseDir, 'characters', `${char.id}.svg`);
  const pngPath = path.join(baseDir, 'characters', `${char.id}.png`);
  
  // Only generate if neither SVG nor PNG exists (or if PNG exists but we want SVG instead)
  if (!fs.existsSync(svgPath)) {
    fs.writeFileSync(svgPath, generateCharacterSVG(char.id, char.color, char.name), 'utf8');
    charCount++;
    console.log(`✓ Generated character: ${char.id}.svg`);
  }
});

// Generate missing technique SVGs
let techCount = 0;
techniques.forEach(tech => {
  const svgPath = path.join(baseDir, 'techniques', `${tech.id}.svg`);
  
  if (!fs.existsSync(svgPath)) {
    fs.writeFileSync(svgPath, generateTechniqueSVG(tech.id, tech.name, tech.type), 'utf8');
    techCount++;
    console.log(`✓ Generated technique: ${tech.id}.svg`);
  }
});

console.log(`\n✅ Generated ${charCount} character SVGs and ${techCount} technique SVGs`);
