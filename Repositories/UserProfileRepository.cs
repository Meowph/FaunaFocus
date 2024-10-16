using Fauna_Focus.Models;
using Fauna_Focus.Utils;
using FaunaFocus.Repositories;

namespace Fauna_Focus.Repositories
{

     public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.ImageLocation, up.UserTypeId, up.Deactivated,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO UserProfile (FirstName, LastName, DisplayName, ImageLocation, Email, UserTypeId)
                OUTPUT INSERTED.ID
                VALUES (@FirstName, @LastName, @DisplayName, @ImageLocation, @Email, @UserTypeId)";

                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    // The OUTPUT INSERTED.ID part returns the new Id to the C# object
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, up.ImageLocation,
                               up.Email, up.UserTypeId, up.Deactivated,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               ORDER BY up.DisplayName";


                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();

                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }
        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.ImageLocation, up.UserTypeId, up.Deactivated,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                       SET UserTypeId = @UserTypeId,
                                           Deactivated = @Deactivated,
                                           ImageLocation = @ImageLocation
                                      WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@Deactivated", userProfile.Deactivated);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
