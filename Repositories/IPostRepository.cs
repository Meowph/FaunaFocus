using Microsoft.Extensions.Hosting;
using Fauna_Focus.Models;

namespace Fauna_Focus.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllApprovedPosts();
        List<Post> GetAllByUserId(int userId);
        Post GetById(int id);
        void Add(Post post);
        void Delete(int id);
        void Update(Post post);
        List<Post> GetAllApprovedPostsByUserId(int id);
        void IsApproved(int postId);
        List<Post> GetAllApprovedPostsByCategoryId(int id);
        List<Post> GetAllApprovedPostsByPlacesRegion(string placesRegion);
    }
}
