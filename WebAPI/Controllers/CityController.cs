using Microsoft.AspNetCore.Mvc;
using WebAPI.Data.Repo;
using WebAPI.Models;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _repo;

        public CityController(ICityRepository repo)
        {
            this._repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var cities = await _repo.GetCitiesAsync();
            return Ok(cities);
        }
        //Post api/city/add?cname=Miami
        //Post api/city/add/Los Angeles

        [HttpPost("add")]
        [HttpPost("add/{cname}")]
        public async Task<IActionResult> AddCity(string cname)
        {
            City city = new City();
            city.Name = cname;
            _repo.AddCity(city);
            await _repo.SaveAsync();
            return Ok(city);
        }
        
        //Post data in Json format in Body
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            _repo.AddCity(city);
            await _repo.SaveAsync();
            return StatusCode(201);
        }
        //Delete api/city/delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
             _repo.DeleteCity(id);
            await _repo.SaveAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Canada";
        }
    }
}