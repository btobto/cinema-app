export class CinemaView {
	constructor(cinema) {
		this.cinema = cinema;
	}

	draw(host) {
		const container = document.createElement("div");
		container.className = "cinemaContainer";

		const header = document.createElement("div");
		header.className = "cinemaHeader";

		const cinemaInfo = document.createElement("div");
		cinemaInfo.className = "headerBox";
		cinemaInfo.style.flexGrow = 4;
		const title = document.createElement("h1");
		title.innerHTML = this.cinema.name;
		const info = document.createElement("h2");
		info.innerHTML = `${this.cinema.address}, ${this.cinema.city}`;
		cinemaInfo.appendChild(title);
		cinemaInfo.appendChild(info);

		const userInfo = document.createElement("div");
		userInfo.className = "headerBox";
		userInfo.style.flexGrow = 1;
		const login = document.createElement("h3");
		login.innerHTML = "Log in";
		const register = document.createElement("h3");
		register.innerHTML = "Register";
		userInfo.appendChild(login);
		userInfo.appendChild(register);

		header.appendChild(cinemaInfo);
		header.appendChild(userInfo);
		container.appendChild(header);

		const content = document.createElement("div");
		content.className = "cinemaContent";

		console.log(this.cinema.movies);
		console.log("length: " + this.cinema.movies.length);

		if (this.cinema.movies.length > 0)
		{
			for (const movie of this.cinema.movies) {
				const movieContainer = document.createElement("div");
				movieContainer.className = "movieContainer";

				const titleContaier = document.createElement("div");
				titleContaier.className = "titleContainer";
				titleContaier.innerHTML = `${movie.name} (${movie.year})`;

				const posterContainer = document.createElement("div");
				posterContainer.className = "posterContainer";
				const image = document.createElement("img");
				image.src = movie.posterPath;
				image.style.verticalAlign = "bottom";
				image.style.maxWidth = "100%";
				posterContainer.appendChild(image);

				movieContainer.addEventListener("mouseenter", event => {
					posterContainer.style.visibility = "hidden";
				});

				movieContainer.addEventListener("mouseleave", event => {
					posterContainer.style.visibility = "visible";
				});

				movieContainer.appendChild(titleContaier);
				movieContainer.appendChild(posterContainer);
				content.appendChild(movieContainer);
			}
		}
		else {
			const moviesInfo = document.createElement("h2");
			moviesInfo.innerHTML = "No screenings available.";
			content.appendChild(moviesInfo);
		}

		container.appendChild(content);
		host.appendChild(container);
	}

	
}