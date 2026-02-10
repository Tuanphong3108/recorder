const CACHE_NAME = 'recorder-app-v2';
const ASSETS_TO_CACHE = [
  '/',
  'google_recorder.html',
  'manifest.json',
  'icon.png',
  'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..1000&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'https://tuanphong3108.github.io/google-sans-do-not-access/minecraft.ttf',
  'https://tuanphong3108.github.io/md3-loading/Loading_Indicator.gif'
];

// Cài đặt Service Worker và cache tài nguyên
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Kích hoạt và dọn dẹp cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Chiến lược Fetch: Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
