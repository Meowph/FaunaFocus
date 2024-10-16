using Fauna_Focus.Models;
using Fauna_Focus.Utils;
using FaunaFocus.Repositories;

namespace Fauna_Focus.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Subscription> GetAll()

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime,
                               subUserProfile.DisplayName AS 'SubscriberName', provUserProfile.DisplayName AS 'ProviderName'
                        FROM Subscription s
                        LEFT JOIN UserProfile subUserProfile ON s.SubscriberUserProfileId = subUserProfile.Id
                        LEFT JOIN UserProfile provUserProfile ON s.ProviderUserProfileId = provUserProfile.Id;";

                    var reader = cmd.ExecuteReader();
                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetNullableDateTime(reader, "BeginDateTime"),  // Updated method
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),      // Updated method
                            SubscriberUserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "SubscriberName")
                            },
                            ProviderUserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "ProviderName")
                            }
                        });
                    }

                    reader.Close();
                    return subscriptions;
                }
            }
        }

        public List<Subscription> GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime,
                               subUserProfile.DisplayName AS 'SubscriberName', provUserProfile.DisplayName AS 'ProviderName'
                        FROM Subscription s
                        LEFT JOIN UserProfile subUserProfile ON s.SubscriberUserProfileId = subUserProfile.Id
                        LEFT JOIN UserProfile provUserProfile ON s.ProviderUserProfileId = provUserProfile.Id
                        WHERE s.SubscriberUserProfileId = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetNullableDateTime(reader, "BeginDateTime"),  // Updated method
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),      // Updated method
                            SubscriberUserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "SubscriberName")
                            },
                            ProviderUserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "ProviderName")
                            }
                        });
                    }

                    reader.Close();
                    return subscriptions;
                }
            }
        }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime, @EndDateTime);";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime.HasValue ? subscription.BeginDateTime : DBNull.Value);
                    DbUtils.AddParameter(cmd, "@EndDateTime", subscription.EndDateTime.HasValue ? subscription.EndDateTime : DBNull.Value);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Subscription
                        SET EndDateTime = @EndDateTime
                        WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "BeginDateTime", subscription.BeginDateTime.HasValue ? subscription.BeginDateTime : DBNull.Value);
                    DbUtils.AddParameter(cmd, "@EndDateTime", subscription.EndDateTime.HasValue ? subscription.EndDateTime : DBNull.Value);
                    DbUtils.AddParameter(cmd, "@Id", subscription.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
