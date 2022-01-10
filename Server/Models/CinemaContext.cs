using Microsoft.EntityFrameworkCore;

namespace Models
{
	public class CinemaContext : DbContext
	{
		public DbSet<Cinema> Cinemas { get; set; }
		public DbSet<Movie> Movies { get; set; }
		public DbSet<Screening> Screenings { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Ticket> Tickets { get; set; }
		public DbSet<Hall> Halls { get; set; }
		public DbSet<Genre> Genres { get; set; }

		public CinemaContext(DbContextOptions options)
			: base(options) {}
	}
}