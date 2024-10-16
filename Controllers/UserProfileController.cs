using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserProfileRepository _userRepository;
        public UserProfileController(IUserProfileRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }
        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            userProfile.DeactivateVotes = 0;
            userProfile.DemoteVotes = 0;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //PUT update user
        [HttpPut("{id}")]

        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(userProfile);
            return NoContent();
        }

    }
}