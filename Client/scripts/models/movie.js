export class Movie {
	constructor(id, name, posterPath, year) {
		this.id = id;
		this.name = name;
		this.posterPath = posterPath;
		this.year = year;
		this.screenings = null;
		this.summary = null;
		this.length = null;
		this.country = null;
		this.director = null;
		this.genres = [];
	}

	async getInfo() {
		// plot summary, length, country, director, genres

		try {
			const response = await fetch(`https://localhost:5001/Movie/GetInfo/${this.id}`);
		
			if (!response.ok) {
				throw new error("Response not OK.");
			}

			const data = await response.json();

			this.summary = data.plotSummary;
			this.length = data.length;
			this.director = data.director;
			this.genres = data.genres;

			console.log(this);
		} catch (error) {
			console.error(error);
		}
	}

	async getScreenings(cinemaId) {
		this.screenings = [];

		try {
			const response = await fetch(`https://localhost:5001/Movie/GetScreenings/${cinemaId}/${this.id}`);
		
			if (!response.ok) {
				throw new error("Response not OK.");
			}

			const data = await response.json();

			for (const screening of data) {

			}
		} catch (error) {
			console.log(error);
		}
	}


}