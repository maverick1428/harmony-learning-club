/* =====================================================================
   HARMONY LEARNING CLUB
   Built for an 11-year-old learner. Design rules used everywhere:
   - Same structure in every world: Learn -> Practice -> Stars
   - One thing on screen at a time, literal language, short sentences
   - Pictures first, numbers second (concrete -> visual -> symbols)
   - Wrong answers get a hint and a retry, never a penalty
   ===================================================================== */

/* ---------- tiny helpers ---------- */
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const plain = html => String(html)
  .replace(/<br\s*\/?>/gi, '. ')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, 'and')
  .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{FE0F}\u{20E3}]/gu, ' ')
  .replace(/\s+/g, ' ')
  .replace(/(?:\.\s*){2,}/g, '. ')   /* a run of <br>s turns into one pause, not ". . ." */
  .trim();

/* ---------- progress (private to this browser) ---------- */
const store = {
  get(){ try{ const raw = localStorage.getItem('hlc-save'); return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; } },
  set(data){ try{ localStorage.setItem('hlc-save', JSON.stringify(data)); }catch(e){ /* still fine without saving */ } }
};
let save = store.get();
if(!save.stars) save.stars = {};
if(!Array.isArray(save.log)) save.log = [];   /* one record per practice run — feeds the grown-up page */
if(save.speak === undefined) save.speak = true;
const LOG_MAX = 120;

/* ---------- read-aloud (optional, off-switch on the grown-up page) ---------- */
const speech = {
  ok: typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function',
  stop(){ if(this.ok){ try{ speechSynthesis.cancel(); }catch(e){} } },
  say(text){
    if(!this.ok || !save.speak) return;
    this.stop();
    const words = plain(text);
    if(!words) return;
    try{
      const u = new SpeechSynthesisUtterance(words);
      u.rate = 0.9; u.pitch = 1.05;
      speechSynthesis.speak(u);
    }catch(e){ /* reading aloud is a bonus, never required */ }
  }
};

