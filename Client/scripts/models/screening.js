import { Hall } from "./hall.js";
import { Ticket } from "./ticket.js"

export class Screening {
	constructor(id, cinemaId, movieId, date, time, ticketPrice) {
		this.id = id;
		this.cinemaId = cinemaId;
		this.movieId = movieId;
		this.date = date;
		this.time = time;
		this.ticketPrice = ticketPrice;
		this.hall = null;
		this.tickets = [];
		this.userTickets = [];
	}

	async getHall() {
		if (this.hall !== null) {
			return;
		}

		try {
			const response = await fetch(`https://localhost:5001/Screening/GetHallInfo/${this.id}`);
		
			if (!response.ok) {
				throw new error("Response not OK.");
			}

			const data = await response.json();

			this.hall = new Hall(data.name, data.rows, data.seatsPerRow);
		} catch (error) {
			console.error(error);
		}
	}

	async getAllTickets() {
		if (this.tickets.length !== 0) {
			return;
		}

		try {
			const response = await fetch(`https://localhost:5001/Ticket/GetScreeningTickets/${this.id}`);
		
			if (!response.ok) {
				throw new Error("Error " + response.status);
			}

			const data = await response.json();
			for (const element of data) {
				const ticket = new Ticket(element.row, element.seat, null);
				this.tickets.push(ticket);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async getUserTickets(userId) {
		if (this.userTickets.length !== 0) {
			return;
		}

		try {
			const response = await fetch(`https://localhost:5001/Ticket/GetUserTickets/${this.id}/${userId}`);
		
			if (!response.ok) {
				throw new Error("Error " + response.status);
			}

			const data = await response.json();
			for (const element of data) {
				const ticket = new Ticket(element.row, element.seat, element.id);
				this.userTickets.push(ticket);
			}
		} catch (error) {
			console.error(error);
		}
	}
}