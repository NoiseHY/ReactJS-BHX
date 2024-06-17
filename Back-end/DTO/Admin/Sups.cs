using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Admin
{
    public class Sups
    {
        public int id {  get; set; }
        public string? nameSup { get; set; }
        public string? addressSup { get; set; }
        public string? num { get; set; }
        public int stat { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime dateEnd { get; set; }
    }
}
