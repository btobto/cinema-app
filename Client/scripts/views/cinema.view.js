export class CinemaView {
	constructor(cinema) {
		this.cinema = cinema;
		this.container = null;
	}

	async draw(host) {
		const container = document.createElement("div");
		container.className = "cinemaContainer";
		this.container = container;

		// header

		const cinemaHeader = document.createElement("div");
		cinemaHeader.className = "cinemaHeader";

		const cinemaInfo = document.createElement("div");
		cinemaInfo.className = "headerBox";
		cinemaInfo.style.flexGrow = 15;

		// name

		const cinemaTitle = document.createElement("h1");
		cinemaTitle.innerHTML = this.cinema.name;
		cinemaTitle.className = "cinemaInfo";
		cinemaTitle.addEventListener("click", event => {
			this.drawCurrentMovies();
		});

		// address

		const cinemaAddress = document.createElement("h2");
		cinemaAddress.innerHTML = `${this.cinema.address}, ${this.cinema.city}`;
		cinemaAddress.className = "cinemaInfo";

		cinemaInfo.appendChild(cinemaTitle);
		cinemaInfo.appendChild(cinemaAddress);

		// user

		const cinemaUser = document.createElement("div");
		cinemaUser.className = "headerBox";
		
		const userContainer = document.createElement("div");
		userContainer.className = "userContainer";

		// login button

		const loginOutline = document.createElement("div");
		loginOutline.classList.add("outline", "login");
		loginOutline.addEventListener("click", event => {
			this.drawLoginMenu();
		});
		const loginHeader = document.createElement("h3");
		loginHeader.innerHTML = "Log in";

		loginOutline.appendChild(loginHeader)

		// register button

		const registerOutline = document.createElement("div");
		registerOutline.classList.add("outline", "register")
		registerOutline.addEventListener("click", event => {
			this.drawRegisterMenu();
		});
		const registerHeader = document.createElement("h3");
		registerHeader.innerHTML = "Register";

		registerOutline.appendChild(registerHeader)

		userContainer.appendChild(loginOutline);
		userContainer.appendChild(registerOutline);
		cinemaUser.appendChild(userContainer);

		cinemaHeader.appendChild(cinemaInfo);
		cinemaHeader.appendChild(cinemaUser);

		// available movies

		const content = document.createElement("div");
		content.classList.add("cinemaContent");
		
		container.appendChild(cinemaHeader);
		container.appendChild(content);

		this.drawCurrentMovies();

		host.appendChild(container);
	}

	async drawCurrentMovies() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.classList.remove("showMenu");
		host.classList.add("showMovies");

		if (this.cinema.movies.length > 0) {
			for (const movie of this.cinema.movies) {
				const movieContainer = document.createElement("div");
				movieContainer.className = "movieContainer";

				// hover text

				const titleContaier = document.createElement("div");
				titleContaier.className = "titleContainer";
				titleContaier.innerHTML = `${movie.name} (${movie.year})`;

				// poster

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
				host.appendChild(movieContainer);
			}
		} else {
			const moviesInfo = document.createElement("h2");
			moviesInfo.innerHTML = "No screenings available.";
			host.appendChild(moviesInfo);
		}
	}

	async drawLoginMenu() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.classList.remove("showMovies");
		host.classList.add("showMenu");
		
		// title

		let div = document.createElement("div");
		div.className = "inputDiv";
		const title = document.createElement("h1");
		title.style.marginTop = 0;
		title.innerHTML = "Log in";

		const line = document.createElement("hr");

		div.appendChild(title);
		div.appendChild(line);
		host.appendChild(div);
		
		// form

		const form = document.createElement("form");
		form.action = "javascript:this.cinema.checkLogin()"

		this.drawInput(form, "email", "E-mail:", "email");
		this.drawInput(form, "password", "Password:", "password");

		// submit button

		div = document.createElement("div");
		const submitBtn = document.createElement("button");
		submitBtn.className = "outline";
		const text = document.createElement("h3");
		text.innerHTML = "Log in";
		submitBtn.appendChild(text);

		submitBtn.addEventListener("click", async event => {
			event.preventDefault();
			if (form.checkValidity()) {
				
				// const formData = new FormData(form);
				// formData.append("cinemaId", this.cinema.id);
				// for (const pair of formData) {
				// 	alert(pair[0] + ", " + pair[1]);
				// } 
				await this.cinema.login(form);
				// const formData = new FormData();
				// for (const el of form.elements) {
				// 	if (el) {
						
				// 	alert(el.value);
				// 	}
				// }

			} else {
				form.reportValidity();
			}
		});

		div.style.marginBottom = "20px";
		div.appendChild(submitBtn);
		// form.appendChild(div);
		host.appendChild(form);
		host.appendChild(div);
	}

	async drawRegisterMenu() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.classList.remove("showMovies");
		host.classList.add("showMenu");
		
		// title

		let div = document.createElement("div");
		div.className = "inputDiv";
		const title = document.createElement("h1");
		title.style.marginTop = 0;
		title.innerHTML = "Register";

		const line = document.createElement("hr");

		div.appendChild(title);
		div.appendChild(line);
		host.appendChild(div);
		
		// form

		const form = document.createElement("form");

		this.drawInput(form, "text", "First name:", "firstName");
		this.drawInput(form, "text", "Last name:", "lastName");
		this.drawInput(form, "email", "E-mail:", "email");
		this.drawInput(form, "password", "Password:", "password");
		this.drawInput(form, "tel", "Phone number:", "phoneNumber");

		// submit button

		div = document.createElement("div");
		const submitBtn = document.createElement("button");
		submitBtn.className = "outline";
		const text = document.createElement("h3");
		text.innerHTML = "Register";
		submitBtn.appendChild(text);

		div.style.marginBottom = "20px";
		div.appendChild(submitBtn);
		form.appendChild(div);
	
		host.appendChild(form);

	}

	async drawInput(form, inputType, labelText, inputName) {
		let div = document.createElement("div");

		// label div

		let container = document.createElement("div");
		let label = document.createElement("label");
		label.htmlFor = inputName;
		label.innerHTML = labelText;
		container.appendChild(label);
		div.appendChild(container);

		// input div

		container = document.createElement("div");
		let input = document.createElement("input");
		input.type = inputType;
		input.name = inputName;
		input.required = true;
		container.appendChild(input);
		div.style.marginBottom = "15px";
		div.appendChild(container);

		form.appendChild(div);
	}
}