using Fauna_Focus.Models;
using Fauna_Focus.Utils;
using FaunaFocus.Repositories;

namespace Fauna_Focus.Repositories
{
    public class ExperienceRepository : BaseRepository, IExperienceRepository
    {
        public ExperienceRepository(IConfiguration configuration) : base(configuration) { }

        public List<Experiences> GetAllApprovedExperiences()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT e.Id, e.Title, e.IsApproved, e.otherUsersDisplayName, e.CategoryId, e.UserId, e.Description, 
                       e.PublishDateTime, c.Name, up.DisplayName, e.UserProfileId
                FROM Experience e
                LEFT JOIN Category c ON c.Id = e.CategoryId
                LEFT JOIN UserProfile up ON up.Id = e.UserProfileId
                WHERE e.PublishDateTime <= CURRENT_TIMESTAMP
                ORDER BY e.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var experiences = new List<Experiences>();

                    while (reader.Read())
                    {
                        experiences.Add(new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            Description = DbUtils.GetString(reader, "Description"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserId = DbUtils.GetNullableInt(reader, "UserId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            otherUsersDisplayName = DbUtils.GetNullableString(reader, "otherUsersDisplayName"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }
                    Console.Write("check");
                    reader.Close();

                    return experiences;
                }
            }
        }

        public List<Experiences> GetAllExperiencesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.Id, e.Title, e.isApproved, e.CategoryId, e.userId, e.Description, e.PublishDateTime, e.UserProfileId,
                                        c.Name, up.DisplayName
                                        FROM Experience e
                                        LEFT JOIN Category c On c.Id = e.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = e.UserProfileId
                                        WHERE e.UserProfileId = @id AND e.isApproved = 1 AND e.PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY e.PublishDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", userId);

                    var reader = cmd.ExecuteReader();

                    var experiences = new List<Experiences>();

                    while (reader.Read())
                    {
                        experiences.Add(new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return experiences;
                }
            }
        }

        public Experiences GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT e.Id, e.Title, e.Description, e.PublishDateTime, e.UserProfileId, e.CategoryId, up.DisplayName
                          FROM Experience e
                               LEFT JOIN UserProfile up on up.Id = e.UserProfileId
                         WHERE e.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Experiences experiences = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        experiences = new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        };
                    }
                    reader.Close();

                    return experiences;
                }
            }
        }

        public void Add(Experiences experiences)
        {
            // Log the value of PublishDateTime before entering the connection block
            Console.WriteLine($"PublishDateTime being used in Add: {experiences.PublishDateTime}");
            // Validate PublishDateTime value before any database interaction
            if (experiences.PublishDateTime < new DateTime(1753, 1, 1) || experiences.PublishDateTime > new DateTime(9999, 12, 31))
            {
                Console.WriteLine($"Bad data: Invalid PublishDateTime value detected. Skipping add operation. PublishDateTime: {experiences.PublishDateTime}");
                return; // Early return to avoid proceeding with bad data
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"INSERT INTO Experience (Title, Description, 
                                                                 PublishDateTime, isApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Description,
                                                 @PublishDateTime, @isApproved, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", experiences.Title);
                    DbUtils.AddParameter(cmd, "@Description", experiences.Description);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", experiences.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", experiences.isApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", experiences.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", experiences.UserProfileId);

                    experiences.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Experience WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Experiences experiences)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Log the value of PublishDateTime before anything else
                    Console.WriteLine($"PublishDateTime being used in Update: {experiences.PublishDateTime}");
                    // Check if PublishDateTime is valid and log if it is invalid
                    if (experiences.PublishDateTime < new DateTime(1753, 1, 1) || experiences.PublishDateTime > new DateTime(9999, 12, 31))
                    {
                        Console.WriteLine($"Invalid PublishDateTime value: {experiences.PublishDateTime}");
                        throw new ArgumentOutOfRangeException("PublishDateTime", "PublishDateTime is outside the valid SQL Server range.");
                    }
                        cmd.CommandText = @"
                        UPDATE Experience
                           SET Title = @Title,
                               Description = @Description,
                               CategoryId = @CategoryId,
                               isApproved = @isApproved,
                               PublishDateTime = @PublishDateTime
                         WHERE Id = @Id";

                    // Log the value of PublishDateTime
                    Console.WriteLine($"PublishDateTime being used in Update: {experiences.PublishDateTime}");

                    DbUtils.AddParameter(cmd, "@Title", experiences.Title);
                    DbUtils.AddParameter(cmd, "@Description", experiences.Description);
                    DbUtils.AddParameter(cmd, "@CategoryId", experiences.CategoryId);
                    DbUtils.AddParameter(cmd, "@isApproved", experiences.isApproved);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", experiences.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@Id", experiences.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Experiences> GetAllApprovedExperiencesByCategoryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT e.Id, e.Title, e.PublishDateTime, e.isApproved, e.CategoryId, e.UserProfileId, c.Name, up.DisplayName
                                        FROM Experience e
                                        LEFT JOIN Category c On c.Id = e.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = e.UserProfileId
                                        WHERE e.isApproved = 1 AND e.PublishDateTime <= CURRENT_TIMESTAMP AND c.Id = @Id
                                        ORDER BY e.PublishDateTime DESC"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Experiences> experiences = new List<Experiences>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        experiences.Add(new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return experiences;
                }
            }
        }

        public List<Experiences> GetAllApprovedExperiencesByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.Id, e.Title, e.Description, e.PublishDateTime, e.isApproved, e.CategoryId, e.UserProfileId, c.Name, 
                                        up.DisplayName
                                        FROM Experience e
                                        LEFT JOIN Category c On c.Id = e.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = e.UserProfileId
                                        WHERE e.isApproved = 1 AND e.PublishDateTime <= CURRENT_TIMESTAMP AND up.Id = @Id
                                        ORDER BY e.PublishDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Experiences> experiences = new List<Experiences>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        experiences.Add(new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return experiences;
                }
            }
        }

        public void isApproved(int experienceId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Experience
                               SET
                               IsApproved = 1
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", experienceId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Experiences> GetExperiencesBySubscriberId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.Id AS 'ExperienceId', e.Title, e.Description, e.CategoryId, e.PublishDateTime, up.Id AS 'UserProfileId', up.DisplayName, c.Name, s.BeginDateTime, s.EndDateTime
                            FROM Experience e
                            INNER JOIN UserProfile up
                            ON e.UserProfileId = up.Id
                            INNER JOIN Subscription s
                            ON up.Id = s.ProviderUserProfileId
                            LEFT JOIN Category c
                            ON c.Id = e.CategoryId
                            WHERE s.SubscriberUserProfileId = @Id AND e.isApproved = 1 AND s.EndDateTime IS NULL
                            ORDER BY e.PublishDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Experiences> experiences = new List<Experiences>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        experiences.Add(new Experiences()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return experiences;
                }
            }
        }
    }
}
