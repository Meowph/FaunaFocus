using Fauna_Focus.Utils;
using Fauna_Focus.Models;
using FaunaFocus.Repositories;
using Microsoft.Extensions.Hosting;

namespace Fauna_Focus.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllApprovedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.isApproved, p.otherUsersDisplayName, p.CategoryId, p.userId, p.Description, p.ImgUrl, p.Location,
                                        c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY p.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImgUrl = DbUtils.GetString(reader, "ImgUrl"),
                            Location = DbUtils.GetNullableString(reader, "Location"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            userId = DbUtils.GetNullableInt(reader, "userId"),
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

                    return posts;
                }
            }
        }

        public List<Post> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.isApproved, p.CategoryId, p.ImgUrl, p.UserProfileId, p.Location,
                                        c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.UserProfileId = @id AND p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY p.PublishDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", userId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            ImgUrl = DbUtils.GetString(reader, "ImgUrl"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return posts;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Description, p.ImgUrl, p.Location, p.PublishDateTime, p.UserProfileId, p.CategoryId, up.DisplayName
                          FROM Post p
                               LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                         WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Post post = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImgUrl = DbUtils.GetString(reader, "ImgUrl"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return post;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Description, ImgUrl, Location,
                                                                 PublishDateTime, isApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Description, @ImgUrl, @Location, 
                                                 @PublishDateTime, @isApproved, @CategoryId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@ImgUrl", post.ImgUrl);
                    DbUtils.AddParameter(cmd, "@Location", post.Location);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.isApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Title = @Title,
                               Description = @Description,
                               ImgUrl = @ImgUrl,
                               Location = @Location,
                               CategoryId = @CategoryId,
                               isApproved = @isApproved
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@ImgUrl", post.ImgUrl);
                    DbUtils.AddParameter(cmd, "@Location", post.Location);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@isApproved", post.isApproved);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetAllApprovedPostsByCategoryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT p.Id, p.Title, p.PublishDateTime, p.isApproved, p.CategoryId, p.UserProfileId, p.ImgUrl, p.Location,
                                        c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.isApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP AND c.Id = @Id
                                        ORDER BY p.PublishDateTime DESC"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ImgUrl = DbUtils.GetString(reader, "ImgUrl"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return posts;
                }
            }
        }

        public List<Post> GetAllApprovedPostsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.isApproved, p.CategoryId, p.UserProfileId, p.ImgUrl, p.Location,
                                        c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.isApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP AND up.Id = @Id
                                        ORDER BY p.PublishDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ImgUrl = DbUtils.GetString(reader, "ImgUrl"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return posts;
                }
            }
        }

        public void IsApproved(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                               SET
                               IsApproved = 1
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", postId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetPostsBySubscriberId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id AS 'PostId', p.Title, p.Description, p.CategoryId, p.ImgUrl, p.PublishDateTime, p.ImgUrl, p.Location,
                            up.Id AS 'UserProfileId', up.DisplayName, c.Name, s.BeginDateTime, s.EndDateTime
                            FROM Post p
                            INNER JOIN UserProfile up
                            ON p.UserProfileId = up.Id
                            INNER JOIN Subscription s
                            ON up.Id = s.ProviderUserProfileId
                            LEFT JOIN Category c
                            ON c.Id = p.CategoryId
                            WHERE s.SubscriberUserProfileId = @Id AND p.isApproved = 1 AND s.EndDateTime IS NULL
                            ORDER BY p.PublishDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImgUrl = reader.GetString(reader.GetOrdinal("ImgUrl")),
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

                    return posts;
                }
            }
        }
    }
}
