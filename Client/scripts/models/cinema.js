import { Movie } from "./movie.js";

export class Cinema {
	constructor(id, name, city, address)
	{
		this.id = id;
		this.name = name;
		this.city = city;
		this.address = address;
	}

	async getCurrentMovies() {
		this.movies = [];

		// fetch(`https://localhost:5001/Movie/GetCurrentMovies/${this.id}`)
		// .then(response => {
		// 	if (!response.ok) {
		// 		throw new Error("Response not OK");
		// 	}
		// 	return response.json();
		// })
		// .then(data => {
		// 	for (const element of data) {
		// 		const movie = new Movie(element.id, element.name, element.posterPath, element.year);
		// 		this.movies.push(movie);
		// 	}
		// })
		// .catch(error => {
		// 	console.error(error)
		// });

		try {
			const response = await fetch(`https://localhost:5001/Movie/GetCurrentMovies/${this.id}`);
	
			if (!response.ok) {
				throw new Error("Response not OK");
			}
	
			const data = await response.json();
	
			for (const element of data) {
				const movie = new Movie(element.id, element.name, element.posterPath, element.year);
				this.movies.push(movie);
			}
		} catch (error) {
			console.error(error);
		}
	}
}