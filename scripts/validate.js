// Checks js/content.js for mistakes BEFORE you publish.
// Run from the project folder with:  node scripts/validate.js
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8');
let CH, WORLDS;
try {
  ({ CH, WORLDS } = new Function(code + '\nreturn { CH, WORLDS };')());
} catch (e) {
  console.error('❌ content.js has a syntax error:\n', e.message);
  process.exit(1);
}

let problems = 0, warnings = 0;
const flag = msg => { problems++; console.error('❌ ' + msg); };
const warn = msg => { warnings++; console.warn('⚠️  ' + msg); };

const isNum = n => typeof n === 'number' && isFinite(n);
const COIN_VALUES = [100, 25, 10, 5, 1];

// Every visual type app.js knows how to draw, and what each one needs.
function checkVisual(v, where) {
  if (v === null || v === undefined) return;          // no picture is always fine
  if (typeof v !== 'object' || !v.t) return flag(`${where}: visual must be an object with a "t" type`);
  const need = (cond, msg) => { if (!cond) flag(`${where}: visual {t:'${v.t}'} ${msg}`); };

  switch (v.t) {
    case 'circle':
    case 'bar':
      need(isNum(v.parts) && v.parts >= 1, 'needs parts (a number, 1 or more)');
      need(isNum(v.filled) && v.filled >= 0, 'needs filled (a number, 0 or more)');
      need(!(isNum(v.parts) && isNum(v.filled)) || v.filled <= v.parts, 'has filled bigger than parts');
      break;
    case 'twocircles':
    case 'twobars':
      need(Array.isArray(v.a) && v.a.length === 2, 'needs a:[parts, filled]');
      need(Array.isArray(v.b) && v.b.length === 2, 'needs b:[parts, filled]');
      if (Array.isArray(v.a) && Array.isArray(v.b)) {
        need(v.a[1] <= v.a[0] && v.b[1] <= v.b[0], 'has filled bigger than parts');
      }
      break;
    case 'grid':
      need(isNum(v.rows) && v.rows >= 1, 'needs rows');
      need(isNum(v.cols) && v.cols >= 1, 'needs cols');
      break;
    case 'gridx':
      need(isNum(v.rows) && v.rows >= 1, 'needs rows');
      need(isNum(v.cols) && v.cols >= 1, 'needs cols');
      need(isNum(v.layers) && v.layers >= 1, 'needs layers');
      break;
    case 'clock':
      need(isNum(v.h) && v.h >= 1 && v.h <= 12, 'needs h between 1 and 12');
      need(isNum(v.m) && v.m >= 0 && v.m <= 59, 'needs m between 0 and 59');
      break;
    case 'twoclocks':
      need(Array.isArray(v.a) && v.a.length === 2, 'needs a:[hour, minute]');
      need(Array.isArray(v.b) && v.b.length === 2, 'needs b:[hour, minute]');
      break;
    case 'money': {
      need(v.b !== undefined || v.c !== undefined, 'needs b:[bills] and/or c:[coins]');
      const coins = v.c || [];
      need(Array.isArray(coins), 'needs c to be an array of coin values');
      if (Array.isArray(coins)) {
        coins.forEach(x => need(COIN_VALUES.indexOf(x) !== -1,
          `has coin value ${x} — use one of ${COIN_VALUES.join(', ')}`));
      }
      break;
    }
    case 'numberline': {
      need(isNum(v.min) && isNum(v.max) && v.max > v.min, 'needs min and max, with max bigger than min');
      need(isNum(v.step) && v.step > 0, 'needs a step bigger than 0');
      if (isNum(v.min) && isNum(v.max) && isNum(v.step) && v.max > v.min) {
        const steps = (v.max - v.min) / v.step;
        need(Math.abs(steps - Math.round(steps)) < 1e-6, 'has a step that does not divide min→max evenly');
        need(Math.round(steps) <= 12, 'has too many ticks to read comfortably (keep it to 12 or fewer)');
        if (v.mark !== undefined && v.mark !== null) {
          need(v.mark >= v.min && v.mark <= v.max, 'has a mark outside min→max');
        }
      }
      if (v.fmt) need(['num', 'money', 'frac'].indexOf(v.fmt) !== -1, "needs fmt of 'num', 'money' or 'frac'");
      break;
    }
    case 'scene':
      need(typeof v.e === 'string' && v.e.length > 0, 'needs e (an emoji string)');
      break;
    default:
      flag(`${where}: visual type '${v.t}' is not one app.js can draw`);
  }
}

