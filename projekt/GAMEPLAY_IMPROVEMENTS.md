# 🎮 Dragon Ball Arena - Proposed Gameplay Improvements

## ✅ Completed Changes (This Session)

### 1. **Improved UI Layout**
- ✓ Action bar now displays in **3-column grid** (instead of 2 lines) for better readability
- ✓ Added **opponent character selector** - players can now choose which opponent to attack
- ✓ All UI components use consistent glassmorphism design

### 2. **New Status Effects**
- ✓ **Poison (新)** - Added to types.ts
  - Affects: Piccolo's Light Grenade, Frieza's Death Ball, Quick's Fire Crusher, Buu's Candy Beam, Jeice's Fire Crusher
  - Mechanics: Deals DOT (damage over time) damage each turn
  - Can be stacked with other effects

### 3. **AoE (Area of Effect) Abilities - Heroes Can Hit ALL Enemies**
#### Strong Characters Rebalanced (More HP → Less)
- **Goku** - Now 920 HP (was 1000) - Spirit Bomb is AoE
- **Vegeta** - Now 880 HP (was 950) - Final Flash is AoE  
- **Broly** - Now 1150 HP (was 1300) - Omega Blaster is AoE
- **Gogeta** - Now 1050 HP (was 1150) - Soul Punisher & Final Kamehameha are AoE
- **Vegito** - Now 1100 HP (was 1200) - Spirit Sword & Final Kamehameha are AoE

#### Weak Characters Buffed (More HP)
- **Guldo** - Now 750 HP (was 650) - +100 HP
- **Raditz** - Now 820 HP (was 750) - +70 HP
- **Krillin** - Now 900 HP (was 800) - +100 HP
- **Yamcha** - Now 850 HP (was 800) - +50 HP
- **Burter** - Now 750 HP (was 800) - Balanced for speed

### 4. **Poison Effect Additions**
- Piccolo: Light Grenade now poisons
- Frieza: Death Ball now poisons instead of pure damage
- Broly: Eraser Cannon poisons
- Jeice: Fire Crusher poisons
- Buu: Candy Beam poisons ALL enemies (team-wide)

---

## 🚀 Suggested Additional Improvements (Available for Implementation)

### Type 1: **Elemental System**
```
- KI attacks: Pure energy (lightning fast)
- PHYSICAL attacks: Strong but slow
- SPECIAL attacks: Elemental (Fire, Ice, Lightning, Dark)
- Rock-Paper-Scissors style counters
Example: Fire > Ice > Lightning > Fire
```

### Type 2: **Combo System**
```
- Chain abilities together for bonuses
- Meter fills with each action
- At 100%, unlock "Ultimate Combo"
Example: Piccolo Demon Hand → Light Grenade hits BOTH arms
```

### Type 3: **Team Synergy Bonuses**
```
- Saiyan team: +10% damage per Saiyan
- Androids team: +15% defense per Android
- Ginyu Force: Special "Pose Formation" = +30% all stats
- Mixed teams: +5% versatility
```

