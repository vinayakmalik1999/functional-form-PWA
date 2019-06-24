'use strict'
var our_db
var form_data
openDatabase ();
//Add cache names here NOTE: update whenver we make changes to the cached files
const CACHE_NAME = 'static-cache-v4';

var FOLDER_NAME = 'post_requests'

//Add files to cache here(static files for now)
const FILES_TO_CACHE = [

  //HTML files
  '/details.html',
  '/form.html',
  //CSS files
  '/styles/formstylesheet.css',
  '/styles/liststylesheet.css',
  //JS files
  '/scripts/formscript.js',
  '/scripts/details.js',
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
function openDatabase () {

  var indexedDBOpenRequest = indexedDB.open('offline-form',
  1)
 indexedDBOpenRequest.onupgradeneeded = function () {
   //executes if there's a need to create/update db.
   this.result.createObjectStore(FOLDER_NAME, {
    autoIncrement:  true })
    console.log("IndexedDB Object store created")
 }
  //  execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result
    console.log("IndexedDB creation success")
  }
  indexedDBOpenRequest.onerror = function (error) {
    // error creating IndexedDB
    console.error('IndexedDB creation error:', error)
  }
}



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
//message recieve handler
self.addEventListener('message', function (event) {
  console.log('form data', event.data)
  if (event.data.hasOwnProperty('form_data')) {
    // receives form data from script.js upon submission
    form_data = event.data.form_data
    console.log('read form data')
  }
  else{console.log('nothing')}
})
//serving stratergy: cache falling back to network with if-else block to catch post requests on offline
self.addEventListener('fetch', function(event) {
//great way too see error on which request
  console.log('fetching request with url: ',
   event.request.clone().url)
  if (event.request.clone().method === 'GET') {
    event.respondWith(
      // check all the caches in the browser and find
      // out whether our request is in any of them
      caches.match(event.request.clone())
        .then(function(response) {
          if (response) {
            // if we are here, that means there's a match
            //return the response stored in browser
            return response;
          }
          // use the network instead
          return fetch(event.request.clone());
        }
      )
    );
  } else if (event.request.clone().method === 'POST') {
    // attempt to send request normally
    event.respondWith(fetch(event.request.clone()).catch(function
    (error) {
      // only save post requests in browser, if an error occurs
      savePostRequests(event.request.clone().url, form_data)
      console.log('post inside fetch runs')
    }))
  }
});
function getObjectStore (storeName, mode) {
  // retrieve our object store
  return our_db.transaction(storeName,mode
   ).objectStore(storeName)
}
function savePostRequests (url, payload) {
  // get object_store and save our payload inside it
  var request = getObjectStore(FOLDER_NAME, 'readwrite').add({
    url: url,
    payload: payload,
    method: 'POST'
  })
  request.onsuccess = function (event) {
    console.log('a new pos_ request has been added to indexedb')
  }
  request.onerror = function (error) {
    console.error(error)
  }
}
self.addEventListener('sync', function (event) {
  console.log('[ServiceWorker]ONLINE sync event started')
    //tag for sync
  if (event.tag === 'formDataSync') {
  //send data to server
    event.waitUntil(

      sendDataToServer()
      )
  }
})

/*//fetch event goes here
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

});*/