/* ---------- SVG builders (all visuals are drawn, no images) ---------- */
function svgFractionCircle(parts, filled, color, size=150){
  const r=62, cx=75, cy=75; let paths='';
  for(let i=0;i<parts;i++){
    const a0=(i/parts)*2*Math.PI - Math.PI/2, a1=((i+1)/parts)*2*Math.PI - Math.PI/2;
    const x0=cx+r*Math.cos(a0), y0=cy+r*Math.sin(a0);
    const x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    const big = (1/parts)>.5 ? 1 : 0;
    const fill = i<filled ? color : 'transparent';
    paths += `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${big} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${fill}" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/>`;
  }
  if(parts===1){ paths=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${filled?color:'transparent'}" stroke="currentColor" stroke-width="3.5"/>`; }
  return `<svg width="${size}" height="${size}" viewBox="0 0 150 150" role="img" aria-label="Circle cut into ${parts} parts, ${filled} colored in">${paths}</svg>`;
}

function svgFractionBar(parts, filled, color, w=280){
  const h=54, cw=w/parts; let cells='';
  for(let i=0;i<parts;i++){
    cells += `<rect x="${(i*cw)+2}" y="2" width="${cw-0}" height="${h-4}" fill="${i<filled?color:'transparent'}" stroke="currentColor" stroke-width="3" rx="4"/>`;
  }
  return `<svg width="${w+4}" height="${h}" viewBox="0 0 ${w+4} ${h}" role="img" aria-label="Bar cut into ${parts} parts, ${filled} colored in">${cells}</svg>`;
}

function svgGrid(rows, cols, color, opts={}){
  const cell=34, pad=3, w=cols*cell+pad*2, h=rows*cell+pad*2;
  let cells='';
  for(let r0=0;r0<rows;r0++) for(let c0=0;c0<cols;c0++){
    const shaded = opts.blank ? false : true;
    cells += `<rect x="${pad+c0*cell}" y="${pad+r0*cell}" width="${cell}" height="${cell}" fill="${shaded?color:'transparent'}" fill-opacity="${shaded?0.35:0}" stroke="currentColor" stroke-width="2.5"/>`;
  }
  let labels='';
  if(opts.sides){
    const across = opts.across || `${cols} squares across`;
    const up = opts.up || `${rows} up`;
    labels = `<text x="${w/2}" y="${h+22}" text-anchor="middle" font-size="17" font-weight="800" fill="currentColor">${across}</text>`
           + `<text x="${-h/2}" y="-8" transform="rotate(-90)" text-anchor="middle" font-size="17" font-weight="800" fill="currentColor">${up}</text>`;
    return `<svg width="${w+30}" height="${h+30}" viewBox="-26 0 ${w+30} ${h+30}" role="img" aria-label="A rectangle grid, ${cols} across and ${rows} up">${cells}${labels}</svg>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="A rectangle made of ${rows*cols} squares">${cells}</svg>`;
}

function svgClock(hh, mm, color, size=170){
  const cx=85, cy=85, r=78;
  let ticks='';
  for(let i=0;i<12;i++){
    const a=i/12*2*Math.PI - Math.PI/2;
    const nx=cx+(r-16)*Math.cos(a), ny=cy+(r-16)*Math.sin(a)+6;
    ticks+=`<text x="${nx}" y="${ny}" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">${i===0?12:i}</text>`;
  }
  const ma=mm/60*2*Math.PI - Math.PI/2;
  const ha=((hh%12)+mm/60)/12*2*Math.PI - Math.PI/2;
  const mx=cx+(r-28)*Math.cos(ma), my=cy+(r-28)*Math.sin(ma);
  const hx=cx+(r-46)*Math.cos(ha), hy=cy+(r-46)*Math.sin(ha);
  return `<svg width="${size}" height="${size}" viewBox="0 0 170 170" role="img" aria-label="A clock">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="currentColor" stroke-width="4"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="currentColor"/>
  </svg>`;
}

/* --- money: coins drawn at their real relative sizes, plus dollar bills --- */
const COIN_ART = {
  100:{r:32, label:"$1",  name:"one dollar coin", fill:"#D9C27A"},
  25: {r:30, label:"25¢", name:"quarter",         fill:"#C8CBD2"},
  10: {r:21, label:"10¢", name:"dime",            fill:"#C8CBD2"},
  5:  {r:26, label:"5¢",  name:"nickel",          fill:"#C8CBD2"},
  1:  {r:23, label:"1¢",  name:"penny",           fill:"#D89468"}
};
function svgMoney(bills, coins){
  bills = bills || []; coins = coins || [];
  const gap=10, billW=76, billH=42, h=76;
  let x=4, parts='', names=[];
  bills.forEach(v=>{
    parts += `<rect x="${x}" y="${(h-billH)/2}" width="${billW}" height="${billH}" rx="6" fill="#9CC79C" stroke="currentColor" stroke-width="3"/>`
           + `<text x="${x+billW/2}" y="${h/2+7}" text-anchor="middle" font-size="20" font-weight="800" fill="#1B3A1B">$${v}</text>`;
    names.push(`${v} dollar bill`);
    x += billW + gap;
  });
  coins.forEach(v=>{
    const c = COIN_ART[v] || COIN_ART[1];
    parts += `<circle cx="${x+c.r}" cy="${h/2}" r="${c.r}" fill="${c.fill}" stroke="currentColor" stroke-width="3"/>`
           + `<text x="${x+c.r}" y="${h/2+6}" text-anchor="middle" font-size="${c.r>24?17:14}" font-weight="800" fill="#2B2B2B">${c.label}</text>`;
    names.push(c.name);
    x += c.r*2 + gap;
  });
  const w = Math.max(x+4, 60);
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Money: ${names.join(', ')}">${parts}</svg>`;
}

/* --- number line: works for money, whole numbers, and fractions --- */
function fmtPoint(v, fmt, step){
  if(fmt==='money') return '$' + v.toFixed(2);
  if(fmt==='frac'){
    const den = Math.round(1/step);
    const num = Math.round(v/step);
    if(num===0) return '0';
    if(num===den) return '1';
    return `${num}/${den}`;
  }
  return String(Math.round(v*100)/100);
}
function svgNumberLine(spec, color){
  const min=spec.min, max=spec.max, step=spec.step, fmt=spec.fmt||'num';
  const w=300, pad=30, y=54, span=max-min;
  const count = Math.round(span/step);
  let ticks='';
  for(let i=0;i<=count;i++){
    const v = min + i*step;
    const x = pad + (i/count)*(w-pad*2);
    ticks += `<line x1="${x.toFixed(1)}" y1="${y-9}" x2="${x.toFixed(1)}" y2="${y+9}" stroke="currentColor" stroke-width="3"/>`
           + `<text x="${x.toFixed(1)}" y="${y+30}" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">${fmtPoint(v,fmt,step)}</text>`;
  }
  let marker='';
  if(spec.mark !== undefined && spec.mark !== null){
    const mx = pad + ((spec.mark-min)/span)*(w-pad*2);
    marker = `<circle cx="${mx.toFixed(1)}" cy="${y}" r="10" fill="${color}" stroke="currentColor" stroke-width="3"/>`
           + `<text x="${mx.toFixed(1)}" y="${y-20}" text-anchor="middle" font-size="16" font-weight="800" fill="currentColor">${spec.label||'?'}</text>`;
  }
  /* height has to clear the tick labels, which sit 30px below the line */
  return `<svg width="${w}" height="92" viewBox="0 0 ${w} 92" role="img" aria-label="A number line from ${fmtPoint(min,fmt,step)} to ${fmtPoint(max,fmt,step)}">
    <line x1="${pad}" y1="${y}" x2="${w-pad}" y2="${y}" stroke="currentColor" stroke-width="3.5"/>
    ${ticks}${marker}</svg>`;
}

function svgScene(emojis){
  return `<div style="font-size:52px; letter-spacing:8px; text-align:center; padding:6px 0;">${emojis}</div>`;
}

/* visual dispatcher used by lesson pages and questions */
function renderVisual(v, accent){
  if(!v) return '';
  let inner='';
  if(v.t==='circle') inner = svgFractionCircle(v.parts, v.filled, accent);
  if(v.t==='twocircles') inner = svgFractionCircle(v.a[0],v.a[1],accent,120) + '<span style="width:22px"></span>' + svgFractionCircle(v.b[0],v.b[1],accent,120);
  if(v.t==='bar') inner = svgFractionBar(v.parts, v.filled, accent);
  if(v.t==='twobars') return `<div class="visual stack">${svgFractionBar(v.a[0],v.a[1],accent,264)}${svgFractionBar(v.b[0],v.b[1],accent,264)}</div>`;
  if(v.t==='grid') inner = svgGrid(v.rows, v.cols, accent, v.opts||{});
  if(v.t==='gridx'){
    inner = svgGrid(v.rows, v.cols, accent, {}) +
      `<div style="align-self:center; margin-left:14px; font-family:'Fredoka'; font-weight:600; font-size:20px;">× ${v.layers} layers<br>high 🧱</div>`;
  }
  if(v.t==='clock') inner = svgClock(v.h, v.m, accent);
  if(v.t==='twoclocks') inner = svgClock(v.a[0],v.a[1],accent,130) + '<span style="width:18px"></span>' + svgClock(v.b[0],v.b[1],accent,130);
  if(v.t==='money') inner = svgMoney(v.b, v.c);
  if(v.t==='numberline') inner = svgNumberLine(v, accent);
  if(v.t==='scene') return svgScene(v.e);
  return `<div class="visual">${inner}</div>`;
}

/* =====================================================================
   ENGINE
   ===================================================================== */
const app = $("#app");
let S = { mode: save.name ? "home" : "gate", w:null, page:0, gtab:"how" };

function stars(count){ return "⭐".repeat(count) + "☆".repeat(3-count); }
function world(){ return WORLDS[S.w]; }
function now(){ return Date.now(); }

function render(){
  speech.stop();
  if(S.mode==="gate") return renderGate();
  if(S.mode==="home") return renderHome();
  if(S.mode==="grown") return renderGrown();
  if(S.mode==="lesson") return renderLesson();
  if(S.mode==="quiz") return renderQuiz();
  if(S.mode==="done") return renderDone();
}

/* a speak button that reads whatever text it is handed */
let SAY_TEXT = "";
function speakBtn(){
  if(!speech.ok || !save.speak) return "";
  return `<button class="speak" id="sayBtn" type="button">🔊 Read this to me</button>`;
}
function wireSpeak(text){
  SAY_TEXT = text;
  const b = $("#sayBtn");
  if(b) b.onclick = ()=> speech.say(SAY_TEXT);
}

/* ---------- first visit: ask the learner's name (skippable) ---------- */
function renderGate(){
  app.innerHTML = `
  <div class="gate">
    <span style="font-size:60px">💗🌟👦</span>
    <h1 class="display" style="font-size:32px; margin:10px 0 4px;">Harmony Learning Club</h1>
    <p style="color:var(--ink-soft); margin:0;">The characters want to know your name!</p>
    <div class="sticker" style="margin-top:18px;">
      <input id="nameIn" maxlength="20" placeholder="Type your name" aria-label="Type your name">
      <button class="btn" id="goBtn">Let’s go!</button>
    </div>
  </div>`;
  $("#goBtn").onclick = ()=>{
    const n = $("#nameIn").value.trim();
    save.name = n || "friend";
    store.set(save); S.mode="home"; render();
  };
  $("#nameIn").addEventListener("keydown", e=>{ if(e.key==="Enter") $("#goBtn").click(); });
}

/* ---------- home map ---------- */
function renderHome(){
  const total = Object.values(save.stars).reduce((a,b)=>a+b,0);
  const cards = WORLDS.map((w,i)=>{
    const s = save.stars[w.id]||0;
    return `<button class="tap world-card ${w.cls}" data-i="${i}">
      <span class="icon">${w.emoji}</span>
      <span><h2>${w.name}</h2><p class="who">${w.hostLine}</p></span>
      <span class="stars" aria-label="${s} of 3 stars">${stars(s)}</span>
    </button>`;
  }).join("");
  app.innerHTML = `
    <header class="hero">
      <span class="medal">🏅</span>
      <h1>Hi ${esc(save.name)}!</h1>
      <p class="sub">Pick a world. Learn with the characters. Win stars! (${total} ⭐ so far)</p>
    </header>
    <div class="map">${cards}</div>
    <div class="grownup"><button id="grownBtn">For grown-ups</button></div>`;
  app.querySelectorAll(".world-card").forEach(b=>{
    b.onclick = ()=>{ S.w = +b.dataset.i; S.mode="lesson"; S.page=0; render(); window.scrollTo(0,0); };
  });
  $("#grownBtn").onclick = ()=>{ S.mode="grown"; S.gtab="how"; render(); window.scrollTo(0,0); };
}

/* ---------- top bar shared by lesson + quiz ---------- */
function topbar(title, dots){
  return `<div class="topbar">
    <button class="back" id="backBtn" aria-label="Back to the map">🏠</button>
    <span class="title">${title}</span>
    <span class="steps" aria-hidden="true">${dots||""}</span>
  </div>`;
}
function wireBack(){ $("#backBtn").onclick = ()=>{ S.mode="home"; render(); window.scrollTo(0,0); }; }

/* ---------- lesson pages ---------- */
function renderLesson(){
  const w = world(); const pg = w.lesson[S.page];
  const dots = w.lesson.map((_,i)=>`<i class="${i<S.page?'done':i===S.page?'now':''}"></i>`).join("");
  app.innerHTML = `<div class="${w.cls}">
    ${topbar(w.name, dots)}
    <div class="sticker">
      <div class="say">
        <span class="avatar">${pg.c.av}</span>
        <div class="bubble"><span class="name">${pg.c.name}</span><p>${pg.text}</p></div>
      </div>
      ${renderVisual(pg.v, w.hex)}
      ${speakBtn()}
    </div>
    <div class="lesson-nav">
      <button class="btn secondary" id="prevBtn" ${S.page===0?"disabled":""}>◀ Back</button>
      <button class="btn" id="nextBtn" style="background:${w.hex}">${S.page===w.lesson.length-1 ? "Let’s practice! ✏️" : "Next ▶"}</button>
    </div>
  </div>`;
  wireBack();
  wireSpeak(pg.text);
  $("#prevBtn").onclick = ()=>{ if(S.page>0){S.page--; render();} };
  $("#nextBtn").onclick = ()=>{
    if(S.page < w.lesson.length-1){ S.page++; render(); window.scrollTo(0,0); }
    else { startRun(w.questions.map((_,i)=>i), false); }
  };
}

/* ---------- a practice run ----------
   A run is a list of question numbers to work through. A normal run is every
   question in order. A "tricky ones" run is only the ones that needed a hint. */
function startRun(queue, isReview){
  S.queue = queue.slice();
  S.pos = 0;
  S.firstTry = 0;
  S.miss = {};          /* question number -> how many wrong taps */
  S.qsec = {};          /* question number -> seconds spent */
  S.review = !!isReview;
  S.runStart = now();
  S.mode = "quiz";
  render();
  window.scrollTo(0,0);
}

function renderQuiz(){
  const w = world();
  const qIdx = S.queue[S.pos];
  const q = w.questions[qIdx];
  const dots = S.queue.map((_,i)=>`<i class="${i<S.pos?'done':i===S.pos?'now':''}"></i>`).join("");
  const storyBlock = q.story ? `<div class="sticker" style="margin-bottom:14px; background:var(--bubble);"><p style="margin:0">${q.story}</p></div>` : "";
  const banner = S.review ? `<p class="review-note">Practice round — just the tricky ones. Your stars are already saved. 💪</p>` : "";
  app.innerHTML = `<div class="${w.cls}">
    ${topbar(w.name, dots)}
    ${banner}
    ${storyBlock}
    <div class="sticker q-card">
      <h3>${q.q}</h3>
      ${renderVisual(q.v, w.hex)}
      <div class="answers">
        ${q.o.map((opt,i)=>`<button class="tap answer" data-i="${i}">${opt}</button>`).join("")}
      </div>
      ${speakBtn()}
      <div class="feedback" id="fb" role="status"></div>
      <div class="after" id="after">
        <button class="btn" id="nextQ" style="background:${w.hex}">${S.pos===S.queue.length-1 ? "Finish! 🏁" : "Next question ▶"}</button>
      </div>
    </div>
  </div>`;
  wireBack();
  wireSpeak([q.story||"", q.q, q.o.join(". ")].join(". "));

  S.qStart = now();
  let locked = false, tried = false;
  const fb = $("#fb");
  app.querySelectorAll(".answer").forEach(btn=>{
    btn.onclick = ()=>{
      if(locked) return;
      const i = +btn.dataset.i;
      if(i === q.a){
        locked = true;
        if(!tried) S.firstTry++;
        S.qsec[qIdx] = Math.round((now() - S.qStart)/1000);
        btn.classList.add("right");
        fb.className = "feedback good show";
        fb.innerHTML = `<p class="fb-head">${pick(["That’s it! ✅","Great catch! ✅","You got it! ✅","Nice work! ✅"])}</p><p>${q.why}</p>`;
        $("#after").classList.add("show");
        app.querySelectorAll(".answer").forEach(b=>{ if(+b.dataset.i!==q.a) b.style.opacity=.45; });
        speech.say(q.why);
      } else {
        tried = true;
        S.miss[qIdx] = (S.miss[qIdx]||0) + 1;
        btn.classList.add("wrong"); btn.disabled = true;
        fb.className = "feedback soft show";
        fb.innerHTML = `<p class="fb-head">Not yet — try again 💪</p><p>${q.hint}</p>`;
        speech.say(q.hint);
      }
      fb.scrollIntoView({block:"nearest"});
    };
  });
  $("#nextQ").onclick = ()=>{
    if(S.pos < S.queue.length-1){ S.pos++; render(); window.scrollTo(0,0); }
    else { finishRun(); }
  };
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------- finish ---------- */
function finishRun(){
  const w = world(); const n = S.queue.length;
  let got = 3;
  if(S.firstTry < n) got = 2;
  if(S.firstTry < Math.ceil(n/2)) got = 1;

  /* A practice round never takes stars away, and never hands them out either. */
  if(!S.review){
    save.stars[w.id] = Math.max(save.stars[w.id]||0, got);
  }
  save.log.push({
    id: w.id, t: S.runStart, sec: Math.round((now()-S.runStart)/1000),
    n: n, first: S.firstTry, miss: S.miss, qsec: S.qsec, review: S.review
  });
  if(save.log.length > LOG_MAX) save.log = save.log.slice(-LOG_MAX);
  store.set(save);

  S.earned = got; S.mode = "done"; render(); window.scrollTo(0,0);
}

function renderDone(){
  const w = world();
  const tricky = Object.keys(S.miss).map(Number);
  const msg = S.review ? "you went back and practiced the tricky ones. That is how brains grow!"
            : S.earned===3 ? "every question right on the first try. Amazing!"
            : S.earned===2 ? "you solved every question. Super work!"
            : "you finished the whole world. That takes real effort!";
  const starLine = S.review ? "" :
    `<div class="starline" aria-label="${S.earned} of 3 stars">${stars(S.earned)}</div>`;
  const retry = tricky.length ?
    `<div style="margin-top:12px;"><button class="btn secondary" id="trickyBtn">Practice the tricky ones (${tricky.length}) 🔁</button></div>` : "";
  app.innerHTML = `<div class="${w.cls}">
    <div class="sticker finish">
      <span class="burst">${!S.review && S.earned===3 ? "🎉" : "🌟"}</span>
      <h2>${S.review ? "Practice round done!" : w.name + " complete!"}</h2>
      ${starLine}
      <p>${esc(save.name)}, ${msg}</p>
      <button class="btn" id="homeBtn" style="background:${w.hex}">Back to the map 🗺️</button>
      ${retry}
      <div style="margin-top:12px;"><button class="btn secondary" id="againBtn">Play this world again</button></div>
    </div>
  </div>`;
  $("#homeBtn").onclick = ()=>{ S.mode="home"; render(); window.scrollTo(0,0); };
  $("#againBtn").onclick = ()=>{ S.mode="lesson"; S.page=0; render(); window.scrollTo(0,0); };
  if(tricky.length) $("#trickyBtn").onclick = ()=> startRun(tricky.sort((a,b)=>a-b), true);
}

/* =====================================================================
   FOR GROWN-UPS — how it works + a real progress report
   ===================================================================== */
function fmtMins(sec){
  if(!sec) return "—";
  if(sec < 60) return sec + " sec";
  const m = Math.round(sec/60);
  return m + (m===1 ? " min" : " mins");
}
function fmtDate(ms){
  if(!ms) return "not yet";
  const d = new Date(ms), today = new Date();
  if(d.toDateString() === today.toDateString()) return "today";
  const days = Math.round((today - d)/86400000);
  if(days <= 1) return "yesterday";
  if(days < 7) return days + " days ago";
  return d.toLocaleDateString();
}

/* Every number on the progress page comes out of save.log, right here. */
function buildReport(){
  const real = save.log.filter(r => !r.review);
  const worlds = WORLDS.map(w=>{
    const runs = real.filter(r => r.id===w.id);
    const all  = save.log.filter(r => r.id===w.id);
    const asked = runs.reduce((a,r)=>a+r.n, 0);
    const first = runs.reduce((a,r)=>a+r.first, 0);
    const sec   = runs.reduce((a,r)=>a+r.sec, 0);
    return {
      w, runs: runs.length, practiceRuns: all.length - runs.length,
      stars: save.stars[w.id]||0,
      accuracy: asked ? Math.round(first/asked*100) : null,
      avgRun: runs.length ? Math.round(sec/runs.length) : 0,
      avgQ: asked ? Math.round(sec/asked) : 0,
      last: all.length ? Math.max.apply(null, all.map(r=>r.t)) : null
    };
  });

  /* which exact questions needed a hint, counted across every run */
  const tricky = [];
  WORLDS.forEach(w=>{
    const tally = {};
    save.log.filter(r=>r.id===w.id).forEach(r=>{
      Object.keys(r.miss||{}).forEach(k=>{ tally[k] = (tally[k]||0) + r.miss[k]; });
    });
    Object.keys(tally).forEach(k=>{
      const q = w.questions[+k];
      if(q) tricky.push({ world:w.name, n:+k+1, q:q.q, hits:tally[k] });
    });
  });
  tricky.sort((a,b)=> b.hits - a.hits);

  const weekAgo = now() - 7*86400000;
  return {
    worlds, tricky,
    totalRuns: real.length,
    totalSec: save.log.reduce((a,r)=>a+r.sec, 0),
    weekSec: save.log.filter(r=>r.t>weekAgo).reduce((a,r)=>a+r.sec, 0),
    weekRuns: save.log.filter(r=>r.t>weekAgo).length,
    totalStars: Object.values(save.stars).reduce((a,b)=>a+b, 0),
    maxStars: WORLDS.length*3
  };
}

function renderGrown(){
  const tab = S.gtab || "how";
  app.innerHTML = `
    ${topbar("For grown-ups")}
    <div class="gtabs" role="tablist">
      <button class="gtab ${tab==='how'?'on':''}" id="tabHow" role="tab" aria-selected="${tab==='how'}">How this works</button>
      <button class="gtab ${tab==='progress'?'on':''}" id="tabProg" role="tab" aria-selected="${tab==='progress'}">Progress</button>
    </div>
    <div id="gbody">${tab==='how' ? grownHow() : grownProgress()}</div>`;
  wireBack();
  $("#tabHow").onclick = ()=>{ S.gtab="how"; render(); window.scrollTo(0,0); };
  $("#tabProg").onclick = ()=>{ S.gtab="progress"; render(); window.scrollTo(0,0); };
  $("#gback").onclick = ()=>{ S.mode="home"; render(); window.scrollTo(0,0); };
  if(tab==='how') wireHow(); else wireProgress();
}

function grownHow(){
  return `<div class="sticker grown-panel">
      <h2>How this site works</h2>
      <ul>
        <li>Every world uses the same routine: <strong>Learn → Practice → Stars</strong>. Predictable structure lowers anxiety and frees attention for learning.</li>
        <li>Content targets roughly a <strong>5th-grade level</strong>: equivalent fractions, adding and subtracting like fractions, fraction of a group, perimeter vs. area, volume (length × width × height), elapsed time across the hour, and money — counting mixed coins, making change, and comparing prices.</li>
        <li>Math is taught <strong>pictures-first</strong> (fraction circles, grids, layer diagrams, clock faces, drawn coins, number lines) before symbols — the concrete-to-abstract sequence recommended for autistic learners.</li>
        <li>Wrong answers never lose points. They give a <strong>hint and a retry</strong>. Stars reward first-try accuracy, but finishing always earns at least one star.</li>
        <li>After a world, he can <strong>practice just the questions that needed a hint</strong>. That round never changes his stars, so trying again is always safe.</li>
        <li>The Feelings Forest levels up perspective-taking: richer emotion words, <em>two people feeling differently about the same event</em>, judging <em>accident vs. on purpose</em> from clues, and false-belief puzzles (<em>people only know what they saw</em>).</li>
        <li>Story questions keep the <strong>full story on screen</strong> — re-reading is encouraged, and there are no timers anywhere.</li>
      </ul>
      <h2>Tips for sessions</h2>
      <ul>
        <li>Short and regular beats long and rare: one world (5–10 minutes) per sitting is plenty.</li>
        <li>Sit together at first and <strong>think aloud</strong>: “Hmm, the long hand is on the 6, what did Lincoln say that means?”</li>
        <li>Bridge to real life: cut a real pizza into fourths, count floor tiles, check the clock before bath time, pay with real coins in a shop.</li>
        <li>Replaying a finished world is great — repetition with success builds confidence.</li>
      </ul>
      <h2>Settings</h2>
      <div class="setting">
        <span><strong>Read-aloud button</strong><br><small class="note">${speech.ok ? "Shows a “Read this to me” button on lessons and questions." : "This browser has no speech voice, so the button stays hidden."}</small></span>
        <button class="btn secondary" id="speakToggle" ${speech.ok?"":"disabled"}>${save.speak?"On":"Off"}</button>
      </div>
      <p><small class="note">Progress, the name, and every number on the Progress tab are saved only in this device’s browser. Nothing is uploaded anywhere. Character names belong to their creators; all stories and lessons here are original, made just for your family.</small></p>
      <div style="margin-top:14px;"><button class="btn" id="gback">Back to the map</button></div>
    </div>`;
}
function wireHow(){
  const t = $("#speakToggle");
  if(t) t.onclick = ()=>{ save.speak = !save.speak; store.set(save); render(); };
}

function grownProgress(){
  const R = buildReport();
  if(!save.log.length){
    return `<div class="sticker grown-panel">
      <h2>Progress</h2>
      <p>Nothing to show yet. As soon as a world is finished, this page fills up with stars, first-try accuracy, time spent, and the exact questions that needed a hint.</p>
      <div style="margin-top:14px;"><button class="btn" id="gback">Back to the map</button></div>
    </div>`;
  }

  const rows = R.worlds.map(x=>{
    const head = `<div class="wrow-head">
        <span class="wrow-emoji">${x.w.emoji}</span>
        <strong>${x.w.name}</strong>
        <span class="wrow-stars">${stars(x.stars)}</span>
      </div>`;
    /* A world he has never played gets one calm line, not a row of dashes. */
    if(x.accuracy === null){
      return `<div class="wrow">${head}<p class="none">Not started yet.</p></div>`;
    }
    const acc = x.accuracy + "%";
    return `<div class="wrow">
      ${head}
      <div class="bar" role="img" aria-label="${acc} right on the first try"><i style="width:${x.accuracy}%; background:${x.w.hex}"></i></div>
      <div class="wrow-nums">
        <span><b>${acc}</b> right first try</span>
        <span><b>${x.runs}</b> finished${x.practiceRuns?` · ${x.practiceRuns} practice`:""}</span>
        <span><b>${fmtMins(x.avgRun)}</b> per run</span>
        <span><b>${x.avgQ?x.avgQ+"s":"—"}</b> per question</span>
        <span>Last: <b>${fmtDate(x.last)}</b></span>
      </div>
    </div>`;
  }).join("");

  const trickyList = R.tricky.length ? R.tricky.slice(0,8).map(t=>
    `<li><span class="tag">${t.world} · Q${t.n}</span><br>${t.q}<br><small class="note">Needed a hint ${t.hits} ${t.hits===1?"time":"times"}</small></li>`
  ).join("") : `<li>No hints needed yet — every question was right on the first try. 🎉</li>`;

  return `<div class="sticker grown-panel">
      <h2>Progress</h2>
      <div class="kpis">
        <div class="kpi"><b>${R.totalStars}/${R.maxStars}</b><span>stars earned</span></div>
        <div class="kpi"><b>${R.totalRuns}</b><span>worlds finished</span></div>
        <div class="kpi"><b>${fmtMins(R.totalSec)}</b><span>total learning time</span></div>
        <div class="kpi"><b>${fmtMins(R.weekSec)}</b><span>past 7 days · ${R.weekRuns} runs</span></div>
      </div>
    </div>

    <div class="sticker grown-panel">
      <h2>World by world</h2>
      ${rows}
      <p><small class="note">“Right first try” counts full runs only, not practice rounds. A wrong tap costs nothing in the app — it shows a hint and lets him try again.</small></p>
    </div>

    <div class="sticker grown-panel">
      <h2>Questions that needed a hint</h2>
      <p><small class="note">The most useful list here: these are the exact ideas worth talking through together, away from the screen.</small></p>
      <ul class="tricky">${trickyList}</ul>
    </div>

    <div class="sticker grown-panel">
      <h2>Data</h2>
      <p><small class="note">All of this lives in this browser only (localStorage key <code>hlc-save</code>). Clearing it removes stars and history on this device.</small></p>
      <div class="setting">
        <span><strong>Clear all progress</strong><br><small class="note">Stars, history, and the saved name.</small></span>
        <button class="btn secondary danger" id="clearBtn">Clear…</button>
      </div>
      <div style="margin-top:14px;"><button class="btn" id="gback">Back to the map</button></div>
    </div>`;
}
function wireProgress(){
  const c = $("#clearBtn");
  if(!c) return;
  let armed = false;
  c.onclick = ()=>{
    if(!armed){
      armed = true; c.textContent = "Tap again to erase everything";
      setTimeout(()=>{ armed = false; c.textContent = "Clear…"; }, 6000);
      return;
    }
    save = { stars:{}, log:[], speak:true };
    store.set(save);
    S = { mode:"gate", w:null, page:0, gtab:"how" };
    render(); window.scrollTo(0,0);
  };
}

render();
