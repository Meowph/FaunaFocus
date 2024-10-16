using Fauna_Focus.Models;

namespace Fauna_Focus.Repositories
{
    public interface IExperienceRepository
    {
        List<Experiences> GetAllApprovedExperiences();
        List<Experiences> GetAllExperiencesByUserId(int userId);
        Experiences GetById(int id);
        void Add(Experiences experiences);
        void Delete(int id);
        void Update(Experiences experiences);
        List<Experiences> GetAllApprovedExperiencesByUserId(int id);
        void isApproved(int experienceId);
        List<Experiences> GetAllApprovedExperiencesByCategoryId(int id);

        List<Experiences> GetExperiencesBySubscriberId(int id);
    }
}
