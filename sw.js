// 强制更新标识：v1.0.3
const CACHE_NAME = 'quiz-pro-v1.0.3'; 
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png' // 包含图标
];

self.addEventListener('install', e => {
    self.skipWaiting(); 
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
