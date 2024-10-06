using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repository.Interfaces;

namespace WebAPI.Repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _db;

        public UserRepository(DataContext db)
        {
            this._db = db;
        }
        public async Task<User> AuthenticateUser(string userName, string passwordText)
        {
            var user= await _db.Users.FirstOrDefaultAsync(x => x.Username == userName);
            if (user == null || user.PasswordKey ==null)
                return null;

            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                return null;
            else
                return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using(var hmac = new HMACSHA256(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for(int i=0; i<passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                        return false;
                }
                return true;
            }
        }

        public void Register(string userName, string password)
        {
            byte[] passwordHash, passwordKey; 
            using(var hmac = new HMACSHA256())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            User user = new User();
            user.Username = userName;
            user.Password = passwordHash;
            user.PasswordKey=passwordKey;
            _db.Users.Add(user);
        }

        public async Task<bool> UserAlreadyExists(string userName)
        {
            return await _db.Users.AnyAsync(x=> x.Username == userName);
        }
    }
}
