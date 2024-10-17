namespace Fauna_Focus.Models
{
    public class Experiences
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? otherUsersDisplayName {  get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PublishDateTime { get; set; }
        public bool isApproved { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public UserProfile? UserProfile { get; set; }
        public int UserProfileId { get; set; }
    }
}
