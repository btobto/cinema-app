import { ScreeningView } from "./screening.view.js";

export class MovieView {
	constructor(movie) {
		this.movie = movie;
	}

	async drawInfo(host) {
		host.innerHTML = "";
		host.className = "";
		host.classList.add("cinemaContent");
		host.classList.add("showInfo");
		
		// movie info

		const movieInfoContainer = document.createElement("div");
		movieInfoContainer.className = "movieInfoContainer";

		// poster

		let div = document.createElement("div");
		div.classList.add("moviePoster");

		const imgWrapper = document.createElement("div");
		const image = document.createElement("img");
		image.src = this.movie.posterPath;
		image.className = "imgPoster";
		imgWrapper.appendChild(image);
		div.appendChild(image);

		movieInfoContainer.appendChild(div);

		// info

		const movieInfo = document.createElement("div");
		movieInfo.classList.add("movieInfo");

		// title

		div = document.createElement("div");
		let text = document.createElement("h1");
		text.innerHTML = `${this.movie.name} (${this.movie.year})`;
		div.appendChild(text);
		movieInfo.appendChild(div);

		// summary

		div = document.createElement("div");
		text = document.createElement("p");
		text.className = "summary";
		text.innerHTML = this.movie.summary;
		div.appendChild(text);
		movieInfo.appendChild(div);

		// length, country, director, genres

		this.generateInfo(movieInfo, "Length", `${this.movie.length} min`);
		this.generateInfo(movieInfo, "Country of origin", this.movie.country)
		this.generateInfo(movieInfo, "Director", this.movie.director)
		this.generateInfo(movieInfo, "Genres", this.movie.genres.join(", "))

		movieInfoContainer.appendChild(movieInfo);
		host.appendChild(movieInfoContainer);
	}

	async drawScreenings(host, user) {
		const screeningsInfoContainer = document.createElement("div");
		screeningsInfoContainer.className = "screeningsInfoContainer";
		
		// title

		let div = document.createElement("div");
		let title = document.createElement("h2");
		title.innerHTML = "Current screenings";
		div.appendChild(title);
		screeningsInfoContainer.appendChild(div);

		// screenings table

		div = document.createElement("div");

		if (this.movie.screenings === null) {
			title = document.createElement("h3");
			title.innerHTML = "This movie is currently unavailable at this cinema.";
			div.appendChild(title);
		} else {
			const dates = new Set(this.movie.screenings.map(s => s.date));
			const table = document.createElement("table");
			table.className = "screeningsTable";

			for (const date of dates) {
				const row = document.createElement("tr");
				const dateCell = document.createElement("td");
				dateCell.className = "dateCell";
				dateCell.innerHTML = date;
				row.appendChild(dateCell);

				for (const screening of this.movie.screenings) {
					if (screening.date === date) {
						const cell = document.createElement("td");
						cell.innerHTML = screening.time;
						cell.id = screening.id;
						cell.className = "screeningCell";

						cell.addEventListener("click", async event => {
							await screening.getHall();
							await screening.getAllTickets();

							if (user !== null) {
								await screening.getUserTickets(user.id);
							}

							const screeningView = new ScreeningView(screening);
							await screeningView.drawScreening(host, user);
						});

						row.appendChild(cell);
					}
				}

				table.appendChild(row);
			}

			div.appendChild(table);
		}

		screeningsInfoContainer.appendChild(div);

		host.appendChild(screeningsInfoContainer);
	}

	generateInfo(host, label, text) {
		let div = document.createElement("div");

		let paragraph = document.createElement("p");
		paragraph.className = "summary";

		let boldLabel = document.createElement("span");
		boldLabel.style.fontWeight = "bold";
		boldLabel.innerHTML = label + ":";

		paragraph.appendChild(boldLabel);
		paragraph.innerHTML += " " + text;

		div.appendChild(paragraph);
		host.appendChild(div);
	}
}