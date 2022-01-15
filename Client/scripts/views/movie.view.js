export class MovieView {
	constructor(movie) {
		this.movie = movie;
	}

	async drawScreenings() {
		if (this.movie.screenings === null) {
			return;
		}

		
	}
}