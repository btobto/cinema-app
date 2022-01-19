using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScreeningController : ControllerBase
    {
		public CinemaContext Context { get; set; }

        public ScreeningController(CinemaContext context)
        {
			Context = context;
        }

		[Route("GetScreeningsForMovie/{cinemaId}/{movieId}")]
		[HttpGet]
		public async Task<ActionResult> GetScreeningsForMovie(int cinemaId, int movieId)
		{
			try
			{
				var screenings = Context.Screenings
					.Include(s => s.Hall)
					.Where(s => s.Movie.ID == movieId && s.Cinema.ID == cinemaId);

				var objs = await screenings.Select(s => new 
				{
					ID = s.ID,
					Date = s.DateAndTime.ToString("dd.MM.yyyy."),
					Time = s.DateAndTime.ToString("HH:mm"),
					TicketPrice = s.TicketPrice
				}).ToListAsync();

				 return Ok(objs);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("GetHallInfo/{screeningId}")]
		[HttpGet]
		public async Task<ActionResult> GetHallInfo(int screeningId)
		{
			try
			{
				var screening = await Context.Screenings
					.Where(s => s.ID == screeningId)
					.Include(s => s.Hall)
					.FirstOrDefaultAsync();
				
				if (screening == null)
				{
					return BadRequest("Invalid screening ID.");
				}

				var hall = new
				{
					Name = screening.Hall.Name,
					Rows = screening.Hall.Rows,
					SeatsPerRow = screening.Hall.SeatsPerRow
				};

				return Ok(hall);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}