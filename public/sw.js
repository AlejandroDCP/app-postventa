/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);
/* eslint-disable no-undef */

if (workbox) {
  self.skipWaiting();
  // workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.cleanupOutdatedCaches();
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  const { createHandlerBoundToURL } = workbox.precaching;
  const { NavigationRoute, registerRoute } = workbox.routing;
  const { CacheFirst } = workbox.strategies;
  const { ExpirationPlugin } = workbox.expiration;

  registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));

  // Cache FontAwesome CSS files
  registerRoute(
    ({ request }) =>
      request.destination === "style" && request.url.includes("fontawesome"),
    new CacheFirst({
      cacheName: "fontawesome-stylesheets",
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
        }),
      ],
    })
  );

  // Cache FontAwesome font files
  registerRoute(
    ({ request }) =>
      request.destination === "font" &&
      (request.url.endsWith(".woff") ||
        request.url.endsWith(".woff2") ||
        request.url.endsWith(".ttf")),
    new CacheFirst({
      cacheName: "fontawesome-fonts",
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365, // Cache for 1 year
          maxEntries: 30,
        }),
      ],
    })
  );

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "socketNotification") {
      const notificationData = event.data.payload.notification;

      const options = {
        body: `${notificationData.usuario}, esta ${notificationData.action} ${notificationData.actividadMaquinaria} ${notificationData.subactividadMaquinaria} con la maquinaria ${notificationData.maquinaria}`,
        requireInteraction: false,
        timestamp: notificationData.date,
      };

      self.registration.showNotification(notificationData.action, options);
    }

    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

  // Notificar al usuario sobre la nueva versión y recargar la página
  self.addEventListener("install", (event) => {
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== workbox.core.cacheNames.precache) {
                return caches.delete(cacheName);
              }
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });

  // workbox.core.clientsClaim();
} else {
  console.log(`Boo! Workbox didn't load 😬`);
  alert("Boo! Workbox didn't load 😬");
}
