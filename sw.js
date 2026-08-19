const CACHE_NAME = 'cek-nik-v1'; // Ubah 'v1' menjadi 'v2', 'v3', dst jika Anda mengupdate HTML/CSS
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './nasional.html', // Masukkan jika file ini ada
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalasi Service Worker & Menyimpan Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Menghapus Cache Lama Saat Ada Versi Baru
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

// Memberikan File dari Cache Saat Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Kembalikan file dari cache jika ada, jika tidak, fetch dari internet
      return response || fetch(event.request);
    })
  );
});

// Menerima Perintah 'skipWaiting' dari Tombol Update App
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});