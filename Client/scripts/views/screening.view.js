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
						selectedTickets.splice(index, 1);
						this.drawSeat(seat, "./images/resources/empty.png", "emptySeat");
					}

					console.log("Tickets");
					for (const t of selectedTickets) {
						console.log(t.row + " : " + t.seat);
					}
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
}