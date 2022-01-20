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

	async deleteTicket(userTicket) {
		try {
			if (userTicket.id === null) {
				throw new Error("Ticket ID is null.");
			}

			const response = await fetch(`https://localhost:5001/Ticket/RemoveTicket/${userTicket.id}`, {
				method: "DELETE"
			});

			if (!response.ok) {
				throw new Error("Error " + response.status);
			}

			let index = this.userTickets.indexOf(userTicket);
			// console.log("INDEX1: " + index);

			// console.log("User tickets");
			// this.userTickets.forEach((ticket, index) => {
			// 	console.log(index + ". " + ticket.row + " : " + ticket.seat);
			// });

			// console.log("Ticket for deletion");
			// console.log(userTicket.row + " : " + userTicket.seat);

			// console.log("Index")
			// console.log(index);
			
			this.userTickets.splice(index, 1);

			// console.log("User tickets");
			// this.userTickets.forEach((ticket, index) => {
			// 	console.log(index + ". " + ticket.row + " : " + ticket.seat);
			// });
			
			const ticketFound = this.tickets.find(t => t.row === userTicket.row && t.seat === userTicket.seat);
			index = this.tickets.indexOf(ticketFound);
			// console.log("INDEX2: " + index);
			this.tickets.splice(index, 1);
		} catch (error) {
			console.error(error);
		}
	}

	async reserveTicket(selectedTicket, user) {
		try {
			const response = await fetch("https://localhost:5001/Ticket/ReserveTicket", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					screeningId: this.id,
					userId: user.id,
					row: selectedTicket.row,
					seat: selectedTicket.seat
				})
			});

			if (!response.ok) {
				throw new Error("Error " + response.status);
			}

			const data = await response.json();
			selectedTicket.id = data;

			this.userTickets.push(selectedTicket);
			this.tickets.push(selectedTicket);
		} catch (error) {
			console.log(error);
		}
	}
}