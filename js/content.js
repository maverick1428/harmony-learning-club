/* =====================================================================
   CONTENT — six worlds. All stories and scenarios are original.
   ===================================================================== */
const CH = {
  romi:    {name:"Romi",       av:"👧"},
  hearts:  {name:"Heartsping", av:"💗"},
  joy:     {name:"Joyping",    av:"🌟"},
  lisa:    {name:"Lisa Loud",  av:"🧪"},
  lincoln: {name:"Lincoln",    av:"👦"},
  clyde:   {name:"Clyde",      av:"👓"}
};

const WORLDS = [
/* ---------------- 1. FRACTION BAKERY ---------------- */
{
  id:"fractions", name:"Fraction Bakery", emoji:"🧁", cls:"c-berry", hex:"#E85D9E",
  hostLine:"with Romi + Heartsping",
  lesson:[
    {c:CH.romi, text:"Welcome back to the <strong>Heartrose Bakery</strong>! Quick warm-up first.<br><br>A fraction = equal parts of a whole.<br>🔻 Bottom number = parts in all.<br>🔺 Top number = parts we picked.<br><br>This cake shows <strong>3/4</strong>.", v:{t:"circle",parts:4,filled:3}},
    {c:CH.hearts, text:"Now a level-up: <strong>equivalent fractions</strong>! That means two fractions that look different but are the <strong>same amount</strong>.<br><br>Look: <strong>1/2</strong> and <strong>2/4</strong>. Same amount of pink cake!<br><br>⛏️ Minecraft proof: 5 full hearts out of 10 = <strong>5/10</strong> = <strong>1/2</strong> health.", v:{t:"twocircles",a:[2,1],b:[4,2]}},
    {c:CH.romi, text:"Level-up 2: <strong>adding fractions</strong> with the <strong>same bottom number</strong>.<br><br>The pieces are the same size, so just add the tops:<br><br><strong>2/8 + 3/8 = 5/8</strong><br><br>The bottom number stays 8. You have 5 pieces now, and they are still eighths.", v:{t:"bar",parts:8,filled:5}},
    {c:CH.hearts, text:"<strong>Subtracting</strong> works the same way. Same bottom number, so take the tops away:<br><br><strong>7/8 − 3/8 = 4/8</strong><br><br>You started with 7 pieces and ate 3. Now 4 pieces are left, and they are still eighths.", v:{t:"bar",parts:8,filled:4}},
    {c:CH.romi, text:"Fractions live on a <strong>number line</strong> too.<br><br>The line from 0 to 1 is cut into 4 equal steps. The dot sits on the third step, so the dot is <strong>3/4</strong>.<br><br>Notice: 3/4 is past the halfway point, so 3/4 is more than 1/2.", v:{t:"numberline",min:0,max:1,step:0.25,fmt:"frac",mark:0.75,label:"3/4"}},
    {c:CH.hearts, text:"Last level-up: a <strong>fraction of a group</strong>.<br><br>You mined <strong>12 diamonds</strong> 💎 and give <strong>1/3</strong> away. Trick: <strong>divide by the bottom number</strong>. 12 ÷ 3 = <strong>4 diamonds</strong>.<br><br>For <strong>3/4 of 20</strong> it takes two steps:<br>1️⃣ 20 ÷ 4 = 5 (that is one fourth)<br>2️⃣ 5 × 3 = <strong>15</strong> (that is three fourths)", v:{t:"bar",parts:4,filled:3}}
  ],
  questions:[
    {q:"Warm-up! What fraction of this cake is colored?", v:{t:"circle",parts:8,filled:3},
     o:["3/8","8/3","3/5"], a:0, why:"3 colored parts out of 8 parts in all = 3/8.", hint:"Count ALL the parts first — that number goes on the bottom."},
    {q:"Which fraction is EQUIVALENT to 1/2? (Same amount, different name.)", v:{t:"twocircles",a:[2,1],b:[4,2]},
     o:["2/4","1/4","2/3"], a:0, why:"2/4 covers exactly the same amount as 1/2. Look — the pink halves match!", hint:"Look at the two cakes. Which pink area is the same size as one half?"},
    {q:"⛏️ Steve has 5 full hearts out of 10 on his health bar. What fraction of his health is left?", v:{t:"bar",parts:10,filled:5},
     o:["5/10, which equals 1/2","10/5","5/15"], a:0, why:"5 out of 10 hearts = 5/10. And 5 is half of 10, so that is the same as 1/2 health.", hint:"5 hearts out of 10 hearts. Which number goes on top?"},
    {q:"Which is BIGGER: 2/3 or 2/6?", v:{t:"twocircles",a:[3,2],b:[6,2]},
     o:["2/3","2/6","They are equal"], a:0, why:"Both have 2 pieces — but thirds are BIG pieces and sixths are small pieces. So 2/3 is more cake.", hint:"Same number of pieces on top. So compare the SIZE of the pieces."},
    {q:"Add the pizza slices: 2/8 + 3/8 = ?", v:null,
     o:["5/8","5/16","6/8"], a:0, why:"Same-size pieces, so add the tops: 2 + 3 = 5. The bottom stays 8. Answer: 5/8.", hint:"The bottom number does NOT change. Just add the top numbers."},
    {q:"⛏️ A Minecraft cake has 7 slices. Alex eats 2 slices. What fraction of the cake is LEFT?", v:{t:"circle",parts:7,filled:5},
     o:["2/7","5/7","7/5"], a:1, why:"7 slices − 2 eaten = 5 slices left. So 5/7 of the cake is left.", hint:"Careful — the question asks what is LEFT, not what was eaten."},
    {q:"💎 You mined 12 diamonds. You give 1/3 of them to Clyde. How many diamonds does Clyde get?", v:null,
     o:["3 diamonds","4 diamonds","6 diamonds"], a:1, why:"1/3 of 12 → divide by the bottom number: 12 ÷ 3 = 4 diamonds.", hint:"Split 12 into 3 equal piles. How big is one pile?"},
    {q:"Subtract: 6/10 − 2/10 = ?", v:{t:"bar",parts:10,filled:4},
     o:["4/10","4/20","8/10"], a:0, why:"Same-size pieces, so take the tops away: 6 − 2 = 4. The bottom stays 10. Answer: 4/10.", hint:"Only the TOP number changes. 6 take away 2."},
    {q:"Which fraction is the dot sitting on?", v:{t:"numberline",min:0,max:1,step:0.2,fmt:"frac",mark:0.4,label:"?"},
     o:["2/5","5/2","1/2"], a:0, why:"The line from 0 to 1 is cut into 5 equal steps. The dot is on step 2, so the dot is 2/5.", hint:"Count the steps from 0 up to the dot. Then count how many steps make the whole line."},
    {q:"Which is BIGGER: 1/2 or 2/5?", v:{t:"twobars",a:[2,1],b:[5,2]},
     o:["1/2","2/5","They are equal"], a:0, why:"Both bars are the same length. The colored part of the top bar (1/2) reaches further than the bottom bar (2/5). So 1/2 is bigger.", hint:"The bars are the same size. Which colored part is longer?"},
    {q:"⛏️ You have 20 blocks of wood. You use 3/4 of them to build a house. How many blocks did you use?", v:{t:"bar",parts:4,filled:3},
     o:["15 blocks","5 blocks","12 blocks"], a:0, why:"Two steps: 20 ÷ 4 = 5 (one fourth). Then 5 × 3 = 15 (three fourths).", hint:"Step 1: divide 20 by the bottom number 4. Step 2: multiply that answer by the top number 3."}
  ]
},
/* ---------------- 2. BUILD LAB (AREA + VOLUME) ---------------- */
{
  id:"area", name:"Lisa’s Build Lab", emoji:"📐", cls:"c-mint", hex:"#1F9E7E",
  hostLine:"with Lisa Loud",
  lesson:[
    {c:CH.lisa, text:"Greetings! Today we measure like Minecraft builders. ⛏️<br><br><strong>Area</strong> = how many squares cover a flat floor.<br><br>Fast trick: multiply <strong>across × up</strong>.<br>4 across × 3 up = <strong>12 blocks</strong> of floor.", v:{t:"grid",rows:3,cols:4,opts:{sides:true}}},
    {c:CH.lisa, text:"Do not mix these up!<br><br>🚶 <strong>Perimeter</strong> = walking around the EDGE. <strong>Add</strong> all the sides.<br>🟩 <strong>Area</strong> = covering the FLOOR. <strong>Multiply</strong> across × up.<br><br>For a 5 by 3 floor:<br>Perimeter = 5+3+5+3 = <strong>16</strong>. Area = 5×3 = <strong>15</strong>.", v:{t:"grid",rows:3,cols:5,opts:{sides:true}}},
    {c:CH.lisa, text:"Now work <strong>backwards</strong>. Sometimes you know the area but one side is missing.<br><br>Area = across × up. So to find a missing side, <strong>divide</strong>.<br><br>This floor covers <strong>12 blocks</strong> and is <strong>4 across</strong>.<br>12 ÷ 4 = <strong>3 up</strong>.", v:{t:"grid",rows:3,cols:4,opts:{sides:true,across:"4 across",up:"? up"}}},
    {c:CH.lisa, text:"Final upgrade: <strong>VOLUME</strong> — filling a 3D box with blocks. Minecraft is literally made of this!<br><br>Volume = <strong>length × width × height</strong>.<br><br>A floor of 3×3 = 9 blocks. Stack it <strong>2 layers high</strong>: 9 × 2 = <strong>18 blocks</strong>.", v:{t:"gridx",rows:3,cols:3,layers:2}}
  ],
  questions:[
    {q:"What is the AREA of this Minecraft floor?", v:{t:"grid",rows:3,cols:4,opts:{sides:true}},
     o:["7 blocks","12 blocks","14 blocks"], a:1, why:"4 across × 3 up = 12 blocks of floor.", hint:"Multiply: 4 × 3."},
    {q:"Your castle floor is 6 blocks across and 4 blocks up. What is its area?", v:{t:"grid",rows:4,cols:6,opts:{sides:true}},
     o:["24 blocks","10 blocks","20 blocks"], a:0, why:"6 × 4 = 24 blocks.", hint:"Across × up. 6 × 4 = ?"},
    {q:"🚶 You WALK all the way around the edge of a 5 by 3 garden. What is the PERIMETER?", v:{t:"grid",rows:3,cols:5,opts:{sides:true}},
     o:["15","16","8"], a:1, why:"Walking around means ADD the sides: 5 + 3 + 5 + 3 = 16.", hint:"Perimeter = add ALL four sides: 5 + 3 + 5 + 3."},
    {q:"Lisa wants carpet to COVER Lincoln’s whole floor. Which one does she need to work out?", v:null,
     o:["Area — covering the floor","Perimeter — walking the edge","Neither"], a:0, why:"Covering the floor is area. Perimeter would only tell her the distance around the edge.", hint:"Carpet covers the FLOOR. Which word means covering?"},
    {q:"⛏️ VOLUME time! A box is 3 long, 3 wide, and 2 blocks tall. How many blocks fill it?", v:{t:"gridx",rows:3,cols:3,layers:2},
     o:["8 blocks","18 blocks","9 blocks"], a:1, why:"One layer = 3 × 3 = 9 blocks. Two layers = 9 × 2 = 18 blocks.", hint:"Work out ONE layer first (3 × 3). Then multiply by the layers."},
    {q:"⛏️ A storage room is 4 blocks long, 2 wide, 2 tall. How many blocks fill the whole room?", v:{t:"gridx",rows:2,cols:4,layers:2},
     o:["16 blocks","8 blocks","12 blocks"], a:0, why:"Layer: 4 × 2 = 8. Two layers: 8 × 2 = 16 blocks.", hint:"4 × 2 = 8 for one layer. Now double it."},
    {q:"🚶 What is the PERIMETER of a 6 by 2 platform?", v:{t:"grid",rows:2,cols:6,opts:{sides:true}},
     o:["16","12","8"], a:0, why:"Add all four sides: 6 + 2 + 6 + 2 = 16.", hint:"Two long sides and two short sides. 6 + 2 + 6 + 2."},
    {q:"⛏️ A floor covers 20 blocks and is 5 blocks across. How many blocks UP is it?", v:{t:"grid",rows:4,cols:5,opts:{sides:true,across:"5 across",up:"? up"}},
     o:["4 blocks up","15 blocks up","25 blocks up"], a:0, why:"Work backwards from area: 20 ÷ 5 = 4 blocks up. Check it: 5 × 4 = 20. ✅", hint:"You know the area (20) and one side (5). Divide: 20 ÷ 5."},
    {q:"⛏️ A stone vault is 5 long, 2 wide, and 3 layers tall. What is its volume?", v:{t:"gridx",rows:2,cols:5,layers:3},
     o:["30 blocks","10 blocks","20 blocks"], a:0, why:"One layer = 5 × 2 = 10 blocks. Three layers = 10 × 3 = 30 blocks.", hint:"One layer is 5 × 2 = 10. Now multiply by 3 layers."}
  ]
},
/* ---------------- 3. CLOCK TOWER ---------------- */
{
  id:"time", name:"Lincoln’s Clock Tower", emoji:"⏰", cls:"c-tangerine", hex:"#E8770A",
  hostLine:"with Lincoln Loud",
  lesson:[
    {c:CH.lincoln, text:"11 kids, 1 bathroom, and Mom’s Minecraft time limits — I live by the clock! ⏰<br><br>Reminder:<br>👉 SHORT hand = hour. LONG hand = minutes.<br>👉 Each number = <strong>5 minutes</strong> for the long hand.<br><br>Long hand on 7 → count by fives: 5, 10, 15, 20, 25, 30, <strong>35</strong>. This is <strong>2:35</strong>.", v:{t:"clock",h:2,m:35}},
    {c:CH.lincoln, text:"Two special names:<br><br>🕒 Long hand on 3 = <strong>quarter past</strong> (15 min).<br>🕘 Long hand on 9 = <strong>quarter to</strong> the NEXT hour (45 min).<br><br>This clock is 9:45 — we say <strong>quarter to 10</strong>.", v:{t:"clock",h:9,m:45}},
    {c:CH.lincoln, text:"Power move: <strong>elapsed time</strong> (how much time passed).<br><br>Jump in easy steps: hours first, then minutes.<br><br>Minecraft starts at 4:30, Mom allows 45 minutes:<br>4:30 → +30 min → 5:00 → +15 min → <strong>5:15</strong>. Log-off time!", v:{t:"twoclocks",a:[4,30],b:[5,15]}},
    {c:CH.lincoln, text:"A clock face only shows 12 hours, so we add <strong>AM</strong> or <strong>PM</strong>.<br><br>🌅 <strong>AM</strong> = midnight until noon. That is the morning.<br>🌙 <strong>PM</strong> = noon until midnight. That is the afternoon, evening, and night.<br><br>Breakfast at 7:30 is <strong>7:30 AM</strong>. Dinner at 7:30 is <strong>7:30 PM</strong>.", v:{t:"clock",h:7,m:30}},
    {c:CH.lincoln, text:"Last power move: <strong>counting back</strong>.<br><br>When you know the finish time and need the start time, jump <strong>backwards</strong>.<br><br>Practice starts at 5:00 and the drive takes 20 minutes:<br>5:00 → back 20 min → <strong>4:40</strong>. That is when you leave.", v:{t:"twoclocks",a:[4,40],b:[5,0]}}
  ],
  questions:[
    {q:"What time is it? (Count by fives.)", v:{t:"clock",h:2,m:35},
     o:["2:35","2:07","7:10"], a:0, why:"Long hand on 7 → 5,10,15,20,25,30,35. Short hand past 2. It is 2:35.", hint:"Long hand on the 7. Count by fives seven times."},
    {q:"What time is this? (Special name!)", v:{t:"clock",h:9,m:45},
     o:["Quarter to 10 (9:45)","Quarter past 9 (9:15)","10:45"], a:0, why:"Long hand on 9 = 45 minutes = quarter TO the next hour. It is 9:45, quarter to 10.", hint:"Long hand on the 9 means quarter TO the next hour."},
    {q:"⛏️ Minecraft starts at 4:30. Mom allows 45 minutes. What time do you log off?", v:{t:"clock",h:4,m:30},
     o:["5:15","4:45","5:30"], a:0, why:"Jump in steps: 4:30 + 30 min = 5:00. Then + 15 more = 5:15.", hint:"Split 45 into 30 + 15. Add the 30 first."},
    {q:"School club starts at 3:40 and ends at 4:15. How long is the club?", v:{t:"twoclocks",a:[3,40],b:[4,15]},
     o:["35 minutes","75 minutes","15 minutes"], a:0, why:"3:40 → 4:00 is 20 minutes. 4:00 → 4:15 is 15 more. 20 + 15 = 35 minutes.", hint:"First jump to 4:00. How many minutes was that jump?"},
    {q:"What time is it?", v:{t:"clock",h:11,m:50},
     o:["11:50","10:50","11:10"], a:0, why:"Long hand on 10 → 50 minutes. Short hand almost at 12, but still in the 11 hour. It is 11:50.", hint:"The short hand has NOT reached 12 yet — so the hour is still 11."},
    {q:"The bus comes at 8:05. It is 7:50 now. How long do you wait?", v:{t:"twoclocks",a:[7,50],b:[8,5]},
     o:["15 minutes","55 minutes","5 minutes"], a:0, why:"7:50 → 8:00 is 10 minutes. 8:00 → 8:05 is 5 more. 10 + 5 = 15 minutes.", hint:"Jump to 8:00 first. Then keep going to 8:05."},
    {q:"🌅 You eat breakfast at 7:30 in the morning. How do we write that time?", v:{t:"clock",h:7,m:30},
     o:["7:30 AM","7:30 PM","Both are the same"], a:0, why:"Morning is before noon, and before noon is AM. So breakfast is 7:30 AM.", hint:"AM is midnight until noon. Is the morning before or after noon?"},
    {q:"🎬 A movie starts at 6:50 PM and lasts 40 minutes. What time does it end?", v:{t:"twoclocks",a:[6,50],b:[7,30]},
     o:["7:30 PM","6:90 PM","7:40 PM"], a:0, why:"6:50 → 7:00 is 10 minutes. You have 30 minutes left: 7:00 → 7:30. It ends at 7:30 PM.", hint:"Jump to 7:00 first. That uses 10 of the 40 minutes. How many minutes are left?"},
    {q:"⏪ Practice starts at 5:00. The drive takes 25 minutes. What time do you LEAVE home?", v:{t:"clock",h:5,m:0},
     o:["4:35","5:25","4:25"], a:0, why:"Count backwards from 5:00. Back 25 minutes lands on 4:35. Check it: 4:35 + 25 = 5:00. ✅", hint:"This one goes BACKWARDS from 5:00. Take 25 minutes away."}
  ]
},
/* ---------------- 4. STORY CLUBHOUSE ---------------- */
{
  id:"reading", name:"Story Clubhouse", emoji:"📚", cls:"c-sky", hex:"#3E7FD6",
  hostLine:"with Lincoln + Clyde",
  lesson:[
    {c:CH.lincoln, text:"Welcome to the clubhouse! Good readers are <strong>detectives</strong>. 🔍<br><br>Some answers are written right in the story. Some answers are <strong>hidden clues</strong> — you have to think: <em>what must be true, even though the story does not say it?</em>", v:null},
    {c:CH.clyde, text:"Detective rules:<br><br>1️⃣ Read slowly. No timers, ever.<br>2️⃣ The story stays on screen — read it again any time.<br>3️⃣ For hidden clues, ask: <strong>what did each person SEE?</strong> and <strong>WHY did they do that?</strong>", v:null}
  ],
  questions:[
    {story:"⛏️ <strong>The Creeper Surprise</strong><br>Lincoln and Clyde were building a castle in Minecraft. Clyde left to dig for stone. While Clyde was gone, a creeper snuck up and blew a big hole in the castle wall! Lincoln rebuilt the wall as fast as he could. When Clyde came back, he said, “The castle looks great!” Lincoln laughed and said, “You will NOT believe what happened.”",
     q:"WHAT made the hole in the castle wall?", v:null,
     o:["A creeper exploded","Clyde’s shovel","Lightning"], a:0, why:"The story says a creeper snuck up and blew a big hole in the wall.", hint:"Find the sentence with the word “hole.”"},
    {story:"⛏️ <strong>The Creeper Surprise</strong><br>Lincoln and Clyde were building a castle in Minecraft. Clyde left to dig for stone. While Clyde was gone, a creeper snuck up and blew a big hole in the castle wall! Lincoln rebuilt the wall as fast as he could. When Clyde came back, he said, “The castle looks great!” Lincoln laughed and said, “You will NOT believe what happened.”",
     q:"What did Lincoln do RIGHT AFTER the explosion?", v:null,
     o:["He logged off","He rebuilt the wall","He dug for stone"], a:1, why:"The story says Lincoln rebuilt the wall as fast as he could.", hint:"What happened between the explosion and Clyde coming back?"},
    {story:"⛏️ <strong>The Creeper Surprise</strong><br>Lincoln and Clyde were building a castle in Minecraft. Clyde left to dig for stone. While Clyde was gone, a creeper snuck up and blew a big hole in the castle wall! Lincoln rebuilt the wall as fast as he could. When Clyde came back, he said, “The castle looks great!” Lincoln laughed and said, “You will NOT believe what happened.”",
     q:"🕵️ Hidden clue: WHY doesn’t Clyde know about the hole?", v:null,
     o:["He was away digging stone when it happened","Lincoln lied to him","Clyde forgot about it"], a:0, why:"Clyde was gone digging, so he never SAW the creeper or the hole — and the wall was fixed before he returned. People only know what they saw!", hint:"Where was Clyde when the creeper exploded?"},
    {story:"⛏️ <strong>The Creeper Surprise</strong><br>Lincoln and Clyde were building a castle in Minecraft. Clyde left to dig for stone. While Clyde was gone, a creeper snuck up and blew a big hole in the castle wall! Lincoln rebuilt the wall as fast as he could. When Clyde came back, he said, “The castle looks great!” Lincoln laughed and said, “You will NOT believe what happened.”",
     q:"What will probably happen NEXT?", v:null,
     o:["Lincoln tells Clyde the creeper story","They delete the castle","Clyde goes to sleep"], a:0, why:"Lincoln said “You will NOT believe what happened” — that is how you start telling a surprising story.", hint:"Read Lincoln’s last words. What is he about to do?"},
    {story:"🎤 <strong>The Talent Show</strong><br>Lola practiced her song every single day for a week. On the day of the talent show, the microphone stopped working. Lola took a deep breath and sang anyway, as loud as she could. When she finished, the whole crowd stood up and clapped. Lola took a bow with a huge smile.",
     q:"What went WRONG at the talent show?", v:null,
     o:["The microphone stopped working","Lola forgot the words","The show was canceled"], a:0, why:"The story says the microphone stopped working on the day of the show.", hint:"Look at the second sentence."},
    {story:"🎤 <strong>The Talent Show</strong><br>Lola practiced her song every single day for a week. On the day of the talent show, the microphone stopped working. Lola took a deep breath and sang anyway, as loud as she could. When she finished, the whole crowd stood up and clapped. Lola took a bow with a huge smile.",
     q:"What did Lola do when the microphone broke?", v:null,
     o:["She cried and left","She sang anyway, as loud as she could","She fixed the microphone"], a:1, why:"The story says she took a deep breath and sang anyway, as loud as she could.", hint:"Find the sentence after the microphone broke."},
    {story:"🎤 <strong>The Talent Show</strong><br>Lola practiced her song every single day for a week. On the day of the talent show, the microphone stopped working. Lola took a deep breath and sang anyway, as loud as she could. When she finished, the whole crowd stood up and clapped. Lola took a bow with a huge smile.",
     q:"🕵️ Hidden clue: what does “the crowd stood up and clapped” tell us?", v:null,
     o:["They loved her singing","They wanted to leave","They could not hear her"], a:0, why:"Standing up and clapping is what crowds do when they love a performance. The story never says “they loved it” — the clapping is the clue.", hint:"When do people stand up and clap?"},
    {story:"🎤 <strong>The Talent Show</strong><br>Lola practiced her song every single day for a week. On the day of the talent show, the microphone stopped working. Lola took a deep breath and sang anyway, as loud as she could. When she finished, the whole crowd stood up and clapped. Lola took a bow with a huge smile.",
     q:"How did Lola feel at the END? Find TWO clues!", v:null,
     o:["Proud and happy — she bowed with a huge smile","Angry — the mic broke","Scared of the crowd"], a:0, why:"Clue 1: a huge smile. Clue 2: taking a bow. She worked hard, it went great, and she felt proud.", hint:"What did Lola’s face do? What did her body do?"},
    {story:"⛏️ <strong>The Mining Trip</strong><br>Kyle and Maya went deep into a cave to look for diamonds. Kyle packed 20 torches. Maya packed only 3. After a while Maya’s last torch burned out, and her tunnel went dark. Kyle heard her call out, so he ran over and gave her half of his torches. Maya lit one right away and said, “Now I can see the walls again.” They kept digging side by side until a big blue sparkle appeared in the stone.",
     q:"How many torches did Kyle give to Maya?", v:null,
     o:["10 torches","3 torches","20 torches"], a:0, why:"Kyle packed 20 torches and gave away half. Half of 20 is 10.", hint:"Kyle had 20. The story says he gave her HALF. What is half of 20?"},
    {story:"⛏️ <strong>The Mining Trip</strong><br>Kyle and Maya went deep into a cave to look for diamonds. Kyle packed 20 torches. Maya packed only 3. After a while Maya’s last torch burned out, and her tunnel went dark. Kyle heard her call out, so he ran over and gave her half of his torches. Maya lit one right away and said, “Now I can see the walls again.” They kept digging side by side until a big blue sparkle appeared in the stone.",
     q:"🕵️ Hidden clue: what tells us Maya needed help?", v:null,
     o:["Her tunnel went dark and she called out","She said she was scared","Kyle told her to stop digging"], a:0, why:"The story never uses the word “help.” The clues are that her light ran out, her tunnel went dark, and she called out. People call out when they need something.", hint:"The story does not say “help.” Look for what happened to her light, and what she did next."},
    {story:"⛏️ <strong>The Mining Trip</strong><br>Kyle and Maya went deep into a cave to look for diamonds. Kyle packed 20 torches. Maya packed only 3. After a while Maya’s last torch burned out, and her tunnel went dark. Kyle heard her call out, so he ran over and gave her half of his torches. Maya lit one right away and said, “Now I can see the walls again.” They kept digging side by side until a big blue sparkle appeared in the stone.",
     q:"🕵️ Hidden clue: what is the big blue sparkle probably?", v:null,
     o:["Diamonds","Lava","A window"], a:0, why:"Two clues: they went into the cave to look for diamonds, and diamonds sparkle blue. The story never says the word — you worked it out.", hint:"What were they looking for in the very first sentence? What color are diamonds?"}
  ]
},
/* ---------------- 5. FEELINGS FOREST ---------------- */
{
  id:"feelings", name:"Feelings Forest", emoji:"💜", cls:"c-grape", hex:"#7C5CE0",
  hostLine:"with Heartsping + Joyping",
  lesson:[
    {c:CH.hearts, text:"Teeniepings are <strong>feeling fairies</strong> — and you have leveled up, so here are the BIG feeling words! Hunt for clues in the <strong>face</strong>, the <strong>body</strong>, and the <strong>words</strong>:<br><br>😤 Groaning, trying again and again → <strong>frustrated</strong><br>🏆 Standing tall, showing everyone → <strong>proud</strong><br>🦋 Stomach butterflies, quiet voice → <strong>nervous</strong><br>😳 Red cheeks, hiding your face → <strong>embarrassed</strong>", v:null},
    {c:CH.joy, text:"Level-up secret #1: ✨ <strong>the same thing can make two people feel DIFFERENT feelings!</strong><br><br>A thunderstorm: Lana cheers — she loves puddles! The dog hides — loud booms are scary to him.<br><br>Same storm. Different feelings. Because different things matter to each of them.", v:null},
    {c:CH.hearts, text:"Level-up secret #2: 🤝 <strong>accident or on purpose?</strong><br><br>Before getting mad, look for clues:<br>👀 Were they looking? Did they mean it?<br>💬 Did they say “sorry”? Did they offer to help?<br><br>Accidents deserve a chance to fix it — not a fight.<br><br>And remember the old secret: people only know <strong>what they saw</strong>!", v:null},
    {c:CH.joy, text:"Level-up secret #3: 🎭 <strong>you can feel two feelings at the same time.</strong><br><br>On the first day of a new club you might feel <strong>excited</strong> about the fun AND <strong>nervous</strong> about the new people.<br><br>Both feelings are real. Both are allowed. Having two feelings at once does not mean anything is wrong with you.", v:{t:"scene",e:"😀➕😟"}}
  ],
  questions:[
    {q:"⛏️ Kyle spent ALL WEEK building a giant Minecraft mansion. He shows everyone, standing tall with a big smile. What is Kyle feeling?", v:{t:"scene",e:"🏰😄🏆"},
     o:["Proud","Embarrassed","Scared"], a:0, why:"Clues: he worked hard, he is showing everyone, standing tall, smiling. That is proud.", hint:"He did something hard and wants everyone to see it. Check the chart."},
    {q:"Maya’s game crashed three times in a row. She groans loudly and puts down the controller. What is Maya feeling?", v:{t:"scene",e:"🎮💥😤"},
     o:["Frustrated","Proud","Sleepy"], a:0, why:"Clues: it went wrong again and again, and she groaned. That is frustrated.", hint:"Groaning after something fails over and over — find it on the chart."},
    {q:"Ian has to read out loud in front of the whole class tomorrow. His stomach feels like butterflies and his voice is quiet. What is Ian feeling?", v:{t:"scene",e:"📖🦋😟"},
     o:["Nervous","Angry","Excited only"], a:0, why:"Clues: butterflies in the stomach + quiet voice before a big moment = nervous. Lots of people feel this!", hint:"Butterflies in the stomach is the big clue."},
    {q:"❄️ SNOW DAY! Lana cheers — she loves sledding. Lisa frowns — her science fair got canceled. Why do they feel DIFFERENT about the same snow?", v:{t:"scene",e:"❄️😄😞"},
     o:["Lana got something she loves; Lisa lost something she wanted","Lisa is always sad","Snow makes everyone upset"], a:0, why:"Same snow, different feelings — because different things matter to each person. Lana gained sledding; Lisa lost her science fair.", hint:"What does EACH sister care about? Think about them one at a time."},
    {q:"⛏️ In Minecraft, Sam’s TNT went off by ACCIDENT and broke part of your build. Sam quickly says, “I’m so sorry! I’ll help you fix it!” What is a fair thing to do?", v:{t:"scene",e:"🧨😬🤝"},
     o:["Say “It’s okay, let’s fix it together”","Yell at Sam and quit","Break Sam’s build back"], a:0, why:"Check the clues: Sam said sorry AND offered to help — that means it was an accident. Accidents deserve a chance to fix it, not a fight.", hint:"Did Sam mean to do it? What did Sam say right after?"},
    {q:"🤫 Secret test! Romi saw her diamond in Chest A yesterday. Last night, Kyle moved it to Chest B — Romi did not see him. Where does Romi THINK the diamond is?", v:{t:"scene",e:"💎🅰️➡️🅱️"},
     o:["Chest A","Chest B","She knows Kyle moved it"], a:0, why:"Romi never saw the move. Her head still has the old picture: diamond in Chest A. People only know what they saw!", hint:"What did ROMI see with her own eyes? Only that."},
    {q:"You helped plan a SURPRISE party for Lucy. Lucy walks in and asks, “Why is everyone so quiet?” Does Lucy know about the party?", v:{t:"scene",e:"🎈🤫❓"},
     o:["No — nobody told her, so she cannot know","Yes — everyone knows about parties","Yes — she read your mind"], a:0, why:"Lucy did not see the plans and nobody told her. No seeing, no hearing = no knowing. That is exactly why it will be a surprise!", hint:"Did Lucy see or hear anything about the party?"},
    {q:"🎭 Kyle is starting at a new school tomorrow. He says, “I really want to see the huge playground, but my stomach feels funny about meeting new kids.” What is Kyle feeling?", v:{t:"scene",e:"🏫😀😟"},
     o:["Excited AND nervous at the same time","Only excited","Nothing at all"], a:0, why:"Two clues, two feelings. “I really want to see the playground” is excited. “My stomach feels funny about new kids” is nervous. Both can be true at once.", hint:"He said TWO things. Find a clue in each one."},
    {q:"🎮 Lincoln put his controller in the blue box before school. While he was gone, Lucy borrowed it and left it on the red shelf. Lincoln did not see her. When Lincoln gets home, where will he LOOK first?", v:{t:"scene",e:"🎮🟦➡️🟥"},
     o:["In the blue box","On the red shelf","He will ask Lucy first"], a:0, why:"Lincoln only saw himself put it in the blue box. He never saw Lucy move it, so his head still says “blue box” — that is where he looks first.", hint:"Lincoln was at school. What is the LAST thing he saw happen to the controller?"}
  ]
},
/* ---------------- 6. COIN SHOP (MONEY) ---------------- */
{
  id:"money", name:"Joyping’s Coin Shop", emoji:"🪙", cls:"c-sun", hex:"#B87A0A",
  hostLine:"with Joyping + Clyde",
  lesson:[
    {c:CH.joy, text:"Welcome to the <strong>Coin Shop</strong>! ✨ First, learn the four coins by heart:<br><br>🟤 <strong>Penny = 1¢</strong> (smallest value, brown)<br>⚪ <strong>Nickel = 5¢</strong> (fat and round)<br>⚪ <strong>Dime = 10¢</strong> (the tiny one — it is small but worth more than a nickel!)<br>⚪ <strong>Quarter = 25¢</strong> (the biggest)", v:{t:"money",c:[25,10,5,1]}},
    {c:CH.joy, text:"Now <strong>count a handful of coins</strong>. The trick: start with the <strong>biggest</strong> coin and count on from there.<br><br>Quarter first: <strong>25</strong><br>Then a dime: 25 + 10 = <strong>35</strong><br>Then a dime: 35 + 10 = <strong>45</strong><br>Then a nickel: 45 + 5 = <strong>50¢</strong>", v:{t:"money",c:[25,10,10,5]}},
    {c:CH.clyde, text:"Dollars next. 📗<br><br><strong>100¢ = $1.00</strong><br><br>In a money price, the dot separates dollars from cents:<br><strong>$1.25</strong> means 1 dollar and 25 cents.<br><br>To compare prices, turn everything into cents. $1.25 = <strong>125¢</strong>, which is more than 95¢.", v:{t:"money",b:[1],c:[25]}},
    {c:CH.joy, text:"Last skill: <strong>making change</strong> — how much money you get back.<br><br>Do not subtract. <strong>Count UP</strong> from the price to what you paid!<br><br>A cookie costs 70¢ and you pay with $1.00:<br>70 → 80 → 90 → 100<br>That is three jumps of 10, so your change is <strong>30¢</strong>.", v:{t:"numberline",min:0.7,max:1,step:0.1,fmt:"money",mark:0.7,label:"price"}}
  ],
  questions:[
    {q:"Warm-up! How much is this coin worth?", v:{t:"money",c:[25]},
     o:["25¢","5¢","10¢"], a:0, why:"That is a quarter, and a quarter is worth 25¢.", hint:"It is the biggest coin. Check Joyping’s coin list."},
    {q:"Warm-up! Count these coins. How much in all?", v:{t:"money",c:[10,10,5]},
     o:["25¢","15¢","30¢"], a:0, why:"10 + 10 = 20, and 20 + 5 = 25¢.", hint:"Start with a dime: 10. Count on: 10, 20, then add the nickel."},
    {q:"🪙 Count these coins. Start with the biggest!", v:{t:"money",c:[25,25,10]},
     o:["60¢","50¢","35¢"], a:0, why:"Quarter 25, then 25 + 25 = 50, then 50 + 10 = 60¢.", hint:"Two quarters first. 25 + 25 = 50. Now add the dime."},
    {q:"💵 How many cents are in one dollar?", v:{t:"money",b:[1]},
     o:["100¢","50¢","10¢"], a:0, why:"$1.00 = 100¢. That is four quarters, because 25 + 25 + 25 + 25 = 100.", hint:"Count quarters: 25, 50, 75, … how many to fill a dollar?"},
    {q:"⛏️ A Minecraft sticker costs 85¢. You have these coins. Do you have enough?", v:{t:"money",c:[25,25,25,10]},
     o:["Yes — that is exactly 85¢","No — you only have 70¢","No — you need one more quarter"], a:0, why:"25 + 25 = 50, + 25 = 75, + 10 = 85¢. That is exactly the price. ✅", hint:"Count the three quarters first: 25, 50, 75. Then add the dime."},
    {q:"🍪 A cookie costs 70¢. You pay with $1.00. How much change do you get?", v:{t:"numberline",min:0.7,max:1,step:0.1,fmt:"money",mark:0.7,label:"price"},
     o:["30¢","20¢","70¢"], a:0, why:"Count UP on the line: 70 → 80 → 90 → 100. That is three jumps of 10, so the change is 30¢.", hint:"Start at 70¢ and count up to 100¢. How much did you add?"},
    {q:"🧁 A cake costs $1.25. A cookie costs 95¢. Which one costs MORE?", v:{t:"money",b:[1],c:[25]},
     o:["The cake — $1.25 is 125¢","The cookie — 95 is a bigger number","They cost the same"], a:0, why:"Turn both into cents first. $1.25 = 125¢. 125 is more than 95, so the cake costs more.", hint:"Careful — do not just compare 1.25 and 95. Change the dollars into cents first."},
    {q:"⛏️ You buy a torch for 40¢ and a ladder for 35¢. How much do you spend in all?", v:{t:"money",c:[25,10,5,25,10]},
     o:["75¢","65¢","85¢"], a:0, why:"40 + 35. Add the tens first: 40 + 30 = 70. Then the 5: 70 + 5 = 75¢.", hint:"Split 35 into 30 + 5. Add the 30 to 40 first."},
    {q:"🛒 You spend 75¢ at the shop and you paid with $1.00. What is your change?", v:{t:"numberline",min:0.75,max:1,step:0.05,fmt:"money",mark:0.75,label:"spent"},
     o:["25¢","15¢","35¢"], a:0, why:"Count UP from 75¢ to 100¢: 75 → 80 → 85 → 90 → 95 → 100. That is 25¢ — one quarter back.", hint:"Start at 75 and count up to 100. Each jump on the line is 5¢."}
  ]
}
];
