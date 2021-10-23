self.addEventListener("fetch", event => {
    let { request } = event;

    const responseHandler = async () => {
        let response;
        try {
            response = await fetch(request);
            if (response.ok) {
                return response;
            }
        } finally {
            let cache = await caches.open("dungoneers-kit");
            let cachedResponse = await cache.match(request.url);

            if (cachedResponse) {
                response = cachedResponse;
            }

            return response;
        }
    }

    event.respondWith(responseHandler());
});