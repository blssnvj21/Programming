"use strict";
const $ = (id) => document.getElementById(id);
const example = $('editor').value;

$('runButton').addEventListener('click',()=>{
  const out=$('output'),start=performance.now();out.classList.remove('error');$('compilerState').textContent='COMPILING…';$('status').textContent='Consulting the fruit council';
  try{const lines=window.BananaCompiler($('editor').value);out.textContent=lines.length?lines.join('\n'):'(Program completed without producing output. Suspiciously efficient.)';$('compilerState').textContent='EXECUTED ✓';$('status').textContent='No bananas were harmed';}
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
