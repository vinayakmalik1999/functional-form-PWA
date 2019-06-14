'use strict'

//Add cache names here
const CACHE_NAME = 'static-res-cache-v1';

//Add files to cache here(static files for now)
const FILES_TO_CACHE = [
  '/',
  //HTML files
  '/index.html',
  '/list-page.html',
  //CSS files
  '/styles/formstylesheet.css',
  //JS files
  '/scripts/main.js',
  //images
  '/images/icon-64x64.png',
  '/images/icon-256x256.png',
  '/images/icon-512x512.png',
  //everything else
  '/manifest.json'
];
// starting the install event (caching strategy: INSTALL ON DEPENDENCY)
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install event started');
  //Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    });
    console.log("[ServiceWorker] Files cached succesfully")
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate event started');
  //  Remove previous cached data from disk.
  evt.waitUntil(
    //take all cache key values(method to delete refrence to cache)
    caches.keys().then((keyList) => {
      //promise that takes keylist map vector
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME ) {
          console.log('[ServiceWorker] Removing old cache data', key);
          return caches.delete(key);

        }
      }));
    })
  );
  self.clients.claim();
});
