using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Repository.Interfaces;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _config;

        public AccountController(IUnitOfWork uow, IConfiguration config)
        {
            this._uow = uow;
            this._config = config;
        }
        //api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await this._uow.UserRepository.AuthenticateUser(loginDto.Username,loginDto.Password);
                if (user == null)
                {
                    return Unauthorized();
                }
            var loginRes = new LoginResDto();
            loginRes.Username = user.Username;
            loginRes.Token = CreateJWT(user);            
            return Ok(loginRes); 
        }
        //api/account/login
        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginDto loginDto)
        {
            if (await _uow.UserRepository.UserAlreadyExists(loginDto.Username))
                return BadRequest("User already exists, please try something else");
            _uow.UserRepository.Register(loginDto.Username, loginDto.Password);
            await _uow.SaveAsync();
            return StatusCode(201);
        }
        public string CreateJWT(User user)
        {
            var secretKey = _config.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,  user.Username),
                new Claim(ClaimTypes.NameIdentifier,  user.Id.ToString())
            };
            var signinCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires=DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signinCredentials
              
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return  tokenHandler.WriteToken(token);
        }
    }
}
