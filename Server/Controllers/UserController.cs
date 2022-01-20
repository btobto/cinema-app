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
		public ActionResult Register([FromForm] User user)
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

				return Ok(user.ID);		
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("Login")]
		[HttpPost]
		public ActionResult Login([FromForm] User user)
		{
			try
			{
				var existingUser = Context.Users.
					Where(p => p.Email == user.Email && p.CinemaID == user.CinemaID)
					.FirstOrDefault();

				if (existingUser == null)
				{
					return StatusCode(404, "An account with this email address doesn't exist.");
				}

				if (!PasswordHasher.Verify(user.Password, existingUser.Password))
				{
					return StatusCode(403, "Incorrect password.");
				}

				var obj = new 
				{
					ID = existingUser.ID,
					CinemaID = existingUser.CinemaID,
					Email = existingUser.Email,
					FirstName = existingUser.FirstName,
					LastName = existingUser.LastName,
					PhoneNumber = existingUser.PhoneNumber
				};

				return Ok(obj);
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
