using Fauna_Focus.Models;
using Fauna_Focus.Utils;
using FaunaFocus.Repositories;

namespace Fauna_Focus.Repositories
{
        public class ChatRepository : BaseRepository, IChatRepository
    {
            public ChatRepository(IConfiguration configuration) : base(configuration) { }

            public  List<Chat> GetById(int id)
        {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"SELECT Id, userId, Text, PublishDateTime
                                        FROM Chat 
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                        var chats = new List<Chat>();

                        while (reader.Read())
                        {
                            chats.Add(new Chat()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                userId = DbUtils.GetInt(reader, "UserId"),
                                Text = DbUtils.GetString(reader, "Text"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            });
                        }

                        reader.Close();

                        return chats;
                    }
                }
            }

        public List<Chat> GetAll()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT Id, userId, Text, PublishDateTime
                                        FROM Chat 
                                         WHERE PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY PublishDateTime DESC";

                        var reader = cmd.ExecuteReader();

                        var chats = new List<Chat>();

                        while (reader.Read())
                        {
                            chats.Add(new Chat()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                userId = DbUtils.GetInt(reader, "UserId"),
                                Text = DbUtils.GetString(reader, "Text"),
                                PublishDateTime = DbUtils.GetDateTime(reader,"PublishDateTime"),
                            });
                        }

                        reader.Close();

                        return chats;
                    }
                }
            }

            public void Add(Chat chat)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Chat ( userId, Text, PublishDateTime )
                        OUTPUT INSERTED.ID
                        VALUES ( @userId, @Text, @PublishDateTime )"
                    ;

                    DbUtils.AddParameter(cmd, "@userId", chat.userId);
                    DbUtils.AddParameter(cmd, "@Text", chat.Text);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", chat.PublishDateTime);

                    chat.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"
                           DELETE FROM Chat 
                           WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

            public void Update(Chat chat)
            {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         UPDATE Chat
                        SET userId = @userId,
                            Text = @Text
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", chat.userId);
                    DbUtils.AddParameter(cmd, "Text", chat.Text);
                    DbUtils.AddParameter(cmd, "@Id", chat.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
