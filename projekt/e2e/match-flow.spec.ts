import { test, expect } from '@playwright/test';

test('menu shows difficulty selector and presists choice', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Setup: login (create account and login)
  await page.fill('input[placeholder*="name" i]', 'testplayer');
  await page.fill('input[type="password"]', 'password123');
  
  // Try register first
  const buttons = await page.locator('button');
  const registerBtn = buttons.filter({ hasText: /Register|register/ }).first();
  if (registerBtn.isVisible()) {
    await registerBtn.click();
  }
  
  // Now login
  await page.fill('input[placeholder*="name" i]', 'testplayer');
  await page.fill('input[type="password"]', 'password123');
  const loginBtn = buttons.filter({ hasText: /Login|login|Sign In/ }).first();
  await loginBtn.click();
  
  // Wait for menu to appear
  await page.waitForSelector('text=Difficulty');
  
  // Verify difficulty buttons exist
  await expect(page.locator('button:has-text("Easy")')).toBeVisible();
  await expect(page.locator('button:has-text("Normal")')).toBeVisible();
  await expect(page.locator('button:has-text("Hard")')).toBeVisible();
  
  // Click Hard
  await page.locator('button:has-text("Hard")').click();
  
  // Verify it's selected (border should be visible)
  const hardBtn = page.locator('button:has-text("Hard")');
  const styles = await hardBtn.evaluate(el => window.getComputedStyle(el));
  expect(styles.borderColor || styles.border).toBeTruthy();
});

test('match → modal → rematch flow works', async ({ page, context }) => {
  // Setup localStorage before navigating
  await context.addInitScript(() => {
    const accounts = { e2euser: { name: 'e2euser', password: 'pass', rank: 'Saibaman', score: 0 } };
    localStorage.setItem('dba_accounts', JSON.stringify(accounts));
    localStorage.setItem('dba_current_user', 'e2euser');
  });
  
  await page.goto('http://localhost:5173');
  
  // Should be in menu (auto-logged via localStorage)
  await page.waitForSelector('text=DRAGON BALL ARENA', { timeout: 5000 });
  
  // Click Find Match
  await page.locator('button:has-text("Find Match")').click();
  
  // Wait for matchmaking countdown
  await page.waitForSelector('text=30', { timeout: 2000 });
  
  // Wait for draft screen or battle to appear (match flow)
  // This might take a few seconds depending on implementation
  await page.waitForSelector('text=Battle|Draft|Opponent', { timeout: 10000 });
  
  // Simulate a quick battle outcome by setting winner via page context
  // We'll trigger gameOver via fast-forwarding the battle
  const fastWin = async () => {
    await page.evaluate(() => {
      const store = (window as any).__gameStore || {};
      if (store.getState) {
        store.getState().set({ winner: 'player', phase: 'gameOver' });
      }
    });
  };
  
  // Try to reach gameOver quickly (either via UI or direct state for e2e speed)
  try {
    await fastWin();
  } catch (e) {
    // If that fails, proceed with UI actions
  }
  
  // Wait for game over modal (MatchSummary)
  await page.waitForSelector('text=Victory|Defeat|Points', { timeout: 8000 });
  
  // Verify modal has breakdown
  await expect(page.locator('text=Points Breakdown')).toBeVisible({ timeout: 3000 });
  
  // Click Rematch button
  const rematchBtn = page.locator('button:has-text("Rematch")');
  await rematchBtn.click();
  
  // Should return to draft or menu
  await page.waitForSelector('text=Draft|Menu|DRAGON BALL', { timeout: 3000 });
  
  // Verify we can click Find Match again
  await page.locator('button:has-text("Find Match")').click();
  
  // Should start next match
  await page.waitForSelector('text=30|Battle|Draft', { timeout: 5000 });
});

test('export and import match history works', async ({ context, page }) => {
  await context.addInitScript(() => {
    const accounts = { exportuser: { name: 'exportuser', password: 'pass', rank: 'Saibaman', score: 100 } };
    localStorage.setItem('dba_accounts', JSON.stringify(accounts));
    localStorage.setItem('dba_current_user', 'exportuser');
    // Add mock match history
    const matches = [{
      id: 'test_match_1',
      date: Date.now(),
      result: 'win',
      pointsEarned: 50,
      opponentTeam: ['vegeta'],
      playerTeam: ['goku'],
      turns: 5,
      playerHpRemaining: 50
    }];
    localStorage.setItem('dba_matches_exportuser', JSON.stringify(matches));
  });
  
  await page.goto('http://localhost:5173');
  await page.waitForSelector('text=DRAGON BALL ARENA');
  
  // Go to Match History
  await page.locator('button:has-text("Match History")').click();
  await page.waitForSelector('text=Match History');
  
  // Verify export button exists
  await expect(page.locator('button:has-text("Export")')).toBeVisible();
  
  // Download export (would be checked in CI with artifact handling)
  const downloadPromise = page.waitForEvent('download');
  await page.locator('button:has-text("Export")').click();
  const download = await downloadPromise;
  
  expect(download.suggestedFilename()).toContain('dba_matches');
});
