//using Fauna_Focus.Models;
//using Fauna_Focus.Utils;
//using FaunaFocus.Repositories;

//namespace Fauna_Focus.Repositories
//{
//    public class CountryRegionsRepository : BaseRepository, ICountryRegionsRepository
//    {
//        public CountryRegionsRepository(IConfiguration configuration) : base(configuration) { }

//        public List<CountryRegions> GetById(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"SELECT Id, Country, Region
//                                        FROM CountryRegions
//                                        WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@id", id);

//                    var reader = cmd.ExecuteReader();

//                    var countryregions = new List<CountryRegions>();

//                    while (reader.Read())
//                    {
//                        countryregions.Add(new CountryRegions()
//                        {
//                            Id = DbUtils.GetInt(reader, "Id"),
//                            Country = DbUtils.GetString(reader, "Country"),
//                            Region = DbUtils.GetInt(reader, "Region"),
//                        });
//                    }

//                    reader.Close();

//                    return countryregions;
//                }
//            }
//        }

//        public List<CountryRegions> GetAll()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"SELECT Id, Country, Region
//                                        FROM CountryRegions
//                                        ORDER BY CountryRegionId DESC";

//                    var reader = cmd.ExecuteReader();

//                    var countryregions = new List<CountryRegions>();

//                    while (reader.Read())
//                    {
//                        countryregions.Add(new CountryRegions()
//                        {
//                            Id = DbUtils.GetInt(reader, "Id"),
//                            Country = DbUtils.GetString(reader, "Country"),
//                            Region = DbUtils.GetInt(reader, "Region"),
//                        });
//                    }

//                    reader.Close();

//                    return countryregions;
//                }
//            }
//        }

//        public void Add(CountryRegions countryregions)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        INSERT INTO CountryRegions ( Id, Country, Region )
//                        OUTPUT INSERTED.ID
//                        VALUES ( @Id, @Country, @Region )"
//                    ;

//                    DbUtils.AddParameter(cmd, "@Id", countryregions.Id);
//                    DbUtils.AddParameter(cmd, "@Country", countryregions.Country);
//                    DbUtils.AddParameter(cmd, "@Region", countryregions.Region);

//                    countryregions.Id = (int)cmd.ExecuteScalar();
//                }
//            }
//        }

//        public void Delete(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                           DELETE FROM CountryRegions
//                           WHERE Id = @id";

//                    DbUtils.AddParameter(cmd, "@id", id);

//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }

//        public void Update(CountryRegions countryregions)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                         UPDATE CountryRegions
//                        SET Country = @Country,
//                            Region = @Region
//                        WHERE Id = @id";

//                    DbUtils.AddParameter(cmd, "@Id", countryregions.Id);
//                    DbUtils.AddParameter(cmd, "@Country", countryregions.Country);
//                    DbUtils.AddParameter(cmd, "@Region", countryregions.Region);

//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }
//    }
//}

