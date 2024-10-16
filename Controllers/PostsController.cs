using Fauna_Focus.Models;
using Fauna_Focus.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostsController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllApprovedPosts());
        }

        [HttpGet("GetAllByUserId/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            var posts = _postRepository.GetAllByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("GetAllApprovedPostsByCategoryId/{id}")]
        public IActionResult GetAllApprovedPostsByCategoryId(int id)
        {
            var posts = _postRepository.GetAllApprovedPostsByCategoryId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpGet("GetAllApprovedPostsByUserId/{id}")]
        public IActionResult GetAllApprovedPostsByUserId(int id)
        {
            var posts = _postRepository.GetAllApprovedPostsByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // PUT api/<PostController>/5
        [HttpPatch("{id}")]
        public IActionResult Patch(int id)
        {
            //if (id != post.Id)
            //{
            //    return BadRequest();
            //}

            _postRepository.IsApproved(id);
            return NoContent();
        }

        [HttpGet("GetPostsBySubscriberId/{id}")]
        public IActionResult GetPostsBySubscriberId(int id)
        {
            var posts = _postRepository.GetPostsBySubscriberId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }
    }
}
