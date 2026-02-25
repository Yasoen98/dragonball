import type { Character } from '../types';

export const INITIAL_CHARACTERS: Character[] = [
    {
        id: 'goku',
        name: 'Son Goku',
        maxHp: 1000,
        stats: { attack: 80, defense: 60, speed: 70 },
        imageColor: '#f97316', // Orange
        portraitUrl: '/assets/characters/goku.png',
        techniques: [
            {
                id: 'kamehameha',
                name: 'Kamehameha',
                cost: { ki: 2, physical: 0, special: 0 },
                damage: 150,
                cooldown: 2,
                effect: 'none',
                description: 'A powerful blast of Ki. Deals moderate damage.'
            },
            {
                id: 'meteor_smash',
                name: 'Meteor Smash',
                cost: { ki: 0, physical: 2, special: 0 },
                damage: 120,
                cooldown: 1,
                effect: 'weaken',
                description: 'A barrage of physical attacks that weakens the opponent.'
            },
            {
                id: 'spirit_bomb',
                name: 'Spirit Bomb',
                cost: { ki: 2, physical: 0, special: 2 },
                damage: 350,
                cooldown: 4,
                effect: 'pierce',
                description: 'Massive damage that pierces defenses.'
            }
        ],
        dodge: {
            name: 'Instant Transmission',
            successRate: 0.8,
            cost: { special: 1 },
            cooldown: 2,
            description: 'Teleports away from danger.'
        }
    },
    {
        id: 'vegeta',
        name: 'Vegeta',
        maxHp: 950,
        stats: { attack: 90, defense: 50, speed: 80 },
        imageColor: '#3b82f6', // Blue
        portraitUrl: '/assets/characters/vegeta.png',
        techniques: [
            {
                id: 'galick_gun',
                name: 'Galick Gun',
                cost: { ki: 2, physical: 0, special: 0 },
                damage: 160,
                cooldown: 2,
                effect: 'none',
                description: 'A concentrated purple beam of Ki.'
            },
            {
                id: 'final_flash',
                name: 'Final Flash',
                cost: { ki: 3, physical: 0, special: 1 },
                damage: 250,
                cooldown: 3,
                effect: 'none',
                description: 'Fires an incredibly destructive energy wave.'
            },
            {
                id: 'big_bang_attack',
                name: 'Big Bang Attack',
                cost: { ki: 1, physical: 1, special: 1 },
                damage: 180,
                cooldown: 2,
                effect: 'stun',
                description: 'Fires a massive sphere of energy that can stun.'
            }
        ],
        dodge: {
            name: 'Afterimage Strike',
            successRate: 0.7,
            cost: { ki: 1 },
            cooldown: 1,
            description: 'Moves so fast it leaves an afterimage, dodging attacks.'
        }
    },
    {
        id: 'piccolo',
        name: 'Piccolo',
        maxHp: 1100,
        stats: { attack: 65, defense: 80, speed: 60 },
        imageColor: '#22c55e', // Green
        portraitUrl: '/assets/characters/piccolo.png',
        techniques: [
            {
                id: 'special_beam_cannon',
                name: 'Special Beam Cannon',
                cost: { ki: 2, special: 1 },
                damage: 220,
                cooldown: 3,
                effect: 'pierce',
                description: 'A highly concentrated beam that pieces defenses.'
            },
            {
                id: 'demon_hand',
                name: 'Demon Hand',
                cost: { physical: 2 },
                damage: 100,
                cooldown: 1,
                effect: 'stun',
                description: 'Stretches arm to grab and stun the opponent.'
            },
            {
                id: 'light_grenade',
                name: 'Light Grenade',
                cost: { ki: 3 },
                damage: 200,
                cooldown: 3,
                effect: 'none',
                description: 'Fires a devastating ball of light energy.'
            }
        ],
        dodge: {
            name: 'Rapid Movement',
            successRate: 0.6,
            cost: { physical: 1 },
            cooldown: 1,
            description: 'Quickly evades the attack.'
        }
    },
    {
        id: 'frieza',
        name: 'Frieza',
        maxHp: 900,
        stats: { attack: 85, defense: 60, speed: 85 },
        imageColor: '#c084fc', // Purple
        portraitUrl: '/assets/characters/frieza.png',
        techniques: [
            {
                id: 'death_beam',
                name: 'Death Beam',
                cost: { ki: 1, special: 1 },
                damage: 130,
                cooldown: 1,
                effect: 'pierce',
                description: 'A swift, piercing beam from the finger.'
            },
            {
                id: 'death_ball',
                name: 'Death Ball',
                cost: { ki: 3, special: 2 },
                damage: 300,
                cooldown: 4,
                effect: 'none',
                description: 'A massive sphere of destructive energy.'
            },
            {
                id: 'telekenesis',
                name: 'Telekinesis',
                cost: { special: 1 },
                damage: 50,
                cooldown: 2,
                effect: 'stun',
                description: 'Uses mind powers to paralyze the enemy.'
            }
        ],
        dodge: {
            name: 'Hover Maneuver',
            successRate: 0.75,
            cost: { ki: 1 },
            cooldown: 2,
            description: 'Swiftly glides out of harms way.'
        }
    },
    {
        id: 'cell',
        name: 'Perfect Cell',
        maxHp: 1050,
        stats: { attack: 75, defense: 75, speed: 75 },
        imageColor: '#84cc16', // Lime Green
        portraitUrl: '/assets/characters/cell.png',
        techniques: [
            {
                id: 'solar_kamehameha',
                name: 'Solar Kamehameha',
                cost: { ki: 3, special: 1 },
                damage: 260,
                cooldown: 3,
                effect: 'none',
                description: 'A massive Kamehameha capable of destroying a solar system.'
            },
            {
                id: 'energy_absorb',
                name: 'Energy Drain',
                cost: { physical: 2, ki: 1 },
                damage: 100,
                cooldown: 3,
                effect: 'buff',
                description: 'Drains enemy energy to heal and buff self.'
            },
            {
                id: 'perfect_combo',
                name: 'Perfect Combo',
                cost: { physical: 3 },
                damage: 180,
                cooldown: 2,
                effect: 'weaken',
                description: 'A flawless string of physical attacks.'
            }
        ],
        dodge: {
            name: 'Perfect Barrier',
            successRate: 0.9,
            cost: { ki: 2 },
            cooldown: 3,
            description: 'Generates an impenetrable barrier.'
        }
    },
    {
        id: 'buu',
        name: 'Majin Buu',
        maxHp: 1200,
        stats: { attack: 70, defense: 85, speed: 50 },
        imageColor: '#f472b6', // Pink
        portraitUrl: '/assets/characters/buu.png',
        techniques: [
            {
                id: 'candy_beam',
                name: 'Candy Beam',
                cost: { special: 2 },
                damage: 80,
                cooldown: 3,
                effect: 'stun',
                description: 'Turns the opponent briefly into candy, stunning them.'
            },
            {
                id: 'innocence_breath',
                name: 'Innocence Breath',
                cost: { ki: 2, physical: 1 },
                damage: 150,
                cooldown: 2,
                effect: 'weaken',
                description: 'Exhales a massive cloud of destructive energy.'
            },
            {
                id: 'angry_explosion',
                name: 'Angry Explosion',
                cost: { ki: 2, special: 2 },
                damage: 280,
                cooldown: 4,
                effect: 'none',
                description: 'Unleashes stored anger in a giant explosion.'
            }
        ],
        dodge: {
            name: 'Body Regeneration',
            successRate: 0.6,
            cost: { physical: 1, special: 1 },
            cooldown: 2,
            description: 'Molds body to avoid the attack completely.'
        }
    },
    {
        id: 'gohan',
        name: 'Son Gohan',
        maxHp: 950,
        stats: { attack: 85, defense: 65, speed: 75 },
        imageColor: '#60a5fa',
        portraitUrl: '/assets/characters/gohan.png',
        techniques: [
            { id: 'masenko', name: 'Masenko', cost: { ki: 2 }, damage: 140, cooldown: 2, effect: 'none', description: 'Fires a quick energy blast.' },
            { id: 'hidden_potential', name: 'Hidden Potential', cost: { special: 2 }, damage: 0, cooldown: 4, effect: 'buff', description: 'Unlocks latent power to drastically buff stats.' },
            { id: 'father_son_kamehameha', name: 'Father-Son Kamehameha', cost: { ki: 3, special: 1 }, damage: 280, cooldown: 4, effect: 'pierce', description: 'An overwhelmingly powerful blast.' }
        ],
        dodge: { name: 'Super Speed', successRate: 0.7, cost: { physical: 1 }, cooldown: 1, description: 'Evades quickly.' }
    },
    {
        id: 'trunks',
        name: 'Future Trunks',
        maxHp: 900,
        stats: { attack: 80, defense: 60, speed: 85 },
        imageColor: '#818cf8',
        portraitUrl: '/assets/characters/trunks.png',
        techniques: [
            { id: 'burning_attack', name: 'Burning Attack', cost: { ki: 2 }, damage: 150, cooldown: 2, effect: 'stun', description: 'A barrage of rapid hand movements followed by a fiery blast.' },
            { id: 'shining_sword_attack', name: 'Shining Sword Attack', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'none', description: 'Slices the opponent rapidly.' },
            { id: 'heat_dome', name: 'Heat Dome Attack', cost: { ki: 3, special: 1 }, damage: 260, cooldown: 4, effect: 'pierce', description: 'Surrounds self in energy and fires upwards.' }
        ],
        dodge: { name: 'Sword Block', successRate: 0.75, cost: { physical: 1 }, cooldown: 1, description: 'Deflects with sword.' }
    },
    {
        id: 'krillin',
        name: 'Krillin',
        maxHp: 800,
        stats: { attack: 60, defense: 70, speed: 75 },
        imageColor: '#fb923c',
        portraitUrl: '/assets/characters/krillin.png',
        techniques: [
            { id: 'destructo_disc', name: 'Destructo Disc', cost: { ki: 2, special: 1 }, damage: 250, cooldown: 3, effect: 'pierce', description: 'A razor-sharp disc of energy that cuts through anything.' },
            { id: 'solar_flare', name: 'Solar Flare', cost: { special: 1 }, damage: 10, cooldown: 2, effect: 'stun', description: 'Blinds the enemy temporarily.' },
            { id: 'scatter_kamehameha', name: 'Scatter Kamehameha', cost: { ki: 3 }, damage: 180, cooldown: 2, effect: 'none', description: 'Fires multiple blasts at once.' }
        ],
        dodge: { name: 'Tactical Retreat', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Ducks out of the way.' }
    },
    {
        id: 'tien',
        name: 'Tien Shinhan',
        maxHp: 850,
        stats: { attack: 70, defense: 65, speed: 70 },
        imageColor: '#14b8a6',
        portraitUrl: '/assets/characters/tien.png',
        techniques: [
            { id: 'tri_beam', name: 'Tri-Beam', cost: { ki: 3, special: 1 }, damage: 270, cooldown: 4, effect: 'stun', description: 'A powerful blast that drains the user.' },
            { id: 'dodompa', name: 'Dodompa', cost: { ki: 1 }, damage: 90, cooldown: 1, effect: 'pierce', description: 'A quick, piercing beam.' },
            { id: 'multi_form', name: 'Multi-Form', cost: { special: 2 }, damage: 0, cooldown: 5, effect: 'buff', description: 'Creates clones, buffing attack.' }
        ],
        dodge: { name: 'Four Witches Guard', successRate: 0.6, cost: { physical: 1, ki: 1 }, cooldown: 2, description: 'Uses extra arms to block.' }
    },
    {
        id: 'yamcha',
        name: 'Yamcha',
        maxHp: 800,
        stats: { attack: 65, defense: 60, speed: 80 },
        imageColor: '#f87171',
        portraitUrl: '/assets/characters/yamcha.png',
        techniques: [
            { id: 'wolf_fang_fist', name: 'Wolf Fang Fist', cost: { physical: 2 }, damage: 130, cooldown: 2, effect: 'weaken', description: 'A flurry of rapid physical strikes.' },
            { id: 'spirit_ball', name: 'Spirit Ball', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 3, effect: 'none', description: 'A controllable ball of energy.' },
            { id: 'kamehameha_yamcha', name: 'Kamehameha', cost: { ki: 2 }, damage: 120, cooldown: 2, effect: 'none', description: 'A standard energy wave.' }
        ],
        dodge: { name: 'Quick Step', successRate: 0.7, cost: { physical: 1 }, cooldown: 1, description: 'Steps out of the way.' }
    },
    {
        id: 'android18',
        name: 'Android 18',
        maxHp: 950,
        stats: { attack: 75, defense: 75, speed: 85 },
        imageColor: '#fde047',
        portraitUrl: '/assets/characters/android18.png',
        techniques: [
            { id: 'destructive_disc', name: 'Destructive Disc', cost: { ki: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'pierce', description: 'Similar to Krillin’s disc.' },
            { id: 'sadistic_dance', name: 'Sadistic Dance', cost: { physical: 3 }, damage: 190, cooldown: 2, effect: 'weaken', description: 'A brutal combo of physical attacks.' },
            { id: 'high_pressure_blast', name: 'High Pressure Blast', cost: { ki: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'A localized explosion.' }
        ],
        dodge: { name: 'Infinite Energy Guard', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Uses unlimited energy to generate a weak shield.' }
    },
    {
        id: 'android17',
        name: 'Android 17',
        maxHp: 950,
        stats: { attack: 75, defense: 80, speed: 85 },
        imageColor: '#10b981',
        portraitUrl: '/assets/characters/android17.png',
        techniques: [
            { id: 'android_barrier', name: 'Android Barrier', cost: { special: 2 }, damage: 50, cooldown: 4, effect: 'buff', description: 'Deals minor damage while buffing defense heavily.' },
            { id: 'super_electric_strike', name: 'Super Electric Strike', cost: { ki: 3, physical: 1 }, damage: 220, cooldown: 3, effect: 'stun', description: 'Throws a massive wave of electrical energy.' },
            { id: 'power_blitz', name: 'Power Blitz', cost: { ki: 2 }, damage: 130, cooldown: 1, effect: 'none', description: 'Fires basic energy spheres.' }
        ],
        dodge: { name: 'Parkour Dodge', successRate: 0.75, cost: { physical: 1 }, cooldown: 1, description: 'Nimble movement to avoid attacks.' }
    },
    {
        id: 'android16',
        name: 'Android 16',
        maxHp: 1100,
        stats: { attack: 85, defense: 85, speed: 50 },
        imageColor: '#059669',
        portraitUrl: '/assets/characters/android16.png',
        techniques: [
            { id: 'hells_flash', name: 'Hell\'s Flash', cost: { ki: 3, special: 2 }, damage: 280, cooldown: 4, effect: 'pierce', description: 'Removes hands to fire devastating cannons.' },
            { id: 'rocket_punch', name: 'Rocket Punch', cost: { physical: 2 }, damage: 150, cooldown: 2, effect: 'stun', description: 'Fires his arm like a missile.' },
            { id: 'bear_hug', name: 'Bear Hug', cost: { physical: 3 }, damage: 180, cooldown: 3, effect: 'weaken', description: 'Crushes the opponent.' }
        ],
        dodge: { name: 'Tough Armor', successRate: 0.5, cost: { special: 1 }, cooldown: 2, description: 'Rely on pure defense, mitigating the hit.' }
    },
    {
        id: 'bardock',
        name: 'Bardock',
        maxHp: 950,
        stats: { attack: 85, defense: 60, speed: 70 },
        imageColor: '#b91c1c',
        portraitUrl: '/assets/characters/bardock.png',
        techniques: [
            { id: 'riot_javelin', name: 'Riot Javelin', cost: { ki: 2, physical: 1 }, damage: 180, cooldown: 2, effect: 'pierce', description: 'A final, desperate energy blast.' },
            { id: 'saiyan_spirit', name: 'Saiyan Spirit', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 3, effect: 'none', description: 'A fierce combo of desperate punches.' },
            { id: 'rebellion_trigger', name: 'Rebellion Trigger', cost: { ki: 3 }, damage: 230, cooldown: 3, effect: 'none', description: 'A concentrated wave of energy.' }
        ],
        dodge: { name: 'Premonition', successRate: 0.65, cost: { special: 1 }, cooldown: 3, description: 'Sees the future briefly to dodge.' }
    },
    {
        id: 'broly',
        name: 'Broly (DBZ)',
        maxHp: 1300,
        stats: { attack: 100, defense: 80, speed: 65 },
        imageColor: '#a3e635',
        portraitUrl: '/assets/characters/broly.png',
        techniques: [
            { id: 'omega_blaster', name: 'Omega Blaster', cost: { ki: 3, special: 2 }, damage: 320, cooldown: 4, effect: 'none', description: 'A massive sphere of green ki.' },
            { id: 'eraser_cannon', name: 'Eraser Cannon', cost: { ki: 2, physical: 1 }, damage: 200, cooldown: 2, effect: 'pierce', description: 'A powerful blast from the hand.' },
            { id: 'gigantic_slam', name: 'Gigantic Slam', cost: { physical: 3 }, damage: 240, cooldown: 3, effect: 'stun', description: 'Slams the enemy into the ground.' }
        ],
        dodge: { name: 'Lariat', successRate: 0.4, cost: { physical: 2 }, cooldown: 3, description: 'Powers through the attack with sheer mass.' }
    },
    {
        id: 'cooler',
        name: 'Cooler',
        maxHp: 950,
        stats: { attack: 85, defense: 70, speed: 80 },
        imageColor: '#581c87',
        portraitUrl: '/assets/characters/cooler.png',
        techniques: [
            { id: 'supernova', name: 'Supernova', cost: { ki: 3, special: 2 }, damage: 300, cooldown: 4, effect: 'none', description: 'A massive sun-like sphere of energy.' },
            { id: 'death_chaser', name: 'Death Chaser', cost: { physical: 2, ki: 1 }, damage: 180, cooldown: 2, effect: 'weaken', description: 'A ruthless physical combo.' },
            { id: 'eye_laser', name: 'Eye Laser', cost: { ki: 1 }, damage: 80, cooldown: 1, effect: 'pierce', description: 'Quick precision lasers from the eyes.' }
        ],
        dodge: { name: 'Instant Counter', successRate: 0.7, cost: { special: 1, physical: 1 }, cooldown: 2, description: 'Dodges and attempts to retaliate.' }
    },
    {
        id: 'raditz',
        name: 'Raditz',
        maxHp: 750,
        stats: { attack: 65, defense: 60, speed: 70 },
        imageColor: '#1e3a8a',
        portraitUrl: '/assets/characters/raditz.png',
        techniques: [
            { id: 'double_sunday', name: 'Double Sunday', cost: { ki: 2 }, damage: 130, cooldown: 2, effect: 'none', description: 'Fires two beams from both hands.' },
            { id: 'saturday_crash', name: 'Saturday Crash', cost: { ki: 1, special: 1 }, damage: 140, cooldown: 2, effect: 'stun', description: 'A paralyzing sphere of energy.' },
            { id: 'cowardly_strike', name: 'Cowardly Strike', cost: { physical: 2 }, damage: 110, cooldown: 1, effect: 'weaken', description: 'A cheap shot.' }
        ],
        dodge: { name: 'Look Over There!', successRate: 0.8, cost: { special: 1 }, cooldown: 3, description: 'Distracts the opponent to evade.' }
    },
    {
        id: 'nappa',
        name: 'Nappa',
        maxHp: 950,
        stats: { attack: 75, defense: 75, speed: 50 },
        imageColor: '#ca8a04',
        portraitUrl: '/assets/characters/nappa.png',
        techniques: [
            { id: 'giant_storm', name: 'Giant Storm', cost: { ki: 3 }, damage: 220, cooldown: 3, effect: 'none', description: 'Raises two fingers to cause a huge explosion.' },
            { id: 'break_cannon', name: 'Break Cannon', cost: { ki: 2, physical: 1 }, damage: 190, cooldown: 2, effect: 'pierce', description: 'Fires a beam from the mouth.' },
            { id: 'bomber_dx', name: 'Bomber DX', cost: { ki: 2 }, damage: 150, cooldown: 1, effect: 'none', description: 'A massive blast of energy.' }
        ],
        dodge: { name: 'Tough Skin', successRate: 0.4, cost: { physical: 1 }, cooldown: 1, description: 'Flexes muscles to absorb impact.' }
    },
    {
        id: 'ginyu',
        name: 'Captain Ginyu',
        maxHp: 850,
        stats: { attack: 75, defense: 70, speed: 75 },
        imageColor: '#7e22ce',
        portraitUrl: '/assets/characters/ginyu.png',
        techniques: [
            { id: 'milky_cannon', name: 'Milky Cannon', cost: { ki: 2, physical: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'A powerful purple blast.' },
            { id: 'pose', name: 'Ginyu Pose', cost: { special: 2 }, damage: 0, cooldown: 3, effect: 'buff', description: 'Poses to drastically increase stats.' },
            { id: 'body_change', name: 'Body Change', cost: { special: 3 }, damage: 200, cooldown: 5, effect: 'stun', description: 'A risky maneuver that heavily damages and stuns.' }
        ],
        dodge: { name: 'Ginyu Force Rules', successRate: 0.6, cost: { special: 1 }, cooldown: 2, description: 'Performs a weird dance to dodge.' }
    },
    {
        id: 'recoome',
        name: 'Recoome',
        maxHp: 1000,
        stats: { attack: 80, defense: 80, speed: 40 },
        imageColor: '#ea580c',
        portraitUrl: '/assets/characters/recoome.png',
        techniques: [
            { id: 'recoome_eraser_gun', name: 'Recoome Eraser Gun', cost: { ki: 3 }, damage: 240, cooldown: 3, effect: 'none', description: 'Massive blast from the mouth.' },
            { id: 'recoome_kick', name: 'Recoome Kick', cost: { physical: 2 }, damage: 160, cooldown: 2, effect: 'pierce', description: 'A devastating flying knee.' },
            { id: 'recoome_mach_punch', name: 'Recoome Mach Punch', cost: { physical: 3 }, damage: 200, cooldown: 2, effect: 'weaken', description: 'A relentless barrage of punches.' }
        ],
        dodge: { name: 'Recoome Pose', successRate: 0.5, cost: { special: 1 }, cooldown: 2, description: 'Strikes a pose to ignore damage.' }
    },
    {
        id: 'burter',
        name: 'Burter',
        maxHp: 800,
        stats: { attack: 65, defense: 50, speed: 95 },
        imageColor: '#2563eb',
        portraitUrl: '/assets/characters/burter.png',
        techniques: [
            { id: 'blue_hurricane', name: 'Blue Hurricane', cost: { physical: 2, ki: 1 }, damage: 170, cooldown: 2, effect: 'none', description: 'Spins rapidly to create a vortex.' },
            { id: 'mach_kick', name: 'Mach Kick', cost: { physical: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'Fastest kick in the universe.' },
            { id: 'space_mach_attack', name: 'Space Mach Attack', cost: { ki: 2, special: 1 }, damage: 210, cooldown: 3, effect: 'stun', description: 'Blinds the enemy with speed.' }
        ],
        dodge: { name: 'Blue Blur', successRate: 0.9, cost: { ki: 1 }, cooldown: 1, description: 'Moves faster than the eye can see.' }
    },
    {
        id: 'jeice',
        name: 'Jeice',
        maxHp: 800,
        stats: { attack: 70, defense: 60, speed: 80 },
        imageColor: '#dc2626',
        portraitUrl: '/assets/characters/jeice.png',
        techniques: [
            { id: 'crusher_ball', name: 'Crusher Ball', cost: { ki: 3 }, damage: 200, cooldown: 2, effect: 'none', description: 'A red sphere of intense energy.' },
            { id: 'fire_crusher', name: 'Fire Crusher', cost: { ki: 2, physical: 1 }, damage: 170, cooldown: 2, effect: 'none', description: 'Combines ki attacks with physical strikes.' },
            { id: 'red_magma', name: 'Red Magma', cost: { special: 2 }, damage: 120, cooldown: 2, effect: 'weaken', description: 'Burns the opponent, weakening them.' }
        ],
        dodge: { name: 'Red Comet', successRate: 0.7, cost: { physical: 1 }, cooldown: 2, description: 'Leaves a red trail while evading.' }
    },
    {
        id: 'guldo',
        name: 'Guldo',
        maxHp: 650,
        stats: { attack: 50, defense: 50, speed: 40 },
        imageColor: '#65a30d',
        portraitUrl: '/assets/characters/guldo.png',
        techniques: [
            { id: 'time_freeze', name: 'Time Freeze', cost: { special: 3 }, damage: 50, cooldown: 5, effect: 'stun', description: 'Holds breath to freeze time.' },
            { id: 'telekinesis_tree', name: 'Telekinesis (Tree)', cost: { special: 2 }, damage: 120, cooldown: 2, effect: 'pierce', description: 'Throws a tree at the opponent.' },
            { id: 'mind_bind', name: 'Mind Bind', cost: { special: 1, ki: 1 }, damage: 80, cooldown: 3, effect: 'weaken', description: 'Paralyzes the opponent.' }
        ],
        dodge: { name: 'Hold Breath', successRate: 0.95, cost: { special: 2 }, cooldown: 4, description: 'Freezes time to walk out of the way.' }
    },
    {
        id: 'zarbon',
        name: 'Zarbon',
        maxHp: 850,
        stats: { attack: 75, defense: 65, speed: 80 },
        imageColor: '#0ea5e9',
        portraitUrl: '/assets/characters/zarbon.png',
        techniques: [
            { id: 'elegant_blaster', name: 'Elegant Blaster', cost: { ki: 2 }, damage: 140, cooldown: 1, effect: 'none', description: 'A refined energy wave.' },
            { id: 'monster_crush', name: 'Monster Crush', cost: { physical: 3 }, damage: 210, cooldown: 3, effect: 'stun', description: 'Uses monster form for a brutal slam.' },
            { id: 'shooting_star', name: 'Shooting Star', cost: { ki: 1, physical: 1 }, damage: 130, cooldown: 2, effect: 'weaken', description: 'A quick dive kick.' }
        ],
        dodge: { name: 'Graceful Evade', successRate: 0.7, cost: { ki: 1 }, cooldown: 1, description: 'Dodges with elegance.' }
    },
    {
        id: 'dodoria',
        name: 'Dodoria',
        maxHp: 900,
        stats: { attack: 80, defense: 75, speed: 60 },
        imageColor: '#be123c',
        portraitUrl: '/assets/characters/dodoria.png',
        techniques: [
            { id: 'dodoria_beam', name: 'Dodoria Beam', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'A blast from the mouth.' },
            { id: 'ruthless_blow', name: 'Ruthless Blow', cost: { physical: 2 }, damage: 150, cooldown: 1, effect: 'pierce', description: 'A savage punch.' },
            { id: 'maximum_buster', name: 'Maximum Buster', cost: { ki: 3 }, damage: 220, cooldown: 3, effect: 'stun', description: 'A massive wave of energy.' }
        ],
        dodge: { name: 'Thick Hide', successRate: 0.4, cost: { physical: 1 }, cooldown: 1, description: 'Relies on fat to absorb the blow.' }
    },
    {
        id: 'dabra',
        name: 'Dabura',
        maxHp: 950,
        stats: { attack: 85, defense: 70, speed: 75 },
        imageColor: '#db2777',
        portraitUrl: '/assets/characters/dabra.png',
        techniques: [
            { id: 'stone_spit', name: 'Stone Spit', cost: { special: 3 }, damage: 100, cooldown: 5, effect: 'stun', description: 'Turns the opponent to stone.' },
            { id: 'evil_flame', name: 'Evil Flame', cost: { ki: 2, special: 1 }, damage: 180, cooldown: 2, effect: 'none', description: 'Breathes demonic fire.' },
            { id: 'dark_sword', name: 'Darkness Sword Attack', cost: { physical: 2, ki: 1 }, damage: 190, cooldown: 2, effect: 'pierce', description: 'Slashes with a conjured sword.' }
        ],
        dodge: { name: 'Magic Materialization', successRate: 0.65, cost: { special: 1 }, cooldown: 2, description: 'Evades using demonic magic.' }
    },
    {
        id: 'gotenks',
        name: 'Gotenks',
        maxHp: 900,
        stats: { attack: 85, defense: 60, speed: 90 },
        imageColor: '#fcd34d',
        portraitUrl: '/assets/characters/gotenks.png',
        techniques: [
            { id: 'galactic_donut', name: 'Galactic Donut', cost: { special: 2 }, damage: 120, cooldown: 3, effect: 'stun', description: 'Traps opponent in a ring of ki.' },
            { id: 'super_ghost_kamikaze', name: 'Super Ghost Kamikaze', cost: { ki: 3, special: 1 }, damage: 250, cooldown: 4, effect: 'pierce', description: 'Explosive ghosts track the enemy.' },
            { id: 'continuous_die_die', name: 'Continuous Die Die', cost: { ki: 2, physical: 2 }, damage: 220, cooldown: 3, effect: 'none', description: 'A rapid barrage of ki blasts.' }
        ],
        dodge: { name: 'Childish Evasion', successRate: 0.85, cost: { physical: 1 }, cooldown: 2, description: 'Unpredictable movements.' }
    },
    {
        id: 'vegito',
        name: 'Vegito',
        maxHp: 1200,
        stats: { attack: 95, defense: 85, speed: 90 },
        imageColor: '#1d4ed8',
        portraitUrl: '/assets/characters/vegito.png',
        techniques: [
            { id: 'spirit_sword', name: 'Spirit Sword', cost: { ki: 2, physical: 2 }, damage: 260, cooldown: 3, effect: 'pierce', description: 'Impales the opponent with a sword of light.' },
            { id: 'final_kamehameha', name: 'Final Kamehameha', cost: { ki: 3, special: 2 }, damage: 320, cooldown: 4, effect: 'none', description: 'The ultimate combined blast.' },
            { id: 'savage_counter', name: 'Savage Counter', cost: { physical: 2, special: 1 }, damage: 200, cooldown: 2, effect: 'stun', description: 'Taunts and kicks the opponent.' }
        ],
        dodge: { name: 'Absolute Confidence', successRate: 0.8, cost: { special: 1 }, cooldown: 2, description: 'Dodges effortlessly.' }
    },
    {
        id: 'gogeta',
        name: 'Gogeta',
        maxHp: 1150,
        stats: { attack: 100, defense: 75, speed: 95 },
        imageColor: '#d97706',
        portraitUrl: '/assets/characters/gogeta.png',
        techniques: [
            { id: 'soul_punisher', name: 'Soul Punisher', cost: { ki: 2, special: 3 }, damage: 350, cooldown: 5, effect: 'pierce', description: 'Disintegrates all evil.' },
            { id: 'big_bang_kamehameha', name: 'Big Bang Kamehameha', cost: { ki: 3, physical: 1 }, damage: 280, cooldown: 3, effect: 'none', description: 'A devastating beam.' },
            { id: 'stardust_fall', name: 'Stardust Fall', cost: { ki: 3 }, damage: 230, cooldown: 2, effect: 'none', description: 'Rains down explosive ki.' }
        ],
        dodge: { name: 'Blink', successRate: 0.85, cost: { ki: 1 }, cooldown: 1, description: 'Moves instantaneously to evade.' }
    }
];
