// cachear archivos iniciales

const cacheName = 'wilber landscape v3';

const archivosCache = [
    './',
    './index.html',
    './styles.css',
    './js/app.js',
    './images/fondo-pagina.jpg',
    './images/logo-empresa-tio.png',
    './manifest.json'
];


// iniciar service worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then( resolve => { 
                // console.log('cacheando archivos')
                resolve.addAll(archivosCache) 
            } )
    )
});


self.addEventListener('activate', e => {
    // console.log(e, 'activando SW');
    e.waitUntil(
        caches.keys()
            .then( keys => {
                return Promise.all(
                    keys.filter( key => key !== cacheName)
                        .map( key => caches.delete(key))
                )
            } )
    )
});


self.addEventListener('fetch', e => {
    e.respondWith(
        (async function() {
            const cacheResponse = await caches.match(e.request);
            if( cacheResponse ){
                return cacheResponse;
            }
            return fetch(e.request);
        })()
    )
})