using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class FurnishingType:BaseEntity
    {
        [Required]
        public int Name { get; set; }
    }
}