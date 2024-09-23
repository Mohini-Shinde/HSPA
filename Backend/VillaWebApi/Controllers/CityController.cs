using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VillaWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Atlanta", "Canada", "New York" };
        }
        [HttpGet("{id}")] 
        public string Get(int id)
        {
            return "Atlanta";
        }
    }
}
