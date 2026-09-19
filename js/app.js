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

/* ---------- progress (private to this browser) ---------- */
const store = {
  get(){ try{ const raw = localStorage.getItem('hlc-save'); return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; } },
  set(data){ try{ localStorage.setItem('hlc-save', JSON.stringify(data)); }catch(e){ /* still fine without saving */ } }
};
let save = store.get();
if(!save.stars) save.stars = {};

/* ---------- SVG builders (all visuals are drawn, no images) ---------- */
const INK = getComputedStyle(document.documentElement).getPropertyValue('--ink') || '#3A2E39';

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
    labels = `<text x="${w/2}" y="${h+22}" text-anchor="middle" font-size="17" font-weight="800" fill="currentColor">${cols} squares across</text>`
           + `<text x="${-h/2}" y="-8" transform="rotate(-90)" text-anchor="middle" font-size="17" font-weight="800" fill="currentColor">${rows} up</text>`;
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
  if(v.t==='grid') inner = svgGrid(v.rows, v.cols, accent, v.opts||{});
  if(v.t==='gridx'){
    inner = svgGrid(v.rows, v.cols, accent, {}) +
      `<div style="align-self:center; margin-left:14px; font-family:'Fredoka'; font-weight:600; font-size:20px;">× ${v.layers} layers<br>high 🧱</div>`;
  }
  if(v.t==='clock') inner = svgClock(v.h, v.m, accent);
  if(v.t==='twoclocks') inner = svgClock(v.a[0],v.a[1],accent,130) + '<span style="width:18px"></span>' + svgClock(v.b[0],v.b[1],accent,130);
  if(v.t==='scene') return svgScene(v.e);
  return `<div class="visual">${inner}</div>`;
}

/* =====================================================================
   ENGINE
   ===================================================================== */
const app = $("#app");
let S = { mode: save.name ? "home" : "gate", w:null, page:0, qi:0, firstTry:0, tried:false, locked:false };

function stars(count){ return "⭐".repeat(count) + "☆".repeat(3-count); }
function world(){ return WORLDS[S.w]; }

