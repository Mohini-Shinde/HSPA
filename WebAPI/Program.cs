using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Repository.Interfaces;
using WebAPI.Repository.Repositories;
using Newtonsoft.Json;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using WebAPI.Extentions;
using WebAPI.Middlewares;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

    ////Read db password from Environment variable and append to main db connection
    //var sqlBuilder = new SqlConnectionStringBuilder(
    //    builder.Configuration.GetConnectionString("DefaultConnection"));
    //sqlBuilder.Password=builder.Configuration.GetSection("DBPassword").Value;
    //var conStr = sqlBuilder.ConnectionString;
    //options.UseSqlServer(conStr);
});

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
// Add repo
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
var secretKey = builder.Configuration.GetSection("AppSettings:Key").Value;
 var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = key,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero            
        };
    }
    );

var app = builder.Build();

// Configure the HTTP request pipeline.

//Error Handling globally using extension methods or custom exception middleware
   app.ConfigureExceptionHandler(builder.Environment);
//app.UseMiddleware<ExceptionMiddleware>();  // added this line to above extention method

app.UseRouting();
app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
