export default async function fetchData(url) {
	let quote;
	await fetch(url || process.env.REACT_APP_API_URL)
		.then((response) => response.json())
		.then((data) => {
			if (data.statusCode === 404) {
				throw data.message;
			}
			quote = data;
		})
		.catch((err) => {
			throw err;
		});
	return quote;
}
