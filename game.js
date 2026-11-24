(() => {
  'use strict';

  const SAVE_KEY = 'asteria-moonberry-v1';
  const NIGHT_COUNT = 5;
  const activities = [
    {
      id: 'stars', name: '星をみる', detail: '望遠鏡で夜空へ', mark: '✦',
      icon: '<path d="m5 5 11-2 3 7-12 4z"/><path d="m7 4 3 9m6-9 3-1M11 13l2 6m0 0-5 4m5-4 5 4m-5-4v4"/>'
    },
    {
      id: 'tea', name: '星のお茶', detail: 'ベリーをひとくち', mark: '☕',
      icon: '<path d="M5 9h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM17 11h2a2.5 2.5 0 0 1 0 5h-2M8 5c0-1 1-1.2 1-2.2M12 5c0-1 1-1.2 1-2.2M16 5c0-1 1-1.2 1-2.2"/>'
    },
    {
      id: 'firefly', name: '花あかり', detail: 'ひかる花をさがす', mark: '✿',
      icon: '<path d="M8 4h8l1 16H7L8 4Z"/><path d="M8 7h8M9 17h6"/><path d="M12 1v3m-5-1 2 2m8-2-2 2"/><circle cx="12" cy="11" r="2.2"/><path d="m12 8.8.8 1.6 1.8.2-1.3 1.2.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.2 1.8-.2z"/>'
    }
  ];
  const visitors = [
    { name: 'コハク', kind: '星うさぎ', color: '#ffc7a8', wish: '流れ星をひとつ見つけたいな。', activity: 'stars', memory: '大きな流れ星を見つけたよ！' },
    { name: 'ミル', kind: 'ベリーねこ', color: '#e6bcff', wish: 'あったかいベリーのお茶がのみたいな。', activity: 'tea', memory: 'お茶のいい香り、ずっと覚えてるね。' },
    { name: 'ポポ', kind: '小鳥の旅人', color: '#ffe18c', wish: '夜にひかるお花を見てみたいな。', activity: 'firefly', memory: '花のあかりが、星みたいだったよ。' },
    { name: 'モチ', kind: '月のこぐま', color: '#b9e6d2', wish: '望遠鏡で、ぼくの星をさがしたい。', activity: 'stars', memory: 'ぼくの星に、宿の名前をつけたよ。' },
    { name: 'ルル', kind: '雲のきつね', color: '#ffc4d1', wish: '甘いお茶を飲んで、ほっとしたいな。', activity: 'tea', memory: 'またみんなに会いにくるね。' }
  ];
  const $ = id => document.getElementById(id);
  const freshSave = () => ({ day: 1, phase: 'choose', selected: '', memories: [], lastResult: null });
  let state = freshSave();
  try {
    const stored = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (stored && Number.isInteger(stored.day) && stored.day >= 1 && stored.day <= NIGHT_COUNT && ['choose','result','finale'].includes(stored.phase)) {
      state = { ...freshSave(), ...stored, memories: Array.isArray(stored.memories) ? stored.memories.slice(-NIGHT_COUNT) : [] };
    }
  } catch { state = freshSave(); }

  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch { /* play continues if storage is unavailable */ }
  }
  function travelerArt(visitor, happy = false) {
    return `<svg viewBox="0 0 140 160" role="img" aria-label="${visitor.name}、${visitor.kind}">
      <ellipse cx="70" cy="145" rx="38" ry="8" fill="rgba(22,20,49,.22)"/>
      <path d="M43 105q-15 8-12 23 2 9 13 7l13-13m40-17q15 8 12 23-2 9-13 7l-13-13" fill="${visitor.color}" stroke="#6a5274" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 109q2-22 24-23 24 1 25 23l-8 29H53z" fill="#fff1d4" stroke="#6a5274" stroke-width="3"/>
      <path d="m57 126 13 8 13-8" fill="none" stroke="${visitor.color}" stroke-width="6" stroke-linecap="round"/>
      <path d="M48 54q-9-27 2-32 13-5 17 22m8 1q8-26 20-20 9 5 0 32" fill="${visitor.color}" stroke="#6a5274" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="70" cy="67" r="36" fill="#fff1d4" stroke="#6a5274" stroke-width="3"/>
      <path d="M37 66a33 33 0 0 1 66 0" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="4"/>
      <ellipse cx="57" cy="68" rx="3.2" ry="4.5" fill="#51425f"/><ellipse cx="83" cy="68" rx="3.2" ry="4.5" fill="#51425f"/>
      <ellipse cx="48" cy="79" rx="6" ry="3.5" fill="#f3a6aa" opacity=".8"/><ellipse cx="92" cy="79" rx="6" ry="3.5" fill="#f3a6aa" opacity=".8"/>
      <path d="M66 81q4 5 8 0" fill="none" stroke="#8d6272" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="70" cy="25" r="5" fill="#fff3c5" stroke="#f2bc6b" stroke-width="2"/>
      ${happy ? '<path d="m29 42 4 7 7 1-5 5 1 7-7-4-6 4 1-7-5-5 7-1z" fill="#ffe68f"/>' : ''}
      <path d="M53 137q-7 9-2 12h16v-6m21-6q7 9 2 12H74v-6" fill="#78617d" stroke="#594665" stroke-width="2" stroke-linejoin="round"/>
    </svg>`;
  }
  function activityCard(activity, visitor) {
    const recommended = activity.id === visitor.activity;
    return `<button class="activity-card ${state.selected === activity.id ? 'selected' : ''} ${recommended ? 'recommended' : ''}" type="button" data-activity="${activity.id}" aria-pressed="${state.selected === activity.id}">
      <span class="activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${activity.icon}</svg></span>
      <b>${activity.name}</b><small>${activity.detail}</small>
    </button>`;
  }
  function renderDots() {
    $('dayLabel').textContent = state.phase === 'finale' ? 'できあがり！' : `${state.day} / ${NIGHT_COUNT} 夜`;
    $('nightDots').innerHTML = Array.from({ length: NIGHT_COUNT }, (_, i) => `<span class="night-dot ${i < state.day - (state.phase === 'result' || state.phase === 'finale' ? 0 : 1) ? 'done' : i === state.day - 1 ? 'current' : ''}" aria-hidden="true"></span>`).join('');
  }
  function renderGuest(visitor) {
    $('guestNote').innerHTML = `<span class="guest-kicker"><i aria-hidden="true">✦</i>${visitor.name} · ${visitor.kind}</span><p>${visitor.wish}</p>`;
    $('traveler').innerHTML = travelerArt(visitor, state.phase === 'result' && !!state.lastResult?.matched);
    $('traveler').classList.toggle('happy', state.phase === 'result' && !!state.lastResult?.matched);
    document.documentElement.style.setProperty('--buddy', visitor.color);
  }
  function renderResult(visitor) {
    const result = state.lastResult;
    const stars = '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars);
    const title = result.matched ? 'ぴったりのおもてなし！' : 'やさしい夜になったね';
    const response = result.matched ? `${visitor.name}は、とびきりうれしそう。` : `${visitor.name}は、ゆっくり夜空を楽しみました。`;
    const picture = result.matched
      ? '<svg viewBox="0 0 64 64"><path d="m32 5 7.5 17.2L58 24l-13.8 12 3.8 19L32 45.5 16 55l3.8-19L6 24l18.5-1.8z" fill="#ffe39b" stroke="#c68d67" stroke-width="2.5" stroke-linejoin="round"/><circle cx="51" cy="12" r="3" fill="#fff3c7"/><circle cx="11" cy="47" r="2.5" fill="#fff3c7"/></svg>'
      : '<svg viewBox="0 0 64 64"><path d="M43 11a22 22 0 1 0 10 38A24 24 0 0 1 43 11Z" fill="#d8caff" stroke="#9a83c6" stroke-width="2.5" stroke-linejoin="round"/><circle cx="49" cy="15" r="3" fill="#fff3c7"/><circle cx="13" cy="42" r="2" fill="#fff3c7"/></svg>';
    return `<div class="result-sticker" aria-hidden="true">${picture}</div><div class="result-copy"><span class="result-stars" aria-label="${result.stars}つ星">${stars}</span><b>${title}</b><p>${response}</p><p class="memory-line">「${visitor.memory}」</p></div>`;
  }
  function renderFinale() {
    const total = state.memories.reduce((sum, memory) => sum + memory.stars, 0);
    const collected = state.memories.length;
    $('panelTitle').textContent = '5つの夜をありがとう';
    $('panelHint').textContent = '旅人たちとの思い出が、星座になったよ';
    $('stepBadge').textContent = '✦';
    $('activityGrid').hidden = true;
    $('resultCard').hidden = false;
    $('resultCard').innerHTML = `<div class="finale"><span class="finale-mark" aria-hidden="true"><svg viewBox="0 0 72 72"><path d="m36 7 8.5 19.5L66 29l-16 13.8 4.5 21.2L36 53 17.5 64l4.5-21.2L6 29l21.5-2.5z" fill="#ffe39b" stroke="#c68d67" stroke-width="2.5" stroke-linejoin="round"/><circle cx="58" cy="12" r="3" fill="#fff5d4"/><circle cx="12" cy="51" r="2" fill="#fff5d4"/></svg></span><h2>ちいさな星座が完成！</h2><p>${collected}人の旅人が、この宿を思い出に持って帰りました。次に会う旅人も、きっと待っているよ。</p><span class="finale-count">${'★'.repeat(Math.min(5, Math.ceil(total / 3)))}　${total}つの星</span><button type="button" class="restart-button" id="startOver">また星の宿をひらく</button></div>`;
    $('mainAction').hidden = true;
    $('sceneWhisper').textContent = 'みんなの思い出が、夜空にのぼったよ。';
    $('traveler').innerHTML = travelerArt(visitors[0], true);
    $('traveler').classList.add('happy');
    $('startOver').addEventListener('click', () => { state = freshSave(); persist(); render(); });
  }
  function render() {
    const visitor = visitors[(state.day - 1) % visitors.length];
    renderDots();renderGuest(visitor);
    $('sceneWhisper').textContent = state.phase === 'result' ? (state.lastResult?.matched ? 'よろこんでくれた！' : 'ほっとひと息、いい夜。') : '星がきらきら、今夜もいい夜。';
    $('activityGrid').innerHTML = activities.map(activity => activityCard(activity, visitor)).join('');
    $('activityGrid').hidden = state.phase !== 'choose';
    $('resultCard').hidden = state.phase !== 'result';
    $('mainAction').hidden = state.phase === 'finale';
    if (state.phase === 'finale') { renderFinale(); return; }
    $('panelTitle').textContent = state.phase === 'choose' ? '今夜のおたのしみは？' : '今夜のおもてなし';
    $('panelHint').textContent = state.phase === 'choose' ? 'お願いに合うものをひとつ選んでね' : 'あたたかい思い出ができました';
    $('stepBadge').textContent = state.phase === 'choose' ? '1' : '✦';
    if (state.phase === 'result') $('resultCard').innerHTML = renderResult(visitor);
    $('mainAction').disabled = state.phase === 'choose' && !state.selected;
    $('actionLabel').textContent = state.phase === 'choose' ? (state.selected ? 'これにする！' : 'おもてなしを選んでね') : (state.day === NIGHT_COUNT ? '星座を見にいく' : '次の旅人へ');
    $('actionIcon').textContent = state.phase === 'choose' ? (state.selected ? '✦' : '♡') : '→';
    $('mainAction').setAttribute('aria-label', $('actionLabel').textContent);
    $('activityGrid').querySelectorAll('[data-activity]').forEach(button => button.addEventListener('click', () => {
      if (state.phase !== 'choose') return;
      state.selected = button.dataset.activity;persist();render();
      $('activityGrid').querySelector(`[data-activity="${state.selected}"]`)?.focus({ preventScroll: true });
    }));
  }
  function burst() {
    const layer = $('sparkleLayer');
    for (let i = 0; i < 9; i++) {
      const item = document.createElement('span');item.className = 'sparkle';item.textContent = i % 3 === 0 ? '✦' : '✧';
      item.style.left = `${28 + Math.random() * 48}%`;item.style.top = `${34 + Math.random() * 34}%`;
      item.style.setProperty('--dx', `${(Math.random() - .5) * 100}px`);item.style.animationDelay = `${Math.random() * .25}s`;layer.append(item);
      setTimeout(() => item.remove(), 1600);
    }
  }
  function handleMainAction() {
    if (state.phase === 'choose') {
      if (!state.selected) return;
      const visitor = visitors[(state.day - 1) % visitors.length];
      const matched = state.selected === visitor.activity;
      const result = { day: state.day, activity: state.selected, matched, stars: matched ? 3 : 1 };
      state.lastResult = result;state.memories.push({ ...result, visitor: visitor.name, message: visitor.memory });state.phase = 'result';persist();render();burst();return;
    }
    if (state.phase === 'result') {
      if (state.day === NIGHT_COUNT) state.phase = 'finale';
      else { state.day++;state.phase = 'choose';state.selected = '';state.lastResult = null; }
      persist();render();
    }
  }
  $('mainAction').addEventListener('click', handleMainAction);
  render();
})();