const seenIds = {};
const seenClasses = [];

WORLDS.forEach(w => {
  const wid = w.id || '?';
  if (!w.id || !w.name || !w.hex || !w.cls) flag(`World "${w.name || '?'}" is missing id/name/hex/cls`);
  if (seenIds[wid]) flag(`Two worlds share the id "${wid}" — ids must be unique (and stable, or stars reset)`);
  seenIds[wid] = true;
  if (w.hex && !/^#[0-9A-Fa-f]{6}$/.test(w.hex)) flag(`${wid}: hex must look like #RRGGBB`);
  if (w.cls) seenClasses.push(w.cls);
  if (!w.emoji) warn(`${wid}: no emoji for the map card`);
  if (!w.hostLine) warn(`${wid}: no hostLine ("with …")`);

  (w.lesson || []).forEach((p, i) => {
    const label = `${wid} lesson ${i + 1}`;
    if (!p.c || !p.c.name || !p.c.av) flag(`${label}: missing character (c)`);
    if (!p.text) flag(`${label}: missing text`);
    checkVisual(p.v, label);
  });

  (w.questions || []).forEach((q, i) => {
    const label = `${wid} question ${i + 1}`;
    if (!q.q) flag(`${label}: missing question text (q)`);
    if (!Array.isArray(q.o) || q.o.length < 2) flag(`${label}: needs at least 2 options (o)`);
    if (q.a === undefined || !q.o || q.o[q.a] === undefined) flag(`${label}: answer index (a) doesn't point at an option`);
    if (!q.why) flag(`${label}: missing "why" explanation shown after a correct answer`);
    if (!q.hint) flag(`${label}: missing "hint" shown after a wrong answer`);
    if (Array.isArray(q.o)) {
      if (q.o.length !== 3) warn(`${label}: has ${q.o.length} options — every other question offers 3`);
      const lower = q.o.map(x => String(x).toLowerCase().trim());
      if (new Set(lower).size !== lower.length) flag(`${label}: two options say the same thing`);
    }
    if (q.story !== undefined && (typeof q.story !== 'string' || !q.story.trim())) {
      flag(`${label}: story must be the full story text, repeated on every question for that story`);
    }
    checkVisual(q.v, label);
  });

  const nQ = (w.questions || []).length;
  if (nQ < 4) warn(`${wid}: only ${nQ} questions — a world usually has at least 4`);
  if (nQ > 12) warn(`${wid}: ${nQ} questions may be a long sitting; 12 or fewer keeps it comfortable`);
  if ((w.lesson || []).length > 7) warn(`${wid}: ${w.lesson.length} lesson pages is a lot to click through before practice`);

  console.log(`✓ ${w.name}: ${w.lesson.length} lesson pages, ${nQ} questions`);
});

// The accent class has to exist in the stylesheet or the world renders grey.
try {
  const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf8');
  seenClasses.forEach(cls => {
    if (css.indexOf('.' + cls) === -1) flag(`CSS is missing a rule for the world accent class "${cls}"`);
  });
} catch (e) { warn('Could not read css/styles.css to check world accent classes'); }

if (problems) { console.error(`\n${problems} problem(s) found — fix before publishing.`); process.exit(1); }
console.log(`\n✅ All ${WORLDS.length} worlds valid. Safe to publish.${warnings ? ` (${warnings} warning(s) above.)` : ''}`);
