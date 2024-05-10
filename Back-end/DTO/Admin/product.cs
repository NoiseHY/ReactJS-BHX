using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Admin
{
    public class product
    {
        public int id { get; set; }
        public string namePro { get; set; } = null!;
        public string? desProd { get; set; }
        public int? num { get; set; }
        public decimal? up { get; set; }
        public int? idCat { get; set; }
        public string? Img { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime dateEnd { get; set; }

    }
}
