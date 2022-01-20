import { Ticket } from "../models/ticket.js";

export class ScreeningView {
	constructor(screening) {
		this.screening = screening;
	}

	async drawScreening(host, user) {
		host.innerHTML = "";
		host.className = "";
		host.classList.add("cinemaContent");
		host.classList.add("showSeats");

		// legend

		const legendContainer = document.createElement("div");
		legendContainer.className = "chairLegendContainer";
		
		const legend = document.createElement("div");
		legend.className = "legend";

		// types of seats

		this.generateLegend(legend, "./images/resources/empty.png", "Empty");
		this.generateLegend(legend, "./images/resources/taken.png", "Taken");
		this.generateLegend(legend, "./images/resources/your.png", "Your seat");

		legendContainer.append(legend);
		host.append(legendContainer);

		// separator

		let div = document.createElement("div");
		let line = document.createElement("hr");
		div.appendChild(line);
		host.append(div);

		// seats

		const seatsContainer = document.createElement("div");

		// hall name

		const hallNameContainer = document.createElement("div");

		const hallName = document.createElement("h2");
		hallName.innerHTML = this.screening.hall.name;

		hallNameContainer.appendChild(hallName);

		seatsContainer.appendChild(hallNameContainer);

		//seats generator

		const seatsTableContainer = document.createElement("div");
		seatsTableContainer.className = "seatsTableContainer";

		const seatsTable = document.createElement("table");
		seatsTable.className = "seatsTable";

		for (let i = this.screening.hall.rows; i > 0; i--) {
			const row = document.createElement("tr");

			let column = document.createElement("td");
			column.innerHTML = i;
			column.className = "rowIndex";

			row.appendChild(column);

			for (let j = 0; j < this.screening.hall.seatsPerRow; j++) {
				column = document.createElement("td");
				column.className = "seat";
				
				let img = document.createElement("img");
				this.drawSeat(img, "./images/resources/empty.png", "emptySeat");

				column.appendChild(img);

				row.appendChild(column);
			}

			seatsTable.appendChild(row);
		}

		// taken seats
		for (const ticket of this.screening.tickets) {
			const row = this.screening.hall.rows - ticket.row;
			const col = ticket.seat;

			const seat = seatsTable.rows[row].cells[col].firstElementChild;
			this.drawSeat(seat, "./images/resources/taken.png", "takenSeat");
		}

		let selectedTickets;
		// user seats
		if (user !== null) {
			for (const ticket of this.screening.userTickets) {
				const row = this.screening.hall.rows - ticket.row;
				const col = ticket.seat;
	
				const seat = seatsTable.rows[row].cells[col].firstElementChild;
				this.drawSeat(seat, "./images/resources/your.png", "userSeat");
			}

			selectedTickets = this.screening.userTickets.slice();
		}

		// add event listeners
		const seats = seatsTable.querySelectorAll(".emptySeat,.userSeat");
		for (const seat of seats) {
			if (user !== null) {
				seat.addEventListener("click", event => {	
					const cell = seat.parentElement;
					const cellRow = cell.parentElement.rowIndex;
					const cellCol = cell.cellIndex;
	
					const rowMapped = this.screening.hall.rows - cellRow;
					const seatMapped = cellCol;
					
					const selected = selectedTickets.find(t => t.row === rowMapped && t.seat === seatMapped);
					if (selected === undefined) {
						if (selectedTickets.length === 5) {
							alert("Can't buy more than 5 tickets.");
							return;
						}

						selectedTickets.push(new Ticket(rowMapped, seatMapped, null));
						this.drawSeat(seat, "./images/resources/your.png", "userSeat");
					} else {
						const index = selectedTickets.indexOf(selected);
						// console.log("INDEX: " + index);
						selectedTickets.splice(index, 1);
						this.drawSeat(seat, "./images/resources/empty.png", "emptySeat");
					}

					// console.log("User tickets");
					// for (const t of this.screening.userTickets) {
					// 	console.log(t.row + " : " + t.seat);
					// }
					// console.log("Selected");
					// for (const t of selectedTickets) {
					// 	console.log(t.row + " : " + t.seat);
					// }
				});
			} else {
				seat.addEventListener("click", event => {
					alert("In order to buy tickets you must be logged in.");
				});
			}
		}

		seatsTableContainer.appendChild(seatsTable);

		seatsContainer.appendChild(seatsTableContainer);

		host.append(seatsContainer);

		// buttons

		const buttonsContainer = document.createElement("div");

		const submitBtn = document.createElement("button");
		submitBtn.className = "outline";
		const text = document.createElement("h3");
		text.innerHTML = "Submit";
		submitBtn.appendChild(text);

		submitBtn.addEventListener("click",  event => {
			if (user === null) {
				alert("In order to buy tickets you must be logged in.");
				return;
			} else if (this.isEqual(this.screening.userTickets, selectedTickets)) {
				alert("No new tickets selected.");
				return;
			}

			// delete userTicket
			for (const userTicket of this.screening.userTickets) {
				const found = selectedTickets.find(t => t.row === userTicket.row && t.seat === userTicket.seat);
				// console.log("use: " + found);
				if (found === undefined) {
					console.log("Deleting: " + userTicket.row + " : " + userTicket.seat);
					// console.log("=======");
					this.screening.deleteTicket(userTicket);
				}
			}
			
			// new ticket
			for (const selectedTicket of selectedTickets) {
				const found = this.screening.userTickets.find(t => t.row === selectedTicket.row && t.seat === selectedTicket.seat);
				// console.log("sel: " + found);
				if (found === undefined) {
					console.log("Adding: " + selectedTicket.row + " : " + selectedTicket.seat);
					// console.log("=======");
					
					this.screening.reserveTicket(selectedTicket, user);					
				}
			}
			// console.log("===============");
		});

		buttonsContainer.appendChild(submitBtn);

		host.appendChild(buttonsContainer);
	}

	generateLegend(host, source, text) {
		let div = document.createElement("div");
		div.className = "chairLegend";

		let img = document.createElement("img");
		img.src = source;
		img.className = "imgChairLegend";

		let label = document.createElement("h3");
		label.innerHTML = text;

		div.appendChild(img);
		div.appendChild(label);
		host.append(div);
	}

	drawSeat(img, path, imgClass) {
		img.src = path;
		img.className = "";
		img.classList.add("imgSeat");
		img.classList.add(imgClass);
	}

	isEqual(tickets1, tickets2) {
		if (tickets1.length !== tickets2.length) {
			return false;
		}

		// function compareTickets(a, b) {
		// 	if (a.row > b.row || (a.row === b.row && a.seat > b.seat)) {
		// 		return 1;
		// 	} else if (a.row < b.row || a.seat < b.seat) {
		// 		return -1;
		// 	}
		// 	return 0;
		// };

		// let sorted1 = tickets1.sort(compare);
		// let sorted2 = tickets2.sort(compare);

		// for (let i = 0; i < sorted1.length; i++) {
		// 	if (compareTickets(sorted1[i], sorted2[i]) !== 0) {
		// 		return false;
		// 	}
		// }

		for (const ticket of tickets2) {
			const found = tickets1.find(t => t.row === ticket.row && t.seat === ticket.seat);
			if (found === undefined) {
				return false;
			}
		}

		return true;
	}
}