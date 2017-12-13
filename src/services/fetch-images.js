const fetchImages = ({ url }) =>
	fetch(url).then(response => {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			return response.json();
		}
	});

export default fetchImages;
