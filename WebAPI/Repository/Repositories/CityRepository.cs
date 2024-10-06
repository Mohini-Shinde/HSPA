using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repository.Interfaces;

namespace WebAPI.Repository.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _db;

        public CityRepository(DataContext db)
        {
            _db = db;
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

        public async Task<City> FindCity(int id)
        {
            return await _db.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _db.Cities.ToListAsync();
        }

        
    }
}
