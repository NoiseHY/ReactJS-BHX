using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Admin
{
    public class account
    {
        public int id { get; set; }
        public string nameAcc { get; set; } 
        public string pasAcc { get; set; }
        public string? email { get; set; }
        public int? idAuth { get; set; }
        public int? idCuts { get; set; }
        public int checkAcc { get; set; }
        public DateTime? timeLogin { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime? dateEnd { get; set; }

    }
}
