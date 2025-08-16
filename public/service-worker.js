const VERSION = "v1.0.0";
const STATIC_CACHE = `static-${VERSION}`;
const DATA_CACHE = `data-${VERSION}`;

const STATIC_ASSETS = [
    "/",
    "/index.html",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if supported for faster navigations
            try {
                if (self.registration.navigationPreload) {
                    await self.registration.navigationPreload.enable();
                }
            } catch {}

            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter((k) => ![STATIC_CACHE, DATA_CACHE].includes(k))
                    .map((k) => caches.delete(k)),
            );
            await self.clients.claim();
        })(),
    );
});

function isWeatherAPI (url) {
    return url.origin === "https://api.open-meteo.com" && url.pathname.startsWith("/v1/forecast");
}

function isGeocodingAPI (url) {
    return url.origin === "https://geocoding-api.open-meteo.com" && url.pathname.startsWith("/v1/search");
}

async function handleStaticRequest (request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, response.clone());
        return response;
    } catch (e) {
        return cached || Response.error();
    }
}

async function handleDataRequest (request, event) {
    const cache = await caches.open(DATA_CACHE);
    const cachedResponse = await cache.match(request);

    const networkFetch = fetch(request)
        .then((response) => {
            if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    // If we have a cached response, return it immediately and refresh in the background
    if (cachedResponse) {
        if (event && typeof event.waitUntil === "function") {
            event.waitUntil(networkFetch);
        }
        return cachedResponse;
    }

    // No cache: try network, fall back to an error response
    const response = await networkFetch;
    if (response) {return response;}

    // Provide a minimal fallback JSON for offline scenarios
    return new Response(
        JSON.stringify({ error: "offline", message: "No cached data available" }),
        { status: 503, headers: { "Content-Type": "application/json" } },
    );
}

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only GET requests are cacheable
    if (request.method !== "GET") {
        return; // let the request pass through
    }

    // SPA navigations: try preload/network, fall back to cached index.html
    if (request.mode === "navigate") {
        event.respondWith((async () => {
            try {
                const preload = await event.preloadResponse;
                if (preload) { return preload;}
                return await fetch(request);
            } catch (e) {
                const cache = await caches.open(STATIC_CACHE);
                const fallback = await cache.match("/index.html");
                return fallback || new Response("Offline", { status: 503 });
            }
        })());
        return;
    }

    // API: weather or geocoding -> stale-while-revalidate
    if (isWeatherAPI(url) || isGeocodingAPI(url)) {
        event.respondWith(handleDataRequest(request, event));
        return;
    }

    // Same-origin static assets -> cache-first
    if (url.origin === self.location.origin) {
        event.respondWith(handleStaticRequest(request));
        return;
    }

    // Default: try network, fall back to cache
    event.respondWith(
        (async () => {
            try {
                return await fetch(request);
            } catch (e) {
                const cached = await caches.match(request);
                return cached || Response.error();
            }
        })(),
    );
});
