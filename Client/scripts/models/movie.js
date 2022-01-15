import { Screening } from "./screening.js";

export class Movie {
	constructor(id, name, posterPath, year) {
		this.id = id;
		this.name = name;
		this.posterPath = posterPath;
		this.year = year;
		this.screenings = [];
		this.summary = null;
		this.length = null;
		this.country = null;
		this.director = null;
		this.genres = [];
	}

	async getInfo() {
		if (this.summary !== null) {
			return;
		}

		try {
			const response = await fetch(`https://localhost:5001/Movie/GetInfo/${this.id}`);
		
			if (!response.ok) {
				throw new error("Response not OK.");
			}

			const data = await response.json();

			this.summary = data.plotSummary;
			this.length = data.length;
			this.country = data.country;
			this.director = data.director;
			this.genres = data.genres;
		} catch (error) {
			console.error(error);
		}
	}

	async getScreenings(cinemaId) {
		if (this.screenings.length != 0) {
			return;
		}

		try {
			const response = await fetch(`https://localhost:5001/Screening/GetScreeningsForMovie/${cinemaId}/${this.id}`);
		
			if (!response.ok) {
				throw new error(response.statusText);
			}

			const data = await response.json();

			for (const el of data) {
				const screening = new Screening(el.id, cinemaId, this.id, el.date, el.time, el.ticketPrice);
				this.screenings.push(screening);
			}
		} catch (error) {
			console.log(error);
		}
	}


}