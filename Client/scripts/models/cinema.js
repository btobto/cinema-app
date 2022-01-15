import { Movie } from "./movie.js";
import { User } from "./user.js";

export class Cinema {
	constructor(id, name, city, address)
	{
		this.id = id;
		this.name = name;
		this.city = city;
		this.address = address;
		this.movies = null;
		this.user = null;
	}

	async getCurrentMovies() {
		this.movies = [];

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
		const formData = new FormData(form);
		formData.append("cinemaId", this.id);

		try {
			const response = await fetch("https://localhost:5001/User/Login", {
				method: "POST",
				body: formData
			});
	
			if (response.ok) {
				const data = await response.json();
				this.user = new User(data.cinemaID, data.email, data.firstName, data.lastName, data.phoneNumber);
				return true;	
			} else if (response.status === 403) {
				alert("Invalid password.");
			} else if (response.status === 404) {
				alert("A user with that e-mail address doesn't exist.");
			}	
			return false;
		} catch (error) {
			console.error(error)
		}
	}

	async register(form) {
		const formData = new FormData(form);
		formData.append("cinemaId", this.id);

		try {
			const response = await fetch("https://localhost:5001/User/Register", {
				method: "POST",
				body: formData
			});
	
			if (response.ok) {
				const fname = form.elements["firstName"].value;
				const lname = form.elements["lastName"].value;
				const email = form.elements["email"].value;
				const phoneNumber = form.elements["phoneNumber"].value;

				this.user = new User(this.id, email, fname, lname, phoneNumber);
				return true;	
			} else {
				alert("Invalid input.");
			}
			return false;
		} catch (error) {
			console.error(error)
		}
	}
}