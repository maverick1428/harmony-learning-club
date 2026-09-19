# Harmony Learning Club — project context for Claude Code

A learning website for an 11-year-old boy (6th grade, autism spectrum, working at
roughly a 5th-grade level). Built around characters he loves (Teenieping, The Loud
House) and Minecraft. His dad (Lyon) maintains this and will ask for new lessons,
harder/easier questions, and new worlds over time.

## Non-negotiable design rules (autism-informed — never break these)
1. Every world keeps the SAME routine: Learn pages → Practice questions → Stars.
2. Literal language, short sentences. No idioms, no sarcasm, no trick questions.
3. NO timers, NO penalties, NO lives. Wrong answer = gentle hint + retry, always.
4. Visuals first: fractions/area/time concepts must show an SVG model, not just symbols.
5. Reading questions keep the full story on screen next to the question.
6. Perspective questions are framed as clue-finding ("What clues tell us…"),
   never "obviously he feels X".
7. Calm feedback. No flashing, no loud effects; respect prefers-reduced-motion.
8. Character names appear in text only — never add copyrighted artwork or
   episode plots. All stories must stay original.

## File map
- `index.html` — shell only; rarely needs edits.
- `css/styles.css` — design system ("sticker" cards, world accent colors, dark mode).
- `js/content.js` — ALL lessons + quiz questions live here. 95% of updates happen here.
- `js/app.js` — engine + SVG drawing (fraction circles/bars, grids, layers, clocks,
  coins, number lines), the read-aloud button, and the grown-up progress report.
  Only touch for new features or new visual types.
- `scripts/validate.js` — run `node scripts/validate.js` after every content edit.
  It checks question shape AND every visual spec, so a bad `v:` is caught before publishing.

## Content shapes (in js/content.js)
World: `{ id, name, emoji, cls, hex, hostLine, lesson:[...], questions:[...] }`
Lesson page: `{ c: CH.someone, text: "HTML string", v: visualSpec|null }`
Question: `{ q, v: visualSpec|null, o: [3 options], a: correctIndex, why, hint }`
Reading question extra field: `story` (repeated verbatim on every question for that story).
Visual specs: `{t:'circle',parts,filled}` `{t:'bar',parts,filled}`
`{t:'twocircles',a:[parts,filled],b:[parts,filled]}` `{t:'twobars',a:[...],b:[...]}` (same-length
bars stacked, for comparing unlike fractions) `{t:'grid',rows,cols,opts:{sides:true}}`
(`opts.across` / `opts.up` override the side labels, e.g. `up:"? up"` for a missing side)
`{t:'gridx',rows,cols,layers}` (volume) `{t:'clock',h,m}` `{t:'twoclocks',a:[h,m],b:[h,m]}`
`{t:'money',b:[bills],c:[coins]}` (coins are 100/25/10/5/1, drawn to real relative size)
`{t:'numberline',min,max,step,fmt:'num'|'money'|'frac',mark,label}` (keep it to ≤12 ticks)
`{t:'scene',e:'emoji string'}`

## Workflow for every change
1. Edit `js/content.js` (or app.js for features).
2. `node scripts/validate.js` — must print "All worlds valid".
3. Open `index.html` in a browser and click through the changed world.
4. Commit and push; GitHub Pages redeploys automatically.

## Notes
- Progress is saved in localStorage under key `hlc-save`, per browser and per domain:
  `{ name, speak, stars:{worldId:0-3}, log:[run records] }`. Changing world `id`s resets
  earned stars AND orphans that world's history — keep ids stable.
- A run record is `{id, t, sec, n, first, miss:{questionIndex:wrongTaps}, qsec, review}`.
  The grown-up "Progress" tab is computed entirely from these in `buildReport()`.
  Question indexes are positional, so **inserting** a question in the middle of a world
  re-labels its old history — append new questions at the end where you can.
- A "practice the tricky ones" round (`review:true`) never changes stars, up or down.
- Difficulty target: ~5th grade. Raise gradually; when adding harder questions,
  keep 1–2 warm-up questions at the start of each world, and add a lesson page that
  teaches the new idea before any question tests it.
- Worlds run long past ~12 questions or ~7 lesson pages; the validator warns at those points.
