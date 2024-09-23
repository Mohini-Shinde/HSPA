using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _db;

        public CityRepository(DataContext db)
        {
            this._db = db;
        }
        public void AddCity(City city)
        {
            _db.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = _db.Cities.Find(cityId);
            _db.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _db.Cities.ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}
