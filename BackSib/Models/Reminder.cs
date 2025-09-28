using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;

namespace BackSib.Models
{
    public class Reminder
    {
        [Key]
        public int Id { get; set; }

        public string ShortDesc { get; set; }
        public string FullDesc{ get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime? DateFinish { get; set; }

        public int StatusId { get; set; }
    }
}
