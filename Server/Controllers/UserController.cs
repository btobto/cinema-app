using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models;
using Helpers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
				if (user.FirstName == null || string.IsNullOrWhiteSpace(user.FirstName))
				{
					return BadRequest("Invalid first name value.");
				}

				if (user.LastName == null || string.IsNullOrWhiteSpace(user.LastName))
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

		[Route("EditUser")]
		[HttpPut]
		public async Task<ActionResult> EditUser([FromForm] User user)
		{
			try
			{
				var existingUser = await Context.Users
					.Where(u => u.ID == user.ID)
					.FirstOrDefaultAsync();

				if (existingUser == null)
				{
					return BadRequest("A user with that ID doesn't exist.");
				}

				var userWithEmail = await Context.Users
					.Where(u => u.Email == user.Email && u.ID != user.ID)
					.FirstOrDefaultAsync();

				if (userWithEmail != null)
				{
					return StatusCode(409, "E-mail address taken.");
				}

				if (!PasswordHasher.Verify(user.Password, existingUser.Password))
				{
					return StatusCode(403, "Incorrect password.");
				}

				existingUser.FirstName = user.FirstName;
				existingUser.LastName = user.LastName;
				existingUser.Email = user.Email;
				existingUser.PhoneNumber = user.PhoneNumber;
				await Context.SaveChangesAsync();

				return Ok("Edit successful.");
			}
			catch (System.Exception e)
			{
				return BadRequest(e.Message);
			}
		}
    }
}
