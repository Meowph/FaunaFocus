using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private readonly IExperienceRepository _experienceRepository;

        public ExperiencesController(IExperienceRepository experienceRepository)
        {
            _experienceRepository = experienceRepository;
        }

        // GET: api/Experiences
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_experienceRepository.GetAllApprovedExperiences());
        }

        // GET: api/Experiences/GetAllByUserId/{id}
        [HttpGet("GetAllByUserId/{id}")]
        public IActionResult GetAllExperiencesByUserId(int id)
        {
            var experiences = _experienceRepository.GetAllExperiencesByUserId(id);
            if (experiences == null)
            {
                return NotFound();
            }
            return Ok(experiences);
        }

        // GET: api/Experiences/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var experience = _experienceRepository.GetById(id);

            if (experience == null)
            {
                return NotFound();
            }

            return Ok(experience);
        }

        // POST: api/Experiences
        [HttpPost]
        public IActionResult Post(Experiences experiences)
        {
            _experienceRepository.Add(experiences);
            return CreatedAtAction("Get", new { id = experiences.Id }, experiences);
        }

        // PUT: api/Experiences/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, Experiences experiences)
        {
            if (id != experiences.Id)
            {
                return BadRequest();
            }

            _experienceRepository.Update(experiences);
            return NoContent();
        }

        // DELETE: api/Experiences/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _experienceRepository.Delete(id);
            return NoContent();
        }

        // GET: api/Experiences/GetAllApprovedExperiencesByCategoryId/{id}
        [HttpGet("GetAllApprovedExperiencesByCategoryId/{id}")]
        public IActionResult GetAllApprovedExperiencesByCategoryId(int id)
        {
            var experiences = _experienceRepository.GetAllApprovedExperiencesByCategoryId(id);
            if (experiences == null)
            {
                return NotFound();
            }
            return Ok(experiences);
        }

        // GET: api/Experiences/GetAllApprovedExperiencesByUserId/{id}
        [HttpGet("GetAllApprovedExperiencesByUserId/{id}")]
        public IActionResult GetAllApprovedExperiencesByUserId(int id)
        {
            var experiences = _experienceRepository.GetAllApprovedExperiencesByUserId(id);
            if (experiences == null)
            {
                return NotFound();
            }
            return Ok(experiences);
        }

        // PATCH: api/Experiences/{id}
        [HttpPatch("{id}/Approve")]
        public IActionResult ApproveExperience(int id)
        {
            _experienceRepository.isApproved(id);
            return NoContent();
        }

        // GET: api/Experiences/GetExperiencesBySubscriberId/{id}
        [HttpGet("GetExperiencesBySubscriberId/{id}")]
        public IActionResult GetExperiencesBySubscriberId(int id)
        {
            var experiences = _experienceRepository.GetExperiencesBySubscriberId(id);
            if (experiences == null)
            {
                return NotFound();
            }
            return Ok(experiences);
        }
    }
}
