"use strict";
let installPrompt=null;
const installButton=document.getElementById("installButton");

if("serviceWorker" in navigator){
  window.addEventListener("load",async()=>{
    try{
      const registration=await navigator.serviceWorker.register("./service-worker.js",{updateViaCache:"none"});
      // Ask the browser to check for a newer worker when the site opens.
      await registration.update();
    }catch(error){
      // The site remains usable if offline or service workers are unavailable.
    }
  });
}

window.addEventListener("beforeinstallprompt",event=>{
  event.preventDefault();
  installPrompt=event;
  if(installButton) installButton.hidden=false;
});

if(installButton){
  installButton.addEventListener("click",async()=>{
    if(!installPrompt){
      installButton.textContent="Use browser menu ⋮";
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt=null;
    installButton.hidden=true;
  });
}

window.addEventListener("appinstalled",()=>{
  if(installButton){
    installButton.hidden=true;
    installButton.textContent="App installed ✓";
  }
});
