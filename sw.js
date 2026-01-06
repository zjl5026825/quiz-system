// 强制更新标识：v1.0.4
const CACHE_NAME = 'quiz-pro-v1.0.4'; 
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// 安装阶段：立即跳过等待
self.addEventListener('install', e => {
    self.skipWaiting(); 
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// 激活阶段：清理旧版本缓存
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('清理旧缓存:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 网络策略：优先使用缓存，失败则请求网络
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
