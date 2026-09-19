# Harmony Learning Club

A learning website with six worlds (fractions, area & volume, clocks, reading,
feelings & perspective-taking, and money), taught by friendly characters with a
Minecraft twist. Built for one very cool 11-year-old. 🌟

Each world is the same calm routine: **Learn pages → Practice questions → Stars**.
Wrong answers never cost anything — they show a hint and let him try again.

## Try it locally
Just double-click `index.html` — it opens in your browser. No install, no build step.

## First-time publish (GitHub Pages — free, auto-updating)
Easiest way — let Claude Code do it. Open a terminal in this folder, run `claude`, and paste:

> Initialize a git repo here, create a public GitHub repo called
> harmony-learning-club with the gh CLI, push everything, and enable GitHub Pages
> serving from the main branch root. Then tell me the live URL.

(If `gh` isn't signed in yet, run `gh auth login` first and follow the prompts.)

Manual alternative: on github.com create a new public repo → "uploading an existing
file" → drag this folder's contents in → Settings → Pages → Source: "Deploy from a
branch" → Branch: main, folder: / (root) → Save. Your site appears at
`https://YOUR-USERNAME.github.io/harmony-learning-club/` after a minute or two.

## Updating the site (the weekly routine)
1. Open a terminal in this folder and run `claude`.
2. Ask for what you want, e.g.:
   - "Add four harder questions to the Fraction Bakery about equivalent fractions."
   - "Add a new Story Clubhouse story about a Minecraft mining trip, with 4 questions."
   - "The clock questions are too hard — make questions 4 and 6 one step easier."
   - "Add a seventh world about multiplication hosted by Lisa."
3. Claude Code reads `CLAUDE.md` for the rules, edits `js/content.js`, and runs
   `node scripts/validate.js` to check its own work.
4. Preview by opening `index.html`, then tell Claude Code: "looks good, commit and push."
   The live site updates itself within a minute.

## For grown-ups: the Progress page
Tap **For grown-ups** at the bottom of the map, then the **Progress** tab. It shows,
per world: stars, the share of questions he got right on the *first* try, how many
times he finished it, average time per run and per question, and when he last played.
Below that is the most useful list on the site — **the exact questions that needed a
hint**, ranked by how often — which tells you what to talk through together away from
the screen. Nothing is uploaded; it is all read back out of this browser's own storage.

Two other things live there: an **On/Off switch for the "Read this to me" button**
(browser speech, on by default), and **Clear all progress** (tap twice to confirm).

After finishing a world he also gets a **"Practice the tricky ones"** button that
replays only the questions he needed a hint on. That round never changes his stars,
so going back is always safe.

## Good to know
- Progress (his name + stars) saves in the browser on each device — it won't carry
  over from the old claude.ai link to the new site, so he'll type his name once more.
- The GitHub Pages URL is public, but nothing personal is on the site; the name he
  types stays on his own device.
- All stories are original. Character names belong to their creators — please keep
  this as a personal family project and don't add copyrighted artwork.
