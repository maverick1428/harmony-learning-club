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

let problems = 0;
const flag = msg => { problems++; console.error('❌ ' + msg); };

WORLDS.forEach(w => {
  if (!w.id || !w.name || !w.hex || !w.cls) flag(`World "${w.name || '?'}" is missing id/name/hex/cls`);
  (w.lesson || []).forEach((p, i) => {
    if (!p.c || !p.c.name || !p.c.av) flag(`${w.id} lesson ${i + 1}: missing character (c)`);
    if (!p.text) flag(`${w.id} lesson ${i + 1}: missing text`);
  });
  (w.questions || []).forEach((q, i) => {
    const label = `${w.id} question ${i + 1}`;
    if (!q.q) flag(`${label}: missing question text (q)`);
    if (!Array.isArray(q.o) || q.o.length < 2) flag(`${label}: needs at least 2 options (o)`);
    if (q.a === undefined || !q.o || q.o[q.a] === undefined) flag(`${label}: answer index (a) doesn't point at an option`);
    if (!q.why) flag(`${label}: missing "why" explanation shown after a correct answer`);
    if (!q.hint) flag(`${label}: missing "hint" shown after a wrong answer`);
  });
  console.log(`✓ ${w.name}: ${w.lesson.length} lesson pages, ${w.questions.length} questions`);
});

if (problems) { console.error(`\n${problems} problem(s) found — fix before publishing.`); process.exit(1); }
console.log(`\n✅ All ${WORLDS.length} worlds valid. Safe to publish.`);
