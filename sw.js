// 每次更新 index.html 逻辑后，都要把 v1 改成 v2, v3...
const CACHE_NAME = 'quiz-v2026-0105'; 
const ASSETS = [
  './index.html',
  './question_data.js',
  './manifest.json'
];

// 安装时：强制跳过等待，立即激活新版本
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 激活时：清理掉旧版本的缓存
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});