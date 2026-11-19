var VER = "mammamia-v46-1";
var SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VER)
    .then(function (c) { return c.addAll(SHELL).catch(function () {}); })
    .then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys()
    .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== VER; }).map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req)
      .then(function (r) { var cp = r.clone(); caches.open(VER).then(function (c) { c.put("./index.html", cp); }); return r; })
      .catch(function () { return caches.match("./index.html"); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (r) {
      var cp = r.clone(); caches.open(VER).then(function (c) { c.put(req, cp); }); return r;
    });
  }));
});