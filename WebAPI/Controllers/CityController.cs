using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Repository.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var cities = await _uow.CityRepository.GetCitiesAsync();

            var cityDto =_mapper.Map<IEnumerable<CityDto>>(cities);
            //var cityDto = from c in cities
            //              select new CityDto()
            //              {
            //                Id=c.Id,
            //                Name=c.Name
            //              };

            return Ok(cityDto);
        }
        //Post api/city/add?cname=Miami
        //Post api/city/add/Los Angeles

        [HttpPost("add")]
        [HttpPost("add/{cname}")]
        public async Task<IActionResult> AddCity(string cname)
        {
            var city = new City
            {
                Name = cname,
                LastUpdatedBy = 1,
                LastUpdatedOn = DateTime.Now
            };
            _uow.CityRepository.AddCity(city);
            await _uow.SaveAsync();
            return Ok(city);
        }
        
        //Post data in Json format in Body
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            //var city = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = DateTime.Now
            //};
            _uow.CityRepository.AddCity(city);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        //Put api/city/update
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            if(id != cityDto.Id)
                return BadRequest("Update not allowed.");
            var cityFromDb = await _uow.CityRepository.FindCity(id);
            if (cityFromDb == null)
                return BadRequest("Update not allowed.");
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;            
            _mapper.Map<CityDto>(cityFromDb);
            _uow.SaveAsync();
            return StatusCode(200);
        }
        //Put api/city/update   Update City name using put - partial Update like patch using specific DTO
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityUpdateDto cityDto)
        {
            var cityFromDb = await _uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;            
            _mapper.Map<CityDto>(cityFromDb);
            _uow.SaveAsync();
            return StatusCode(200);
        }
        //Put api/city/update
        //[{"op":"replace", "path":"/Name", "value":"TexasN"}]
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await _uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            cityToPatch.ApplyTo(cityFromDb,ModelState);
            _uow.SaveAsync();
            return StatusCode(200);
        }

        //Delete api/city/delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
             _uow.CityRepository.DeleteCity(id);
            await _uow.SaveAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Canada";
        }
    }
}