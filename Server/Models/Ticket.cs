using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("Ticket")]
	public class Ticket
	{
		[Key]
		public int ID { get; set; }

		[Required]
		public Screening Screening { get; set; }

		[Required]
		public User User { get; set; }

		[Required]
		public int Row { get; set; }

		[Required]
		public int Seat { get; set; }
	}
}