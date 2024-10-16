using System.ComponentModel.DataAnnotations;

namespace Fauna_Focus.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string? ImageLocation { get; set; }

        public int? UserTypeId { get; set; }
        public UserType? UserType { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        public bool Deactivated { get; set; }
        public int DeactivateVotes { get; set; }
        public int DemoteVotes { get; set; }
    }
}
