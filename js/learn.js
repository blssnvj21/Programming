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
yeet(quantity);</pre><p><code>hoard</code> declares a variable. Names are case-sensitive: <code>fruit</code> and <code>Fruit</code> differ.</p><h2>Updating a value</h2><pre>hoard count = 3;
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
["Make decisions with if","10 min","Branching",`<h1>06 · Make decisions with if</h1><p>A <code>panic_if</code> statement runs a block only when its condition is true.</p><pre>hoard ripe = true;
panic_if (ripe) {
  yeet("Eat responsibly.");
} cope_else {
  yeet("Wait patiently.");
}</pre><p>The condition goes in parentheses; instructions go in braces. The optional <code>cope_else</code> handles the other case.</p><div class="concept-callout"><strong>Common mistake</strong><br>Every opening brace <code>{</code> needs a closing brace <code>}</code>.</div>`],
["Repeat without copy-paste","10 min","Loops",`<h1>07 · Repeat without copy-paste</h1><p>A loop repeats instructions. Use <code>loop_de_loop</code> when you know the number of repetitions.</p><pre>loop_de_loop 3 {
  yeet("Again!");
}</pre><p>Counts must be whole numbers from 0 to 1000. Loops save you from copying the same instruction many times.</p><h2>Why limits?</h2><p>Unbounded loops can keep a program busy forever. This beginner interpreter limits repetitions.</p>`],
["Counters and changing state","12 min","Counters",`<h1>08 · Counters and state</h1><p>A counter is a variable that changes as a program runs.</p><pre>hoard count = 3;
loop_de_loop 3 {
  yeet(count);
  count = count - 1;
}</pre><p>The repeat count stays fixed at three, while <code>count</code> changes. Output: 3, then 2, then 1.</p><div class="concept-callout"><strong>Think</strong><br>Remove the assignment. The loop prints the same value each time.</div>`],
["Combine control flow","12 min","Conditions + loops",`<h1>09 · Combine control flow</h1><p>Programs combine ideas. A decision inside a loop can behave differently each repetition.</p><pre>hoard number = 1;
loop_de_loop 4 {
  panic_if (number > 2) {
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
["Functions: reusable recipes","12 min","Functions and returns",`<h1>12 · Functions: reusable recipes</h1><p>A function is a named recipe for a task. Give it inputs (parameters), then use <code>send_back</code> to return a result.</p><pre>recipe double(number) {
  send_back number * 2;
}
yeet(double(21));</pre><p><code>recipe</code> declares a function. <code>double(21)</code> calls it with 21. The returned value is 42.</p><h2>Return early</h2><pre>recipe is_ripe(color) {
  panic_if (color == "yellow") {
    send_back true;
  }
  send_back false;
}
yeet(is_ripe("yellow"));</pre><p>Parameters and variables declared inside a recipe are local to that call. Every recipe returns <code>null</code> if it reaches the end without <code>send_back</code>.</p>`],
["Arrays: a box of values","12 min","Collections and indexes",`<h1>13 · Arrays: a box of values</h1><p>An array stores several values in one ordered collection. Positions start at zero—not one. The first item is at index 0.</p><pre>hoard fruits = ["banana", "mango", "pear"];
yeet(fruits[0]);
yeet(fruits[1]);
fruits[1] = "plantain";
yeet(fruits[1]);</pre><p>Use square brackets to read or update an existing array position. An index must be a whole number within the array's range.</p><h2>Useful array tools</h2><pre>hoard snacks = ["banana"];
push(snacks, "mango");
yeet(len(snacks));
yeet(pop(snacks));
yeet(len(snacks));</pre><p><code>push</code> adds an item to the end and returns the new length. <code>pop</code> removes and returns the last item. <code>len</code> counts items.</p>`],
["Built-in helpers","10 min","Working with values",`<h1>14 · Built-in helpers</h1><p>BananaScript includes small helpers so you do not have to write every operation yourself.</p><pre>yeet(abs(-9));
yeet(floor(4.8));
yeet(ceil(4.2));
yeet(round(4.5));
yeet(sqrt(81));
yeet(type("banana"));
yeet(num("12") + 3);
yeet(str(42) + " bananas");</pre><p><code>abs</code>, <code>floor</code>, <code>ceil</code>, <code>round</code>, and <code>sqrt</code> work with numbers. <code>type</code> reports a value's type. <code>num</code> converts numeric text to a number; <code>str</code> converts a value to text.</p><div class="concept-callout"><strong>Small rule, big help</strong><br>Pass the kind of value a helper expects. For example, <code>sqrt(-1)</code> is rejected.</div>`],
["Graduation and next steps","8 min","Keep learning",`<h1>15 · Graduation (pending fruit review)</h1><p>You have practiced values, variables, expressions, decisions, loops, functions, arrays, built-in helpers, and debugging.</p><h2>Your next mission</h2><ol><li>Build a fruit inventory with arrays.</li><li>Write a recipe that calculates totals.</li><li>Use conditions to handle unusual cases.</li><li>Test with several inputs and explain the output.</li><li>Read the BananaScript language reference when you meet a new feature.</li></ol><div class="concept-callout"><strong>Final wisdom</strong><br>Predict, run, explain, modify. Repeat until the program works and you understand why.</div>`],
[ "Strings and text tools","12 min","Text processing",`<h1>16 · Strings and text tools</h1><p>Strings represent text. You can join strings with <code>+</code>, measure them with <code>len</code>, search with <code>contains</code>, split them into arrays, and join arrays back into text.</p><pre>hoard phrase = "banana mango pear";
yeet(len(phrase));
yeet(contains(phrase, "mango"));
yeet(join(split(phrase, " "), " / "));</pre><p><code>split</code> returns an array. <code>join</code> combines array items using the separator you provide. Text tools are useful for cleaning and formatting data.</p>`],
[ "While loops and termination","12 min","Condition-controlled loops",`<h1>17 · While loops and termination</h1><p>A <code>while</code> loop repeats as long as its condition is true. Something inside the loop should eventually make the condition false.</p><pre>hoard count = 3;
while (count > 0) {
  yeet(count);
  count = count - 1;
}
yeet("Done");</pre><div class="concept-callout"><strong>Banana safety rule</strong><br>If the condition never becomes false, the loop may not finish. Change one variable at a time and trace the condition.</div>`],
[ "Search and simple algorithms","15 min","Solve a problem",`<h1>18 · Search and simple algorithms</h1><p>An algorithm is a precise sequence of steps. This example searches an array and reports whether a value appears. The loop checks one item at a time.</p><pre>hoard fruits = ["banana", "mango", "pear"];
hoard found = false;
hoard i = 0;
while (i < len(fruits)) {
  panic_if (fruits[i] == "mango") {
    found = true;
  }
  i = i + 1;
}
yeet(found);</pre><p>Trace <code>i</code>, the current item, and <code>found</code>. Later, learn how to stop early and compare algorithms by their time and memory costs.</p>`],
[ "Built-in library: min, max, and collections","12 min","More standard helpers",`<h1>19 · More built-in helpers</h1><p>Small standard-library functions save effort. <code>min</code> and <code>max</code> compare numbers; <code>contains</code> checks for a value in a string or array.</p><pre>yeet(min(8, 3, 11));
yeet(max(8, 3, 11));
yeet(contains(["banana", "pear"], "pear"));</pre><p>Use <code>push</code> to add an array item, <code>pop</code> to remove the last item, and <code>len</code> to count characters or items. Consult the language reference for exact argument rules.</p>`],
[ "Testing, projects, and next languages","15 min","From exercises to software",`<h1>20 · Testing, projects, and next languages</h1><p>A program that works for one example may fail on another. Test normal cases, boundary cases, and unexpected values.</p><ol><li>Write down the expected result before running.</li><li>Try at least three different inputs.</li><li>Check empty collections and zero where relevant.</li><li>Read errors instead of hiding them.</li><li>Explain the algorithm in plain language.</li></ol><h2>Choose a next project</h2><ul><li>Fruit inventory with stock, sales, and totals.</li><li>Quiz grader with a score and feedback.</li><li>Shopping list using arrays and helper functions.</li></ul><p>BananaScript teaches fundamentals. For files, web servers, databases, classes, and larger applications, learn a general-purpose language and its tools.</p>`],
[ "Thinking in algorithms","14 min","Plan before coding",`<h1>21 · Thinking in algorithms</h1><p>Before writing code, describe the solution as small steps. Then check whether every step is precise enough that a computer could follow it.</p><ol><li>State the problem.</li><li>Identify the inputs and expected output.</li><li>Write the steps in plain language.</li><li>Try a tiny example by hand.</li><li>Translate the steps into BananaScript.</li><li>Test a normal case and an edge case.</li></ol><div class="concept-callout"><strong>Algorithm ≠ code</strong><br>The algorithm is the method. Code is one way to express that method in a language.</div>`],
[ "Nested data and careful tracing","12 min","Collections",`<h1>22 · Nested data and careful tracing</h1><p>An array can contain other arrays. Read indexes from the outside in: the first index selects an outer item, and the next selects an item inside it.</p><pre>hoard rows = [[1, 2], [3, 4]];
yeet(rows[0][1]);
yeet(rows[1][0]);</pre><p>Trace each lookup one step at a time. Nested structures are useful for grids, tables, and grouped data.</p>`],
[ "Scope, mutation, and side effects","14 min","Reason about changes",`<h1>23 · Scope, mutation, and side effects</h1><p>Scope determines where a name can be found. Mutation changes an existing value. A side effect is an observable change, such as printing or modifying an array.</p><pre>recipe add_one(n) {
  send_back n + 1;
}
hoard answer = add_one(4);
yeet(answer);</pre><p>Prefer functions with clear inputs and outputs. When a function changes shared data, make that behavior obvious and test it.</p>`],
[ "Big-O without the academic fog","15 min","Efficiency",`<h1>24 · Big-O without the academic fog</h1><p>Big-O describes how an algorithm's work grows as input size grows. It does not tell you the exact time on every computer.</p><ul><li><strong>O(1):</strong> roughly constant work.</li><li><strong>O(n):</strong> work grows with the number of items.</li><li><strong>O(n²):</strong> work can grow with the square of the input size.</li></ul><p>A simple scan through an array is O(n): in the worst case, it checks every item. First make the answer correct; then measure before optimizing.</p>`],
[ "From BananaScript to real languages","15 min","Transfer your skills",`<h1>25 · From BananaScript to real languages</h1><p>Concepts transfer; syntax and available tools do not automatically transfer. Choose a language based on what you want to build.</p><ul><li><strong>JavaScript:</strong> browser interfaces and JavaScript-based servers.</li><li><strong>Python:</strong> scripting, automation, data work, and many beginner projects.</li><li><strong>C or C++:</strong> systems programming and explicit low-level concepts.</li></ul><p>Learn the language's official syntax, standard library, package tools, debugging workflow, and testing approach. Rebuild a BananaScript project in the new language instead of memorizing syntax in isolation.</p>`]

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
{q:"Which keyword declares a BananaScript function?",a:["function","recipe","def"],c:1,why:"BananaScript uses recipe to declare a function."},
{q:"What is the index of the first array item?",a:["0","1","-1"],c:0,why:"BananaScript arrays use zero-based indexes."},
{q:"What does sqrt(81) return?",a:["9","8","81"],c:0,why:"sqrt returns the square root of a non-negative number."},
{q:"What happens if a recipe reaches its end without send_back?",a:["It returns null","It repeats forever","It prints the recipe"],c:0,why:"A function that falls through returns null."},
{q:"Which learning cycle builds understanding?",a:["Copy and move on","Predict, run, explain, modify","Guess until lucky"],c:1,why:"Prediction and explanation help reveal your mental model."},
{q:"What does split(text, separator) produce?",a:["An array of pieces","A number","A boolean only"],c:0,why:"split separates text into an array."},
{q:"What must a while loop eventually do to finish?",a:["Make its condition false","Print a message","Declare a function"],c:0,why:"A condition-controlled loop ends when its condition is false."},
{q:"What is an algorithm?",a:["A precise set of steps to solve a problem","A variable name","A type of computer screen"],c:0,why:"Algorithms describe steps for solving a problem."},
{q:"What does max(8, 3, 11) return?",a:["3","8","11"],c:2,why:"max returns the largest supplied number."},
{q:"Why test multiple cases?",a:["To discover cases the first example misses","To make code longer","To avoid understanding it"],c:0,why:"Different and boundary cases reveal hidden bugs."},
{q:"What should you define before coding an algorithm?",a:["Inputs and expected output","The color of the editor","The longest variable name"],c:0,why:"A clear problem statement includes inputs and expected output."},
{q:"What does rows[0][1] select in [[1, 2], [3, 4]]?",a:["1","2","3"],c:1,why:"Index 0 selects [1, 2], then index 1 selects 2."},
{q:"What is a side effect?",a:["An observable change such as printing","A comment","A variable name"],c:0,why:"Printing and mutating shared data are observable effects."},
{q:"A scan checks each of n items once. What is its typical time complexity?",a:["O(1)","O(n)","O(n²)"],c:1,why:"The number of checks grows linearly with the number of items."},
{q:"When moving to another language, what transfers most directly?",a:["Concepts, not exact syntax","Every keyword","All libraries automatically"],c:0,why:"Programming concepts transfer, but syntax and libraries differ."}
];
const challenges=[
{title:"Challenge 01: Say hello",prompt:'Print the exact text Hello, world! (including punctuation).',code:'yeet("Hello, world!");',hint:'Use yeet("...") with the greeting inside quotes.',test:o=>o.trim()==="Hello, world!"},
{title:"Challenge 02: Add numbers",prompt:"Display the result of 19 + 23.",code:"yeet(19 + 23);",hint:"Put the arithmetic expression inside yeet(...).",test:o=>o.trim()==="42"},
{title:"Challenge 03: Make a variable",prompt:'Create snack containing "banana", then yeet it.',code:'hoard snack = "banana";\nyeet(snack);',hint:"Declare with hoard, then yeet the variable name.",test:o=>o.trim()==="banana"},
{title:"Challenge 04: A tiny decision",prompt:'Set score to 10. If it is greater than 5, print "Passed"; otherwise print "Try again".',code:'hoard score = 10;\npanic_if (score > 5) {\n yeet("Passed");\n} cope_else {\n yeet("Try again");\n}',hint:"Use panic_if (score > 5) { ... } cope_else { ... }.",test:o=>o.trim()==="Passed"},
{title:"Challenge 05: Repeat",prompt:'Use loop_de_loop 3 to yeet "Banana!" three times.',code:'loop_de_loop 3 {\n yeet("Banana!");\n}',hint:"Use loop_de_loop followed by the count and a block in braces.",test:o=>o.trim().split("\n").join("|")==="Banana!|Banana!|Banana!"},
{title:"Challenge 06: Make a recipe",prompt:"Write recipe double(n) that returns n * 2, then display double(21).",code:"recipe double(n) {\n  send_back n * 2;\n}\nyeet(double(21));",hint:"Declare with recipe, return with send_back, then call the function inside yeet(...).",test:o=>o.trim()==="42"},
{title:"Challenge 07: Pick from an array",prompt:'Create fruits with "banana", "mango", and "pear". Display the second item.',code:'hoard fruits = ["banana", "mango", "pear"];\nyeet(fruits[1]);',hint:"Array indexes start at zero. The second item is index 1.",test:o=>o.trim()==="mango"},
{title:"Challenge 08: Change an array item",prompt:'Create fruits with "banana" and "mango". Replace the second item with "plantain", then display it.',code:'hoard fruits = ["banana", "mango"];\nfruits[1] = "plantain";\nyeet(fruits[1]);',hint:"Use fruits[1] = ... to update an existing slot.",test:o=>o.trim()==="plantain"},
{title:"Challenge 09: Count the fruit",prompt:'Create an array with three fruits and display how many it contains using len.',code:'hoard fruits = ["banana", "mango", "pear"];\nyeet(len(fruits));',hint:"len(array) returns the number of items.",test:o=>o.trim()==="3"},
{title:"Challenge 10: Type detective",prompt:'Display the type of the number 42 using type().',code:'yeet(type(42));',hint:"Pass the value to type(...).",test:o=>o.trim()==="number"}
], quizzes=[
{q:"What does yeet() do?",a:["Displays a value","Creates a variable","Repeats code"],c:0,why:"yeet() evaluates and displays its value."},
{q:'Which is a number?',a:['"42"',"42","Both"],c:1,why:'Quotes make "42" text.'},
{q:"Which symbol checks equality?",a:["=","==","=>"],c:1,why:"A single = assigns; == compares."},
{q:"What does if do?",a:["Runs every branch","Chooses based on a condition","Names a variable"],c:1,why:"The condition determines which branch runs."},
{q:"What are loops for?",a:["Repeating instructions","Changing fonts","Renaming variables"],c:0,why:"Loops run a block repeatedly."}
];
let current=0,done=new Set(),ci=0,qi=0;const $=id=>document.getElementById(id);
function renderList(){$("moduleList").innerHTML=lessons.map((l,i)=>'<button class="module-button '+(i===current?'active ':'')+(done.has(i)?'done':'')+'" data-i="'+i+'"><span class="module-number">'+(done.has(i)?'✓':String(i+1).padStart(2,'0'))+'</span><span><strong>'+l[0]+'</strong><small>'+l[1]+' · '+l[2]+'</small></span></button>').join("");document.querySelectorAll(".module-button").forEach(b=>b.onclick=()=>showLesson(+b.dataset.i));}
function showLesson(i){current=Math.max(0,Math.min(lessons.length-1,i));const l=lessons[current];$("lessonModule").textContent="MODULE "+String(current+1).padStart(2,"0");$("lessonDuration").textContent=l[1];$("lessonContent").innerHTML=l[3]+`<div class="concept-callout learning-loop"><strong>🍌 The Banana learning loop</strong><br><b>1. Predict:</b> Before running the example, write down what you think it prints.<br><b>2. Run:</b> Test it in the Playground or Practice Lab.<br><b>3. Explain:</b> Describe why each line produces that result.<br><b>4. Modify:</b> Change one value or instruction, predict again, then test.<br><small>Use BananaScript keywords: hoard, yeet, loop_de_loop, panic_if, cope_else, recipe, and send_back. These are the language's teaching spellings.</small></div><section class="lesson-check concept-callout"><strong>🧠 Check your understanding</strong><p id="lessonCheckQuestion"></p><div id="lessonCheckOptions" class="quiz-options"></div><p id="lessonCheckFeedback" aria-live="polite"></p></section>`;const check=lessonChecks[current];$("lessonCheckQuestion").textContent=check.q;$("lessonCheckOptions").innerHTML=check.a.map((a,j)=>`<button class="quiz-option" data-check="${j}">${String.fromCharCode(65+j)}. ${a}</button>`).join("");$("lessonCheckFeedback").textContent="Choose an answer before revealing the explanation.";document.querySelectorAll("[data-check]").forEach(b=>b.onclick=()=>{const ok=+b.dataset.check===check.c;$("lessonCheckFeedback").textContent=(ok?"Correct! ":"Not quite. ")+check.why;$("lessonCheckFeedback").style.color=ok?"#8cf0be":"#ff9cad";});$("prevLesson").disabled=current===0;$("nextLesson").textContent=current===lessons.length-1?"Back to first ↺":"Next lesson →";$("completeLesson").textContent=done.has(current)?"Completed ✓":"Mark complete ✓";renderList();$("progressText").textContent=done.size+" of "+lessons.length+" lessons completed";$("progressBar").style.width=(done.size/lessons.length*100)+"%";}
$("prevLesson").onclick=()=>showLesson(current-1);$("nextLesson").onclick=()=>showLesson(current===lessons.length-1?0:current+1);$("completeLesson").onclick=()=>{done.add(current);showLesson(current===lessons.length-1?current:current+1);};
function renderChallenge(){let c=challenges[ci];$("challengeTitle").textContent=c.title;$("challengePrompt").textContent=c.prompt;$("challengeEditor").value=c.code;$("challengeFeedback").textContent="Try it, or ask for a hint.";$("challengeFeedback").className="feedback";$("practiceOutput").textContent="";}
$("checkChallenge").onclick=()=>{try{const result=window.BananaCompiler($("challengeEditor").value),out=result.join("\n");$("practiceOutput").textContent=out;$("practiceState").textContent="RAN";const ok=challenges[ci].test(out);$("challengeFeedback").textContent=ok?"✓ Correct output! Explain each line to yourself.":"It ran, but the output does not match yet. Compare it with the prompt.";$("challengeFeedback").className="feedback "+(ok?"good":"bad");}catch(e){$("practiceOutput").textContent="COMPILER ERROR\n"+e.message;$("practiceState").textContent="ERROR";$("challengeFeedback").textContent="Read the error, fix one thing, and try again.";$("challengeFeedback").className="feedback bad";}};
$("loadHint").onclick=()=>{$("challengeFeedback").textContent="Hint: "+challenges[ci].hint;};$("loadSolution").onclick=()=>{$("challengeEditor").value=challenges[ci].code;$("challengeFeedback").textContent="Solution loaded. Run it and explain each line."};$("nextChallenge").onclick=()=>{ci=(ci+1)%challenges.length;renderChallenge();};
function renderQuiz(){const q=quizzes[qi];$("quizQuestion").textContent=q.q;$("quizFeedback").textContent="";$("quizOptions").innerHTML=q.a.map((a,i)=>'<button class="quiz-option" data-a="'+i+'">'+String.fromCharCode(65+i)+". "+a+"</button>").join("");document.querySelectorAll(".quiz-option").forEach(b=>b.onclick=()=>{document.querySelectorAll(".quiz-option").forEach(x=>x.disabled=true);const ok=+b.dataset.a===q.c;$("quizFeedback").textContent=(ok?"Correct. ":"Not quite. ")+q.why;$("quizFeedback").style.color=ok?"#8cf0be":"#ff9cad";});}
$("nextQuiz").onclick=()=>{qi=(qi+1)%quizzes.length;renderQuiz();};renderList();showLesson(0);renderChallenge();renderQuiz();