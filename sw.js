const CACHE_NAME = 'quiz-pro-v' + new Date().getTime(); // 使用时间戳作为缓存名
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// 安装：缓存文件
self.addEventListener('install', e => {
    self.skipWaiting(); // 强制跳过等待，直接进入激活状态
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// 激活：清理所有旧版本的缓存
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('正在清理旧缓存:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 请求拦截
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});