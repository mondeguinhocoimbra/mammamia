const CACHE = "mammamia-v21";
const SHELL = ["/mammamia.html", "/manifest.json", "/icon.svg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {}); return r;
    }).catch(() => caches.match("/mammamia.html")));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {}); return r;
    })));
  }
});
