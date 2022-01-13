using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
	[Table("Screening")]
	public class Screening
	{
		[Key]
		public int ID { get; set; }

		[Required]
		public Cinema Cinema { get; set; }

		[Required]
		public Movie Movie { get; set; }

		[Required]
		public Hall Hall { get; set; }

		[Required]
		public DateTime DateAndTime { get; set; }

		[Required]
		public int TicketPrice { get; set; }

		public List<Ticket> Tickets { get; set; }
	}
}