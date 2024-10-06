using WebAPI.Models;

namespace WebAPI.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AuthenticateUser(string userName, string password);
         void Register(string userName, string password);
        Task<bool> UserAlreadyExists(string userName);
    }
}