### Type 4: **Critical Strike System** 🎯 COMPLETE FORMULA & IMPLEMENTATION
```
CRITICAL STRIKE SYSTEM - MECHANICS & STRATEGY:

1. CRITICAL HIT CHANCE FORMULA:
   CritChance = (Character.Speed / 100) * TechniqueBase%
   
   Technique Base Crit Chances:
   - Melee attacks: 15%
   - Energy blasts: 12%
   - Buff/Utility: Cannot crit
   
   Modifiers:
   + Target has Stun effect: +20% crit
   + Target has Weaken effect: +10% crit  
   + Target has Poison effect: +5% crit
   + Night time: +10% bonus
   + Atmospheric Pressure L3: +5% bonus
   
   Examples:
   Gotenks (SPD 90) Melee: 90/100 * 15% = 13.5% ≈ 14% base
   Yamcha (SPD 80) Melee: 80/100 * 15% = 12%
   Piccolo (SPD 65) Melee: 65/100 * 15% = 9.75% ≈ 10%
   Guldo (SPD 45) Melee: 45/100 * 15% = 6.75% ≈ 7%

2. CRITICAL DAMAGE MULTIPLIER:
   BaseDamage * CritMultiplier = CritDamage
   
   CritMultiplier = 1.5x base
   
   Scaling by Attacker ATK:
   + Bonus: (Attacker.ATK / 20) * 0.1x
   
   Scaling by Target DEF:
   - Reduction: (Target.DEF / 100) * 0.2x
   
   Example calculations:
   Goku (ATK 85) vs Piccolo (DEF 80):
   1.5 + (85/20)*0.1 - (80/100)*0.2 = 1.5 + 0.425 - 0.16 = 1.765x
   
   Broly (ATK 95, highest): 
   1.5 + (95/20)*0.1 - defense_reduction = highest crit damage
   
   Krillin (ATK 60, lowest):
   1.5 + (60/20)*0.1 - defense_reduction = lowest crit damage

3. CRIT STREAK MECHANIC (adds gambling risk/reward):
   - Consecutive critical hits tracked per character
   - 2 crits in row: -5% DEF penalty next turn (they see the pattern!)
   - 3 crits in row: -10% DEF + Stun for 1 turn (break their rhythm)
   - 4+ crits: Auto-stun for 2 turns (game mercy)
   
   This prevents "lucky" crit chains from dominating endgame

4. STATUS EFFECT INTERACTIONS:
   Stunned target: 0% crit (can't attack)
   Weakened target: Attacker gains +10% crit, but crit deals -25% damage
   Poisoned target: Attacker gains +5% crit, no damage penalty
   Buffed attacker: Reduces crit% by 5%, but crit deals +50% damage
   
   Trade-off: Buff yourself to hit LESS often but MUCH harder

5. STRATEGIC IMPLICATIONS:
   Why Speed becomes critical win condition:
   - Speed scales crit chance linearly
   - Fast characters (Gotenks 90 SPD) dominate early turns
   - Slow tanks must survive until crit streak triggers
   - Speed build needs defensive support to not die to crits
   
   Counter-strategy ladder:
   - Get crit'd twice? Switch character (reset streak)
   - Watch crit pattern? Switch defensive stance
   - Accumulate weaken? Use buff to reset multiplier

6. ANIMATION & AUDIO:
   On critical hit:
   - Damage number renders in RED (not white)
   - +25% larger font size for damage text
   - Screen shakes 2px horizontal for 150ms
   - Bright flash effect around target
   - Sound: high-pitched "TING!" effect
   
   Crit streak counter (visible at 2+):
   - Badge "2x" / "3x" / "4x" near attacker name
   - Golden glow around character portrait at streak 2
   - Red glow at streak 3+
   - "HOT HAND!" message pops up at 3 streak

7. IMPLEMENTATION CHECKLIST:
   types.ts:
   ✓ Add critChance: number to Technique
   ✓ Add critStreak: number to Character (0-4)
   ✓ Update EffectType implications
   
   useGameState.ts calculateDamage():
   ✓ Roll: Math.random() < chance → crit = true
   ✓ If crit: multiply by calculated multiplier
   ✓ Track critStreak on attacker
   ✓ Apply crit streak DEF penalty if ≥2
   ✓ Apply stun at ≥3
   
   BattleArena.tsx:
   ✓ Color damage text red on crit
   ✓ Scale damage text 125%
   ✓ Trigger screen shake
   ✓ Show streak counter badge
   ✓ Play crit SFX
```

### Type 5: **Energy Management**
```
- Passive recovery: +1 random energy/turn for Namekians (Piccolo trait)
- "Deep Breath" technique: costs 0, recovers 2 random energy
  Available to: Krillin, Yamcha, Tien, Gohan, Gotenks (Human characters)
- Shared team energy pool OR separate (configurable)
- Overcharge: Spend extra ki for +50% damage (risky)
```

### Type 6: **Status Effect Effectiveness**
```typescript
// Current: Just apply effect for N duration
// Proposed: Effectiveness scales with stats

Stun Effectiveness  = Target's Speed vs Attacker's Attack
Poison Effectiveness = Attacker's Special vs Target's Defense
Weaken Effectiveness = Attacker's Attack vs Target's Defense

Example:
- High-speed enemies resist Stun more
- High-Defense enemies resist Poison more
- This creates counter-play strategy
```

### Type 7: **Ultimate Abilities (1 per character, max once per match)**
```
Examples:
- Goku: "Ultra Instinct" - All 3 party members gain +100% dodge for 2 turns
- Vegeta: "Big Bang Attack" - Massive AoE, -30% team enemy energy
- Frieza: "Planet Annihilation" - Destroys target (1-hit KO if > 80% HP)
- Buu: "Absorb" - Heal 50% damage dealt, gain target's stat bonuses
```

