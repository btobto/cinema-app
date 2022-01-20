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
					.Where(t => t.ScreeningID == screeningId);

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
					.Where(t => t.ScreeningID == screeningId && t.UserID == userId);

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

		[Route("RemoveTicket/{ticketId}")]
		[HttpDelete]
		public async Task<ActionResult> RemoveTicket(int ticketId)
		{
			try
			{
				var ticket = await Context.Tickets
					.Where(t => t.ID == ticketId)
					.FirstOrDefaultAsync();

				if (ticket == null)
				{
					return BadRequest("Invalid ticket ID.");
				}

				Context.Tickets.Remove(ticket);
				await Context.SaveChangesAsync();

				return Ok("Ticket successfully deleted.");
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("ReserveTicket")]
		[HttpPost]
		public async Task<ActionResult> ReserveTicket([FromBody] Ticket ticket)
		{
			try
			{
				var hall = await Context.Screenings
					.Where(s => s.ID == ticket.ScreeningID)
					.Include(s => s.Hall)
					.Select(s => s.Hall)
					.FirstOrDefaultAsync();

				if (hall == null)
				{
					return BadRequest("Hall not found.");
				}

				if (ticket.Row < 1 || ticket.Row > hall.Rows)
				{
					return BadRequest("Invalid row number.");
				}

				if (ticket.Seat < 1 || ticket.Seat > hall.SeatsPerRow)
				{
					return BadRequest("Invalid seat number.");

				}

				Context.Tickets.Add(ticket);
				await Context.SaveChangesAsync();

				return Ok(ticket.ID);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

	}
}