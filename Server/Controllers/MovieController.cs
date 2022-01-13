using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
		public CinemaContext Context { get; set; }

        public MovieController(CinemaContext context)
        {
			Context = context;
        }

		[Route("GetCurrentMovies/{cinemaId}")]
		[HttpGet]
		public async Task<ActionResult> GetCurrentMovies(int cinemaId)
		{
			try
			{
				var movies = Context.Screenings
					.Where(s => s.Cinema.ID == cinemaId && s.DateAndTime > System.DateTime.Now)
					.Select(s => s.Movie)
					.Distinct();

				var objs = await movies.Select(m => 
					new 
					{
						ID = m.ID,
						Name = m.Name,
						PosterPath = m.PosterPath,
						Year = m.Year
					}).ToListAsync();

				return Ok(objs);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}