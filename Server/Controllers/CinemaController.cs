using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CinemaController : ControllerBase
    {
		public CinemaContext Context { get; set; }

        public CinemaController(CinemaContext context)
        {
			Context = context;
        }

		[Route("GetCinemas")]
		[HttpGet]
		public async Task<ActionResult> GetCinemas()
		{
			try
			{
				var cinemas = await Context.Cinemas.ToListAsync();
				return Ok(cinemas);
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}