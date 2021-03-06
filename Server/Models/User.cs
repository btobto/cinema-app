using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("User")]
	public class User
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[ForeignKey("CinemaID")]
		public int CinemaID { get; set; }

		[Required]
		[MaxLength(80)]
		[EmailAddress]
		public string Email { get;set; }
		
		[Required]
		[MaxLength(64)]
		public string Password { get; set; }
		
		[MaxLength(50)]
		public string FirstName { get; set; }
		
		[MaxLength(50)]
		public string LastName { get; set; }
		
		[Phone]
		[MinLength(8)]
		[MaxLength(15)]
		public string PhoneNumber { get; set; }

		public List<Ticket> Tickets { get; set; }
	}
}