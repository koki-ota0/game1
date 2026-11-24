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
  const initialModules = { 2:{id:'reactor',level:1}, 6:{id:'observatory',level:1}, 7:{id:'cabin',level:1}, 11:{id:'glassroom',level:1}, 12:{id:'hub',level:1}, 17:{id:'greenhouse',level:1} };
  const freshSave = () => ({ season:1, day:1, credits:220, rep:25, modules:structuredClone(initialModules), guests:[], assignments:{}, eventId:'', album:[], completedNights:0, guidedStart:true, tutorialStep:0, seasonIncome:0, lifetimeIncome:0, bestAverage:0, seasonAverage:0, sound:false, history:[] });
  let save;
  try { const v=JSON.parse(localStorage.getItem(KEY)||'null'); save=v?{...freshSave(),...v}:freshSave();if(v&&!Object.prototype.hasOwnProperty.call(v,'guidedStart'))save.guidedStart=false; }
  catch { save=freshSave(); }
  if(!save.modules)save.modules=structuredClone(initialModules);
  if(!save.assignments)save.assignments={};
  if(!Array.isArray(save.album))save.album=[];
  if(!Number.isFinite(save.tutorialStep))save.tutorialStep=save.guidedStart?(save.completedNights?3:0):3;
  let pendingBuild='', inspectedCell=-1, selectedGuest='', recentCell=-1, selectedPlot=-1, toastTimer, uiMode='map';
  const readEvent = id => events.find(e=>e.id===id)||events[0];
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(save));}catch{}updateHeader();}
  function adjacent(a,b){const ar=Math.floor(a/GRID),ac=a%GRID,br=Math.floor(b/GRID),bc=b%GRID;return Math.abs(ar-br)+Math.abs(ac-bc)===1;}
  function moduleAt(cell){const m=save.modules[cell];return m?{...m,def:moduleDefs[m.id]}:null;}
  function moduleStats(){let gen=0,used=0,oxygen=0,upkeep=0,beds=[];for(const [cell,m] of Object.entries(save.modules)){const d=moduleDefs[m.id];if(!d)continue;const level=m.level||1;gen+=(d.gen||0)+(m.id==='solar'?(level-1)*2:0);used+=(d.power||0)+(level>1&&d.power?level-1:0);oxygen+=(d.oxygen||0)+(m.id==='greenhouse'?(level-1):0);upkeep+=(d.upkeep||0)*level;if(d.bed)beds.push({cell:+cell,...m,def:d});}return{gen,used,oxygen,upkeep,beds};}
  function getNeighbors(cell){return Object.entries(save.modules).filter(([c])=>adjacent(+c,cell)).map(([c,m])=>({cell:+c,...m,def:moduleDefs[m.id]}));}
  function intersects(a,b){return a.some(t=>b.includes(t));}
  function roomFit(g,roomCell){const room=moduleAt(roomCell);if(!room||!room.def.bed)return 0;let score=0;if(intersects(g.roomTags,room.def.tags))score+=1;const neighbors=getNeighbors(roomCell);if(neighbors.some(n=>intersects(g.tags,n.def.tags)))score+=1;const ev=readEvent(save.eventId);if(g.tags.includes(ev.tag))score+=1;score+=(room.level-1)*.35;const st=moduleStats();if(st.gen<st.used)score-=.75;if(st.oxygen<save.guests.length)score-=.75;return score;}
  function getGuestCount(){const {beds}=moduleStats();if(save.guidedStart){if(!save.completedNights)return Math.min(1,beds.length);return Math.min(beds.length,Math.min(4,2+Math.floor(save.rep/40)));}return Math.min(beds.length,Math.min(4,3+Math.floor(save.rep/60)));}
  function createDay(){
    const ev=events[((save.season-1)*3+save.day-1)%events.length];save.eventId=ev.id;
    const count=getGuestCount(), rotation=(save.season*5+save.day*3)%guestTypes.length;
    const selected=[];for(let n=0;n<count;n++)selected.push(guestTypes[(rotation+n*3)%guestTypes.length]);
    save.guests=selected.map((g,i)=>({...g,visitId:`S${save.season}D${save.day}G${i}`,guestName:names[(save.season*7+save.day*3+i*4)%names.length],budget:g.budget+Math.min(12,Math.floor(save.rep/20)),reservation:''}));
    save.assignments={};persist();
  }
  if(!save.guests.length||!save.eventId)createDay();
  if(save.guidedStart&&!save.completedNights&&save.tutorialStep===0){selectedGuest=save.guests.find(g=>!save.assignments[g.visitId])?.visitId||'';uiMode=selectedGuest?'assign':'map';}
  function updateHeader(){
    document.body.classList.toggle('first-night',save.guidedStart&&save.completedNights===0);
    document.body.classList.toggle('tutorial-intro',save.guidedStart&&save.completedNights===0&&save.tutorialStep===0);
    if(!$('creditsValue'))return;
    const s=moduleStats();$('creditsValue').textContent=Math.floor(save.credits).toLocaleString('ja-JP');
    const stars=Math.min(5,1+Math.floor(save.rep/25));$('ratingValue').textContent='★'.repeat(stars)+'☆'.repeat(5-stars);$('repValue').textContent=save.rep;
    $('oxygenValue').textContent=`${s.oxygen} / ${save.guests.length}`;$('powerValue').textContent=`${s.gen} / ${s.used}`;
    $('oxygenValue').parentElement.classList.toggle('resource-alert',s.oxygen<save.guests.length);$('powerValue').parentElement.classList.toggle('resource-alert',s.gen<s.used);
    $('seasonTag').textContent=`SEASON ${String(save.season).padStart(2,'0')}　·　DAY ${String(save.day).padStart(2,'0')} / 07`;
    const ev=readEvent(save.eventId);$('dailyBanner').dataset.event=ev.id;$('dailyBanner').title=ev.line;$('eventIcon').textContent=ev.icon;$('eventTitle').textContent=ev.name;$('eventText').textContent=ev.text;
    $('soundButton').classList.toggle('sound-on',save.sound);$('soundButton').textContent=save.sound?'♪':'♫';
  }
  let audioContext=null;
  function playUiSound(kind='tap'){
    if(!save.sound)return;
    const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;
    try{audioContext=audioContext||new AudioEngine();if(audioContext.state==='suspended')audioContext.resume();const notes=kind==='report'?[523.25,659.25,783.99,1046.5]:kind==='build'?[392,587.33,783.99]:kind==='success'?[587.33,783.99,987.77]:[660,880];const start=audioContext.currentTime;notes.forEach((hz,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(hz,start+i*.075);gain.gain.setValueAtTime(.0001,start+i*.075);gain.gain.exponentialRampToValueAtTime(i===0?.045:.025,start+i*.075+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+i*.075+.3);osc.connect(gain);gain.connect(audioContext.destination);osc.start(start+i*.075);osc.stop(start+i*.075+.32);});}catch{}
  }
  function toast(text){const e=$('toast');e.textContent=text;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2200);}
  function enterAssign(){uiMode='assign';pendingBuild='';selectedPlot=-1;inspectedCell=-1;selectedGuest=save.guests.find(g=>!save.assignments[g.visitId])?.visitId||save.guests[0]?.visitId||'';renderPanels();}
  function enterBuild(){uiMode='build';selectedGuest='';pendingBuild='';selectedPlot=-1;inspectedCell=-1;renderPanels();}
  function closeContext(){uiMode='map';selectedGuest='';pendingBuild='';selectedPlot=-1;inspectedCell=-1;renderPanels();}
  function renderAll(){updateHeader();renderPanels();}
  function renderPanels(){if(!$('mapPanel'))return;const panel=$('mapPanel');panel.dataset.mode=uiMode;panel.innerHTML=renderMap();bindPanelEvents();}
  function roomName(cell){const room=moduleAt(cell);return room?.def.bed?room.def.name:'';}
  function renderMission(){
    const assigned=save.guests.filter(g=>save.assignments[g.visitId]).length,complete=save.guests.length>0&&assigned===save.guests.length;
    if(save.guidedStart&&!save.completedNights){
      const first=save.guests[0],ready=first&&save.assignments[first.visitId];
      return `<div class="mission-banner tutorial-mission" role="status" aria-live="polite"><span class="mission-step">${ready?'02':'01'}</span><div><small>はじめての夜 · ${ready?'2 / 2':'1 / 2'}</small><b>${ready?'準備できた！今夜を開こう':'最初の旅人を迎えよう'}</b><span>${ready?'金色の月ボタンで、滞在の結果を見てみよう':`${first?.guestName||'旅人'}さんが到着 · 客室を選ぼう`}</span></div><span class="mission-arrow">${ready?'→':'↓'}</span></div>`;
    }
    if(save.guidedStart&&save.completedNights===1&&save.tutorialStep===3){
      return `<div class="mission-banner tutorial-mission" role="status" aria-live="polite"><span class="mission-step">✦</span><div><small>はじめての夜 · COMPLETE</small><b>新しい旅人が到着しました</b><span>${save.guests.length}人を客室へ案内しよう。客室ボタンから始められます。</span></div><span class="mission-count">${assigned}/${save.guests.length}</span></div>`;
    }
    return `<div class="mission-banner" role="status" aria-live="polite"><span class="mission-step">${complete?'✦':'⌖'}</span><div><small>TONIGHT · DAY ${String(save.day).padStart(2,'0')}</small><b>${complete?'お迎えの準備 OK':'旅人を客室へ案内しよう'}</b><span>${complete?'月ボタンで今夜を開けます':`${assigned} / ${save.guests.length} 人の客室が決定`}</span></div><span class="mission-count">${assigned}/${save.guests.length}</span></div>`;
  }
  function renderAssignTray(){
    const guest=save.guests.find(g=>g.visitId===selectedGuest),unassigned=save.guests.filter(g=>!save.assignments[g.visitId]).length;
    const cards=save.guests.map(g=>{const assigned=save.assignments[g.visitId],chosen=g.visitId===selectedGuest,room=assigned?roomName(+assigned):'';return `<button class="guest-choice ${chosen?'selected':''} ${assigned?'assigned':''}" data-select-guest="${g.visitId}" aria-pressed="${chosen}"><span class="guest-choice-avatar">${g.icon}</span><span class="guest-choice-copy"><b>${g.guestName}</b><small>${assigned?`✓ ${room}`:g.name}</small></span></button>`;}).join('');
    const singleIntro=save.guidedStart&&save.completedNights===0&&save.guests.length===1;
    return `<div class="tray-heading"><span class="tray-step">1</span><div><b>${guest?(singleIntro?'光る客室をタップ':'旅人を選んで、光る客室へ'):'客室の割り当て'}</b><small>${guest?guest.requests:'案内する旅人を選んでください'}</small></div><button class="tray-close" id="closeContext" aria-label="操作を閉じる">×</button></div><div class="guest-choice-rail">${cards}</div><div class="tray-foot"><span>${guest?`<i>2</i> ${guest.guestName}にぴったりの客室をタップ`:'客室を選ぶと、滞在の準備ができます'}</span>${save.guests.length>1&&unassigned?'<button class="tray-secondary" id="autoAssignInline">おまかせ</button>':''}</div>`;
  }
  function renderBuildTray(){
    const current=pendingBuild?moduleDefs[pendingBuild]:null;
    const list=blueprints.map(id=>{const b=moduleDefs[id],locked=save.rep<(b.unlock||0),afford=save.credits>=b.cost;return `<button class="blueprint-chip ${pendingBuild===id?'selected':''} ${locked?'locked':''}" data-build="${id}" aria-label="${b.name}、${locked?`評判${b.unlock}で解放`:`${b.cost}クレジット`}" ${locked||!afford?'disabled':''}><span class="blueprint-chip-art">${moduleArt(id)}</span><b>${b.name}</b><small>${locked?`評判 ${b.unlock}で解放`:`◈ ${b.cost}`}</small></button>`;}).join('');
    return `<div class="tray-heading"><span class="tray-step">${current?'2':'1'}</span><div><b>${current?`${current.name}を建てる場所をタップ`:'どんな施設を建てる？'}</b><small>${current?'緑に光る「＋」が建てられる区画です':'施設を選ぶと、建てられる区画が光ります'}</small></div><button class="tray-close" id="closeContext" aria-label="建設を閉じる">×</button></div><div class="blueprint-rail">${list}</div>`;
  }
  function renderInspector(){
    const m=moduleAt(inspectedCell);if(!m)return'';
    const cost=Math.round((m.def.cost||80)*(.65+m.level*.5)),canUpgrade=m.level<3&&save.credits>=cost;
    const effect=m.def.bed?`客室 · ${save.guests.filter(g=>String(save.assignments[g.visitId])===String(inspectedCell)).length?'旅人が滞在中':'旅人を迎えられます'}`:m.def.gen?`電力 +${m.def.gen}`:m.def.oxygen?`酸素 +${m.def.oxygen}`:'旅人の満足度を高めます';
    return `<div class="inspector-card"><span class="inspector-art">${moduleArt(m.id,m.level)}</span><div class="inspector-copy"><small>この施設</small><b>${m.def.name} <i>LV ${m.level}</i></b><span>${effect}</span></div>${m.level<3?`<button class="upgrade-button" data-upgrade="${inspectedCell}" aria-label="${m.def.name}を強化。費用${cost}クレジット" ${canUpgrade?'':'disabled'}><span>強化</span><b>◈ ${cost}</b></button>`:''}<button class="tray-close" id="closeContext" aria-label="施設情報を閉じる">×</button></div>`;
  }
  function renderAlbumTray(){
    const cards=save.album.slice().reverse();
    return `<div class="tray-heading"><span class="tray-step">✉</span><div><b>旅人から届いた思い出 · ${cards.length}</b><small>${cards.length?'気に入った一枚を、旅の記念にシェアしよう':'満足した旅人が、手紙を置いていきます'}</small></div><button class="tray-close" id="closeContext" aria-label="思い出を閉じる">×</button></div>${cards.length?`<div class="memory-rail">${cards.map((c,i)=>`<article class="memory-chip"><span class="memory-art">${c.portrait?`<img src="${c.portrait}" alt="">`:`<i>${c.icon}</i>`}<em>${c.eventIcon}</em></span><span><small>DAY ${String(c.day).padStart(2,'0')}</small><b>${c.guestName} · ${c.guestType}</b><q>${c.text}</q></span>${i===0?'<button class="share-memory" id="shareMemory">シェア</button>':''}</article>`).join('')}</div>`:`<div class="memory-empty">✉　最初の夜を開くと、旅人から手紙が届くかも。</div>`}<div class="tray-foot"><span>✦ ${save.completedNights} nights　·　◈ ${save.lifetimeIncome}</span></div>`;
  }
  function renderContextTray(){
    if(uiMode==='assign')return renderAssignTray();
    if(uiMode==='build')return renderBuildTray();
    if(uiMode==='album')return renderAlbumTray();
    if(uiMode==='inspect')return renderInspector();
    return'';
  }
  function tagName(tag){return({stars:'星空',quiet:'静けさ',cozy:'くつろぎ',luxury:'特別室',nature:'植物',water:'水辺',gourmet:'食',social:'交流',art:'アート',research:'天文',fragrance:'香り',relax:'癒やし',power:'電力',sun:'日光',play:'遊び'})[tag]||tag;}
  function uiIcon(type){
    const drawings={
      guest:'<circle cx="12" cy="8" r="3.2"/><path d="M5.4 20a6.6 6.6 0 0 1 13.2 0M19 6.7a2.7 2.7 0 0 1 0 5.2M20 15a4.2 4.2 0 0 1 2 3.4"/>',
      build:'<path d="m14.2 6.3 3.5 3.5M4.5 19.5l8.9-8.9a4.4 4.4 0 0 1 6.2-6.2l-3.1 3.1 4 4 3.1-3.1a4.4 4.4 0 0 1-6.2 6.2l-8.9 8.9a2.8 2.8 0 0 1-4-4Z" transform="translate(-1 -1) scale(.92)"/>',
      album:'<path d="M5 4.5h13.5A2.5 2.5 0 0 1 21 7v13H7a3 3 0 0 1-3-3V5a.5.5 0 0 1 1-.5Z"/><path d="M7 4.5V17a3 3 0 0 0 3 3M9 9h7M9 12h5"/>',
      night:'<path d="M19.8 15.1A8.3 8.3 0 0 1 8.9 4.2 8.5 8.5 0 1 0 19.8 15Z"/><path d="m17.5 4 .7 1.5 1.6.7-1.6.7-.7 1.6-.7-1.6-1.5-.7 1.5-.7.7-1.5Z"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${drawings[type]||''}</svg>`;
  }
  function moduleArt(id,level=1){
    const models={
      hub:'<path class="model-body model-gold" d="M25 46h50l-5 18H30z"/><path class="model-dome model-gold" d="M30 45a20 20 0 0 1 40 0z"/><path class="model-glass" d="M35 43a15 15 0 0 1 30 0z"/><path class="model-frame" d="M50 29v17M39 35l11 11 11-11M42 64v-8h16v8"/><circle class="model-light" cx="50" cy="39" r="3"/>',
      reactor:'<path class="model-body model-blue" d="m30 43 20-13 20 13-20 13z"/><path class="model-side" d="m30 43 20 13v18L30 61zM70 43 50 56v18l20-13z"/><circle class="model-core" cx="50" cy="48" r="11"/><circle class="model-core-ring" cx="50" cy="48" r="16"/><path class="model-glass" d="M40 72h20"/>',
      observatory:'<path class="model-body model-blue" d="M24 55h52l-5 12H29z"/><path class="model-dome model-lilac" d="M33 54a17 17 0 0 1 34 0z"/><path class="model-glass" d="M38 53a12 12 0 0 1 24 0z"/><path class="model-frame" d="M50 39v20M50 40l17-12 6 4-17 13M42 67v5m16-5v5"/><circle class="model-lens" cx="72" cy="32" r="3"/>',
      observatory2:'<path class="model-body model-blue" d="M18 58h64l-6 13H24z"/><path class="model-dome model-lilac" d="M29 57a21 21 0 0 1 42 0z"/><path class="model-glass" d="M34 56a16 16 0 0 1 32 0z"/><path class="model-frame" d="M50 36v26m0-25 22-14 7 4-22 15M38 70v4m24-4v4"/><circle class="model-lens" cx="80" cy="22" r="4"/>',
      cabin:'<path class="model-body model-mint" d="M27 42q0-8 8-8h30q8 0 8 8v22H27z"/><path class="model-roof" d="M25 43 50 29l25 14"/><rect class="model-window" x="35" y="43" width="13" height="12" rx="5"/><rect class="model-window" x="53" y="43" width="12" height="12" rx="5"/><path class="model-door" d="M46 64v-9h9v9"/><path class="model-frame" d="M29 67h42"/>',
      glassroom:'<path class="model-body model-blue" d="M24 53h52l-5 14H29z"/><path class="model-dome model-cyan" d="M30 53a20 20 0 0 1 40 0z"/><path class="model-glass" d="M36 52a14 14 0 0 1 28 0z"/><path class="model-frame" d="M50 33v23M37 38l13 18 13-18M25 56h50"/><circle class="model-light" cx="50" cy="45" r="3"/>',
      gardenroom:'<path class="model-body model-mint" d="M28 45q2-13 22-13t22 13v20H28z"/><path class="model-roof" d="M26 46q24-26 48 0"/><rect class="model-window" x="39" y="46" width="22" height="13" rx="6"/><path class="model-door" d="M48 65v-9h7v9"/><path class="model-leaf" d="M34 42q-9-8-2-15 10 2 6 11m25 4q10-10 3-16-10 3-5 12"/>',
      greenhouse:'<path class="model-body model-mint" d="M25 45 50 28l25 17v23H25z"/><path class="model-glass" d="M31 46 50 33l19 13v18H31z"/><path class="model-frame" d="M50 33v31M32 48h36M40 40v23m20-23v23"/><path class="model-leaf" d="M39 57q-10-10-3-15 9 4 5 12m18 3q9-11 3-15-9 5-4 12"/><circle class="model-light" cx="50" cy="45" r="3"/>',
      cafe:'<path class="model-body model-coral" d="M28 43h44v23H28z"/><path class="model-roof model-gold" d="M24 43q26-24 52 0l-5 8H29z"/><path class="model-window" d="M34 49h11v11H34zm20 0h12v11H54z"/><path class="model-door" d="M47 66V54h7v12"/><path class="model-steam" d="M40 34q-4-5 0-9m10 8q-4-5 0-9m10 8q-4-5 0-9"/>',
      solar:'<path class="model-body model-blue" d="M35 55h30l-4 13H39z"/><circle class="model-core" cx="50" cy="49" r="7"/><g class="model-petals"><path class="model-petal" d="M46 43 42 21q8-6 16 0l-4 22z"/><path class="model-petal" d="M56 46 76 34q8 6 4 15L59 54z"/><path class="model-petal" d="m55 54 14 17q-5 9-15 6l-7-21z"/><path class="model-petal" d="M45 54 28 70q-9-3-8-14l22-9z"/><path class="model-petal" d="m43 45-22-8q-2-10 8-14l18 17z"/></g><circle class="model-light" cx="50" cy="49" r="3"/>',
      starglass:'<ellipse class="model-body model-blue" cx="50" cy="55" rx="29" ry="11"/><ellipse class="model-glass" cx="50" cy="50" rx="22" ry="9"/><path class="model-frame" d="M29 49v12m42-12v12M36 51V37m28 14V37M35 38h30"/><path class="model-roof model-gold" d="M31 39q19-25 38 0z"/><circle class="model-light" cx="50" cy="37" r="3"/>',
      gardenpod:'<path class="model-body model-mint" d="M30 47q0-15 20-15t20 15v19H30z"/><path class="model-glass" d="M36 47q0-9 14-9t14 9v12H36z"/><path class="model-door" d="M47 66V54h7v12"/><path class="model-leaf" d="M49 39q-16-9-9-18 12 1 11 14m0 2q9-17 17-10-1 12-14 13m-2-4q-4-14 5-16 8 8 0 17"/>',
      lounge:'<path class="model-body model-lilac" d="M25 53h50l-6 14H31z"/><path class="model-roof model-lilac" d="M30 52q20-27 40 0z"/><path class="model-frame" d="M35 52v14m30-14v14M40 48h20"/><path class="model-light" d="M48 42q2-8 4 0"/>',
      spa:'<ellipse class="model-body model-blue" cx="50" cy="56" rx="27" ry="13"/><ellipse class="model-water" cx="50" cy="53" rx="21" ry="8"/><path class="model-frame" d="M25 56v9q25 17 50 0v-9"/><path class="model-steam" d="M40 42q-5-7 0-12m10 11q-5-7 0-12m10 13q-5-7 0-12"/>',
      atelier:'<path class="model-body model-gold" d="M28 42h44v26H28z"/><path class="model-roof model-coral" d="M25 43 50 27l25 16z"/><rect class="model-window" x="35" y="47" width="15" height="13" rx="2"/><path class="model-frame" d="M56 49v12m-5-11h11"/><path class="model-light" d="M60 35v-7m-4 4h8"/>'
    };
    const body=models[id]||models.hub;
    return `<svg class="module-model model-${id} level-${Math.min(level,3)}" viewBox="0 0 100 84" aria-hidden="true"><ellipse class="model-shadow" cx="50" cy="70" rx="32" ry="6"/><path class="model-pad" d="M18 62 50 75 82 62 50 50Z"/>${body}</svg>`;
  }
  function renderMap(){
    const stats=moduleStats(),pending=pendingBuild?moduleDefs[pendingBuild]:null;
    const currentGuest=save.guests.find(g=>g.visitId===selectedGuest);
    const assignmentTargets=selectedGuest?stats.beds.filter(r=>!save.guests.some(g=>g.visitId!==selectedGuest&&String(save.assignments[g.visitId])===String(r.cell))):[];
    const bestRoom=assignmentTargets.slice().sort((a,b)=>roomFit(currentGuest,b.cell)-roomFit(currentGuest,a.cell))[0]?.cell;
    const tiles=Array.from({length:25},(_,i)=>{
      const m=moduleAt(i),coord=`${String.fromCharCode(65+Math.floor(i/5))}${i%5+1}`,adj=Object.keys(save.modules).some(c=>adjacent(+c,i));
      const roomGuest=m?.def.bed?save.guests.find(g=>String(save.assignments[g.visitId])===String(i)):null;
      const blockedByGuest=!!(selectedGuest&&save.guests.some(g=>g.visitId!==selectedGuest&&String(save.assignments[g.visitId])===String(i)));
      const roomTarget=uiMode==='assign'&&selectedGuest&&m?.def.bed&&!blockedByGuest;
      const recommended=roomTarget&&i===bestRoom;
      const buildTarget=uiMode==='build'&&!m&&adj;
      const mapBuildHint=uiMode==='map'&&save.completedNights>0&&!m&&adj;
      const placeTarget=!!(pendingBuild&&!m&&adj);
      const disabled=!!(pendingBuild&&!m&&!adj);
      const aria=m?`${m.def.name}${roomGuest?`。${roomGuest.guestName}が滞在中`:'。タップして施設情報を見る'}`:roomTarget?`${coord}、${recommended?'おすすめの':''}客室。タップして${currentGuest?.guestName||'旅人'}を案内`:buildTarget||placeTarget?`${coord}、建設可能な区画。タップして建設`:mapBuildHint?`${coord}、空き区画。タップして施設を選ぶ`:`${coord}、未開発区画`;
      const contents=m?`${moduleArt(m.id,m.level)}${roomGuest?`<span class="room-occupant" aria-label="${roomGuest.guestName}が宿泊予定"><i>${roomGuest.icon}</i></span>`:''}${recommended?'<span class="tap-room-label">ここ！</span>':''}${m.level>1?`<small class="level-badge">L${m.level}</small>`:''}`:roomTarget?`<span class="room-target-mark">↓</span><small class="tile-action">${recommended?'おすすめ':'客室'}</small>`:(buildTarget||placeTarget||mapBuildHint)?`<span class="place-plus">＋</span><small class="tile-action">${pending?'ここに建てる':'建てる'}</small>`:'<span class="empty-dot">·</span>';
      return `<button class="map-tile ${m?'built':'empty'} ${m?`module-${m.id}`:''} ${roomTarget?'guest-target':''} ${recommended?'recommended-target':''} ${buildTarget||placeTarget?'place-target':''} ${mapBuildHint?'map-build-hint':''} ${selectedPlot===i?'plot-selected':''} ${inspectedCell===i?'inspected':''} ${recentCell===i?'newly-built':''} ${disabled?'disconnected':''}" style="--tile-order:${i}" data-cell="${i}" aria-label="${aria}" title="${aria}" ${disabled?'disabled':''}><span class="tile-coord">${coord}</span>${contents}</button>`;
    }).join('');
    const assigned=save.guests.filter(g=>save.assignments[g.visitId]).length,complete=save.guests.length>0&&assigned===save.guests.length;
    const tray=renderContextTray();
    const firstNight=save.guidedStart&&save.completedNights===0;
    return `<div class="board-topline"><span class="board-worldmark"><i>✦</i> ASTEROID 04·17 <small>${Object.keys(save.modules).length} / 25</small></span><span class="capacity-chip">⌂ ${stats.beds.length} 客室</span></div>${renderMission()}<div class="map-wrap"><div class="orbit-ribbon" aria-hidden="true"><span class="orbit-ribbon-dot"></span></div><div class="map-grid">${tiles}</div><span class="board-asteroid" aria-hidden="true">✦</span></div><section class="context-tray ${uiMode}" id="contextTray" ${tray?'':'hidden'}>${tray}</section><nav class="game-dock" aria-label="ゲーム操作"><button class="dock-action ${uiMode==='assign'?'active':''}" id="openGuests" aria-label="客室を割り当て"><span class="dock-art guest-dock">${uiIcon('guest')}</span><span class="dock-label"><b>客室</b><small>${save.guests.length}人を案内</small></span><i class="dock-count">${save.guests.length}</i></button>${firstNight?'':`<button class="dock-action ${uiMode==='build'?'active':''}" id="openBlueprints" aria-label="施設を建てる"><span class="dock-art">${uiIcon('build')}</span><span class="dock-label"><b>建てる</b><small>島を育てる</small></span></button><button class="dock-action ${uiMode==='album'?'active':''}" id="openAlbum" aria-label="旅人の思い出"><span class="dock-art">${uiIcon('album')}</span><span class="dock-label"><b>思い出</b><small>${save.album.length}通</small></span></button>`}<button class="dock-action night-action ${complete?'ready':''}" id="nightLaunch" aria-label="${complete?'今夜を開く':'旅人を客室へ案内する'}"><span class="dock-art">${uiIcon('night')}</span><span class="dock-label"><b>${complete?'今夜を開く':'夜のしたく'}</b><small>${complete?'滞在の結果を見る':`${assigned}/${save.guests.length}人`}</small></span><span class="dock-arrow">→</span></button></nav>`;
  }
  function bindPanelEvents(){
    const panel=$('mapPanel');
    panel.querySelectorAll('[data-cell]').forEach(el=>el.addEventListener('click',()=>tapCell(+el.dataset.cell)));
    panel.querySelector('#openGuests')?.addEventListener('click',enterAssign);
    panel.querySelector('#openBlueprints')?.addEventListener('click',enterBuild);
    panel.querySelector('#openAlbum')?.addEventListener('click',()=>{uiMode='album';selectedGuest='';pendingBuild='';selectedPlot=-1;inspectedCell=-1;renderPanels();});
    panel.querySelector('#nightLaunch')?.addEventListener('click',runNight);
    panel.querySelector('#closeContext')?.addEventListener('click',closeContext);
    panel.querySelector('#autoAssignInline')?.addEventListener('click',autoAssign);
    panel.querySelectorAll('[data-select-guest]').forEach(el=>el.addEventListener('click',()=>{selectedGuest=el.dataset.selectGuest;uiMode='assign';inspectedCell=-1;renderPanels();}));
    panel.querySelectorAll('[data-build]').forEach(el=>el.addEventListener('click',()=>chooseBuild(el.dataset.build)));
    panel.querySelectorAll('[data-upgrade]').forEach(el=>el.addEventListener('click',()=>upgradeModule(+el.dataset.upgrade)));
    panel.querySelector('#shareMemory')?.addEventListener('click',shareLatestMemory);
  }
  async function shareLatestMemory(){
    const memory=save.album[save.album.length-1];if(!memory)return toast('シェアする思い出がまだありません');
    const text=`${memory.guestName}から届いた、ASTERIAの星の思い出。「${memory.text}」`;
    try{if(navigator.share)await navigator.share({title:'ASTERIAの旅の思い出',text,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(text);toast('旅の思い出をコピーしました');}else toast(text);}catch(e){if(e.name!=='AbortError')toast('シェアを開けませんでした');}
  }
  function autoAssign(){
    const available=moduleStats().beds.map(r=>r.cell),assign={};
    for(const g of save.guests){if(!available.length)break;let best=available[0],value=-999;for(const c of available){const v=roomFit(g,c);if(v>value){value=v;best=c;}}assign[g.visitId]=String(best);available.splice(available.indexOf(best),1);}
    save.assignments=assign;if(save.guidedStart&&!save.completedNights)save.tutorialStep=1;selectedGuest='';uiMode='map';pendingBuild='';inspectedCell=-1;persist();renderPanels();playUiSound('success');toast('客室を準備しました。金色の月から今夜を開けます');
  }
  function chooseBuild(id){
    const b=moduleDefs[id];if(!b)return;if(save.rep<(b.unlock||0))return toast(`評判 ${b.unlock} で解放されます`);if(save.credits<b.cost)return toast('クレジットが足りません');
    pendingBuild=id;selectedGuest='';inspectedCell=-1;uiMode='build';playUiSound('build');
    if(selectedPlot>=0){const cell=selectedPlot;placeModule(cell);return;}
    renderPanels();toast(`${b.name}を建てる区画をタップ。緑の＋が目印です`);
  }
  function placeModule(cell){
    const def=moduleDefs[pendingBuild];if(!def)return;
    if(moduleAt(cell)){selectedPlot=-1;toast('この区画には施設があります。緑の＋を選んでね');renderPanels();return;}
    if(!Object.keys(save.modules).some(c=>adjacent(+c,cell))){selectedPlot=-1;toast('施設のとなりにある、緑の＋を選んでね');renderPanels();return;}
    if(save.credits<def.cost){pendingBuild='';selectedPlot=-1;renderPanels();toast('クレジットが足りません');return;}
    save.credits-=def.cost;save.modules[cell]={id:pendingBuild,level:1};const name=def.name;pendingBuild='';selectedPlot=-1;inspectedCell=cell;uiMode='inspect';recentCell=cell;persist();renderPanels();playUiSound('build');toast(`${name} ができました！タップして効果を確認できます`);setTimeout(()=>{if(recentCell===cell){recentCell=-1;$('mapPanel').querySelector(`[data-cell="${cell}"]`)?.classList.remove('newly-built');}},1250);
  }
  function tapCell(cell){
    const existing=moduleAt(cell);
    if(uiMode==='assign'&&selectedGuest){
      if(!existing?.def.bed){toast('旅人は客室に泊まります。光る客室を選んでね');return;}
      const occupant=Object.entries(save.assignments).find(([id,c])=>id!==selectedGuest&&String(c)===String(cell));if(occupant){toast('この客室には別の旅人が泊まります');return;}
      const guest=save.guests.find(g=>g.visitId===selectedGuest);if(!guest)return;
      save.assignments[selectedGuest]=String(cell);if(save.guidedStart&&!save.completedNights)save.tutorialStep=1;
      const next=save.guests.find(g=>!save.assignments[g.visitId]);selectedGuest=next?.visitId||'';uiMode=next?'assign':'map';inspectedCell=-1;persist();renderPanels();playUiSound('success');toast(next?`${guest.guestName}のお部屋が決まりました。次の旅人へ`:`${guest.guestName}に${existing.def.name}を用意しました`);return;
    }
    if(uiMode==='build'){
      if(pendingBuild){placeModule(cell);return;}
      if(existing){uiMode='inspect';inspectedCell=cell;renderPanels();return;}
      selectedPlot=cell;renderPanels();return;
    }
    if(existing){uiMode='inspect';selectedGuest='';pendingBuild='';selectedPlot=-1;inspectedCell=cell;renderPanels();return;}
    const canBuild=Object.keys(save.modules).some(c=>adjacent(+c,cell));
    if(save.guidedStart&&!save.completedNights){toast('まずは金色に光る客室をタップして、最初の旅人を迎えよう');return;}
    if(canBuild){uiMode='build';selectedGuest='';selectedPlot=cell;inspectedCell=-1;renderPanels();return;}
    toast('緑の＋がある区画なら、ここから施設を建てられます');
  }
  function upgradeModule(cell){const m=moduleAt(cell);if(!m||m.level>=3)return;const cost=Math.round((m.def.cost||80)*(.65+m.level*.5));if(save.credits<cost)return toast('クレジットが足りません');save.credits-=cost;save.modules[cell].level++;persist();renderPanels();playUiSound('success');toast(`${m.def.name} をレベル ${save.modules[cell].level} に強化`);}
  function rawFit(g,roomCell){const room=moduleAt(roomCell);let score=intersects(g.roomTags,room.def.tags)?3:0;for(const n of getNeighbors(roomCell))if(intersects(g.tags,n.def.tags))score+=2;return score;}
  function runNight(){
    if(!save.guests.every(g=>save.assignments[g.visitId])){enterAssign();toast('光る客室をタップすると、今夜の準備ができます');return;}
    const firstNight=save.guidedStart&&save.completedNights===0;
    const stats=moduleStats(),event=readEvent(save.eventId),powerBad=stats.gen<stats.used,oxygenBad=stats.oxygen<save.guests.length;
    let income=0;const outcomes=[];
    for(const guest of save.guests){const cell=Number(save.assignments[guest.visitId]);let quality=3;const room=moduleAt(cell);if(intersects(guest.roomTags,room.def.tags))quality+=1;const near=getNeighbors(cell).some(n=>intersects(guest.tags,n.def.tags));if(near)quality+=1;if(guest.tags.includes(event.tag))quality+=.7;quality+=(room.level-1)*.35;if(powerBad)quality-=.8;if(oxygenBad)quality-=.7;quality=Math.max(1,Math.min(5,Math.round(quality*10)/10));const stars=Math.max(1,Math.min(5,Math.round(quality)));const pay=Math.round(guest.budget*(.64+quality*.12)+(guest.tags.includes(event.tag)?5:0));income+=pay;outcomes.push({guest,cell,quality,stars,pay,near,roomName:room.def.name});
      const postId=`${guest.id}-${event.id}`;if(quality>=4&&!save.album.some(x=>x.id===postId)){save.album.push({id:postId,guestName:guest.guestName,guestType:guest.name,icon:guest.icon,portrait:guest.portrait||'',eventIcon:event.icon,text:guest.postcard,season:save.season,day:save.day});}}
    const upkeep=stats.upkeep,net=income-upkeep;save.credits=Math.max(0,save.credits+net);const average=outcomes.reduce((a,o)=>a+o.quality,0)/outcomes.length;save.rep=Math.max(0,Math.min(100,save.rep+Math.round((average-3)*2.4)));save.completedNights++;if(firstNight)save.tutorialStep=2;save.seasonIncome+=net;save.lifetimeIncome+=income;save.seasonAverage=save.seasonAverage?((save.seasonAverage*(save.completedNights%7?((save.completedNights-1)%7):6))+average)/(((save.completedNights-1)%7)+1):average;save.bestAverage=Math.max(save.bestAverage,average);
    const report={season:save.season,day:save.day,event:event.name,eventIcon:event.icon,outcomes,average, income,upkeep,net,rep:save.rep,postcards:save.album.length,seasonEnd:save.day===7,tutorialEnd:firstNight};save.history.push(report);if(save.history.length>14)save.history.shift();
    if(save.day===7){save.season++;save.day=1;save.seasonIncome=0;save.seasonAverage=average;save.credits+=60;createDay();}else{save.day++;createDay();}
    persist();renderAll();showReport(report,true);
  }
  let activeReport=null;
  function showReport(report,advance){
    if(!report)return;activeReport=report;playUiSound('report');const isSeason=report.seasonEnd;$('modalKicker').textContent=isSeason?'SEASON COMPLETE · ASTERIA':'NIGHT REPORT · '+report.event.toUpperCase();$('modalTitle').textContent=isSeason?`シーズン ${String(report.season).padStart(2,'0')} を終えて`:'今夜の滞在記録';
    $('modalBody').innerHTML=`<div class="report-cinematic"><span class="report-event-glyph">${report.eventIcon}</span><div><small>ONE NIGHT IN ASTERIA</small><b>${report.event}</b><span>星あかりの下で、${report.outcomes.length}組の旅が始まりました。</span></div></div><div class="report-summary"><div><small>平均満足度</small><b>${report.average.toFixed(1)} <i>★</i></b></div><div><small>今夜の収支</small><b class="${report.net>=0?'positive':'negative'}">${report.net>=0?'+':''}${report.net} <i>◈</i></b></div><div><small>評判</small><b>${report.rep}<i> / 100</i></b></div></div><div class="report-list">${report.outcomes.map(o=>`<article class="report-guest"><span class="report-avatar">${o.guest.portrait?`<img src="${o.guest.portrait}" alt="">`:o.guest.icon}</span><span class="report-copy"><b>${o.guest.guestName} <small>${o.guest.name} · ${o.roomName}</small></b><span>${'★'.repeat(o.stars)}<i>${'☆'.repeat(5-o.stars)}</i></span></span><b class="report-pay">+${o.pay} ◈</b></article>`).join('')}</div><div class="report-message">${isSeason?`7夜の営業、おつかれさまでした。<br/>旅人たちの平均満足度は <b>${report.average.toFixed(1)} ★</b>。次のシーズン準備金 ◈60 を受け取りました。`:`今夜のイベント「${report.event}」で、<b>${report.postcards}</b>通の思い出がアルバムに届いています。維持費 ◈${report.upkeep} を差し引きました。`}</div>`;
    $('modalActions').innerHTML=`<button class="continue-button" id="continueButton">${isSeason?'次のシーズンへ':'明日の予約を見る'} <span>→</span></button>`;$('modalBackdrop').classList.remove('hidden');$('continueButton').onclick=dismissReport;
  }
  function dismissReport(){
    $('modalBackdrop').classList.add('hidden');if(!activeReport)return;
    if(activeReport.tutorialEnd)save.tutorialStep=3;activeReport=null;uiMode='map';selectedGuest='';selectedPlot=-1;pendingBuild='';inspectedCell=-1;persist();renderPanels();window.scrollTo({top:$('commandDeck').offsetTop-18,behavior:'smooth'});
  }
  $('modalClose').addEventListener('click',dismissReport);
  $('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))dismissReport();});
  $('soundButton').addEventListener('click',()=>{save.sound=!save.sound;persist();if(save.sound)playUiSound('success');toast(save.sound?'サウンドをオン':'サウンドをオフ');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('modalBackdrop').classList.contains('hidden'))dismissReport();else if(uiMode!=='map')closeContext();}});
  renderAll();
})();