function render(){
  if(S.mode==="gate") return renderGate();
  if(S.mode==="home") return renderHome();
  if(S.mode==="grown") return renderGrown();
  if(S.mode==="lesson") return renderLesson();
  if(S.mode==="quiz") return renderQuiz();
  if(S.mode==="done") return renderDone();
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
  $("#grownBtn").onclick = ()=>{ S.mode="grown"; render(); };
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
    </div>
    <div class="lesson-nav">
      <button class="btn secondary" id="prevBtn" ${S.page===0?"disabled":""}>◀ Back</button>
      <button class="btn" id="nextBtn" style="background:${w.hex}">${S.page===w.lesson.length-1 ? "Let’s practice! ✏️" : "Next ▶"}</button>
    </div>
  </div>`;
  wireBack();
  $("#prevBtn").onclick = ()=>{ if(S.page>0){S.page--; render();} };
  $("#nextBtn").onclick = ()=>{
    if(S.page < w.lesson.length-1){ S.page++; render(); }
    else { S.mode="quiz"; S.qi=0; S.firstTry=0; S.tried=false; S.locked=false; render(); }
    window.scrollTo(0,0);
  };
}

/* ---------- quiz ---------- */
function renderQuiz(){
  const w = world(); const q = w.questions[S.qi];
  const dots = w.questions.map((_,i)=>`<i class="${i<S.qi?'done':i===S.qi?'now':''}"></i>`).join("");
  const storyBlock = q.story ? `<div class="sticker" style="margin-bottom:14px; background:var(--bubble);"><p style="margin:0">${q.story}</p></div>` : "";
  app.innerHTML = `<div class="${w.cls}">
    ${topbar(w.name, dots)}
    ${storyBlock}
    <div class="sticker q-card">
      <h3>${q.q}</h3>
      ${renderVisual(q.v, w.hex)}
      <div class="answers">
        ${q.o.map((opt,i)=>`<button class="tap answer" data-i="${i}">${opt}</button>`).join("")}
      </div>
      <div class="feedback" id="fb" role="status"></div>
      <div class="after" id="after">
        <button class="btn" id="nextQ" style="background:${w.hex}">${S.qi===w.questions.length-1 ? "Finish! 🏁" : "Next question ▶"}</button>
      </div>
    </div>
  </div>`;
  wireBack();
  S.tried = false; S.locked = false;
  const fb = $("#fb");
  app.querySelectorAll(".answer").forEach(btn=>{
    btn.onclick = ()=>{
      if(S.locked) return;
      const i = +btn.dataset.i;
      if(i === q.a){
        S.locked = true;
        if(!S.tried) S.firstTry++;
        btn.classList.add("right");
        fb.className = "feedback good show";
        fb.innerHTML = `<p class="fb-head">${pick(["That’s it! ✅","Great catch! ✅","You got it! ✅","Nice work! ✅"])}</p><p>${q.why}</p>`;
        $("#after").classList.add("show");
        app.querySelectorAll(".answer").forEach(b=>{ if(+b.dataset.i!==q.a) b.style.opacity=.45; });
      } else {
        S.tried = true;
        btn.classList.add("wrong"); btn.disabled = true;
        fb.className = "feedback soft show";
        fb.innerHTML = `<p class="fb-head">Not yet — try again 💪</p><p>${q.hint}</p>`;
      }
      fb.scrollIntoView({block:"nearest"});
    };
  });
  $("#nextQ").onclick = ()=>{
    if(S.qi < w.questions.length-1){ S.qi++; render(); window.scrollTo(0,0); }
    else { finishWorld(); }
  };
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------- finish ---------- */
function finishWorld(){
  const w = world(); const n = w.questions.length;
  let got = 3;
  if(S.firstTry < n) got = 2;
  if(S.firstTry < Math.ceil(n/2)) got = 1;
  const prev = save.stars[w.id]||0;
  save.stars[w.id] = Math.max(prev, got);
  store.set(save);
  S.earned = got; S.mode = "done"; render(); window.scrollTo(0,0);
}
function renderDone(){
  const w = world();
  const msg = S.earned===3 ? "Every question right on the first try. Amazing!"
            : S.earned===2 ? "You solved every question. Super work!"
            : "You finished the whole world. That takes real effort!";
  app.innerHTML = `<div class="${w.cls}">
    <div class="sticker finish">
      <span class="burst">${S.earned===3?"🎉":"🌟"}</span>
      <h2>${w.name} complete!</h2>
      <div class="starline" aria-label="${S.earned} of 3 stars">${stars(S.earned)}</div>
      <p>${esc(save.name)}, ${msg}</p>
      <button class="btn" id="homeBtn" style="background:${w.hex}">Back to the map 🗺️</button>
      <div style="margin-top:12px;"><button class="btn secondary" id="againBtn">Play this world again</button></div>
    </div>
  </div>`;
  $("#homeBtn").onclick = ()=>{ S.mode="home"; render(); window.scrollTo(0,0); };
  $("#againBtn").onclick = ()=>{ S.mode="lesson"; S.page=0; render(); window.scrollTo(0,0); };
}

/* ---------- for grown-ups ---------- */
function renderGrown(){
  app.innerHTML = `
    ${topbar("For grown-ups")}
    <div class="sticker grown-panel">
      <h2>How this site works</h2>
      <ul>
        <li>Every world uses the same routine: <strong>Learn → Practice → Stars</strong>. Predictable structure lowers anxiety and frees attention for learning.</li>
        <li>Content targets roughly a <strong>5th-grade level</strong>: equivalent fractions, adding like fractions, fraction of a group, perimeter vs. area, volume (length × width × height), and elapsed time across the hour — with Minecraft woven through, since cubes and half-hearts make these ideas concrete.</li>
        <li>Math is taught <strong>pictures-first</strong> (fraction circles, grids, layer diagrams, clock faces) before symbols — the concrete-to-abstract sequence recommended for autistic learners.</li>
        <li>Wrong answers never lose points. They give a <strong>hint and a retry</strong>. Stars reward first-try accuracy, but finishing always earns at least one star.</li>
        <li>The Feelings Forest levels up perspective-taking: richer emotion words (proud, frustrated, nervous, embarrassed), <em>two people feeling differently about the same event</em>, judging <em>accident vs. on purpose</em> from clues, and false-belief puzzles (<em>people only know what they saw</em>) — which also appear inside the reading stories.</li>
        <li>Story questions keep the <strong>full story on screen</strong> — re-reading is encouraged, and there are no timers anywhere.</li>
      </ul>
      <h2>Tips for sessions</h2>
      <ul>
        <li>Short and regular beats long and rare: one world (5–10 minutes) per sitting is plenty.</li>
        <li>Sit together at first and <strong>think aloud</strong>: “Hmm, the long hand is on the 6, what did Lincoln say that means?”</li>
        <li>Bridge to real life: cut a real pizza into fourths, count floor tiles, check the clock before bath time.</li>
        <li>Replaying a finished world is great — repetition with success builds confidence.</li>
      </ul>
      <p><small class="note">Progress and the name are saved only on this device’s browser. Character names belong to their creators; all stories and lessons here are original, made just for your family.</small></p>
      <div style="margin-top:14px;"><button class="btn" id="gback">Back to the map</button></div>
    </div>`;
  wireBack();
  $("#gback").onclick = ()=>{ S.mode="home"; render(); };
}

render();
