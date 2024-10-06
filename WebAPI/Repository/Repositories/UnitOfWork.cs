using WebAPI.Data;
using WebAPI.Repository.Interfaces;

namespace WebAPI.Repository.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _db;

        public UnitOfWork(DataContext db)
        {
            this._db = db;
        }
        public ICityRepository CityRepository => new CityRepository(_db);
        public IUserRepository UserRepository => new UserRepository(_db);

        public async Task<bool> SaveAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}   
