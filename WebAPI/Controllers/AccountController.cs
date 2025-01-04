using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extentions;
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
            ApiError apiError = new ApiError();
                if (user == null)
                {
                    apiError.ErrorCode = Unauthorized().StatusCode;
                    apiError.ErrorMessage = "Invalid User Id or password.";
                    apiError.ErrorDetails = "This error appears when credentials provided are wrong.";
                    return Unauthorized(apiError);
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
            ApiError apiError = new ApiError();
            if(loginDto.Username.IsEmpty() || loginDto.Password.IsEmpty()) { 
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Username or Password cannot be blank.";
                return BadRequest(apiError);
            }
            
            if (await _uow.UserRepository.UserAlreadyExists(loginDto.Username))
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exists, please try something else.";
                return BadRequest(apiError);
            _uow.UserRepository.Register(loginDto.Username, loginDto.Password);
            await _uow.SaveAsync();
            return StatusCode(201);
        }
        public string CreateJWT(User user)
        {
            var secretKey = _config.GetSection("AppSettings:JwtKey").Value;
            //var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));
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
