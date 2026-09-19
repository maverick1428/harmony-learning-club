/* =====================================================================
   CONTENT — five worlds. All stories and scenarios are original.
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
    {c:CH.hearts, text:"Level-up 3: a <strong>fraction of a group</strong>.<br><br>You mined <strong>12 diamonds</strong> 💎. You give <strong>1/3</strong> to a friend.<br><br>Trick: <strong>divide by the bottom number</strong>. 12 ÷ 3 = <strong>4 diamonds</strong>.<br><br>Splitting 12 into 3 equal piles makes piles of 4.", v:null}
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
     o:["3 diamonds","4 diamonds","6 diamonds"], a:1, why:"1/3 of 12 → divide by the bottom number: 12 ÷ 3 = 4 diamonds.", hint:"Split 12 into 3 equal piles. How big is one pile?"}
  ]
},
/* ---------------- 2. BUILD LAB (AREA + VOLUME) ---------------- */
{
  id:"area", name:"Lisa’s Build Lab", emoji:"📐", cls:"c-mint", hex:"#1F9E7E",
  hostLine:"with Lisa Loud",
  lesson:[
    {c:CH.lisa, text:"Greetings! Today we measure like Minecraft builders. ⛏️<br><br><strong>Area</strong> = how many squares cover a flat floor.<br><br>Fast trick: multiply <strong>across × up</strong>.<br>4 across × 3 up = <strong>12 blocks</strong> of floor.", v:{t:"grid",rows:3,cols:4,opts:{sides:true}}},
    {c:CH.lisa, text:"Do not mix these up!<br><br>🚶 <strong>Perimeter</strong> = walking around the EDGE. <strong>Add</strong> all the sides.<br>🟩 <strong>Area</strong> = covering the FLOOR. <strong>Multiply</strong> across × up.<br><br>For a 5 by 3 floor:<br>Perimeter = 5+3+5+3 = <strong>16</strong>. Area = 5×3 = <strong>15</strong>.", v:{t:"grid",rows:3,cols:5,opts:{sides:true}}},
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
     o:["16 blocks","8 blocks","12 blocks"], a:0, why:"Layer: 4 × 2 = 8. Two layers: 8 × 2 = 16 blocks.", hint:"4 × 2 = 8 for one layer. Now double it."}
  ]
},
/* ---------------- 3. CLOCK TOWER ---------------- */
{
  id:"time", name:"Lincoln’s Clock Tower", emoji:"⏰", cls:"c-tangerine", hex:"#E8770A",
  hostLine:"with Lincoln Loud",
  lesson:[
    {c:CH.lincoln, text:"11 kids, 1 bathroom, and Mom’s Minecraft time limits — I live by the clock! ⏰<br><br>Reminder:<br>👉 SHORT hand = hour. LONG hand = minutes.<br>👉 Each number = <strong>5 minutes</strong> for the long hand.<br><br>Long hand on 7 → count by fives: 5, 10, 15, 20, 25, 30, <strong>35</strong>. This is <strong>2:35</strong>.", v:{t:"clock",h:2,m:35}},
    {c:CH.lincoln, text:"Two special names:<br><br>🕒 Long hand on 3 = <strong>quarter past</strong> (15 min).<br>🕘 Long hand on 9 = <strong>quarter to</strong> the NEXT hour (45 min).<br><br>This clock is 9:45 — we say <strong>quarter to 10</strong>.", v:{t:"clock",h:9,m:45}},
    {c:CH.lincoln, text:"Power move: <strong>elapsed time</strong> (how much time passed).<br><br>Jump in easy steps: hours first, then minutes.<br><br>Minecraft starts at 4:30, Mom allows 45 minutes:<br>4:30 → +30 min → 5:00 → +15 min → <strong>5:15</strong>. Log-off time!", v:{t:"twoclocks",a:[4,30],b:[5,15]}}
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
     o:["15 minutes","55 minutes","5 minutes"], a:0, why:"7:50 → 8:00 is 10 minutes. 8:00 → 8:05 is 5 more. 10 + 5 = 15 minutes.", hint:"Jump to 8:00 first. Then keep going to 8:05."}
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
     o:["Proud and happy — she bowed with a huge smile","Angry — the mic broke","Scared of the crowd"], a:0, why:"Clue 1: a huge smile. Clue 2: taking a bow. She worked hard, it went great, and she felt proud.", hint:"What did Lola’s face do? What did her body do?"}
  ]
},
/* ---------------- 5. FEELINGS FOREST ---------------- */
{
  id:"feelings", name:"Feelings Forest", emoji:"💜", cls:"c-grape", hex:"#7C5CE0",
  hostLine:"with Heartsping + Joyping",
  lesson:[
    {c:CH.hearts, text:"Teeniepings are <strong>feeling fairies</strong> — and you have leveled up, so here are the BIG feeling words! Hunt for clues in the <strong>face</strong>, the <strong>body</strong>, and the <strong>words</strong>:<br><br>😤 Groaning, trying again and again → <strong>frustrated</strong><br>🏆 Standing tall, showing everyone → <strong>proud</strong><br>🦋 Stomach butterflies, quiet voice → <strong>nervous</strong><br>😳 Red cheeks, hiding your face → <strong>embarrassed</strong>", v:null},
    {c:CH.joy, text:"Level-up secret #1: ✨ <strong>the same thing can make two people feel DIFFERENT feelings!</strong><br><br>A thunderstorm: Lana cheers — she loves puddles! The dog hides — loud booms are scary to him.<br><br>Same storm. Different feelings. Because different things matter to each of them.", v:null},
    {c:CH.hearts, text:"Level-up secret #2: 🤝 <strong>accident or on purpose?</strong><br><br>Before getting mad, look for clues:<br>👀 Were they looking? Did they mean it?<br>💬 Did they say “sorry”? Did they offer to help?<br><br>Accidents deserve a chance to fix it — not a fight.<br><br>And remember the old secret: people only know <strong>what they saw</strong>!", v:null}
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
     o:["No — nobody told her, so she cannot know","Yes — everyone knows about parties","Yes — she read your mind"], a:0, why:"Lucy did not see the plans and nobody told her. No seeing, no hearing = no knowing. That is exactly why it will be a surprise!", hint:"Did Lucy see or hear anything about the party?"}
  ]
}
];

