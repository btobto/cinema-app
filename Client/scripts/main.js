import { Cinema } from "./models/cinema.js";
import { CinemaView } from "./views/cinema.view.js";

async function getCinemas()
{
	try {
		const response = await fetch("https://localhost:5001/Cinema/GetCinemas");

		if (!response.ok) {
			throw new Error("Response not OK");
		}

		const data = await response.json();

		for (const element of data) {
			const cinema = new Cinema(element.id, element.name, element.city, element.address);
			const cinemaView = new CinemaView(cinema);
			await cinema.getCurrentMovies();
			cinemaView.draw(document.body);
		}

	} catch (error) {
		console.error(error);
	}
}

await getCinemas();