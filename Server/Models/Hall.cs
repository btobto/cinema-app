using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("Hall")]
	public class Hall
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[MaxLength(20)]
		public string Name { get; set; }

		[Required]
		public int Rows { get; set; }

		[Required]
		public int SeatsPerRow { get; set; }
	}
}