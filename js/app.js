"use strict";
const $ = (id) => document.getElementById(id);
const example = $('editor').value;

function tokenize(source) {
  const tokens=[]; let i=0;
  while(i<source.length){
    const c=source[i];
    if(/\s/.test(c)){i++;continue;}
    if(c==='/'&&source[i+1]==='/'){while(i<source.length&&source[i]!=='\n')i++;continue;}
    if(c==='"'||c==="'"){const q=c;i++;let value='';while(i<source.length&&source[i]!==q){if(source[i]==='\\'){i++;if(i>=source.length)throw Error("Unfinished escape sequence.");const e={n:'\n',t:'\t',r:'\r'};value+=e[source[i]]??source[i];i++;}else value+=source[i++];}if(source[i]!==q)throw Error("Unterminated string. The quotation mark has left the building.");i++;tokens.push({type:'string',value});continue;}
    if(/[0-9]/.test(c)){let raw='';while(i<source.length&&/[0-9.]/.test(source[i]))raw+=source[i++];if(!/^\d+(\.\d+)?$/.test(raw))throw Error("Invalid number: "+raw);tokens.push({type:'number',value:Number(raw)});continue;}
    if(/[A-Za-z_]/.test(c)){let word='';while(i<source.length&&/[A-Za-z0-9_]/.test(source[i]))word+=source[i++];const aliases={stash:'let',hoard:'let',yell:'print',yeet:'print',again:'repeat',loop_de_loop:'repeat',when:'if',panic_if:'if',otherwise:'else',cope_else:'else',recipe:'func',send_back:'return'};tokens.push({type:'id',value:aliases[word]||word});continue;}
    const two=source.slice(i,i+2);if(['==','!=','<=','>=','&&','||'].includes(two)){tokens.push({type:'op',value:two});i+=2;continue;}
    if('+-*/%(){}[]=<>;,!'.includes(c)){tokens.push({type:'op',value:c});i++;continue;}
    throw Error('Unexpected character "'+c+'" at character '+(i+1)+'.');
  }tokens.push({type:'eof',value:''});return tokens;
}
function parse(source){
 const tokens=tokenize(source);let pos=0;const peek=()=>tokens[pos],take=()=>tokens[pos++],is=v=>peek().value===v;
 const expect=v=>{if(!is(v))throw Error('Expected "'+v+'", received "'+(peek().value||'end of file')+'".');return take();};
 const identifier=()=>{if(peek().type!=='id')throw Error('Expected a name.');return take().value;};
 function primary(){
  let n;const t=take();
  if(t.type==='number'||t.type==='string')n={kind:'literal',value:t.value};
  else if(t.type==='id'){
   if(t.value==='true'||t.value==='false')n={kind:'literal',value:t.value==='true'};
   else if(is('(')){take();const args=[];if(!is(')')){do{args.push(expression());if(!is(','))break;take();}while(true);}expect(')');n={kind:'call',name:t.value,args};}
   else n={kind:'variable',name:t.value};
  }else if(t.value==='['){const items=[];if(!is(']')){do{items.push(expression());if(!is(','))break;take();}while(true);}expect(']');n={kind:'array',items};}
  else if(t.value==='('){n=expression();expect(')');}
  else throw Error('Expected a value, received "'+(t.value||'end of file')+'".');
  while(is('[')){take();const index=expression();expect(']');n={kind:'index',object:n,index};}
  return n;
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
  if(is('func')){take();const name=identifier();expect('(');const params=[];if(!is(')')){do{params.push(identifier());if(!is(','))break;take();}while(true);}expect(')');if(new Set(params).size!==params.length)throw Error('A function cannot repeat a parameter name.');return{kind:'func',name,params,body:block()};}
  if(is('return')){take();const value=is(';')||is('}')?{kind:'literal',value:null}:expression();if(is(';'))take();return{kind:'return',value};}
  if(is('let')){take();const name=identifier();expect('=');const value=expression();if(is(';'))take();return{kind:'let',name,value};}
  if(is('print')){take();expect('(');const value=expression();expect(')');if(is(';'))take();return{kind:'print',value};}
  if(is('repeat')){take();const count=expression();return{kind:'repeat',count,body:block()};}
  if(is('while')){take();expect('(');const test=expression();expect(')');return{kind:'while',test,body:block()};}
  if(is('if')){take();expect('(');const test=expression();expect(')');const yes=block();let no=[];if(is('else')){take();no=block();}return{kind:'if',test,yes,no};}
  if(peek().type==='id'){const name=take().value;if(is('[')){take();const index=expression();expect(']');expect('=');const value=expression();if(is(';'))take();return{kind:'indexAssign',name,index,value};}expect('=');const value=expression();if(is(';'))take();return{kind:'assign',name,value};}
  throw Error('Unknown instruction "'+(peek().value||'end of file')+'".');
 }
 const body=[];while(peek().type!=='eof')body.push(statement());return body;
}
function execute(ast){
 const globals=Object.create(null),functions=Object.create(null),output=[];let steps=0,callDepth=0;const maxSteps=10000;
 const scopes=[globals];
 const lookup=name=>{for(let i=scopes.length-1;i>=0;i--)if(Object.prototype.hasOwnProperty.call(scopes[i],name))return scopes[i][name];throw Error('"'+name+'" is not defined.');};
 const assign=(name,value)=>{for(let i=scopes.length-1;i>=0;i--)if(Object.prototype.hasOwnProperty.call(scopes[i],name)){scopes[i][name]=value;return;}throw Error('Cannot update "'+name+'" before declaration.');};
 function evaluate(n){
  if(n.kind==='literal')return n.value;
  if(n.kind==='array')return n.items.map(evaluate);
  if(n.kind==='variable')return lookup(n.name);
  if(n.kind==='index'){const obj=evaluate(n.object),idx=evaluate(n.index);if(!Array.isArray(obj)&&typeof obj!=='string')throw Error('Indexing requires an array or string.');if(!Number.isInteger(idx)||idx<0||idx>=obj.length)throw Error('Index is out of range.');return obj[idx];}
  if(n.kind==='call'){
   const args=n.args.map(evaluate);
   switch(n.name){
    case 'len':if(args.length!==1||!(typeof args[0]==='string'||Array.isArray(args[0])))throw Error('len expects one string or array.');return args[0].length;
    case 'push':if(args.length!==2||!Array.isArray(args[0]))throw Error('push expects an array and a value.');args[0].push(args[1]);return args[0].length;
    case 'pop':if(args.length!==1||!Array.isArray(args[0]))throw Error('pop expects one array.');return args[0].pop();
    case 'str':if(args.length!==1)throw Error('str expects one argument.');return String(args[0]);
    case 'num':if(args.length!==1||typeof args[0]==='boolean'||args[0]===''||!Number.isFinite(Number(args[0])))throw Error('num expects a numeric value.');return Number(args[0]);
    case 'type':if(args.length!==1)throw Error('type expects one argument.');return args[0]===null?'null':Array.isArray(args[0])?'array':typeof args[0];
    case 'abs':if(args.length!==1||typeof args[0]!=='number')throw Error('abs expects one number.');return Math.abs(args[0]);
    case 'floor':if(args.length!==1||typeof args[0]!=='number')throw Error('floor expects one number.');return Math.floor(args[0]);
    case 'ceil':if(args.length!==1||typeof args[0]!=='number')throw Error('ceil expects one number.');return Math.ceil(args[0]);
    case 'round':if(args.length!==1||typeof args[0]!=='number')throw Error('round expects one number.');return Math.round(args[0]);
    case 'sqrt':if(args.length!==1||typeof args[0]!=='number'||args[0]<0)throw Error('sqrt expects one non-negative number.');return Math.sqrt(args[0]);
    case 'min':if(args.length<1||args.some(v=>typeof v!=='number'))throw Error('min expects one or more numbers.');return Math.min(...args);
    case 'max':if(args.length<1||args.some(v=>typeof v!=='number'))throw Error('max expects one or more numbers.');return Math.max(...args);
    case 'contains':if(args.length!==2||!(typeof args[0]==='string'||Array.isArray(args[0])))throw Error('contains expects a string or array, then a value.');return typeof args[0]==='string'?(typeof args[1]==='string'&&args[0].includes(args[1])):args[0].some(v=>v===args[1]);
    case 'join':if(args.length!==2||!Array.isArray(args[0])||typeof args[1]!=='string')throw Error('join expects an array and a string separator.');return args[0].map(v=>v===null?'null':String(v)).join(args[1]);
    case 'split':if(args.length!==2||typeof args[0]!=='string'||typeof args[1]!=='string')throw Error('split expects a string and a string separator.');return args[0].split(args[1]);
   }
   const fn=functions[n.name];if(!fn)throw Error('Unknown function: '+n.name+'.');
   if(args.length!==fn.params.length)throw Error(n.name+' expects '+fn.params.length+' argument(s), received '+args.length+'.');
   if(++callDepth>100) {callDepth--;throw Error('Function call depth limit reached (100).');}
   const local=Object.create(null);fn.params.forEach((p,i)=>local[p]=args[i]);scopes.push(local);
   try{run(fn.body);return null;}catch(e){if(e&&e.isBananaReturn)return e.value;throw e;}finally{scopes.pop();callDepth--;}
  }
  if(n.kind==='unary'){const v=evaluate(n.right);if(n.op==='!')return !Boolean(v);if(typeof v!=='number')throw Error('Unary minus requires a number.');return -v;}
  const a=evaluate(n.left);if(n.op==='&&')return Boolean(a)&&Boolean(evaluate(n.right));if(n.op==='||')return Boolean(a)||Boolean(evaluate(n.right));const b=evaluate(n.right);
  const numeric=(x,y,fn)=>{if(typeof x!=='number'||typeof y!=='number')throw Error('This operation requires numbers.');return fn(x,y);};
  switch(n.op){case '+':return typeof a==='string'||typeof b==='string'?String(a)+String(b):numeric(a,b,(x,y)=>x+y);case '-':return numeric(a,b,(x,y)=>x-y);case '*':return numeric(a,b,(x,y)=>x*y);case '/':if(b===0)throw Error('Division by zero.');return numeric(a,b,(x,y)=>x/y);case '%':if(b===0)throw Error('Remainder by zero.');return numeric(a,b,(x,y)=>x%y);case '==':return a===b;case '!=':return a!==b;case '<':return a<b;case '>':return a>b;case '<=':return a<=b;case '>=':return a>=b;default:throw Error('Unknown operator '+n.op);}
 }
 function run(list){for(const s of list){if(++steps>maxSteps)throw Error('Execution limit reached (10,000 statements).');
  if(s.kind==='func'){if(Object.prototype.hasOwnProperty.call(functions,s.name))throw Error('Function "'+s.name+'" is already declared.');functions[s.name]=s;}
  else if(s.kind==='return'){if(callDepth===0)throw Error('send_back can only be used inside a recipe.');throw {isBananaReturn:true,value:evaluate(s.value)};}
  else if(s.kind==='let'){if(Object.prototype.hasOwnProperty.call(scopes[scopes.length-1],s.name))throw Error('"'+s.name+'" is already declared in this scope.');scopes[scopes.length-1][s.name]=evaluate(s.value);}
  else if(s.kind==='assign')assign(s.name,evaluate(s.value));
  else if(s.kind==='indexAssign'){const arr=lookup(s.name),idx=evaluate(s.index),v=evaluate(s.value);if(!Array.isArray(arr))throw Error('Indexed assignment requires an array variable.');if(!Number.isInteger(idx)||idx<0||idx>=arr.length)throw Error('Index is out of range.');arr[idx]=v;}
  else if(s.kind==='print'){if(output.length>=500)throw Error('Output limit reached (500 lines).');output.push(String(evaluate(s.value)));}
  else if(s.kind==='if')run(evaluate(s.test)?s.yes:s.no);
  else if(s.kind==='repeat'){const count=evaluate(s.count);if(!Number.isInteger(count)||count<0||count>1000)throw Error('repeat requires an integer from 0 to 1000.');for(let i=0;i<count;i++)run(s.body);}
  else if(s.kind==='while'){let turns=0;while(evaluate(s.test)){if(++turns>1000)throw Error('while loop limit reached (1,000 iterations).');run(s.body);}}
 }}
 run(ast);return output;
}
window.BananaCompiler=function(source){return execute(parse(source));};
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
