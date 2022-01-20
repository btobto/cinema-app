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
		[ForeignKey("ScreeningID")]
		public int ScreeningID { get; set; }

		[Required]
		[ForeignKey("UserID")]
		public int UserID { get; set; }

		[Required]
		public int Row { get; set; }

		[Required]
		public int Seat { get; set; }
	}
}