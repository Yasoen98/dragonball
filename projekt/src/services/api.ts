const API_URL = localStorage.getItem('dba_api_url') || '';

export async function postMatchSync(match: any) {
  if (!API_URL) {
    console.log('postMatchSync: no API_URL configured, skipping');
    return { ok: false };
  }
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/sync/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match),
    });
    if (!res.ok) throw new Error('Network');
    return await res.json();
  } catch (err) {
    console.warn('postMatchSync failed', err);
    return { ok: false };
  }
}

export async function confirmMatchDeleted(matchId: string) {
  if (!API_URL) return { ok: false };
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/match/${matchId}/confirm-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Network');
    return await res.json();
  } catch (err) {
    console.warn('confirmMatchDeleted failed', err);
    return { ok: false };
  }
}

export async function getLeaderboard() {
  if (!API_URL) {
    // Fallback to local accounts
    const accs = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
    const arr = Object.entries(accs).map(([username, data]: any) => ({ username, score: data.score || 0, rank: data.rank || 'Saibaman' }));
    arr.sort((a:any,b:any)=>b.score-a.score);
    return arr.slice(0, 50);
  }

  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/leaderboard`);
    if (!res.ok) throw new Error('Network');
    return await res.json();
  } catch (err) {
    console.warn('getLeaderboard failed', err);
    return [];
  }
}
