using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
		public CinemaContext Context { get; set; }

        public TicketController(CinemaContext context)
        {
			Context = context;
        }

		[Route("GetScreeningTickets/{screeningId}")]
		[HttpGet]
		public async Task<ActionResult> GetAllTickets(int screeningId)
		{
			try
			{
				var tickets = Context.Tickets
					.Where(t => t.Screening.ID == screeningId);

				var objs = await tickets.Select(t => new
				{
					Row = t.Row,
					Seat = t.Seat
				}).ToListAsync();

				return Ok(objs);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("GetUserTickets/{screeningId}/{userId}")]
		[HttpGet]
		public async Task<ActionResult> GetUserTickets(int screeningId, int userId)
		{
			try
			{
				var tickets = Context.Tickets
					.Where(t => t.Screening.ID == screeningId && t.User.ID == userId);

				var objs = await tickets.Select(t => new
				{
					ID = t.ID,
					Row = t.Row,
					Seat = t.Seat
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