### Type 8: **Weakness/Strength System**
```
Examples:
- Androids weak to EMP (special attack type)
- Saiyans weak to Energy Drain, strong vs Physical
- Humans strong vs finesse attacks, weak vs raw power
- Demons strong vs holy attacks

Adds depth to character selection & team building
```

### Type 9: **Environment Effects** 🎯 DETAILED IMPLEMENTATION
```
ENVIRONMENT SYSTEM ARCHITECTURE:

1. STATIC ENVIRONMENTS (Set at battle start):
   
   a) TIME-BASED MODIFIERS:
      Morning (6:00-12:00): +10% Speed, +5% Critical Chance
         → Favors fast characters (Gotenks: 90 SPD, Yamcha: 80 SPD)
      Afternoon (12:00-18:00): +10% Damage, -5% Defense  
         → Favors attackers (Goku: 85 ATK, Broly: 95 ATK)
      Evening (18:00-22:00): +10% Defense, +5% Dodge
         → Favors defenders (Piccolo: 80 DEF)
      Night (22:00-6:00): +5% Accuracy, -10% Speed
         → Tactical, timing-based meta
   
   b) WEATHER SYSTEM:
      Clear: Baseline (no modifier)
      Rain: -15% Fire technique damage, +5% Water/Electric accuracy
      Snow: -10% Speed, +10% Ice-resistance, -5% accuracy
      Sandstorm: -15% Special damage, +10% Physical resistance
      Thunder Storm: +20% Electric damage, 10% technique miss chance

   c) GRAVITY ZONES:
      Normal (Earth): 1.0x stat multiplier
      Heavy (Planet Vegeta): +20% DEF, -10% SPD, +20% miss reduction for Saiyans
      Light (Kai World): +20% SPD, -10% DEF, AoE hits random non-target
      Zero Gravity (Space): -50% dodge effectiveness, +25% energy costs

2. DYNAMIC ENVIRONMENT EVENTS (Triggered during battle):
   
   a) TERRAIN DEGRADATION:
      - Each turn there's 20% chance terrain "cracks"
      - After 5 cracks: "Unstable Terrain" penalty
      - -15% accuracy for all attacks
      - Resets after any character switch or 4 rounds pass
   
   b) ENERGY SURGES:
      - 15% chance per round: Random character gains +1 ki energy
      - Can chain: 2 surges in row = +1 bonus damage next hit
   
   c) ATMOSPHERIC PRESSURE (increases passively):
      Every 3 rounds, pressure level +1:
      - Level 1 (Rounds 1-3): Normal (baseline)
      - Level 2 (Rounds 4-6): -5% speed, +5% damage
      - Level 3 (Rounds 7+): -10% speed, +15% damage, -10% defense
      - Special technique "Pressure Release" resets to Level 1 (costs 2 ki)

3. IMPLEMENTATION CHECKLIST:
   
   types.ts:
   ✓ Add type EnvironmentType = 'normal' | 'rain' | 'snow' | 'storm' | 'sandstorm'
   ✓ Add type GravityType = 'normal' | 'heavy' | 'light' | 'zero'
   ✓ Add TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'
   ✓ Add to GameState: environment: EnvironmentType; gravity: GravityType; timeOfDay: TimeOfDay
   
   useGameState.ts:
   ✓ getEnvironmentModifier(stat: 'atk'|'def'|'spd') → returns stat multiplier
   ✓ calculateDamage() applies environment to damage formula
   ✓ calculateDodgeChance() applies weather/gravity to dodge
   ✓ Track terrainCracks counter in state
   ✓ Track atmosphericPressure level in endTurn()
   ✓ Apply pressure penalties to character stats
   
   BattleArena.tsx:
   ✓ Display environment info in battle header (weather icon, time, pressure level)
   ✓ Show visual indicator when terrain cracks (visual effect on arena)
   ✓ Show glowing effect when energy surge happens

4. CHARACTER-ENVIRONMENT SYNERGIES:
   Perfect pairing bonuses (+10% stats):
   - Goku: Morning + Normal gravity (native training conditions)
   - Piccolo: Evening + Heavy gravity  
   - Gotenks: Morning + Light gravity (speed boost stacks)
   - Frieza: Night + Zero gravity (space conqueror)
   - Broly: Heavy gravity (legendary power thrives under pressure)

5. BALANCE TUNING:
   - Time modifier cap: ±10% per stat (no cascading multiplier)
   - Weather doesn't completely hard-counter (penalty, not immunity)
   - Pressure scaling: increases damage to reward finishing fights faster
   - Terrain cracks are slow to accumulate (5 needed, ~15 turns minimum)
```

