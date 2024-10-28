using Fauna_Focus.Models;

namespace Fauna_Focus.Repositories
{
    public interface IPlacesRepository
    {
        List<Places> GetAll();
        List<Places> GetById(int id);
        void Add(Places places);
        void Delete(int id);
        void Update(Places places);
    }
}
