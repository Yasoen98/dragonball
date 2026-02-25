import type { Character } from '../types';

export const INITIAL_CHARACTERS: Character[] = [
    {
        id: 'goku',
        name: 'Son Goku',
        maxHp: 920,
        stats: { attack: 80, defense: 60, speed: 75 },
        imageColor: '#f97316', // Orange
        portraitUrl: '/assets/characters/goku.svg',
        techniques: [
            {
                id: 'kamehameha',
                name: 'Kamehameha',
                cost: { ki: 2, physical: 0, special: 0 },
                damage: 150,
                cooldown: 2,
                effect: 'none',
                description: 'A powerful blast of Ki. Deals moderate damage.',
                iconUrl: '/assets/techniques/goku.svg'
            },
            {
                id: 'meteor_smash',
                name: 'Meteor Smash',
                cost: { ki: 0, physical: 2, special: 0 },
                damage: 120,
                cooldown: 1,
                effect: 'weaken',
                description: 'A barrage of physical attacks that weakens the opponent.',
                iconUrl: '/assets/techniques/meteor_smash.svg'
            },
            {
                id: 'spirit_bomb',
                name: 'Spirit Bomb (AoE)',
                cost: { ki: 2, physical: 0, special: 3 },
                damage: 280,
                cooldown: 5,
                effect: 'pierce',
                description: 'Hits ALL opponents with blinding light. Pierces defenses.',
                iconUrl: '/assets/techniques/spirit_bomb.svg'
            }
        ],
        dodge: {
            name: 'Instant Transmission',
            successRate: 0.8,
            cost: { special: 1 },
            cooldown: 2,
            description: 'Teleports away from danger.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'vegeta',
        name: 'Vegeta',
        maxHp: 880,
        stats: { attack: 90, defense: 50, speed: 80 },
        imageColor: '#3b82f6', // Blue
        portraitUrl: '/assets/characters/vegeta.svg',
        techniques: [
            {
                id: 'galick_gun',
                name: 'Galick Gun',
                cost: { ki: 2, physical: 0, special: 0 },
                damage: 160,
                cooldown: 2,
                effect: 'none',
                description: 'A concentrated purple beam of Ki.',
                iconUrl: '/assets/techniques/vegeta.svg'
            },
            {
                id: 'final_flash',
                name: 'Final Flash (AoE)',
                cost: { ki: 3, physical: 0, special: 2 },
                damage: 220,
                cooldown: 4,
                effect: 'pierce',
                description: 'Massive energy wave hits ALL foes. Pierces defenses.',
                iconUrl: '/assets/techniques/final_flash.svg'
            },
            {
                id: 'big_bang_attack',
                name: 'Big Bang Attack',
                cost: { ki: 1, physical: 1, special: 1 },
                damage: 180,
                cooldown: 2,
                effect: 'stun',
                description: 'Fires a massive sphere of energy that can stun.',
                iconUrl: '/assets/techniques/big_bang_attack.svg'
            }
        ],
        dodge: {
            name: 'Afterimage Strike',
            successRate: 0.7,
            cost: { ki: 1 },
            cooldown: 1,
            description: 'Moves so fast it leaves an afterimage, dodging attacks.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'piccolo',
        name: 'Piccolo',
        maxHp: 1050,
        stats: { attack: 65, defense: 80, speed: 65 },
        imageColor: '#22c55e', // Green
        portraitUrl: '/assets/characters/piccolo.svg',
        techniques: [
            {
                id: 'special_beam_cannon',
                name: 'Special Beam Cannon (AoE)',
                cost: { ki: 2, special: 2 },
                damage: 240,
                cooldown: 4,
                effect: 'pierce',
                description: 'Powerful beam hits ALL enemies. Pierces defenses.',
                iconUrl: '/assets/techniques/piccolo.svg'
            },
            {
                id: 'demon_hand',
                name: 'Demon Hand',
                cost: { physical: 2 },
                damage: 100,
                cooldown: 1,
                effect: 'stun',
                description: 'Stretches arm to grab and stun the opponent.',
                iconUrl: '/assets/techniques/demon_hand.svg'
            },
            {
                id: 'light_grenade',
                name: 'Light Grenade (Poison)',
                cost: { ki: 3 },
                damage: 150,
                cooldown: 3,
                effect: 'poison',
                description: 'Poison ball that damages over time.',
                iconUrl: '/assets/techniques/light_grenade.svg'
            }
        ],
        dodge: {
            name: 'Rapid Movement',
            successRate: 0.6,
            cost: { physical: 1 },
            cooldown: 1,
            description: 'Quickly evades the attack.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'frieza',
        name: 'Frieza',
        maxHp: 850,
        stats: { attack: 85, defense: 60, speed: 85 },
        imageColor: '#c084fc', // Purple
        portraitUrl: '/assets/characters/frieza.svg',
        techniques: [
            {
                id: 'death_beam',
                name: 'Death Beam',
                cost: { ki: 1, special: 1 },
                damage: 130,
                cooldown: 1,
                effect: 'pierce',
                description: 'A swift, piercing beam from the finger.',
                iconUrl: '/assets/techniques/frieza.svg'
            },
            {
                id: 'death_ball',
                name: 'Death Ball (Poison)',
                cost: { ki: 3, special: 1 },
                damage: 200,
                cooldown: 4,
                effect: 'poison',
                description: 'Sphere inflicts deadly poison. Damages over time.',
                iconUrl: '/assets/techniques/death_ball.svg'
            },
            {
                id: 'telekenesis',
                name: 'Telekinesis',
                cost: { special: 1 },
                damage: 50,
                cooldown: 2,
                effect: 'stun',
                description: 'Uses mind powers to paralyze the enemy.',
                iconUrl: '/assets/techniques/telekenesis.svg'
            }
        ],
        dodge: {
            name: 'Hover Maneuver',
            successRate: 0.75,
            cost: { ki: 1 },
            cooldown: 2,
            description: 'Swiftly glides out of harms way.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'cell',
        name: 'Perfect Cell',
        maxHp: 1000,
        stats: { attack: 75, defense: 75, speed: 75 },
        imageColor: '#84cc16', // Lime Green
        portraitUrl: '/assets/characters/cell.svg',
        techniques: [
            {
                id: 'solar_kamehameha',
                name: 'Solar Kamehameha',
                cost: { ki: 3, special: 1 },
                damage: 260,
                cooldown: 3,
                effect: 'none',
                description: 'A massive Kamehameha capable of destroying a solar system.',
                iconUrl: '/assets/techniques/cell.svg'
            },
            {
                id: 'energy_absorb',
                name: 'Energy Drain',
                cost: { physical: 2, ki: 1 },
                damage: 100,
                cooldown: 3,
                effect: 'buff',
                description: 'Drains enemy energy to heal and buff self.',
                iconUrl: '/assets/techniques/energy_absorb.svg'
            },
            {
                id: 'perfect_combo',
                name: 'Perfect Combo',
                cost: { physical: 3 },
                damage: 180,
                cooldown: 2,
                effect: 'weaken',
                description: 'A flawless string of physical attacks.',
                iconUrl: '/assets/techniques/perfect_combo.svg'
            }
        ],
        dodge: {
            name: 'Perfect Barrier',
            successRate: 0.9,
            cost: { ki: 2 },
            cooldown: 3,
            description: 'Generates an impenetrable barrier.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'buu',
        name: 'Majin Buu',
        maxHp: 1100,
        stats: { attack: 70, defense: 85, speed: 55 },
        imageColor: '#f472b6', // Pink
        portraitUrl: '/assets/characters/buu.svg',
        techniques: [
            {
                id: 'candy_beam',
                name: 'Candy Beam (Poison)',
                cost: { special: 2 },
                damage: 60,
                cooldown: 3,
                effect: 'poison',
                description: 'Poisons ALL enemies. Corrupts their energy over time.',
                iconUrl: '/assets/techniques/buu.svg'
            },
            {
                id: 'innocence_breath',
                name: 'Innocence Breath',
                cost: { ki: 2, physical: 1 },
                damage: 150,
                cooldown: 2,
                effect: 'weaken',
                description: 'Exhales a massive cloud of destructive energy.',
                iconUrl: '/assets/techniques/innocence_breath.svg'
            },
            {
                id: 'angry_explosion',
                name: 'Angry Explosion',
                cost: { ki: 2, special: 2 },
                damage: 280,
                cooldown: 4,
                effect: 'none',
                description: 'Unleashes stored anger in a giant explosion.',
                iconUrl: '/assets/techniques/angry_explosion.svg'
            }
        ],
        dodge: {
            name: 'Body Regeneration',
            successRate: 0.6,
            cost: { physical: 1, special: 1 },
            cooldown: 2,
            description: 'Molds body to avoid the attack completely.',
            iconUrl: '/assets/techniques/unknown_dodge.svg'
        }
    },
    {
        id: 'gohan',
        name: 'Son Gohan',
        maxHp: 900,
        stats: { attack: 85, defense: 65, speed: 75 },
        imageColor: '#60a5fa',
        portraitUrl: '/assets/characters/gohan.svg',
        techniques: [
            { id: 'deep_breath', name: 'Deep Breath', cost: {}, damage: 0, cooldown: 3, effect: 'buff', description: 'Schoolboy technique. Recovers 2 random energy.',
                iconUrl: '/assets/techniques/deep_breath.svg' },
            { id: 'hidden_potential', name: 'Hidden Potential', cost: { special: 2 }, damage: 0, cooldown: 4, effect: 'buff', description: 'Unlocks latent power to drastically buff stats.',
                iconUrl: '/assets/techniques/hidden_potential.svg' },
            { id: 'father_son_kamehameha', name: 'Father-Son Kamehameha', cost: { ki: 3, special: 1 }, damage: 280, cooldown: 4, effect: 'pierce', description: 'An overwhelmingly powerful blast.',
                iconUrl: '/assets/techniques/father_son_kamehameha.svg' }
        ],
        dodge: { name: 'Super Speed', successRate: 0.7, cost: { physical: 1 }, cooldown: 1, description: 'Evades quickly.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'trunks',
        name: 'Future Trunks',
        maxHp: 850,
        stats: { attack: 80, defense: 60, speed: 85 },
        imageColor: '#818cf8',
        portraitUrl: '/assets/characters/trunks.svg',
        techniques: [
            { id: 'burning_attack', name: 'Burning Attack', cost: { ki: 2 }, damage: 150, cooldown: 2, effect: 'stun', description: 'A barrage of rapid hand movements followed by a fiery blast.',
                iconUrl: '/assets/techniques/trunks.svg' },
            { id: 'shining_sword_attack', name: 'Shining Sword Attack', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'none', description: 'Slices the opponent rapidly.',
                iconUrl: '/assets/techniques/shining_sword_attack.svg' },
            { id: 'heat_dome', name: 'Heat Dome Attack', cost: { ki: 3, special: 1 }, damage: 260, cooldown: 4, effect: 'pierce', description: 'Surrounds self in energy and fires upwards.',
                iconUrl: '/assets/techniques/heat_dome.svg' }
        ],
        dodge: { name: 'Sword Block', successRate: 0.75, cost: { physical: 1 }, cooldown: 1, description: 'Deflects with sword.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'krillin',
        name: 'Krillin',
        maxHp: 900,
        stats: { attack: 60, defense: 70, speed: 75 },
        imageColor: '#fb923c',
        portraitUrl: '/assets/characters/krillin.svg',
        techniques: [
            { id: 'destructo_disc', name: 'Destructo Disc', cost: { ki: 2, special: 1 }, damage: 250, cooldown: 3, effect: 'pierce', description: 'A razor-sharp disc of energy that cuts through anything.',
                iconUrl: '/assets/techniques/krillin.svg' },
            { id: 'deep_breath', name: 'Deep Breath', cost: {}, damage: 0, cooldown: 3, effect: 'buff', description: 'Takes a deep breath. Recovers 2 random energy. Restores stamina.',
                iconUrl: '/assets/techniques/deep_breath.svg' },
            { id: 'scatter_kamehameha', name: 'Scatter Kamehameha', cost: { ki: 3 }, damage: 180, cooldown: 2, effect: 'none', description: 'Fires multiple blasts at once.',
                iconUrl: '/assets/techniques/scatter_kamehameha.svg' }
        ],
        dodge: { name: 'Tactical Retreat', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Ducks out of the way.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'tien',
        name: 'Tien Shinhan',
        maxHp: 800,
        stats: { attack: 70, defense: 65, speed: 70 },
        imageColor: '#14b8a6',
        portraitUrl: '/assets/characters/tien.svg',
        techniques: [
            { id: 'tri_beam', name: 'Tri-Beam', cost: { ki: 3, special: 1 }, damage: 270, cooldown: 4, effect: 'stun', description: 'A powerful blast that drains the user.',
                iconUrl: '/assets/techniques/tien.svg' },
            { id: 'deep_breath', name: 'Deep Breath', cost: {}, damage: 0, cooldown: 3, effect: 'buff', description: 'Meditative breathing. Recovers 2 random energy.',
                iconUrl: '/assets/techniques/deep_breath.svg' },
            { id: 'multi_form', name: 'Multi-Form', cost: { special: 2 }, damage: 0, cooldown: 5, effect: 'buff', description: 'Creates clones, buffing attack.',
                iconUrl: '/assets/techniques/multi_form.svg' }
        ],
        dodge: { name: 'Four Witches Guard', successRate: 0.6, cost: { physical: 1, ki: 1 }, cooldown: 2, description: 'Uses extra arms to block.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'yamcha',
        name: 'Yamcha',
        maxHp: 850,
        stats: { attack: 65, defense: 60, speed: 80 },
        imageColor: '#f87171',
        portraitUrl: '/assets/characters/yamcha.svg',
        techniques: [
            { id: 'wolf_fang_fist', name: 'Wolf Fang Fist', cost: { physical: 2 }, damage: 130, cooldown: 2, effect: 'weaken', description: 'A flurry of rapid physical strikes.',
                iconUrl: '/assets/techniques/yamcha.svg' },
            { id: 'deep_breath', name: 'Deep Breath', cost: {}, damage: 0, cooldown: 3, effect: 'buff', description: 'Takes a deep breath. Recovers 2 random energy.',
                iconUrl: '/assets/techniques/deep_breath.svg' },
            { id: 'spirit_ball', name: 'Spirit Ball', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 3, effect: 'none', description: 'A controllable ball of energy.',
                iconUrl: '/assets/techniques/spirit_ball.svg' }
        ],
        dodge: { name: 'Quick Step', successRate: 0.7, cost: { physical: 1 }, cooldown: 1, description: 'Steps out of the way.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'android18',
        name: 'Android 18',
        maxHp: 900,
        stats: { attack: 75, defense: 75, speed: 85 },
        imageColor: '#fde047',
        portraitUrl: '/assets/characters/android18.svg',
        techniques: [
            { id: 'destructive_disc', name: 'Destructive Disc', cost: { ki: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'pierce', description: 'Similar to Krillin’s disc.',
                iconUrl: '/assets/techniques/android18.svg' },
            { id: 'sadistic_dance', name: 'Sadistic Dance', cost: { physical: 3 }, damage: 190, cooldown: 2, effect: 'weaken', description: 'A brutal combo of physical attacks.',
                iconUrl: '/assets/techniques/sadistic_dance.svg' },
            { id: 'high_pressure_blast', name: 'High Pressure Blast', cost: { ki: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'A localized explosion.',
                iconUrl: '/assets/techniques/high_pressure_blast.svg' }
        ],
        dodge: { name: 'Infinite Energy Guard', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Uses unlimited energy to generate a weak shield.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'android17',
        name: 'Android 17',
        maxHp: 900,
        stats: { attack: 75, defense: 80, speed: 85 },
        imageColor: '#10b981',
        portraitUrl: '/assets/characters/android17.svg',
        techniques: [
            { id: 'android_barrier', name: 'Android Barrier', cost: { special: 2 }, damage: 50, cooldown: 4, effect: 'buff', description: 'Deals minor damage while buffing defense heavily.',
                iconUrl: '/assets/techniques/android17.svg' },
            { id: 'super_electric_strike', name: 'Super Electric Strike', cost: { ki: 3, physical: 1 }, damage: 220, cooldown: 3, effect: 'stun', description: 'Throws a massive wave of electrical energy.',
                iconUrl: '/assets/techniques/super_electric_strike.svg' },
            { id: 'power_blitz', name: 'Power Blitz', cost: { ki: 2 }, damage: 130, cooldown: 1, effect: 'none', description: 'Fires basic energy spheres.',
                iconUrl: '/assets/techniques/power_blitz.svg' }
        ],
        dodge: { name: 'Parkour Dodge', successRate: 0.75, cost: { physical: 1 }, cooldown: 1, description: 'Nimble movement to avoid attacks.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'android16',
        name: 'Android 16',
        maxHp: 1050,
        stats: { attack: 85, defense: 85, speed: 50 },
        imageColor: '#059669',
        portraitUrl: '/assets/characters/android16.svg',
        techniques: [
            { id: 'hells_flash', name: 'Hell\'s Flash', cost: { ki: 3, special: 2 }, damage: 280, cooldown: 4, effect: 'pierce', description: 'Removes hands to fire devastating cannons.',
                iconUrl: '/assets/techniques/android16.svg' },
            { id: 'rocket_punch', name: 'Rocket Punch', cost: { physical: 2 }, damage: 150, cooldown: 2, effect: 'stun', description: 'Fires his arm like a missile.',
                iconUrl: '/assets/techniques/rocket_punch.svg' },
            { id: 'bear_hug', name: 'Bear Hug', cost: { physical: 3 }, damage: 180, cooldown: 3, effect: 'weaken', description: 'Crushes the opponent.',
                iconUrl: '/assets/techniques/bear_hug.svg' }
        ],
        dodge: { name: 'Tough Armor', successRate: 0.5, cost: { special: 1 }, cooldown: 2, description: 'Rely on pure defense, mitigating the hit.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'bardock',
        name: 'Bardock',
        maxHp: 900,
        stats: { attack: 85, defense: 60, speed: 70 },
        imageColor: '#b91c1c',
        portraitUrl: '/assets/characters/bardock.svg',
        techniques: [
            { id: 'riot_javelin', name: 'Riot Javelin', cost: { ki: 2, physical: 1 }, damage: 180, cooldown: 2, effect: 'pierce', description: 'A final, desperate energy blast.',
                iconUrl: '/assets/techniques/bardock.svg' },
            { id: 'saiyan_spirit', name: 'Saiyan Spirit', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'none', description: 'A fierce combo of desperate punches.',
                iconUrl: '/assets/techniques/saiyan_spirit.svg' },
            { id: 'rebellion_trigger', name: 'Rebellion Trigger', cost: { ki: 3 }, damage: 230, cooldown: 3, effect: 'none', description: 'A concentrated wave of energy.',
                iconUrl: '/assets/techniques/rebellion_trigger.svg' }
        ],
        dodge: { name: 'Premonition', successRate: 0.65, cost: { special: 1 }, cooldown: 3, description: 'Sees the future briefly to dodge.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'broly',
        name: 'Broly (DBZ)',
        maxHp: 1300,
        stats: { attack: 100, defense: 80, speed: 65 },
        imageColor: '#a3e635',
        portraitUrl: '/assets/characters/broly.svg',
        techniques: [
            { id: 'omega_blaster', name: 'Omega Blaster', cost: { ki: 3, special: 2 }, damage: 320, cooldown: 4, effect: 'none', description: 'A massive sphere of green ki.',
                iconUrl: '/assets/techniques/broly.svg' },
            { id: 'eraser_cannon', name: 'Eraser Cannon', cost: { ki: 2, physical: 1 }, damage: 200, cooldown: 2, effect: 'pierce', description: 'A powerful blast from the hand.',
                iconUrl: '/assets/techniques/eraser_cannon.svg' },
            { id: 'gigantic_slam', name: 'Gigantic Slam', cost: { physical: 3 }, damage: 240, cooldown: 3, effect: 'stun', description: 'Slams the enemy into the ground.',
                iconUrl: '/assets/techniques/gigantic_slam.svg' }
        ],
        dodge: { name: 'Lariat', successRate: 0.4, cost: { physical: 2 }, cooldown: 3, description: 'Powers through the attack with sheer mass.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'cooler',
        name: 'Cooler',
        maxHp: 900,
        stats: { attack: 85, defense: 70, speed: 80 },
        imageColor: '#581c87',
        portraitUrl: '/assets/characters/cooler.svg',
        techniques: [
            { id: 'supernova', name: 'Supernova', cost: { ki: 3, special: 2 }, damage: 300, cooldown: 4, effect: 'none', description: 'A massive sun-like sphere of energy.',
                iconUrl: '/assets/techniques/cooler.svg' },
            { id: 'death_chaser', name: 'Death Chaser', cost: { physical: 2, ki: 1 }, damage: 180, cooldown: 2, effect: 'weaken', description: 'A ruthless physical combo.',
                iconUrl: '/assets/techniques/death_chaser.svg' },
            { id: 'eye_laser', name: 'Eye Laser', cost: { ki: 1 }, damage: 80, cooldown: 1, effect: 'pierce', description: 'Quick precision lasers from the eyes.',
                iconUrl: '/assets/techniques/eye_laser.svg' }
        ],
        dodge: { name: 'Instant Counter', successRate: 0.7, cost: { special: 1, physical: 1 }, cooldown: 2, description: 'Dodges and attempts to retaliate.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'raditz',
        name: 'Raditz',
        maxHp: 820,
        stats: { attack: 65, defense: 60, speed: 70 },
        imageColor: '#1e3a8a',
        portraitUrl: '/assets/characters/raditz.svg',
        techniques: [
            { id: 'double_sunday', name: 'Double Sunday', cost: { ki: 2 }, damage: 130, cooldown: 2, effect: 'none', description: 'Fires two beams from both hands.',
                iconUrl: '/assets/techniques/raditz.svg' },
            { id: 'saturday_crash', name: 'Saturday Crash', cost: { ki: 1, special: 1 }, damage: 140, cooldown: 2, effect: 'stun', description: 'A paralyzing sphere of energy.',
                iconUrl: '/assets/techniques/saturday_crash.svg' },
            { id: 'cowardly_strike', name: 'Cowardly Strike', cost: { physical: 2 }, damage: 110, cooldown: 1, effect: 'weaken', description: 'A cheap shot.',
                iconUrl: '/assets/techniques/cowardly_strike.svg' }
        ],
        dodge: { name: 'Look Over There!', successRate: 0.8, cost: { special: 1 }, cooldown: 3, description: 'Distracts the opponent to evade.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'nappa',
        name: 'Nappa',
        maxHp: 900,
        stats: { attack: 75, defense: 75, speed: 50 },
        imageColor: '#ca8a04',
        portraitUrl: '/assets/characters/nappa.svg',
        techniques: [
            { id: 'giant_storm', name: 'Giant Storm', cost: { ki: 3 }, damage: 220, cooldown: 3, effect: 'none', description: 'Raises two fingers to cause a huge explosion.',
                iconUrl: '/assets/techniques/nappa.svg' },
            { id: 'break_cannon', name: 'Break Cannon', cost: { ki: 2, physical: 1 }, damage: 190, cooldown: 2, effect: 'pierce', description: 'Fires a beam from the mouth.',
                iconUrl: '/assets/techniques/break_cannon.svg' },
            { id: 'bomber_dx', name: 'Bomber DX', cost: { ki: 2 }, damage: 150, cooldown: 1, effect: 'none', description: 'A massive blast of energy.',
                iconUrl: '/assets/techniques/bomber_dx.svg' }
        ],
        dodge: { name: 'Tough Skin', successRate: 0.4, cost: { physical: 1 }, cooldown: 1, description: 'Flexes muscles to absorb impact.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'ginyu',
        name: 'Captain Ginyu',
        maxHp: 800,
        stats: { attack: 75, defense: 70, speed: 75 },
        imageColor: '#7e22ce',
        portraitUrl: '/assets/characters/ginyu.svg',
        techniques: [
            { id: 'milky_cannon', name: 'Milky Cannon', cost: { ki: 2, physical: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'A powerful purple blast.',
                iconUrl: '/assets/techniques/ginyu.svg' },
            { id: 'pose', name: 'Ginyu Pose', cost: { special: 2 }, damage: 0, cooldown: 3, effect: 'buff', description: 'Poses to drastically increase stats.',
                iconUrl: '/assets/techniques/pose.svg' },
            { id: 'body_change', name: 'Body Change', cost: { special: 3 }, damage: 200, cooldown: 5, effect: 'stun', description: 'A risky maneuver that heavily damages and stuns.',
                iconUrl: '/assets/techniques/body_change.svg' }
        ],
        dodge: { name: 'Ginyu Force Rules', successRate: 0.6, cost: { special: 1 }, cooldown: 2, description: 'Performs a weird dance to dodge.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'recoome',
        name: 'Recoome',
        maxHp: 950,
        stats: { attack: 80, defense: 80, speed: 40 },
        imageColor: '#ea580c',
        portraitUrl: '/assets/characters/recoome.svg',
        techniques: [
            { id: 'recoome_eraser_gun', name: 'Recoome Eraser Gun', cost: { ki: 3 }, damage: 240, cooldown: 3, effect: 'none', description: 'Massive blast from the mouth.',
                iconUrl: '/assets/techniques/recoome.svg' },
            { id: 'recoome_kick', name: 'Recoome Kick', cost: { physical: 2 }, damage: 160, cooldown: 2, effect: 'pierce', description: 'A devastating flying knee.',
                iconUrl: '/assets/techniques/recoome_kick.svg' },
            { id: 'recoome_mach_punch', name: 'Recoome Mach Punch', cost: { physical: 3 }, damage: 200, cooldown: 2, effect: 'weaken', description: 'A relentless barrage of punches.',
                iconUrl: '/assets/techniques/recoome_mach_punch.svg' }
        ],
        dodge: { name: 'Recoome Pose', successRate: 0.5, cost: { special: 1 }, cooldown: 2, description: 'Strikes a pose to ignore damage.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'burter',
        name: 'Burter',
        maxHp: 750,
        stats: { attack: 65, defense: 50, speed: 95 },
        imageColor: '#2563eb',
        portraitUrl: '/assets/characters/burter.png',
        techniques: [
            { id: 'blue_hurricane', name: 'Blue Hurricane', cost: { physical: 2, ki: 1 }, damage: 170, cooldown: 2, effect: 'none', description: 'Spins rapidly to create a vortex.',
                iconUrl: '/assets/techniques/burter.svg' },
            { id: 'mach_kick', name: 'Mach Kick', cost: { physical: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'Fastest kick in the universe.',
                iconUrl: '/assets/techniques/mach_kick.svg' },
            { id: 'space_mach_attack', name: 'Space Mach Attack', cost: { ki: 2, special: 1 }, damage: 210, cooldown: 3, effect: 'stun', description: 'Blinds the enemy with speed.',
                iconUrl: '/assets/techniques/space_mach_attack.svg' }
        ],
        dodge: { name: 'Blue Blur', successRate: 0.9, cost: { ki: 1 }, cooldown: 1, description: 'Moves faster than the eye can see.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'jeice',
        name: 'Jeice',
        maxHp: 800,
        stats: { attack: 70, defense: 60, speed: 80 },
        imageColor: '#dc2626',
        portraitUrl: '/assets/characters/jeice.png',
        techniques: [
            { id: 'crusher_ball', name: 'Crusher Ball', cost: { ki: 3 }, damage: 200, cooldown: 2, effect: 'none', description: 'A red sphere of intense energy.',
                iconUrl: '/assets/techniques/jeice.svg' },
            { id: 'fire_crusher', name: 'Fire Crusher', cost: { ki: 2, physical: 1 }, damage: 170, cooldown: 2, effect: 'none', description: 'Combines ki attacks with physical strikes.',
                iconUrl: '/assets/techniques/fire_crusher.svg' },
            { id: 'red_magma', name: 'Red Magma', cost: { special: 2 }, damage: 120, cooldown: 2, effect: 'weaken', description: 'Burns the opponent, weakening them.',
                iconUrl: '/assets/techniques/red_magma.svg' }
        ],
        dodge: { name: 'Red Comet', successRate: 0.7, cost: { physical: 1 }, cooldown: 2, description: 'Leaves a red trail while evading.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'guldo',
        name: 'Guldo',
        maxHp: 750,
        stats: { attack: 50, defense: 50, speed: 45 },
        imageColor: '#65a30d',
        portraitUrl: '/assets/characters/guldo.png',
        techniques: [
            { id: 'time_freeze', name: 'Time Freeze', cost: { special: 3 }, damage: 50, cooldown: 5, effect: 'stun', description: 'Holds breath to freeze time.',
                iconUrl: '/assets/techniques/guldo.svg' },
            { id: 'telekinesis_tree', name: 'Telekinesis (Tree)', cost: { special: 2 }, damage: 120, cooldown: 2, effect: 'pierce', description: 'Throws a tree at the opponent.',
                iconUrl: '/assets/techniques/telekinesis_tree.svg' },
            { id: 'mind_bind', name: 'Mind Bind', cost: { special: 1, ki: 1 }, damage: 80, cooldown: 3, effect: 'weaken', description: 'Paralyzes the opponent.',
                iconUrl: '/assets/techniques/mind_bind.svg' }
        ],
        dodge: { name: 'Hold Breath', successRate: 0.95, cost: { special: 2 }, cooldown: 4, description: 'Freezes time to walk out of the way.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'zarbon',
        name: 'Zarbon',
        maxHp: 800,
        stats: { attack: 75, defense: 65, speed: 80 },
        imageColor: '#0ea5e9',
        portraitUrl: '/assets/characters/zarbon.png',
        techniques: [
            { id: 'elegant_blaster', name: 'Elegant Blaster', cost: { ki: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'A refined energy wave.',
                iconUrl: '/assets/techniques/zarbon.svg' },
            { id: 'monster_crush', name: 'Monster Crush', cost: { physical: 3 }, damage: 210, cooldown: 3, effect: 'stun', description: 'Uses monster form for a brutal slam.',
                iconUrl: '/assets/techniques/monster_crush.svg' },
            { id: 'shooting_star', name: 'Shooting Star', cost: { ki: 1, physical: 1 }, damage: 130, cooldown: 2, effect: 'weaken', description: 'A quick dive kick.',
                iconUrl: '/assets/techniques/shooting_star.svg' }
        ],
        dodge: { name: 'Graceful Evade', successRate: 0.7, cost: { ki: 1 }, cooldown: 1, description: 'Dodges with elegance.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'dodoria',
        name: 'Dodoria',
        maxHp: 850,
        stats: { attack: 80, defense: 75, speed: 60 },
        imageColor: '#be123c',
        portraitUrl: '/assets/characters/dodoria.png',
        techniques: [
            { id: 'dodoria_beam', name: 'Dodoria Beam', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'A blast from the mouth.',
                iconUrl: '/assets/techniques/dodoria.svg' },
            { id: 'ruthless_blow', name: 'Ruthless Blow', cost: { physical: 2 }, damage: 150, cooldown: 1, effect: 'pierce', description: 'A savage punch.',
                iconUrl: '/assets/techniques/ruthless_blow.svg' },
            { id: 'maximum_buster', name: 'Maximum Buster', cost: { ki: 3 }, damage: 220, cooldown: 3, effect: 'stun', description: 'A massive wave of energy.',
                iconUrl: '/assets/techniques/maximum_buster.svg' }
        ],
        dodge: { name: 'Thick Hide', successRate: 0.4, cost: { physical: 1 }, cooldown: 1, description: 'Relies on fat to absorb the blow.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'dabra',
        name: 'Dabura',
        maxHp: 900,
        stats: { attack: 85, defense: 70, speed: 75 },
        imageColor: '#db2777',
        portraitUrl: '/assets/characters/dabra.png',
        techniques: [
            { id: 'stone_spit', name: 'Stone Spit', cost: { special: 3 }, damage: 100, cooldown: 5, effect: 'stun', description: 'Turns the opponent to stone.',
                iconUrl: '/assets/techniques/dabra.svg' },
            { id: 'evil_flame', name: 'Evil Flame', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'Breathes demonic fire.',
                iconUrl: '/assets/techniques/evil_flame.svg' },
            { id: 'dark_sword', name: 'Darkness Sword Attack', cost: { physical: 2, ki: 1 }, damage: 190, cooldown: 2, effect: 'pierce', description: 'Slashes with a conjured sword.',
                iconUrl: '/assets/techniques/dark_sword.svg' }
        ],
        dodge: { name: 'Magic Materialization', successRate: 0.65, cost: { special: 1 }, cooldown: 2, description: 'Evades using demonic magic.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'gotenks',
        name: 'Gotenks',
        maxHp: 850,
        stats: { attack: 85, defense: 60, speed: 90 },
        imageColor: '#fcd34d',
        portraitUrl: '/assets/characters/gotenks.png',
        techniques: [
            { id: 'super_ghost_kamikaze', name: 'Super Ghost Kamikaze', cost: { ki: 3, special: 1 }, damage: 250, cooldown: 4, effect: 'pierce', description: 'Explosive ghosts track the enemy.',
                iconUrl: '/assets/techniques/super_ghost_kamikaze.svg' },
            { id: 'deep_breath', name: 'Deep Breath', cost: {}, damage: 0, cooldown: 3, effect: 'buff', description: 'Playful breath technique. Recovers 2 random energy.',
                iconUrl: '/assets/techniques/deep_breath.svg' },
            { id: 'continuous_die_die', name: 'Continuous Die Die', cost: { ki: 2, physical: 2 }, damage: 220, cooldown: 3, effect: 'none', description: 'A rapid barrage of ki blasts.',
                iconUrl: '/assets/techniques/continuous_die_die.svg' }
        ],
        dodge: { name: 'Childish Evasion', successRate: 0.85, cost: { physical: 1 }, cooldown: 2, description: 'Unpredictable movements.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'vegito',
        name: 'Vegito',
        maxHp: 1200,
        stats: { attack: 95, defense: 85, speed: 90 },
        imageColor: '#1d4ed8',
        portraitUrl: '/assets/characters/vegito.png',
        techniques: [
            { id: 'spirit_sword', name: 'Spirit Sword', cost: { ki: 2, physical: 2 }, damage: 260, cooldown: 3, effect: 'pierce', description: 'Impales the opponent with a sword of light.',
                iconUrl: '/assets/techniques/vegito.svg' },
            { id: 'final_kamehameha', name: 'Final Kamehameha', cost: { ki: 3, special: 2 }, damage: 320, cooldown: 4, effect: 'none', description: 'The ultimate combined blast.',
                iconUrl: '/assets/techniques/final_kamehameha.svg' },
            { id: 'savage_counter', name: 'Savage Counter', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 2, effect: 'stun', description: 'Taunts and kicks the opponent.',
                iconUrl: '/assets/techniques/savage_counter.svg' }
        ],
        dodge: { name: 'Absolute Confidence', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Dodges effortlessly.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    },
    {
        id: 'gogeta',
        name: 'Gogeta',
        maxHp: 1150,
        stats: { attack: 100, defense: 75, speed: 95 },
        imageColor: '#d97706',
        portraitUrl: '/assets/characters/gogeta.png',
        techniques: [
            { id: 'soul_punisher', name: 'Soul Punisher', cost: { ki: 2, special: 3 }, damage: 350, cooldown: 5, effect: 'pierce', description: 'Disintegrates all evil.',
                iconUrl: '/assets/techniques/gogeta.svg' },
            { id: 'big_bang_kamehameha', name: 'Big Bang Kamehameha', cost: { ki: 3, physical: 1 }, damage: 280, cooldown: 3, effect: 'none', description: 'A devastating beam.',
                iconUrl: '/assets/techniques/big_bang_kamehameha.svg' },
            { id: 'stardust_fall', name: 'Stardust Fall', cost: { ki: 3 }, damage: 230, cooldown: 2, effect: 'none', description: 'Rains down explosive ki.',
                iconUrl: '/assets/techniques/stardust_fall.svg' }
        ],
        dodge: { name: 'Blink', successRate: 0.85, cost: { ki: 1 }, cooldown: 1, description: 'Moves instantaneously to evade.',
            iconUrl: '/assets/techniques/unknown_dodge.svg' }
    }
];
