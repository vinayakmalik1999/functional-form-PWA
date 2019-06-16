'use strict'

//Add cache names here NOTE: update whenver we make changes to the cached files
const CACHE_NAME = 'static-cache-v2';

//Add files to cache here(static files for now)
const FILES_TO_CACHE = [

  //HTML files
  '/index.html',
  '/list-page.html',
  //CSS files
  '/styles/formstylesheet.css',
  '/styles/liststylesheet.css',
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
      console.log('[ServiceWorker] Precaching offline resources');
      return cache.addAll(FILES_TO_CACHE);
    })
    .catch((err) => {
      return console.log("error1");
    }));

    console.log("[ServiceWorker] Files cached succesfully")
//skiiping the wait to update new service worker
  self.skipWaiting();
});

//starting the activate event(using for MIGRATION and deleting old files)
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
  //its our SW and our clients, claim all uncontrolled clients with this
  self.clients.claim();
});
//fetch event goes here
self.addEventListener('fetch',(evt) =>{
  console.log('[ServiceWorker] Fetch event started')
    //fetch strategy (serving Strategy: Cache, falling back to network)
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) =>{
    return cache.match(evt.request)
    .then((response) => {
      //return cached response first, whenever network is on automatically fetches from the network
      return response || fetch(evt.request);
    });



})
    .catch((err) =>{
      return console.log('ERROR: unable to fetch resources from network, activating offline mode')
    })
);

});
