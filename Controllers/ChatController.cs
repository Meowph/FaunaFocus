using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;
        public ChatController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            return Ok(_chatRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Post(Chat chat)
        {
            _chatRepository.Add(chat);
            return CreatedAtAction("Get", new { id = chat.Id }, chat);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _chatRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }

            _chatRepository.Update(chat);
            return NoContent();
        }
    }
}