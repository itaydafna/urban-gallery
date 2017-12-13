// this is the service worker which intercepts the app's img related http requests
self.addEventListener("fetch", event => {
	const request = event.request;
	/*since CRA already has a SW for caching all the script/style assets
	we want this SW to deal only with the img related requests - hence this condition*/
	if (
		request.url.includes("data/gallery-data.json") ||
		request.url.includes("scontent.cdninstagram.com")
	) {
		event.respondWith(
			caches.match(event.request).then(response => {
				if (response) {
					return response;
				} else {
					cacheAsset({ url: request.url });
					return fetch(request);
				}
			})
		);
	}
});

function cacheAsset({ url }) {
	return caches.open("assets").then(cache => {
		cache.add(url);
	});
}
