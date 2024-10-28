using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        // GET: PlacesController
        private readonly IPlacesRepository _placesRepository;
        public PlacesController(IPlacesRepository placesRepository)
        {
            _placesRepository = placesRepository;
        }

        // GET: PlacesController/GetById/5
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_placesRepository.GetAll());
        }

        // GET api/<PlacesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var places = _placesRepository.GetById(id);

            if (places == null)
            {
                return NotFound();
            }
            return Ok(places);
        }

        // POST api/<PlacesController>
        [HttpPost]
        public IActionResult Post(Places places)
        {
            _placesRepository.Add(places);
            return CreatedAtAction("Get", new { id = places.Id }, places);
        }

        // PUT api/<PlacesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Places places)
        {
            if (id != places.Id)
            {
                return BadRequest();
            }

            _placesRepository.Update(places);
            return NoContent();
        }

        // DELETE api/<PlacesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _placesRepository.Delete(id);
            return NoContent();
        }
    }
}
