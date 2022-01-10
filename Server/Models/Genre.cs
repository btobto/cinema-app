using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("Genre")]
	public class Genre
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[MaxLength(50)]
		public string Name { get; set; }

		public List<Movie> Movies { get; set; }
	}
}