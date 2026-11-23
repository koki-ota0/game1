(() => {
  const $ = id => document.getElementById(id);
  const KEY = 'asteria-resort-save-v1';
  const GRID = 5;
  const moduleDefs = {
    hub: { name:'星あかりロビー', icon:'⌂', kind:'service', tags:['social','quiet'], cost:0, power:1, upkeep:1, desc:'宿の中心。隣接する施設にゲストが行き来する。' },
    reactor: { name:'小型融合炉', icon:'⌁', kind:'utility', tags:['power'], cost:0, gen:14, upkeep:2, desc:'リゾート全体に電力を供給する。' },
    cabin: { name:'コメット・キャビン', icon:'▱', kind:'room', tags:['quiet','cozy'], cost:0, power:1, upkeep:2, bed:true, desc:'静かで落ち着く、星の旅人のための客室。' },
    glassroom: { name:'星窓スイート', icon:'✧', kind:'room', tags:['stars','quiet','luxury'], cost:0, power:2, upkeep:3, bed:true, desc:'天井いっぱいの窓から星雲を望む特別室。' },
    gardenroom: { name:'温室ポッド', icon:'❀', kind:'room', tags:['nature','quiet'], cost:0, power:1, oxygen:1, upkeep:2, bed:true, desc:'花の香りに包まれて眠る、緑の客室。' },
    observatory: { name:'星見ドーム', icon:'◉', kind:'facility', tags:['stars','research'], cost:0, power:2, upkeep:2, desc:'流星群も遠い銀河も、ここから見つけられる。' },
    greenhouse: { name:'浮遊庭園', icon:'♧', kind:'facility', tags:['nature','water','fragrance'], cost:0, power:2, oxygen:4, upkeep:2, desc:'酸素を生み、旅人の心をゆっくりほどく。' },
    cafe: { name:'流星カフェ', icon:'☕', kind:'facility', tags:['gourmet','social'], cost:0, power:2, upkeep:2, desc:'軌道パンケーキと、月明かりの深煎り。' },
    solar: { name:'花びら型ソーラー', icon:'✳', kind:'utility', tags:['power','sun'], cost:70, gen:7, upkeep:1, unlock:0, desc:'柔らかな光を集める追加電源。設置費 ◈70。' },
    starglass: { name:'銀河テラス', icon:'✦', kind:'facility', tags:['stars','art','social'], cost:85, power:1, upkeep:2, unlock:0, desc:'星空の下で音楽を聴ける展望テラス。設置費 ◈85。' },
    gardenpod: { name:'新芽の客室', icon:'♧', kind:'room', tags:['nature','cozy'], cost:95, power:1, oxygen:1, upkeep:3, bed:true, unlock:0, desc:'小さな庭付き。植物好きに人気の客室。設置費 ◈95。' },
    lounge: { name:'月見ラウンジ', icon:'☾', kind:'facility', tags:['social','art','quiet'], cost:100, power:1, upkeep:2, unlock:32, desc:'旅人同士が、同じ星を見上げる場所。評判32で設計図解放。' },
    spa: { name:'月しずくスパ', icon:'♨', kind:'facility', tags:['relax','water'], cost:125, power:3, oxygen:1, upkeep:3, unlock:48, desc:'低重力の温泉で疲れを癒やす。評判48で設計図解放。' },
    atelier: { name:'星屑アトリエ', icon:'✎', kind:'facility', tags:['art','cozy'], cost:90, power:1, upkeep:2, unlock:22, desc:'旅の記憶を小さな作品にする工房。評判22で解放。' },
    observatory2: { name:'天文台アネックス', icon:'⌖', kind:'facility', tags:['stars','research','quiet'], cost:145, power:3, upkeep:3, unlock:60, desc:'研究者の夢を支える大型観測室。評判60で解放。' }
  };
  const events = [
    { id:'meteor', name:'流星雨の夜', icon:'☄', tag:'stars', text:'星見が好きな客の満足度が上がる', line:'今夜は、流星雨が降る予報。' },
    { id:'aurora', name:'青いオーロラ', icon:'✦', tag:'art', text:'景色を楽しみに来る客に特別な夜', line:'今夜、空に青い光のカーテンが広がる。' },
    { id:'bloom', name:'温室の花ひらく', icon:'❀', tag:'nature', text:'植物好きの客に小さなボーナス', line:'温室の花がいっせいに咲きそう。' },
    { id:'comet', name:'彗星の通過', icon:'☄', tag:'research', text:'天文台と星窓の価値が高まる', line:'珍しい彗星が、リゾートの近くを通る。' },
    { id:'quiet', name:'静寂の軌道', icon:'☾', tag:'quiet', text:'静かな客室を選んだ客に安らぎ', line:'小惑星の影に入り、宇宙が静まる夜。' },
    { id:'harvest', name:'星茶の収穫祭', icon:'♨', tag:'gourmet', text:'食を楽しむ客が少し多めに支払う', line:'庭園で育てた星茶が、今年いちばんの出来。' },
    { id:'friends', name:'ふたご星の夜', icon:'✧', tag:'social', text:'誰かと過ごしたい客に特別な夜', line:'寄り添うふたつの星が、同じ軌道を回る。' }
  ];
  const guestTypes = [
    { id:'astronomer', name:'天文家', tags:['stars','quiet'], roomTags:['stars','quiet'], budget:42, icon:'✦', portrait:'/public/images/guest-astronomer.jpg', requests:'窓辺で、流星をひとつ見つけたい。', postcard:'見つけた星に、あなたの宿の名前をつけました。' },
    { id:'botanist', name:'植物学者', tags:['nature','water'], roomTags:['nature','cozy'], budget:38, icon:'❀', portrait:'/public/images/guest-botanist.jpg', requests:'星の土で育つ花を、朝まで眺めたい。', postcard:'温室で咲いた花の種を、ひと粒置いていきます。' },
    { id:'patisserie', name:'菓子職人', tags:['gourmet','social'], roomTags:['cozy','luxury'], budget:40, icon:'☕', requests:'この星だけの甘いものに出会いたい。', postcard:'レシピに「流星の宿」と書き足しました。' },
    { id:'musician', name:'旅の音楽家', tags:['art','social'], roomTags:['cozy','quiet'], budget:36, icon:'♫', requests:'夜空に似合う音を、誰かと聴きたい。', postcard:'ロビーで聴いた音を、次の街へ持っていきます。' },
    { id:'healer', name:'星間航路の船医', tags:['relax','quiet'], roomTags:['quiet','luxury'], budget:44, icon:'☾', requests:'久しぶりに、何も考えず眠りたい。', postcard:'この宿で、やっと深く眠れました。' },
    { id:'stargazer', name:'小さな旅人', tags:['stars','nature'], roomTags:['stars','nature'], budget:30, icon:'☄', requests:'いちばん明るい星を、おうちに持って帰りたい。', postcard:'星の絵を描いたよ。ロビーに飾ってね。' },
    { id:'sculptor', name:'彫刻家', tags:['art','nature'], roomTags:['nature','cozy'], budget:39, icon:'◇', requests:'この星の石で、思い出を形にしたい。', postcard:'小さな石の彫刻を、あなたに贈ります。' },
    { id:'pilot', name:'長距離パイロット', tags:['quiet','relax'], roomTags:['quiet','cozy'], budget:35, icon:'⌁', requests:'発着音の聞こえない部屋で休みたい。', postcard:'次の航路でも、この宿を思い出すでしょう。' }
  ];
  const names = ['ユナ','カイ','ルカ','ミオ','レン','ナギ','ソラ','ハル','アオ','セナ','トワ','リリ'];
  const blueprints = ['solar','starglass','gardenpod','lounge','spa','atelier','observatory2'];
  const initialModules = { 2:{id:'reactor',level:1}, 6:{id:'observatory',level:1}, 7:{id:'cabin',level:1}, 11:{id:'glassroom',level:1}, 12:{id:'hub',level:1}, 13:{id:'gardenroom',level:1}, 17:{id:'greenhouse',level:1}, 18:{id:'cafe',level:1} };
  const freshSave = () => ({ season:1, day:1, credits:220, rep:25, modules:structuredClone(initialModules), guests:[], assignments:{}, eventId:'', album:[], completedNights:0, seasonIncome:0, lifetimeIncome:0, bestAverage:0, seasonAverage:0, sound:false, history:[] });
  let save;
  try { const v=JSON.parse(localStorage.getItem(KEY)||'null'); save=v?{...freshSave(),...v}:freshSave(); }
  catch { save=freshSave(); }
  if(!save.modules)save.modules=structuredClone(initialModules);
  if(!save.assignments)save.assignments={};
  if(!Array.isArray(save.album))save.album=[];
  let tab='guests', pendingBuild='', inspectedCell=-1, toastTimer;
  const readEvent = id => events.find(e=>e.id===id)||events[0];
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(save));}catch{}updateHeader();}
  function adjacent(a,b){const ar=Math.floor(a/GRID),ac=a%GRID,br=Math.floor(b/GRID),bc=b%GRID;return Math.abs(ar-br)+Math.abs(ac-bc)===1;}
  function moduleAt(cell){const m=save.modules[cell];return m?{...m,def:moduleDefs[m.id]}:null;}
  function moduleStats(){let gen=0,used=0,oxygen=0,upkeep=0,beds=[];for(const [cell,m] of Object.entries(save.modules)){const d=moduleDefs[m.id];if(!d)continue;const level=m.level||1;gen+=(d.gen||0)+(m.id==='solar'?(level-1)*2:0);used+=(d.power||0)+(level>1&&d.power?level-1:0);oxygen+=(d.oxygen||0)+(m.id==='greenhouse'?(level-1):0);upkeep+=(d.upkeep||0)*level;if(d.bed)beds.push({cell:+cell,...m,def:d});}return{gen,used,oxygen,upkeep,beds};}
  function getNeighbors(cell){return Object.entries(save.modules).filter(([c])=>adjacent(+c,cell)).map(([c,m])=>({cell:+c,...m,def:moduleDefs[m.id]}));}
  function intersects(a,b){return a.some(t=>b.includes(t));}
  function roomFit(g,roomCell){const room=moduleAt(roomCell);if(!room||!room.def.bed)return 0;let score=0;if(intersects(g.roomTags,room.def.tags))score+=1;const neighbors=getNeighbors(roomCell);if(neighbors.some(n=>intersects(g.tags,n.def.tags)))score+=1;const ev=readEvent(save.eventId);if(g.tags.includes(ev.tag))score+=1;score+=(room.level-1)*.35;const st=moduleStats();if(st.gen<st.used)score-=.75;if(st.oxygen<save.guests.length)score-=.75;return score;}
  function getGuestCount(){const {beds}=moduleStats();return Math.min(beds.length,Math.min(4,3+Math.floor(save.rep/60)));}
  function createDay(){
    const ev=events[((save.season-1)*3+save.day-1)%events.length];save.eventId=ev.id;
    const count=getGuestCount(), rotation=(save.season*5+save.day*3)%guestTypes.length;
    const selected=[];for(let n=0;n<count;n++)selected.push(guestTypes[(rotation+n*3)%guestTypes.length]);
    save.guests=selected.map((g,i)=>({...g,visitId:`S${save.season}D${save.day}G${i}`,guestName:names[(save.season*7+save.day*3+i*4)%names.length],budget:g.budget+Math.min(12,Math.floor(save.rep/20)),reservation:''}));
    save.assignments={};persist();
  }
  if(!save.guests.length||!save.eventId)createDay();
  function updateHeader(){
    if(!$('creditsValue'))return;
    const s=moduleStats();$('creditsValue').textContent=Math.floor(save.credits).toLocaleString('ja-JP');
    const stars=Math.min(5,1+Math.floor(save.rep/25));$('ratingValue').textContent='★'.repeat(stars)+'☆'.repeat(5-stars);$('repValue').textContent=save.rep;
    $('oxygenValue').textContent=`${s.oxygen} / ${save.guests.length}`;$('powerValue').textContent=`${s.gen} / ${s.used}`;
    $('oxygenValue').parentElement.classList.toggle('resource-alert',s.oxygen<save.guests.length);$('powerValue').parentElement.classList.toggle('resource-alert',s.gen<s.used);
    $('seasonTag').textContent=`SEASON ${String(save.season).padStart(2,'0')}　·　DAY ${String(save.day).padStart(2,'0')} / 07`;
    const ev=readEvent(save.eventId);$('dailyBanner').dataset.event=ev.id;$('heroEvent').textContent=ev.line;$('eventIcon').textContent=ev.icon;$('eventTitle').textContent=ev.name;$('eventText').textContent=ev.text;
    $('soundButton').classList.toggle('sound-on',save.sound);$('soundButton').textContent=save.sound?'♪':'♫';
    document.querySelectorAll('.main-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  }
  let audioContext=null;
  function playUiSound(kind='tap'){
    if(!save.sound)return;
    const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;
    try{audioContext=audioContext||new AudioEngine();if(audioContext.state==='suspended')audioContext.resume();const notes=kind==='report'?[523.25,659.25,783.99,1046.5]:kind==='build'?[392,587.33,783.99]:kind==='success'?[587.33,783.99,987.77]:[660,880];const start=audioContext.currentTime;notes.forEach((hz,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(hz,start+i*.075);gain.gain.setValueAtTime(.0001,start+i*.075);gain.gain.exponentialRampToValueAtTime(i===0?.045:.025,start+i*.075+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+i*.075+.3);osc.connect(gain);gain.connect(audioContext.destination);osc.start(start+i*.075);osc.stop(start+i*.075+.32);});}catch{}
  }
  function toast(text){const e=$('toast');e.textContent=text;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2200);}
  function setTab(t){if(tab!==t)playUiSound('tap');tab=t;for(const[name,id]of[['guests','guestsPanel'],['map','mapPanel'],['build','buildPanel'],['album','albumPanel']])$(id).classList.toggle('hidden',name!==t);document.querySelectorAll('.main-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));renderPanels();}
  function renderAll(){updateHeader();renderPanels();}
  function renderPanels(){if(!$('guestsPanel'))return;$('guestsPanel').innerHTML=renderGuests();$('mapPanel').innerHTML=renderMap();$('buildPanel').innerHTML=renderBuild();$('albumPanel').innerHTML=renderAlbum();bindPanelEvents();}
  function renderGuests(){
    const beds=moduleStats().beds,assigned=Object.values(save.assignments).filter(Boolean).length,complete=save.guests.length>0&&save.guests.every(g=>save.assignments[g.visitId]);
    const guests=save.guests.map((g,i)=>{
      const current=save.assignments[g.visitId]||'';
      const available=beds.filter(r=>!Object.entries(save.assignments).some(([id,c])=>id!==g.visitId&&+c===r.cell));
      const portrait=g.portrait?`<img src="${g.portrait}" alt="${g.name}のポートレート" loading="lazy">`:`<span class="portrait-placeholder">${g.icon}</span>`;
      const room=beds.find(r=>String(r.cell)===String(current));
      return `<article class="guest-card" style="--guest-order:${i}"><div class="guest-story"><div class="guest-avatar">${portrait}<span class="avatar-glint">✦</span></div><div class="guest-details"><div class="guest-top"><span class="guest-id">ARRIVAL 0${i+1} · TONIGHT</span><span class="guest-budget">◈ ${g.budget}</span></div><h3>${g.guestName}</h3><span class="guest-profession">${g.name}</span><p class="guest-quote">「${g.requests}」</p><div class="guest-tags">${g.tags.map(t=>`<span class="tag">${tagName(t)}</span>`).join('')}</div></div></div><label class="assign-label"><span><small>TONIGHT'S ROOM</small><b>${room?`✦ ${room.def.name}`:'客室を選んでください'}</b></span><select data-assign="${g.visitId}" aria-label="${g.guestName}の客室"><option value="">客室を選ぶ</option>${available.map(r=>`<option value="${r.cell}" ${String(r.cell)===String(current)?'selected':''}>${r.def.name}</option>`).join('')}</select></label></article>`;
    }).join('');
    const last=save.history[save.history.length-1],progress=Math.round(assigned/Math.max(1,save.guests.length)*100);
    return `<div class="panel-heading arrivals-heading"><div><span class="panel-kicker">TONIGHT'S ARRIVALS · ${String(save.day).padStart(2,'0')} / 07</span><h2>今夜、星を見に来る人たち</h2></div><button class="quiet-button" id="autoAssign"><span>✧</span> おまかせ</button></div><div class="booking-progress"><div class="booking-progress-copy"><span>おもてなしの準備</span><b>${assigned} <small>/ ${save.guests.length} ROOMS</small></b></div><div class="progress-track"><span style="width:${progress}%"></span></div><p>${complete?'今夜のお部屋が整いました。旅人を迎えましょう。':'旅人の願いにぴったりの部屋を用意してください。'}</p></div><div class="guest-list">${guests}</div><div class="open-night ${complete?'ready':''}"><div class="launch-copy"><span class="launch-spark">✦</span><span><small>THE NIGHT BEGINS</small><b>${complete?'みんなの旅が、今夜ここから始まる':'客室を選ぶと営業を始められます'}</b></span></div><button class="launch-button" id="openNight" ${complete?'':'disabled'}>夜をひらく <span>→</span></button></div>${last?`<button class="last-report" id="lastReport"><span>✧ 昨夜のハイライト</span><b>${last.average.toFixed(1)} ★　·　${last.net>=0?'+':''}${last.net} ◈</b><span>→</span></button>`:''}`;
  }
  function tagName(tag){return({stars:'星空',quiet:'静けさ',cozy:'くつろぎ',luxury:'特別室',nature:'植物',water:'水辺',gourmet:'食',social:'交流',art:'アート',research:'天文',fragrance:'香り',relax:'癒やし',power:'電力',sun:'日光',play:'遊び'})[tag]||tag;}
  function renderMap(){
    const pending=pendingBuild?moduleDefs[pendingBuild]:null;
    const tiles=Array.from({length:25},(_,i)=>{const m=moduleAt(i);const isSelected=inspectedCell===i;const isPlace=pendingBuild&&!m;const adj=Object.keys(save.modules).some(c=>adjacent(+c,i));return `<button class="map-tile ${m?'built':'empty'} ${m?`module-${m.id}`:''} ${isSelected?'inspected':''} ${isPlace?'place-target':''} ${pendingBuild&&isPlace&&!adj?'disconnected':''}" style="--tile-order:${i}" data-cell="${i}" aria-label="${m?m.def.name:'未開発区画'} ${String.fromCharCode(65+Math.floor(i/5))}${i%5+1}" ${pendingBuild&&isPlace&&!adj?'disabled':''}><span class="tile-coord">${String.fromCharCode(65+Math.floor(i/5))}${i%5+1}</span>${m?`<span class="building-icon ${m.def.kind}">${m.def.icon}</span><b>${m.def.name}</b>${m.def.bed?'<i class="bed-mark">▰</i>':''}${m.level>1?`<small class="level-badge">L${m.level}</small>`:''}`:pendingBuild&&isPlace&&adj?`<span class="place-plus">＋</span>`:`<span class="empty-dot">·</span>`}</button>`;}).join('');
    const stats=moduleStats();let inspector='';if(inspectedCell>=0&&moduleAt(inspectedCell)){const m=moduleAt(inspectedCell),upgradeCost=Math.round((m.def.cost||80)*(.65+m.level*.5));inspector=`<div class="module-inspector"><div class="inspector-icon">${m.def.icon}</div><div class="inspector-copy"><b>${m.def.name} <small>LV ${m.level}</small></b><p>${m.def.desc}</p></div><button class="upgrade-button" data-upgrade="${inspectedCell}" ${m.level>=3||save.credits<upgradeCost?'disabled':''}>強化 ◈${upgradeCost}</button></div>`;}
    return `<div class="panel-heading"><div><span class="panel-kicker">YOUR ASTEROID · ${Object.keys(save.modules).length} MODULES</span><h2>星の宿を設計する</h2></div><span class="capacity-chip">客室 ${stats.beds.length}</span></div><p class="map-guide">${pendingBuild?`<b class="placing-name">${pending.name}</b> の設置場所をタップ。緑の区画は建設できます。`:'区画をタップして詳細を見る。施設は既存モジュールに隣接して建設します。'}</p><div class="map-wrap"><div class="map-grid">${tiles}</div><div class="map-legend"><span><i class="legend-hub"></i>居住区</span><span><i class="legend-facility"></i>施設</span><span><i class="legend-empty"></i>未開発</span></div></div>${pendingBuild?`<div class="pending-actions"><span>建設費　◈${pending.cost}</span><button class="quiet-button" id="cancelBuild">キャンセル</button></div>`:''}${inspector}<div class="synergy-note"><span>✧</span><p><b>隣り合う施設が、滞在の思い出をつくります。</b><small>客室の隣に好きな施設があると、満足度が上がります。</small></p></div>`;
  }
  function renderBuild(){
    const list=blueprints.map(id=>{const b=moduleDefs[id],locked=save.rep<(b.unlock||0),afford=save.credits>=b.cost;return `<article class="blueprint-card ${locked?'locked':''}"><span class="blueprint-icon ${b.kind}">${b.icon}</span><div class="blueprint-copy"><span class="blueprint-kind">${kindName(b.kind)} ${locked?`· 評判 ${b.unlock} で解放`:''}</span><b>${b.name}</b><p>${b.desc}</p><div class="blueprint-stats">${b.bed?'🛏 客室　':''}${b.gen?`⌁ 電力 +${b.gen}　`:''}${b.oxygen?`◉ 酸素 +${b.oxygen}　`:''}維持 ◈${b.upkeep}</div></div><button class="blueprint-buy" data-build="${id}" ${locked||!afford?'disabled':''}>${locked?'🔒':`◈ ${b.cost}`}<small>${locked?'未解放':afford?'建てる':'不足'}</small></button></article>`;}).join('');
    const stats=moduleStats();return `<div class="panel-heading"><div><span class="panel-kicker">BLUEPRINTS · ${Math.floor(save.credits)} CREDITS</span><h2>次の施設を選ぶ</h2></div><span class="plan-stamp">設計 ${blueprints.length}</span></div><div class="build-tip"><span>01</span><p>施設を選ぶと島内図へ移動します。<br/>ロビーにつながる区画に建設してください。</p></div><div class="system-status"><span><b>⌁ 電力</b>${stats.gen>=stats.used?'余力あり':'不足中'}　${stats.gen}/${stats.used}</span><span><b>◉ 酸素</b>${stats.oxygen>=save.guests.length?'安定':'不足中'}　${stats.oxygen}/${save.guests.length}</span></div><div class="blueprint-list">${list}</div><div class="build-footer-note">評判が上がると、さらに特別な設計図が届きます。</div>`;
  }
  function kindName(kind){return({room:'GUEST ROOM',facility:'EXPERIENCE',utility:'INFRASTRUCTURE',service:'COMMON AREA'})[kind]||'MODULE';}
  function renderAlbum(){
    const cards=save.album.slice().reverse();return `<div class="panel-heading"><div><span class="panel-kicker">POSTCARDS FROM THE STARS</span><h2>旅人の思い出 <small>${cards.length}</small></h2></div><span class="capacity-chip">評判 ${save.rep}</span></div><div class="album-intro">満足した旅人が、星の宿で見つけた景色を残していきます。</div>${cards.length?`<div class="postcard-grid">${cards.map(c=>`<article class="postcard"><div class="postcard-art">${c.portrait?`<img src="${c.portrait}" alt="${c.guestName}から届いた思い出" loading="lazy">`:`<div class="postcard-fallback">${c.icon}</div>`}<span class="postcard-stamp">${c.eventIcon}</span><span class="postcard-star">✦</span></div><div class="postcard-caption"><small>SEASON ${String(c.season).padStart(2,'0')} · DAY ${String(c.day).padStart(2,'0')}</small><b>${c.guestName} · ${c.guestType}</b><p>“${c.text}”</p></div></article>`).join('')}</div>`:`<div class="empty-album"><span>✉</span><b>まだ、手紙は届いていません。</b><p>満足度の高い夜を過ごした旅人が、<br/>星の思い出を置いていきます。</p></div>`}<div class="season-stats"><div><small>営業した夜</small><b>${save.completedNights}</b></div><div><small>通算の売上</small><b>◈ ${save.lifetimeIncome}</b></div><div><small>今季の平均</small><b>${save.seasonAverage.toFixed(1)} ★</b></div></div>`;
  }
  function bindPanelEvents(){
    $('guestsPanel').querySelectorAll('[data-assign]').forEach(el=>el.addEventListener('change',()=>{save.assignments[el.dataset.assign]=el.value;persist();renderPanels();}));
    $('guestsPanel').querySelector('#autoAssign')?.addEventListener('click',autoAssign);
    $('guestsPanel').querySelector('#openNight')?.addEventListener('click',runNight);
    $('guestsPanel').querySelector('#lastReport')?.addEventListener('click',()=>showReport(save.history[save.history.length-1],false));
    $('mapPanel').querySelectorAll('[data-cell]').forEach(el=>el.addEventListener('click',()=>tapCell(+el.dataset.cell)));
    $('mapPanel').querySelectorAll('[data-upgrade]').forEach(el=>el.addEventListener('click',()=>upgradeModule(+el.dataset.upgrade)));
    $('mapPanel').querySelector('#cancelBuild')?.addEventListener('click',()=>{pendingBuild='';renderPanels();});
    $('buildPanel').querySelectorAll('[data-build]').forEach(el=>el.addEventListener('click',()=>chooseBuild(el.dataset.build)));
  }
  function autoAssign(){
    const available=moduleStats().beds.map(r=>r.cell),assign={};
    for(const g of save.guests){let best=available[0],value=-999;for(const c of available){const v=roomFit(g,c);if(v>value){value=v;best=c;}}assign[g.visitId]=String(best);available.splice(available.indexOf(best),1);}
    save.assignments=assign;persist();renderPanels();playUiSound('success');toast('希望に合う客室を仮予約しました');
  }
  function chooseBuild(id){const b=moduleDefs[id];if(!b||save.credits<b.cost)return toast('クレジットが足りません');pendingBuild=id;inspectedCell=-1;setTab('map');playUiSound('build');toast(`${b.name} を建設する区画を選んでください`);}
  function tapCell(cell){
    const existing=moduleAt(cell);
    if(pendingBuild){if(existing)return toast('その区画には、すでに施設があります');const def=moduleDefs[pendingBuild];if(!Object.keys(save.modules).some(c=>adjacent(+c,cell)))return toast('既存施設に隣接する区画を選んでください');if(save.credits<def.cost)return toast('クレジットが足りません');save.credits-=def.cost;save.modules[cell]={id:pendingBuild,level:1};toast(`${def.name} が完成しました`);playUiSound('build');pendingBuild='';inspectedCell=cell;persist();renderPanels();return;}
    if(existing){inspectedCell=cell;renderPanels();return;}toast('未開発区画。建設タブから設計図を選べます。');
  }
  function upgradeModule(cell){const m=moduleAt(cell);if(!m||m.level>=3)return;const cost=Math.round((m.def.cost||80)*(.65+m.level*.5));if(save.credits<cost)return toast('クレジットが足りません');save.credits-=cost;save.modules[cell].level++;persist();renderPanels();playUiSound('success');toast(`${m.def.name} をレベル ${save.modules[cell].level} に強化`);}
  function rawFit(g,roomCell){const room=moduleAt(roomCell);let score=intersects(g.roomTags,room.def.tags)?3:0;for(const n of getNeighbors(roomCell))if(intersects(g.tags,n.def.tags))score+=2;return score;}
  function runNight(){
    if(!save.guests.every(g=>save.assignments[g.visitId]))return toast('すべてのお客さまに客室を割り当ててください');
    const stats=moduleStats(),event=readEvent(save.eventId),powerBad=stats.gen<stats.used,oxygenBad=stats.oxygen<save.guests.length;
    let income=0;const outcomes=[];
    for(const guest of save.guests){const cell=Number(save.assignments[guest.visitId]);let quality=3;const room=moduleAt(cell);if(intersects(guest.roomTags,room.def.tags))quality+=1;const near=getNeighbors(cell).some(n=>intersects(guest.tags,n.def.tags));if(near)quality+=1;if(guest.tags.includes(event.tag))quality+=.7;quality+=(room.level-1)*.35;if(powerBad)quality-=.8;if(oxygenBad)quality-=.7;quality=Math.max(1,Math.min(5,Math.round(quality*10)/10));const stars=Math.max(1,Math.min(5,Math.round(quality)));const pay=Math.round(guest.budget*(.64+quality*.12)+(guest.tags.includes(event.tag)?5:0));income+=pay;outcomes.push({guest,cell,quality,stars,pay,near,roomName:room.def.name});
      const postId=`${guest.id}-${event.id}`;if(quality>=4&&!save.album.some(x=>x.id===postId)){save.album.push({id:postId,guestName:guest.guestName,guestType:guest.name,icon:guest.icon,portrait:guest.portrait||'',eventIcon:event.icon,text:guest.postcard,season:save.season,day:save.day});}}
    const upkeep=stats.upkeep,net=income-upkeep;save.credits=Math.max(0,save.credits+net);const average=outcomes.reduce((a,o)=>a+o.quality,0)/outcomes.length;save.rep=Math.max(0,Math.min(100,save.rep+Math.round((average-3)*2.4)));save.completedNights++;save.seasonIncome+=net;save.lifetimeIncome+=income;save.seasonAverage=save.seasonAverage?((save.seasonAverage*(save.completedNights%7?((save.completedNights-1)%7):6))+average)/(((save.completedNights-1)%7)+1):average;save.bestAverage=Math.max(save.bestAverage,average);
    const report={season:save.season,day:save.day,event:event.name,eventIcon:event.icon,outcomes,average, income,upkeep,net,rep:save.rep,postcards:save.album.length,seasonEnd:save.day===7};save.history.push(report);if(save.history.length>14)save.history.shift();
    if(save.day===7){save.season++;save.day=1;save.seasonIncome=0;save.seasonAverage=average;save.credits+=60;createDay();}else{save.day++;createDay();}
    persist();renderAll();showReport(report,true);
  }
  function showReport(report,advance){
    if(!report)return;playUiSound('report');const isSeason=report.seasonEnd;$('modalKicker').textContent=isSeason?'SEASON COMPLETE · ASTERIA':'NIGHT REPORT · '+report.event.toUpperCase();$('modalTitle').textContent=isSeason?`シーズン ${String(report.season).padStart(2,'0')} を終えて`:'今夜の滞在記録';
    $('modalBody').innerHTML=`<div class="report-cinematic"><span class="report-event-glyph">${report.eventIcon}</span><div><small>ONE NIGHT IN ASTERIA</small><b>${report.event}</b><span>星あかりの下で、${report.outcomes.length}組の旅が始まりました。</span></div></div><div class="report-summary"><div><small>平均満足度</small><b>${report.average.toFixed(1)} <i>★</i></b></div><div><small>今夜の収支</small><b class="${report.net>=0?'positive':'negative'}">${report.net>=0?'+':''}${report.net} <i>◈</i></b></div><div><small>評判</small><b>${report.rep}<i> / 100</i></b></div></div><div class="report-list">${report.outcomes.map(o=>`<article class="report-guest"><span class="report-avatar">${o.guest.portrait?`<img src="${o.guest.portrait}" alt="">`:o.guest.icon}</span><span class="report-copy"><b>${o.guest.guestName} <small>${o.guest.name} · ${o.roomName}</small></b><span>${'★'.repeat(o.stars)}<i>${'☆'.repeat(5-o.stars)}</i></span></span><b class="report-pay">+${o.pay} ◈</b></article>`).join('')}</div><div class="report-message">${isSeason?`7夜の営業、おつかれさまでした。<br/>旅人たちの平均満足度は <b>${report.average.toFixed(1)} ★</b>。次のシーズン準備金 ◈60 を受け取りました。`:`今夜のイベント「${report.event}」で、<b>${report.postcards}</b>通の思い出がアルバムに届いています。維持費 ◈${report.upkeep} を差し引きました。`}</div>`;
    $('modalActions').innerHTML=`<button class="continue-button" id="continueButton">${isSeason?'次のシーズンへ':'明日の予約を見る'} <span>→</span></button>`;$('modalBackdrop').classList.remove('hidden');$('continueButton').onclick=()=>{$('modalBackdrop').classList.add('hidden');tab='guests';setTab('guests');window.scrollTo({top:0,behavior:'smooth'});};
  }
  function renderAlbumModal(){return;}
  document.querySelectorAll('.main-tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
  $('modalClose').addEventListener('click',()=>$('modalBackdrop').classList.add('hidden'));
  $('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))$('modalBackdrop').classList.add('hidden');});
  $('soundButton').addEventListener('click',()=>{save.sound=!save.sound;persist();if(save.sound)playUiSound('success');toast(save.sound?'サウンドをオン':'サウンドをオフ');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('modalBackdrop').classList.add('hidden');});
  renderAll();
})();