### Type 10: **Battle Modifiers/Mutators**
```
Selectable before draft:
- "No Items" - Simpler resource management
- "Lightning Rounds" - Turns last 5 max, then auto-win condition
- "Energy Rich" - Start with 5 random energy per character
- "Hardcore" - Stuns lock character for 3 turns (not 1)
- "Chain Reaction" - Consecutive same-type skills +30% bonus
```

### Type 11: **Skill Tree / Character Progression**
```
Unlock new techniques:
- Goku: Level 1 → Unlock "Kaioken", Level 2 → "Super Saiyan" forms
- +1% per level in chosen stat (Attack, Defense, or Speed)
- Persists across matches  for ranked mode only
```

### Type 12: **Interactive Technique Descriptions** 🎯 TOOLTIP & GUIDANCE SYSTEM
```
INTELLIGENT TECHNIQUE GUIDANCE - CONTEXT-AWARE TOOLTIPS:

1. TOOLTIP ARCHITECTURE:
   
   Each technique shows dynamic info based on GAME STATE:
   
   a) STATIC TOOLTIP INFO:
      - Technique name & ID
      - Cost: (X ki, Y physical, Z special)
      - Cooldown: N turns
      - Base damage: N (or damage range if variable)
      - Effect type: [stun|weaken|poison|buff|pierce|none]
      - Effect description in prose
      - Icon/visual representation
   
   b) DYNAMIC CONTEXTUAL INFO (shown when hovering):
      
      vs Current Target:
      ├─ "vs Piccolo (DEF 80)"
      ├─ Estimated damage: 45-52 HP
      ├─ Effectiveness: "NEUTRAL" (green) / "WEAK" (yellow) / "STRONG" (red)
      ├─ Hit chance: "95%" (based on dodge vs accuracy)
      │  └─ Calculated: (Accuracy vs Target.Dodge)
      ├─ Crit chance: "12%" (speed-dependent)
      └─ Interaction: "Piccolo is Weakened, +10% crit bonus!"
      
      Team Synergy:
      ├─ "Synergy with Krillin on team: +5% damage"
      ├─ "Synergy with Yamcha: Energy cost -1 ki"
      └─ "No synergy with Tien (different race)"
      
      Status Effect Info:
      ├─ "Stun duration: 1 turn (Piccolo has 65 SPD, will snap out faster)"
      ├─ "Poison: 3 damage/turn for 4 turns"
      ├─ "Weaken: -10% DEF, -5% damage for 2 turns"
      └─ "Buff: +15% damage for next attack, expires at next turn"
      
      Energy Management:
      ├─ "Your ki: 3/10 (enough for this technique)"
      ├─ "This technique leaves you with 0 ki"
      ├─ "Next turn you'll recover 1-2 ki randomly"
      └─ "WARNING: Low energy, consider passing next turn"
      
      Counter-Recommendations:
      ├─ If weak: "❌ NOT highlighted - Piccolo resists this"
      │  └─ Reason: "High DEF makes poison less effective"
      │  └─ Alternative: "Consider Stun technique instead"
      ├─ If strong: "✓ HIGHLIGHTED - Strong choice vs Piccolo!"
      │  └─ Reason: "Stun bypasses DEF stat"
      │  └─ Follow-up: "Then use physical attack for combo"
      └─ If neutral: "Reliable choice, no special advantage"

2. TOOLTIP EXAMPLES (Actual in-game text):
   
   Example 1: Goku's Kamehameha vs Piccolo (Weakened)
   ┌──────────────────────────────────────┐
   │ Kamehameha                          │
   │ Cost: 3 ki  DMG: 65-75              │
   │ Effect: PIERCING                    │
   │                                      │
   │ vs Piccolo (Weakened)               │
   │ → Est. Damage: 72-82 HP (boosted!)  │
   │ Effectiveness: STRONG ✓             │
   │ Hit Chance: 98%                     │
   │ Crit Chance: 14%                    │
   │                                      │
   │ "Weakened target takes +10% from    │
   │  piercing attacks. STRONG CHOICE!"  │
   └──────────────────────────────────────┘
   
   Example 2: Krillin's Deep Breath vs High Energy Pool
   ┌──────────────────────────────────────┐
   │ Deep Breath                         │
   │ Cost: 0 ki  DMG: 0                  │
   │ Effect: BUFF (recovers 2 energy)    │
   │ Cooldown: 3 turns                   │
   │                                      │
   │ vs current state                    │
   │ Your energy: 2/10 (very low!)       │
   │ Effectiveness: PERFECT ✓            │
   │ "Low energy detected. This will     │
   │  restore 2 random energy. IDEAL!"   │
   │                                      │
   │ Energy after: 4/10                  │
   └──────────────────────────────────────┘
   
   Example 3: Frieza's Electric Counter (vs 3 enemies)
   ┌──────────────────────────────────────┐
   │ Electric Counter                    │
   │ Cost: 4 special  DMG: 35 each       │
   │ Effect: POISON (3 turn duration)    │
   │ AoE: HITS ALL ENEMIES               │
   │                                      │
   │ Total impact: 3 targets             │
   │ → Goku (ATK 85): 35-40 damage       │
   │ → Vegeta (ATK 80): 35-40 damage     │
   │ → Gohan (ATK 85): 35-40 damage      │
   │ Crit x3 chance: 12% each            │
   │                                      │
   │ Poison affects 3: 9 damage/turn     │
   │ Total estimated: 150+ damage total! │
   │ "MASSIVE team AoE, perfect when      │
   │  opponent brings 3-char team!"      │
   └──────────────────────────────────────┘
   
   Example 4: Piccolo's Light Grenade vs Armored Enemy
   ┌──────────────────────────────────────┐
   │ Light Grenade                       │
   │ Cost: 4 ki  DMG: 60  Effect: Poison │
   │                                      │
   │ vs Broly (DEF 85, Armor passive)    │
   │ → Est. Damage: 32-38 HP (reduced)   │
   │ Effectiveness: WEAK ⚠               │
   │ Hit Chance: 88% (high DEF avoids)   │
   │                                      │
   │ "Broly's high DEF heavily reduces   │
   │  this damage. Consider:             │
   │  • Switch to stun for control       │
   │  • Use AoE to spread damage         │
   │  • Build another team member first" │
   └──────────────────────────────────────┘

3. UI IMPLEMENTATION:
   
   Trigger point: User hovers over technique button
   Display position: Tooltip appears to RIGHT of button
   - If button on right side of screen: tooltip appears LEFT
   - Follows cursor if moving
   - Dismisses when mouse leaves technique area
   
   Visual design:
   - Semi-transparent dark background (90% black opacity)
   - White text with color highlights
   - ✓ Green checkmark for good choices
   - ⚠ Yellow warning for mediocre choices  
   - ❌ Red X for bad choices
   - Icons for element type matching
   
   Scroll behavior:
   - If tooltip taller than viewport: make scrollable internally
   - Max width: 350px (allow text wrapping)
   - Padding: 12px all sides
   - Border-radius: 8px (glass morphic style)

4. DATA STRUCTURE (in types.ts):
   ```typescript
   interface Technique {
     id: string;
     name: string;
     cost: { ki?: number; physical?: number; special?: number };
     damage: number;
     cooldown: number;
     effect: EffectType;
     description: string;
     iconUrl: string;
     
     // NEW FIELDS FOR TOOLTIPS:
     baseHitChance?: number;  // 95% for most, 85% for wild attacks
     critBaseChance?: number;  // 15% for melee, 12% for blasts
     effectDuration?: number;  // turns this status effect lasts
     effectScaling?: 'fixed' | 'atk' | 'def';  // how effect scales
     isAoE?: boolean;  // hits all enemies
     synergies?: {  // bonus effects with certain teammates
       characterId: string;
       bonus: string;  // "+5% damage with X"
     }[];
   }
   ```

5. CALCULATION EXAMPLES (tooltip math):
   
   Estimated Damage = BaseDamage 
     * (1 + (Attacker.ATK - Target.DEF)/500)  // stat ratio
     * (1 + WeakenBonus)  // status effects
     * (1 + SynergyBonus)  // team synergy
     * (1 + TimeBonus)  // environment
   
   Hit Chance = BaseHitChance 
     - (Target.Dodge - Attacker.Accuracy*0.5)
     + (Target has Stun ? -30% : 0)
   
   Crit Chance = (Attacker.Speed/100) * CritBase
     + (Target has Weaken ? +10% : 0)
     + (Target has Poison ? +5% : 0)

6. RECOMMENDATION ALGORITHM:
   
   Score each technique against current target:
   ┌──────────────────────────────────┐
   │ Technique Score = Factors:       │
   │ + Base Damage (40%)              │
   │ + Effectiveness (30%)            │
   │ + Energy availability (20%)      │
   │ + Team synergy (10%)             │
   │ = Total score (color coded)      │
   └──────────────────────────────────┘
   
   Highlight green if: Score > 70%
   Highlight yellow if: Score 40-70%
   Highlight red if: Score < 40%
   
   Example: Krillin's Solar Flare vs Stun-Immune Enemy
   - Base Damage: 40/100
   - Effectiveness: 0/100 (immune!)
   - Energy available: 100/100 (free!)
   - Team synergy: 20/100 (no combo partners alive)
   - Total: (40*0.4 + 0*0.3 + 100*0.2 + 20*0.1) = 16 + 0 + 20 + 2 = 38%
   - Display: ❌ RED - "INEFFECTIVE vs this opponent"

7. IMPLEMENTATION ROADMAP:
   
   Phase 1 (MVP):
   ✓ Tooltip shows: name, cost, damage, effect, cooldown, description
   ✓ Contextual: damage estimate vs current target
   ✓ Contextual: hit chance percentage
   
   Phase 2 (Intermediate):
   ✓ Add recommendation scoring algorithm
   ✓ Add status effect interaction descriptions
   ✓ Add energy management warnings ("low energy!")
   
   Phase 3 (Advanced):
   ✓ Add character-specific synergy descriptions
   ✓ Add AoE damage total calculation
   ✓ Add crit chance explanation
   
   Phase 4 (Polish):
   ✓ Animations on tooltip appear/disappear
   ✓ Sound effect on recommendation highlight
   ✓ Keyboard navigation (arrow keys to next recommendation)
```

