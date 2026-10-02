"use strict";
const CACHE="bananascript-v23";
const ASSETS=["./","./index.html","./learn.html","./css/style.css","./css/learn.css","./js/app.js","./js/learn.js","./js/pwa.js","./manifest.webmanifest","./assets/banana.svg"];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET") return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  // Prefer the deployed version; use the cache only when offline.
  event.respondWith(
    fetch(request)
      .then(response=>{
        if(response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(request).then(hit=>hit||(
        request.mode==="navigate" ? caches.match("./index.html") : undefined
      )))
  );
});
