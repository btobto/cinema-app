using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("Cinema")]
	public class Cinema
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[MaxLength(50)]
		public string Name { get; set; }

		[Required]
		[MaxLength(50)]
		public string City { get; set; }

		[Required]
		[MaxLength(100)]
		public string Address { get; set; }

		public List<User> Users { get; set; }

		public List<Screening> Screenings { get; set; }
	}
}