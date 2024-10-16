using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;

        }
        // GET: api/<SubscriptionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpGet("GetByUserId/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            var subscriptions = _subscriptionRepository.GetByUserId(id);
            if (subscriptions == null)
            {
                return NotFound();
            }

            return Ok(subscriptions);
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;
            subscription.EndDateTime = null;
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Subscription subscription)
        {
            if (id != subscription.Id)
            {
                return BadRequest();
            }

            _subscriptionRepository.Update(subscription);
            return NoContent();
        }
    }
}
