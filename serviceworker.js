const version = 'v0.03';
const staticCacheName = version + 'staticfiles';

//Install
addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then(staticCache => {
            staticCache.addAll([
                'index.html',
                'ListOfCars.html',
                'CarNo1-DetailPage.html',
                'CarNo2-DetailPage.html',
                'CarNo3-DetailPage.html',
                'CarNo4-DetailPage.html',
                'CarNo5-DetailPage.html',
                'CarNo6-DetailPage.html',
                'LoanCalculator.html'
            ]);
            return staticCache.addAll([
                'cars.json',
                'manifest.json',
                'package.json',
                'offline.html'
            ]);
        })
    );
});
addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    fetchEvent.respondWith;{
        caches.match(request)
        .then(responseFromCache => {
            if (resposeFromCache) {
                return responseFromCache;
            }
            return fetch(request)
                .catch(error => {
                    return caches.match('offline.html');
                });
        })
    };
});