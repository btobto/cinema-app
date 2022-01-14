import { Movie } from "./movie.js";

export class Cinema {
	constructor(id, name, city, address)
	{
		this.id = id;
		this.name = name;
		this.city = city;
		this.address = address;
		this.movies = null;
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

	async login(form) {
		const jsonObject = {};
		const formData = new FormData(form);

		jsonObject["cinemaId"] = this.id;
		for (const field of formData) {
			jsonObject[field[0]] = field[1];
		}
		console.log(JSON.stringify(jsonObject));

		try {
			const response = await fetch("https://localhost:5001/User/Login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(jsonObject)
			});
	
			if (response.ok) {
				// render user info
				// redirect to homepage		
			} else if (response.status === 403) {
				alert("Invalid password.");
			} else if (response.status === 404) {
				alert("A user with that e-mail address doesn't exist.");
			}	
		} catch (error) {
			console.error(error);	
		}
	}
}