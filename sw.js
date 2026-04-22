const CACHE_NAME = 'kodingo-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './logo.png',
    // add icon all
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    './icons/icon-192x192-maskable.png',
    './icons/icon-512x512-maskable.png',
    // Anda perlu menambahkan nama file icon di sini jika ada,
    // contoh: './icon-192.png', './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate & Cleanup Old Cache
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch (Serve from Cache)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});