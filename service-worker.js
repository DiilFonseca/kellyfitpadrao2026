/* ============================================================
   KellyFit Padrao 2026 — Service Worker (Cache-First PWA)
   ============================================================ */
var CACHE_NAME = 'kellyfit-2026-v1';
var STATIC_ASSETS = [
  './',
  './index.html',
  './quiz.html',
  './app.html',
  './manifest.json',
  './css/variables.css',
  './css/reset.css',
  './css/themes.css',
  './css/components.css',
  './css/landing.css',
  './css/quiz.css',
  './css/app.css',
  './css/charts.css',
  './js/utils/hash.js',
  './js/utils/date-utils.js',
  './js/utils/nutrition-calc.js',
  './js/utils/export.js',
  './js/core/store.js',
  './js/core/events.js',
  './js/core/auth.js',
  './js/core/router.js',
  './js/data/meals-db.js',
  './js/data/exercises-db.js',
  './js/data/badges-db.js',
  './js/data/tips-db.js',
  './js/ui/theme.js',
  './js/ui/toast.js',
  './js/ui/modal.js',
  './js/ui/charts.js',
  './js/ui/particles.js',
  './js/ui/landing.js',
  './js/features/quiz.js',
  './js/features/dashboard.js',
  './js/features/meal-planner.js',
  './js/features/meal-detail.js',
  './js/features/water-tracker.js',
  './js/features/exercise-tracker.js',
  './js/features/progress.js',
  './js/features/analytics.js',
  './js/features/shopping-list.js',
  './js/features/habits.js',
  './js/features/gamification.js',
  './js/features/bmi-calculator.js',
  './js/features/profile.js',
  './js/features/onboarding.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install — pre-cache static assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS.map(function (url) {
        return new Request(url, { cache: 'reload' });
      })).catch(function (err) {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Activate — clean old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Fetch — cache-first for static, network-first for API
self.addEventListener('fetch', function (event) {
  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // Skip external requests
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(function () {
        return new Response('', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        // Offline fallback for HTML
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

// Background sync / push (future)
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
