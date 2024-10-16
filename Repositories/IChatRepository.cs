using Fauna_Focus.Models;

namespace Fauna_Focus.Repositories
{
    public interface IChatRepository
    {
        List<Chat> GetAll();
        List <Chat> GetById(int id);
        void Add(Chat chat);
        void Delete(int id);
        void Update(Chat chat);
    }
}