---

## 📊 Balance Indicators

### Current Tier Rankings (by power):
**S-Tier (Top 5):**
- Gogeta, Vegito, Broly (DBZ), Buu, Frieza

**A-Tier:**  
- Goku, Vegeta, Cell, Android 16, Gohan, Trunks

**B-Tier:**
- Piccolo, Tien, Recoome, Burter, Jeice, Zarbon, Dodoria, Ginyu, Cooler

**C-Tier:**
- Krillin, Yamcha, Android 17, Android 18, Bardock, Nappa, Raditz

**D-Tier (Weak):**
- Guldo

---

## 🎯 Recommended Next Steps (Priority Order)

1. **Implement Status Effect Effectiveness** (Type 6)
   - Most impactful for balance
   - Can be done without major UI changes
   - Makes stun/poison/weaken strategic

2. **Add Team Synergy Bonuses** (Type 3)
   - Encourages team building strategy
   - Relatively simple to implement
   - Increases replay value

3. **Critical Strike System** (Type 4)
   - Adds gambling element
   - Speed stat becomes more valuable
   - Simple to explain & balance

4. **Energy Management Improvements** (Type 5)
   - Better pacing of battles
   - Passive recovery makes matches more dynamic
   - Overcharge mechanic adds risk/reward

5. **Elemental System** (Type 1)
   - High implementation complexity
   - High fun factor
   - Requires character re-balancing

---

## 💾 Summary of This Session

✅ **Fixed UI/UX:**
- Action bar: 3-column layout (cleaner, less scrolling)
- Opponent selector: Choose which enemy to target
- Modern glassmorphic design throughout

✅ **Game Balance:**
- Rebalanced 10+ characters (HP adjustments)
- Added poison effect type (+4 new poison skills)
- Added 5+ AoE abilities for team combat

✅ **Architecture:**
- Added `setOpponentActiveIndex()` to game state
- New effect type 'poison' ready for game logic implementation
- Character data structure supports future additions

---

*This document auto-generated: 2026-02-25*  
*For questions/suggestions, check GAMEDESIGN.md*
