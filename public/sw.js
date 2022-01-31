const cacheVersion = "cache-v1";
const file = [
    "/",
    "/index.html",
    "blog.html",
    "app.html",
    "assets/logo.svg",
    "assets/profile.jpg",
    "assets/py.svg",
    "assets/Rlogo.svg",
    "code/3dplot.html",
    "code/ggplot.html",
    "code/plot.html",
    "css/ap.css",
    "css/bl.css",
    "css/style.css"
];

// install - add all files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheVersion)
        .then(async ca => {
            try {
                return await ca.addAll(file);
            } catch (err) {
                console.log('error in adding files', err);
            }
        })
    )
    console.log('service worker installed');
    self.skipWaiting();
})

// activate - delete old cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys() // return all cache names
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheVersion) {
                        console.info('deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            )
        })

    )
    return self.clients.claim();

})

// fetch - cache first strategy
self.addEventListener('fetch', event => {
    console.info('service worker fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(
            cachesResponse => {
                return cachesResponse || fetch(event.request)
            }
        ))
})