"use strict";
const lessons=[
["Meet the machine","6 min","Your first program",`<h1>01 · Meet the machine</h1><p>Programming means giving a computer precise instructions. Computers are fast, literal, and uninterested in what you meant.</p><div class="concept-callout"><strong>Core idea</strong><br>A program is a sequence of instructions. The computer follows the rules you wrote, not the rules you hoped you wrote.</div><h2>Your first instruction</h2><pre>yeet("Hello, world!");</pre><p><code>yeet()</code> displays a value. The text inside quotes is a string. Semicolons are optional in this teaching language.</p><h2>Predict the output</h2><pre>yeet("First");
yeet("Second");</pre><p>Instructions run from top to bottom. Try changing the greeting in the Practice Lab.</p>`],
["Values and types","8 min","Data",`<h1>02 · Values and types</h1><p>A value is data a program can use. Three basic types:</p><ul><li><code>"ripe"</code> — a string (text)</li><li><code>42</code> — a number</li><li><code>true</code> / <code>false</code> — booleans</li></ul><pre>yeet("Banana");
yeet(42);
yeet(true);</pre><div class="concept-callout"><strong>Remember</strong><br><code>"42"</code> is text; <code>42</code> is numeric. Quotes matter.</div><p>Adding numbers performs arithmetic. Adding a string to a value joins their text representations.</p><pre>yeet(2 + 3);
yeet("Batch " + 3);</pre>`],
["Variables","9 min","Naming data",`<h1>03 · Variables</h1><p>A variable is a named place to keep a value. Use names that explain what the value means.</p><pre>hoard fruit = "banana";
hoard quantity = 7;
yeet(fruit);
yeet(quantity);</pre><p><code>let</code> declares a variable. Names are case-sensitive: <code>fruit</code> and <code>Fruit</code> differ.</p><h2>Updating a value</h2><pre>hoard count = 3;
count = count - 1;
yeet(count);</pre><p>Declare once, then assign a new value. Declaring the same name twice is an error.</p>`],
["Operators and expressions","10 min","Arithmetic",`<h1>04 · Operators and expressions</h1><p>Operators perform operations; expressions produce values.</p><pre>yeet(8 + 2);
yeet(8 - 2);
yeet(8 * 2);
yeet(8 / 2);</pre><p>Multiplication and division happen before addition and subtraction. Parentheses make order explicit.</p><pre>yeet((8 + 2) * 3);
yeet(8 + 2 * 3);</pre><div class="concept-callout"><strong>Debugging habit</strong><br>If a result surprises you, add parentheses and test a smaller expression.</div>`],
["Comparisons and booleans","8 min","True or false",`<h1>05 · Comparisons and booleans</h1><p>Comparisons ask a question and produce <code>true</code> or <code>false</code>.</p><pre>yeet(5 > 2);
yeet(5 == 5);
yeet(5 != 4);
yeet(3 <= 1);</pre><ul><li><code>==</code> equal</li><li><code>!=</code> not equal</li><li><code>&gt;</code> greater; <code>&lt;</code> less</li><li><code>&gt;=</code> greater or equal; <code>&lt;=</code> less or equal</li></ul><p>One <code>=</code> assigns. Two <code>==</code> compare.</p>`],
["Make decisions with if","10 min","Branching",`<h1>06 · Make decisions with if</h1><p>An <code>if</code> statement runs a block only when its condition is true.</p><pre>hoard ripe = true;
panic_panic_if (ripe) {
  yeet("Eat responsibly.");
} cope_else {
  yeet("Wait patiently.");
}</pre><p>The condition goes in parentheses; instructions go in braces. The optional <code>else</code> handles the other case.</p><div class="concept-callout"><strong>Common mistake</strong><br>Every opening brace <code>{</code> needs a closing brace <code>}</code>.</div>`],
["Repeat without copy-paste","10 min","Loops",`<h1>07 · Repeat without copy-paste</h1><p>A loop repeats instructions. Use <code>repeat</code> when you know the number of repetitions.</p><pre>loop_de_loop 3 {
  yeet("Again!");
}</pre><p>Counts must be whole numbers from 0 to 1000. Loops save you from copying the same instruction many times.</p><h2>Why limits?</h2><p>Unbounded loops can keep a program busy forever. This beginner interpreter limits repetitions.</p>`],
["Counters and changing state","12 min","Counters",`<h1>08 · Counters and state</h1><p>A counter is a variable that changes as a program runs.</p><pre>hoard count = 3;
loop_de_loop 3 {
  yeet(count);
  count = count - 1;
}</pre><p>The repeat count stays fixed at three, while <code>count</code> changes. Output: 3, then 2, then 1.</p><div class="concept-callout"><strong>Think</strong><br>Remove the assignment. The loop prints the same value each time.</div>`],
["Combine control flow","12 min","Conditions + loops",`<h1>09 · Combine control flow</h1><p>Programs combine ideas. A decision inside a loop can behave differently each repetition.</p><pre>hoard number = 1;
loop_de_loop 4 {
  panic_panic_if (number > 2) {
    yeet("Large");
  } cope_else {
    yeet("Small");
  }
  number = number + 1;
}</pre><p>Trace one iteration at a time: check the condition, choose a branch, update the variable.</p>`],
["Errors are information","9 min","Debugging",`<h1>10 · Errors are information</h1><p>An error is feedback about a mismatch between code and language rules—not a verdict on your ability.</p><ol><li>Read the message.</li><li>Find the named variable or unexpected symbol.</li><li>Check quotes, parentheses, and braces.</li><li>Reduce the program to a small failing example.</li><li>Change one thing, then run again.</li></ol><pre>hoard fruit = "banana;
yeet(fruit);</pre><p>This has an unterminated string. Close the quotation mark and retry.</p>`],
["Mini project: Fruit inventory","15 min","Build something",`<h1>11 · Mini project: Fruit inventory</h1><p>Combine variables, arithmetic, and output.</p><pre>hoard boxes = 4;
hoard bananasPerBox = 6;
hoard total = boxes * bananasPerBox;
yeet("Boxes: " + boxes);
yeet("Total bananas: " + total);</pre><p>Extend it: add a sold variable, calculate what remains, and print a summary. Test at least two sets of values.</p><ul><li>Names explain their purpose.</li><li>Arithmetic is correct.</li><li>Output is understandable.</li><li>You tested different values.</li></ul>`],
["Graduation and next steps","8 min","Keep learning",`<h1>12 · Graduation (pending fruit review)</h1><p>You have met the core building blocks: values, variables, expressions, decisions, loops, and debugging.</p><h2>Where next?</h2><ol><li>Practice small programs without copying.</li><li>Learn functions and how to break problems into pieces.</li><li>Study arrays and objects.</li><li>Choose JavaScript or Python and rebuild your mini project.</li><li>Learn testing and debugging systematically.</li></ol><div class="concept-callout"><strong>Final wisdom</strong><br>Learn by predicting, running code, noticing what happened, and improving your mental model.</div>`]
];
const lessonChecks=[
{q:"What appears first?",a:["Second","First","Both on one line"],c:1,why:"Statements execute in source order."},
{q:'What is the type of "42"?',a:["Number","String","Boolean"],c:1,why:"Quotation marks make it a string."},
{q:"After hoard count = 3; count = count - 1;, what is count?",a:["3","2","1"],c:1,why:"The assignment stores the result of 3 - 1."},
{q:"What does 8 + 2 * 3 evaluate to?",a:["30","14","24"],c:1,why:"Multiplication has higher precedence: 8 + 6."},
{q:"What does 5 == 5 produce?",a:["true","false","5"],c:0,why:"Equality comparison produces a boolean."},
{q:"If score is 4, which branch runs for score > 5?",a:["The if branch","The else branch","Both"],c:1,why:"4 > 5 is false, so cope_else runs."},
{q:"How many times does loop_de_loop 3 run its block?",a:["2","3","4"],c:1,why:"The count specifies three iterations."},
{q:"A counter starts at 3 and decreases once per iteration. What is it after two iterations?",a:["1","2","3"],c:0,why:"3 → 2 → 1."},
{q:"When does the condition in panic_if choose its first block?",a:["When true","When false","Always"],c:0,why:"The first block runs when the condition is truthy."},
{q:"What should you do first when a program errors?",a:["Rewrite everything","Read the error and locate the issue","Delete the compiler"],c:1,why:"Use the error message to narrow down the cause."},
{q:"Four boxes hold six bananas each. Which expression calculates the total?",a:["4 + 6","4 * 6","4 == 6"],c:1,why:"Four groups of six means multiplication."},
{q:"Which learning cycle builds understanding?",a:["Copy and move on","Predict, run, explain, modify","Guess until lucky"],c:1,why:"Prediction and explanation help reveal your mental model."}
];
const challenges=[
{title:"Challenge 01: Say hello",prompt:'Print the exact text Hello, world! (including punctuation).',code:'print("Hello, world!");',hint:'Use print("...") with the greeting inside quotes.',test:o=>o.trim()==="Hello, world!"},
{title:"Challenge 02: Add numbers",prompt:"Display the result of 19 + 23.",code:"print(19 + 23);",hint:"Put the arithmetic expression inside print(...).",test:o=>o.trim()==="42"},
{title:"Challenge 03: Make a variable",prompt:'Create snack containing "banana", then print it.',code:'let snack = "banana";\nprint(snack);',hint:"Declare with let, then print the variable name.",test:o=>o.trim()==="banana"},
{title:"Challenge 04: A tiny decision",prompt:'Set score to 10. If it is greater than 5, print "Passed"; otherwise print "Try again".',code:'let score = 10;\nif (score > 5) {\n print("Passed");\n} cope_else {\n print("Try again");\n}',hint:"Use if (score > 5) { ... } else { ... }.",test:o=>o.trim()==="Passed"},
{title:"Challenge 05: Repeat",prompt:'Use repeat 3 to print "Banana!" three times.',code:'loop_de_loop 3 {\n print("Banana!");\n}',hint:"Put the count before a block in braces.",test:o=>o.trim().split("\n").join("|")==="Banana!|Banana!|Banana!"}
], quizzes=[
{q:"What does print() do?",a:["Displays a value","Creates a variable","Repeats code"],c:0,why:"print() evaluates and displays its value."},
{q:'Which is a number?',a:['"42"',"42","Both"],c:1,why:'Quotes make "42" text.'},
{q:"Which symbol compares equality?",a:["=","==","=>"],c:1,why:"A single = assigns; == compares."},
{q:"What does if do?",a:["Runs every branch","Chooses based on a condition","Names a variable"],c:1,why:"The condition determines which branch runs."},
{q:"What are loops for?",a:["Repeating instructions","Changing fonts","Renaming variables"],c:0,why:"Loops run a block repeatedly."}
];
let current=0,done=new Set(),ci=0,qi=0;const $=id=>document.getElementById(id);
function renderList(){$("moduleList").innerHTML=lessons.map((l,i)=>'<button class="module-button '+(i===current?'active ':'')+(done.has(i)?'done':'')+'" data-i="'+i+'"><span class="module-number">'+(done.has(i)?'✓':String(i+1).padStart(2,'0'))+'</span><span><strong>'+l[0]+'</strong><small>'+l[1]+' · '+l[2]+'</small></span></button>').join("");document.querySelectorAll(".module-button").forEach(b=>b.onclick=()=>showLesson(+b.dataset.i));}
function showLesson(i){current=Math.max(0,Math.min(lessons.length-1,i));const l=lessons[current];$("lessonModule").textContent="MODULE "+String(current+1).padStart(2,"0");$("lessonDuration").textContent=l[1];$("lessonContent").innerHTML=l[3]+`<div class="concept-callout learning-loop"><strong>🍌 The Banana learning loop</strong><br><b>1. Predict:</b> Before running the example, write down what you think it prints.<br><b>2. Run:</b> Test it in the Playground or Practice Lab.<br><b>3. Explain:</b> Describe why each line produces that result.<br><b>4. Modify:</b> Change one value or instruction, predict again, then test.<br><small>Use BananaScript spellings: hoard (declare), yeet (print), loop_de_loop (repeat), panic_if (if), cope_else (else). These are real aliases in this interpreter.</small></div><section class="lesson-check concept-callout"><strong>🧠 Check your understanding</strong><p id="lessonCheckQuestion"></p><div id="lessonCheckOptions" class="quiz-options"></div><p id="lessonCheckFeedback" aria-live="polite"></p></section>`;const check=lessonChecks[current];$("lessonCheckQuestion").textContent=check.q;$("lessonCheckOptions").innerHTML=check.a.map((a,j)=>`<button class="quiz-option" data-check="${j}">${String.fromCharCode(65+j)}. ${a}</button>`).join("");$("lessonCheckFeedback").textContent="Choose an answer before revealing the explanation.";document.querySelectorAll("[data-check]").forEach(b=>b.onclick=()=>{const ok=+b.dataset.check===check.c;$("lessonCheckFeedback").textContent=(ok?"Correct! ":"Not quite. ")+check.why;$("lessonCheckFeedback").style.color=ok?"#8cf0be":"#ff9cad";});$("prevLesson").disabled=current===0;$("nextLesson").textContent=current===lessons.length-1?"Back to first ↺":"Next lesson →";$("completeLesson").textContent=done.has(current)?"Completed ✓":"Mark complete ✓";renderList();$("progressText").textContent=done.size+" of "+lessons.length+" lessons completed";$("progressBar").style.width=(done.size/lessons.length*100)+"%";}
$("prevLesson").onclick=()=>showLesson(current-1);$("nextLesson").onclick=()=>showLesson(current===lessons.length-1?0:current+1);$("completeLesson").onclick=()=>{done.add(current);showLesson(current===lessons.length-1?current:current+1);};
function renderChallenge(){let c=challenges[ci];$("challengeTitle").textContent=c.title;$("challengePrompt").textContent=c.prompt;$("challengeEditor").value=c.code;$("challengeFeedback").textContent="Try it, or ask for a hint.";$("challengeFeedback").className="feedback";$("practiceOutput").textContent="";}
$("checkChallenge").onclick=()=>{try{const result=window.BananaCompiler($("challengeEditor").value),out=result.join("\n");$("practiceOutput").textContent=out;$("practiceState").textContent="RAN";const ok=challenges[ci].test(out);$("challengeFeedback").textContent=ok?"✓ Correct output! Explain each line to yourself.":"It ran, but the output does not match yet. Compare it with the prompt.";$("challengeFeedback").className="feedback "+(ok?"good":"bad");}catch(e){$("practiceOutput").textContent="COMPILER ERROR\n"+e.message;$("practiceState").textContent="ERROR";$("challengeFeedback").textContent="Read the error, fix one thing, and try again.";$("challengeFeedback").className="feedback bad";}};
$("loadHint").onclick=()=>{$("challengeFeedback").textContent="Hint: "+challenges[ci].hint;};$("loadSolution").onclick=()=>{$("challengeEditor").value=challenges[ci].code;$("challengeFeedback").textContent="Solution loaded. Run it and explain each line."};$("nextChallenge").onclick=()=>{ci=(ci+1)%challenges.length;renderChallenge();};
function renderQuiz(){const q=quizzes[qi];$("quizQuestion").textContent=q.q;$("quizFeedback").textContent="";$("quizOptions").innerHTML=q.a.map((a,i)=>'<button class="quiz-option" data-a="'+i+'">'+String.fromCharCode(65+i)+". "+a+"</button>").join("");document.querySelectorAll(".quiz-option").forEach(b=>b.onclick=()=>{document.querySelectorAll(".quiz-option").forEach(x=>x.disabled=true);const ok=+b.dataset.a===q.c;$("quizFeedback").textContent=(ok?"Correct. ":"Not quite. ")+q.why;$("quizFeedback").style.color=ok?"#8cf0be":"#ff9cad";});}
$("nextQuiz").onclick=()=>{qi=(qi+1)%quizzes.length;renderQuiz();};renderList();showLesson(0);renderChallenge();renderQuiz();