"use strict";
let installPrompt=null;
const installButton=document.getElementById("installButton");

function setInstallButton(text,hidden){
  if(!installButton)return;
  installButton.textContent=text;
  installButton.hidden=hidden;
}

if("serviceWorker" in navigator){
  window.addEventListener("load",async()=>{
    try{
      const registration=await navigator.serviceWorker.register("./service-worker.js",{updateViaCache:"none"});
      await registration.update();
    }catch(error){
      // The site remains usable when service workers are unavailable.
    }
  });
}

window.addEventListener("beforeinstallprompt",event=>{
  // Keep the native prompt under our Install button instead of showing two UI paths.
  event.preventDefault();
  installPrompt=event;
  setInstallButton("⬇ Install app",false);
});

if(installButton){
  installButton.addEventListener("click",async()=>{
    if(!installPrompt){
      setInstallButton("Install unavailable",false);
      window.setTimeout(()=>setInstallButton("⬇ Install app",true),2200);
      return;
    }

    const promptEvent=installPrompt;
    installPrompt=null;
    installButton.disabled=true;

    try{
      await promptEvent.prompt();
      await promptEvent.userChoice;
    }catch(error){
      // The browser can reject a prompt if install criteria changed or it was already used.
    }finally{
      installButton.disabled=false;
      setInstallButton("⬇ Install app",true);
    }
  });
}

window.addEventListener("appinstalled",()=>{
  installPrompt=null;
  setInstallButton("App installed ✓",false);
  window.setTimeout(()=>setInstallButton("⬇ Install app",true),2500);
});
