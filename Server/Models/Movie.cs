using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	[Table("Movie")]
	public class Movie
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[MaxLength(60)]
		public string Name { get; set; }
		
		[Required]
		[MaxLength(300)]
		public string PlotSummary { get; set; }

		[Required]
		public string PosterPath { get; set; }
		
		[Required]
		public int Length { get; set; }	
		
		[Required]
		public int Year { get; set; }
		
		[Required]
		[MaxLength(50)]
		public string Country { get; set; }
		
		[Required]
		[MaxLength(50)]
		public string Director { get; set; }

		public List<Genre> Genres { get; set; }

		public List<Screening> Screenings { get; set; }
	}
}