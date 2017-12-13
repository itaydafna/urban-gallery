// this is the service worker which intercepts all http requests
self.addEventListener("fetch", event => {
	const request = event.request;
	if (
		request.url.includes("data/gallery-data.json") ||
		request.url.includes("scontent.cdninstagram.com")
	) {
		event.respondWith(
			caches.match(event.request).then(response => {
				if (response) {
					return response;
				} else {
					fetch(request);
					cacheAsset({ url: request.url });
				}
			})
		);
	}
});

function cacheAsset({ url }) {
	return new Promise(function(resolve, reject) {
		// open cache
		caches
			.open("assets")
			.then(cache => {
				// the API does all the magic for us
				cache
					.add(url)
					.then(() => {
						console.log(`asset ${url} added to cache`);
						resolve();
					})
					.catch(err => {
						console.log("error when syncing assets", err);
						reject();
					});
			})
			.catch(err => {
				console.log("error when opening cache", err);
				reject();
			});
	});
}
