using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models;
using Helpers;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
		public CinemaContext Context { get; set; }

        public UserController(CinemaContext context)
        {
			Context = context;
        }

		[Route("Register")]
		[HttpPost]
		public ActionResult Register([FromBody] User user)
		{
			try
			{
				if (string.IsNullOrWhiteSpace(user.FirstName))
				{
					return BadRequest("Invalid first name value.");
				}

				if (string.IsNullOrWhiteSpace(user.LastName))
				{
					return BadRequest("Invalid last name value.");
				}

				if (Context.Users.Any(p => p.Email == user.Email && p.CinemaID == user.CinemaID))
				{
					return BadRequest("An account with this email address already exists.");
				}

				if (user.Password.Length < 8)
				{
					return BadRequest("Password must be at least 8 characters long.");
				}

				user.Password = PasswordHasher.Hash(user.Password);

				Context.Users.Add(user);
				Context.SaveChanges();

				return Ok("Registration successful.");		
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("Login")]
		[HttpPost]
		public ActionResult Login(int cinemaId, string email, string password)
		{
			try
			{
				var user = Context.Users.Where(p => p.Email == email && p.CinemaID == cinemaId).FirstOrDefault();

				if (user == null)
				{
					return BadRequest("An account with this email address doesn't exist.");
				}

				if (!PasswordHasher.Verify(password, user.Password))
				{
					return BadRequest("Incorrect password.");
				}

				return Ok("Login successful.");
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("DeleteAccount/{password}")]
		[HttpDelete]
		public ActionResult DeleteAccount([FromBody] User user, string password)
		{
			try
			{
				if (!PasswordHasher.Verify(password, user.Password))
				{
					return BadRequest("Incorrect password.");
				}
				
				Context.Users.Remove(user);
				Context.SaveChanges();

				return Ok("Account deleted successfully.");
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}
    }
}
