//using Fauna_Focus.Models;
//using Fauna_Focus.Repositories;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Fauna_Focus.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CountryRegionsController : ControllerBase
//    {
//        // GET: CountryRegionsController
//        private readonly ICountryRegionsRepository _countryregionsRepository;
//        public CountryRegionsController(ICountryRegionsRepository countryregionsRepository)
//        {
//            _countryregionsRepository = countryregionsRepository;
//        }

//        // GET: CountryRegionsController/GetById/5
//        [HttpGet]
//        public IActionResult Get()
//        {
//            return Ok(_countryregionsRepository.GetAll());
//        }

//        // GET api/<CountryRegionsController>/5
//        [HttpGet("{id}")]
//        public IActionResult Get(int id)
//        {
//            var countryregions = _countryregionsRepository.GetById(id);

//            if (countryregions == null)
//            {
//                return NotFound();
//            }
//            return Ok(countryregions);
//        }

//        // POST api/<CountryRegionsController>
//        [HttpPost]
//        public IActionResult Post(CountryRegions countryregions)
//        {
//            _countryregionsRepository.Add(countryregions);
//            return CreatedAtAction("Get", new { id = countryregions.Id }, countryregions);
//        }

//        // PUT api/<CountryRegionsController>/5
//        [HttpPut("{id}")]
//        public IActionResult Put(int id, CountryRegions countryregions)
//        {
//            if (id != countryregions.Id)
//            {
//                return BadRequest();
//            }

//            _countryregionsRepository.Update(countryregions);
//            return NoContent();
//        }

//        // DELETE api/<CountryRegionsController>/5
//        [HttpDelete("{id}")]
//        public IActionResult Delete(int id)
//        {
//            _countryregionsRepository.Delete(id);
//            return NoContent();
//        }
//    }
//}
