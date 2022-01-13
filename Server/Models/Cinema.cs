using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

		[JsonIgnore]
		public List<User> Users { get; set; }

		[JsonIgnore]
		public List<Screening> Screenings { get; set; }
	}
}