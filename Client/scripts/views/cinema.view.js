import { MovieView } from "./movie.view.js";

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
		cinemaInfo.classList.add("headerBox");
		cinemaInfo.classList.add("cinemaInfoContainer")

		// name

		const cinemaTitle = document.createElement("h1");
		cinemaTitle.innerHTML = this.cinema.name;
		cinemaTitle.classList.add("cinemaInfo");
		cinemaTitle.classList.add("cinemaTitle");
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

		this.drawUserButtons(userContainer);

		cinemaUser.appendChild(userContainer);

		cinemaHeader.appendChild(cinemaInfo);
		cinemaHeader.appendChild(cinemaUser);

		container.appendChild(cinemaHeader);

		// available movies

		const content = document.createElement("div");
		content.className = "cinemaContent";
		
		container.appendChild(content);

		this.drawCurrentMovies();

		host.appendChild(container);
	}

	async drawCurrentMovies() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.className = "";
		host.classList.add("cinemaContent");
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
				image.className = "imgShowcase";
				posterContainer.appendChild(image);

				movieContainer.addEventListener("mouseenter", event => {
					posterContainer.style.visibility = "hidden";
				});

				movieContainer.addEventListener("mouseleave", event => {
					posterContainer.style.visibility = "visible";
				});

				movieContainer.addEventListener("click", async event => {
					await movie.getInfo();
					await movie.getScreenings(this.cinema.id);
					const movieView = new MovieView(movie);
					movieView.drawInfo(host);
					movieView.drawScreenings(host, this.cinema.user);
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
		host.className = "";
		host.classList.add("cinemaContent");
		host.classList.add("showMenu");
		
		// title

		let div = document.createElement("div");
		div.className = "inputDiv";
		const title = document.createElement("h1");
		title.className = "formTitle";
		title.innerHTML = "Log in";

		const line = document.createElement("hr");

		div.appendChild(title);
		div.appendChild(line);
		host.appendChild(div);
		
		// form

		const form = document.createElement("form");

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
				const loggedIn = await this.cinema.login(form);

				if (loggedIn === true) {
					this.drawCurrentUser();
					this.drawCurrentMovies();	
				}
			} else {
				form.reportValidity();
			}
		});

		div.className = "buttonContainer";
		div.appendChild(submitBtn);
		// form.appendChild(div);
		host.appendChild(form);
		host.appendChild(div);
	}

	async drawRegisterMenu() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.className = "";
		host.classList.add("cinemaContent");
		host.classList.add("showMenu");
		
		// title

		let div = document.createElement("div");
		div.className = "inputDiv";
		const title = document.createElement("h1");
		title.className = "formTitle";
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

		submitBtn.addEventListener("click", async event => {
			event.preventDefault();
			if (form.checkValidity()) {
				const registered = await this.cinema.register(form);

				if (registered === true) {
					this.drawCurrentUser();
					this.drawCurrentMovies();	
				}
			} else {
				form.reportValidity();
			}
		});

		div.className = "buttonContainer";
		div.appendChild(submitBtn);
		form.appendChild(div);
	
		host.appendChild(form);
	}

	async drawCurrentUser() {
		const host = this.container.querySelector(".userContainer,.infoContainer");
		host.innerHTML = "";
		host.className = "infoContainer";

		const title = document.createElement("h3");
		title.innerHTML = `Logged in as: ${this.cinema.user.firstName} ${this.cinema.user.lastName}`;
		title.className = "cinemaInfo";

		const logout = document.createElement("h4");
		logout.className = "option";
		logout.innerHTML = "Log out";

		logout.addEventListener("click", event => {
			this.cinema.user = null;

			for (const movie of this.cinema.movies) {
				for (const screening of movie.screenings) {
					screening.tickets = [];
					screening.userTickets = [];
				}
			}

			this.drawUserButtons(host);
			this.drawCurrentMovies();
		});

		const edit = document.createElement("h4");
		edit.className = "option";
		edit.innerHTML = "Edit info";

		edit.addEventListener("click", event => {
			this.drawEditForm();
		});

		host.appendChild(title);
		host.appendChild(logout);
		host.appendChild(edit);
	}

	drawUserButtons(host) {
		host.innerHTML = "";
		host.className = "userContainer";
		
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

		host.appendChild(loginOutline);
		host.appendChild(registerOutline);
	}

	drawEditForm() {
		const host = this.container.querySelector(".cinemaContent");
		host.innerHTML = "";
		host.className = "";
		host.classList.add("cinemaContent");
		host.classList.add("showMenu");
		
		// title

		let div = document.createElement("div");
		div.className = "inputDiv";
		const title = document.createElement("h1");
		title.className = "formTitle";
		title.innerHTML = "Edit profile";

		const line = document.createElement("hr");

		div.appendChild(title);
		div.appendChild(line);
		host.appendChild(div);
		
		// form

		const form = document.createElement("form");

		this.drawInput(form, "text", "New first name:", "firstName", this.cinema.user.firstName);
		this.drawInput(form, "text", "New last name:", "lastName", this.cinema.user.lastName);
		this.drawInput(form, "email", "New e-mail:", "email", this.cinema.user.email);
		this.drawInput(form, "tel", "New phone number:", "phoneNumber", this.cinema.user.phoneNumber);
		this.drawInput(form, "password", "Confirm your password:", "password");

		// submit button

		div = document.createElement("div");
		const submitBtn = document.createElement("button");
		submitBtn.className = "outline";
		const text = document.createElement("h3");
		text.innerHTML = "Edit";
		submitBtn.appendChild(text);

		submitBtn.addEventListener("click", async event => {
			event.preventDefault();
			if (form.checkValidity()) {
				const edited = await this.cinema.editUser(form);

				if (edited === true) {
					alert("Info changed successfully.");

					this.drawCurrentUser();
					this.drawCurrentMovies();
				}
			} else {
				form.reportValidity();
			}
		});

		div.className = "buttonContainer";
		div.appendChild(submitBtn);
		form.appendChild(div);
	
		host.appendChild(form);
	}

	async drawInput(form, inputType, labelText, inputName, value) {
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

		if (value != null ) {
			input.value = value;
		}
		
		input.required = true;
		container.appendChild(input);
		div.className = "inputContainer";
		div.appendChild(container);

		form.appendChild(div);
	}
}