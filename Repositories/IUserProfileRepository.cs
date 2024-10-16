using Fauna_Focus.Models;

namespace Fauna_Focus.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}
