"use strict";
const $ = (id) => document.getElementById(id);
const example = $('editor').value;

function tokenize(source) {
  const tokens = []; let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && source[i + 1] === '/') { while (i < source.length && source[i] !== '\n') i++; continue; }
    if (c === '"' || c === "'") {
      const quote = c; i++; let value = '';
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') { i++; if (i >= source.length) throw new Error("Unfinished escape sequence."); const escapes={n:'\n',t:'\t',r:'\r'}; value += escapes[source[i]] ?? source[i]; i++; }
        else value += source[i++];
      }
      if (source[i] !== quote) throw new Error("Unterminated string. The quotation mark has left the building.");
      i++; tokens.push({type:'string',value}); continue;
    }
    if (/[0-9]/.test(c)) { let raw=''; while(i<source.length && /[0-9.]/.test(source[i])) raw+=source[i++]; if(!/^\d+(\.\d+)?$/.test(raw)) throw new Error("Invalid number: "+raw); tokens.push({type:'number',value:Number(raw)}); continue; }
    if (/[A-Za-z_]/.test(c)) { let word=''; while(i<source.length && /[A-Za-z0-9_]/.test(source[i])) word+=source[i++]; const aliases={stash:'let',hoard:'let',yell:'print',yeet:'print',again:'repeat',loop_de_loop:'repeat',when:'if',panic_if:'if',otherwise:'else',cope_else:'else'}; tokens.push({type:'id',value:aliases[word]||word}); continue; }
    const two=source.slice(i,i+2); if(['==','!=','<=','>=','&&','||'].includes(two)){tokens.push({type:'op',value:two});i+=2;continue;}
    if('+-*/%(){}[]=<>;,!'.includes(c)){tokens.push({type:'op',value:c});i++;continue;}
    throw new Error(`Unexpected character "${c}" at character ${i+1}. Please submit a fruit-based appeal.`);
  }
  tokens.push({type:'eof',value:''}); return tokens;
}
function parse(source) {
  const tokens=tokenize(source); let pos=0;
  const peek=()=>tokens[pos], take=()=>tokens[pos++], is=v=>peek().value===v;
  const expect=v=>{if(!is(v))throw new Error(`Expected "${v}", received "${peek().value||'end of file'}".`);return take();};
  const identifier=()=>{if(peek().type!=='id')throw new Error("Expected a variable name. The naming committee is concerned.");return take().value;};
  function primary(){
    const t=take();
    if(t.type==='number'||t.type==='string')return{kind:'literal',value:t.value};
    if(t.type==='id'){
      if(t.value==='true')return{kind:'literal',value:true};
      if(t.value==='false')return{kind:'literal',value:false};
      if(is('(')){take();const args=[];if(!is(')')){do{args.push(expression());if(!is(','))break;take();}while(true);}expect(')');return{kind:'call',name:t.value,args};}
      return{kind:'variable',name:t.value};
    }
    if(t.value==='['){const items=[];if(!is(']')){do{items.push(expression());if(!is(','))break;take();}while(true);}expect(']');return{kind:'array',items};}
    if(t.value==='('){const e=expression();expect(')');return e;}
    throw new Error(`Expected a value, received "${t.value||'end of file'}".`);
  }
  function unary(){if(is('-')||is('!')){const op=take().value;return{kind:'unary',op,right:unary()};}return primary();}
  function factor(){let n=unary();while(is('*')||is('/')||is('%')){const op=take().value;n={kind:'binary',op,left:n,right:unary()};}return n;}
  function term(){let n=factor();while(is('+')||is('-')){const op=take().value;n={kind:'binary',op,left:n,right:factor()};}return n;}
  function comparison(){let n=term();while(['==','!=','<','>','<=','>='].includes(peek().value)){const op=take().value;n={kind:'binary',op,left:n,right:term()};}return n;}
  function logicalAnd(){let n=comparison();while(is('&&')){const op=take().value;n={kind:'binary',op,left:n,right:comparison()};}return n;}
  function logicalOr(){let n=logicalAnd();while(is('||')){const op=take().value;n={kind:'binary',op,left:n,right:logicalAnd()};}return n;}
  const expression=()=>logicalOr();
  function block(){expect('{');const body=[];while(!is('}')&&peek().type!=='eof')body.push(statement());expect('}');return body;}
  function statement(){
    if(is('let')){take();const name=identifier();expect('=');const value=expression();if(is(';'))take();return{kind:'let',name,value};}
    if(is('print')){take();expect('(');const value=expression();expect(')');if(is(';'))take();return{kind:'print',value};}
    if(is('repeat')){take();const count=expression();return{kind:'repeat',count,body:block()};}
    if(is('while')){take();expect('(');const test=expression();expect(')');return{kind:'while',test,body:block()};}
    if(is('if')){take();expect('(');const test=expression();expect(')');const yes=block();let no=[];if(is('else')){take();no=block();}return{kind:'if',test,yes,no};}
    if(peek().type==='id'){const name=take().value;expect('=');const value=expression();if(is(';'))take();return{kind:'assign',name,value};}
    throw new Error(`Unknown instruction "${peek().value||'end of file'}". Try let, print, repeat, or if.`);
  }
  const body=[];while(peek().type!=='eof')body.push(statement());return body;
}
function execute(ast) {
  const env=Object.create(null), output=[];let steps=0;const maxSteps=10000;
  function numeric(a,b,fn){if(typeof a!=='number'||typeof b!=='number')throw new Error("This operation requires numbers. Please separate your fruit from your figures.");return fn(a,b);}
  function evaluate(n){
    if(n.kind==='literal')return n.value;
    if(n.kind==='array')return n.items.map(evaluate);
    if(n.kind==='call'){const args=n.args.map(evaluate);switch(n.name){case 'len':if(args.length!==1||!(typeof args[0]==='string'||Array.isArray(args[0])))throw new Error('len expects one string or array.');return args[0].length;case 'push':if(args.length!==2||!Array.isArray(args[0]))throw new Error('push expects an array and a value.');args[0].push(args[1]);return args[0].length;case 'pop':if(args.length!==1||!Array.isArray(args[0]))throw new Error('pop expects one array.');return args[0].pop();case 'str':if(args.length!==1)throw new Error('str expects one argument.');return String(args[0]);case 'num':if(args.length!==1||typeof args[0]==='boolean'||args[0]===''||!Number.isFinite(Number(args[0])))throw new Error('num expects a numeric value.');return Number(args[0]);default:throw new Error('Unknown built-in function: '+n.name+'.');}}
    if(n.kind==='variable'){if(!Object.prototype.hasOwnProperty.call(env,n.name))throw new Error(`"${n.name}" has not been registered. Please contact Variable Records.`);return env[n.name];}
    if(n.kind==='unary'){const v=evaluate(n.right);if(n.op==='!')return !Boolean(v);if(typeof v!=='number')throw new Error("Unary minus requires a number. Fruit cannot be negatively ripe.");return -v;}
    const a=evaluate(n.left);
    if(n.op==='&&')return Boolean(a)&&Boolean(evaluate(n.right));
    if(n.op==='||')return Boolean(a)||Boolean(evaluate(n.right));
    const b=evaluate(n.right);
    switch(n.op){case '+':return typeof a==='string'||typeof b==='string'?String(a)+String(b):numeric(a,b,(x,y)=>x+y);case '-':return numeric(a,b,(x,y)=>x-y);case '*':return numeric(a,b,(x,y)=>x*y);case '%':if(b===0)throw new Error('Remainder by zero is undefined.');return numeric(a,b,(x,y)=>x%y);case '&&':return Boolean(a)&&Boolean(b);case '||':return Boolean(a)||Boolean(b);case '/':if(b===0)throw new Error("Division by zero. The Banana Council has suspended mathematics.");return numeric(a,b,(x,y)=>x/y);case '==':return a===b;case '!=':return a!==b;case '<':return a<b;case '>':return a>b;case '<=':return a<=b;case '>=':return a>=b;default:throw new Error("Unapproved operator: "+n.op);}
  }
  function run(list){for(const s of list){if(++steps>maxSteps)throw new Error("Execution limit reached (10,000 steps). The program has become a fruit-based bureaucracy.");
    if(s.kind==='let'){if(Object.prototype.hasOwnProperty.call(env,s.name))throw new Error(`"${s.name}" is already registered. Use assignment to amend it.`);env[s.name]=evaluate(s.value);}
    else if(s.kind==='assign'){if(!Object.prototype.hasOwnProperty.call(env,s.name))throw new Error(`Cannot update "${s.name}" before registration.`);env[s.name]=evaluate(s.value);}
    else if(s.kind==='print'){if(output.length>=500)throw new Error("Output limit reached. The terminal needs a fruit break.");output.push(String(evaluate(s.value)));}
    else if(s.kind==='if')run(evaluate(s.test)?s.yes:s.no);
    else if(s.kind==='repeat'){const count=evaluate(s.count);if(!Number.isInteger(count)||count<0||count>1000)throw new Error("repeat requires a whole number from 0 to 1000.");for(let i=0;i<count;i++)run(s.body);}
    else if(s.kind==='while'){let turns=0;while(evaluate(s.test)){if(++turns>1000)throw new Error('while loop limit reached (1,000 iterations). Update the condition or the loop will apply for a desk job.');run(s.body);}}
  }}
  run(ast);return output;
}
window.BananaCompiler = function(source){ return execute(parse(source)); };
$('runButton').addEventListener('click',()=>{
  const out=$('output'),start=performance.now();out.classList.remove('error');$('compilerState').textContent='COMPILING…';$('status').textContent='Consulting the fruit council';
  try{const lines=execute(parse($('editor').value));out.textContent=lines.length?lines.join('\n'):'(Program completed without producing output. Suspiciously efficient.)';$('compilerState').textContent='COMPILED ✓';$('status').textContent='No bananas were harmed';}
  catch(err){out.classList.add('error');out.textContent='COMPILER ERROR\n'+err.message+'\n\nAdvice: remain calm, inspect the syntax, and submit a banana.';$('compilerState').textContent='NEEDS APPEAL';$('status').textContent='Execution denied';}
  $('runtime').textContent=(performance.now()-start).toFixed(2)+' ms';
});
$('exampleButton').addEventListener('click',()=>{$('editor').value=example;$('output').textContent='';$('output').classList.remove('error');$('compilerState').textContent='READY-ish';$('status').textContent='Example loaded';$('runtime').textContent='No execution yet';});
$('clearButton').addEventListener('click',()=>{$('editor').value='';$('output').textContent='';$('output').classList.remove('error');$('compilerState').textContent='EMPTY';$('status').textContent='Nothing to see here';$('runtime').textContent='No execution yet';});
$('editor').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const el=e.currentTarget,s=el.selectionStart,end=el.selectionEnd;el.setRangeText('  ',s,end,'end');}if((e.ctrlKey||e.metaKey)&&e.key==='Enter')$('runButton').click();});
const quotes=['“You can do it. But only after five cups of coffee.”','“A semicolon a day keeps the compiler mildly concerned.”','“Dream big. Compile locally. Blame the banana.”','“Your potential is unlimited. Your free trial is not.”','“When life gives you lemons, submit a change request for bananas.”','“Every expert was once a beginner with suspicious variable names.”'];
$('quoteButton').addEventListener('click',()=>{$('quote').textContent=quotes[Math.floor(Math.random()*quotes.length)];});
let toastTimer;function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
$('bananaButton').addEventListener('click',()=>toast('Download started: one (1) imaginary banana. Check your fruit folder.'));
$('hallButton').addEventListener('click',()=>toast('Application received. Your banana ranking is pending peer review.'));
$('projectsButton').addEventListener('click',()=>toast('Project archive opened. All projects are fictional and emotionally stable.'));

// Small quality-of-life tools: code stays on the user's device unless they choose to save it.
$('saveCodeButton').addEventListener('click',()=>{
  const blob=new Blob([$('editor').value],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download='my-banana-program.banana';document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
  toast('Code saved as my-banana-program.banana 🍌');
});
$('copyOutputButton').addEventListener('click',async()=>{
  const text=$('output').textContent;
  if(!text){toast('Nothing to copy. The terminal is spiritually empty.');return;}
  try{await navigator.clipboard.writeText(text);toast('Output copied. Go forth and paste responsibly.');}
  catch{const range=document.createRange();range.selectNodeContents($('output'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('Clipboard unavailable. Output selected—copy it manually.');}
});
