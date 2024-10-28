using Fauna_Focus.Models;
using Fauna_Focus.Utils;
using FaunaFocus.Repositories;

namespace Fauna_Focus.Repositories
{
    public class PlacesRepository : BaseRepository, IPlacesRepository
    {
        public PlacesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Places> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Country, Region
                                FROM Places
                                ORDER BY Id DESC";

                    var reader = cmd.ExecuteReader();
                    var places = new List<Places>();

                    while (reader.Read())
                    {
                        places.Add(new Places()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Country = DbUtils.GetString(reader, "Country"),
                            Region = DbUtils.GetString(reader, "Region"),
                        });
                    }

                    reader.Close();
                    return places;
                }
            }
        }

        public List<Places> GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Country, Region
                                FROM Places 
                                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var places = new List<Places>();

                    while (reader.Read())
                    {
                        places.Add(new Places()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Country = DbUtils.GetString(reader, "Country"),
                            Region = DbUtils.GetString(reader, "Region"),
                        });
                    }

                    reader.Close();
                    return places;
                }
            }
        }

        public void Add(Places places)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Places (Name, Country, Region)
                OUTPUT INSERTED.ID
                VALUES (@Name, @Country, @Region)";

                    DbUtils.AddParameter(cmd, "@Name", places.Name);
                    DbUtils.AddParameter(cmd, "@Country", places.Country);
                    DbUtils.AddParameter(cmd, "@Region", places.Region);

                    places.Id = (int)cmd.ExecuteScalar();
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
                           DELETE FROM Places
                           WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Places places)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         UPDATE Places
                        SET Name = @Name,
                            Region = @Region,
                            Country = @Country
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", places.Id);
                    DbUtils.AddParameter(cmd, "@Name", places.Name);
                    DbUtils.AddParameter(cmd, "@Region", places.Region);
                    DbUtils.AddParameter(cmd, "@Country", places.Country);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
