using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class cartDetails
    {
        public int id {  get; set; }
        public int idCart { get; set; }
        public int idPro {  get; set; }
        public int num { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime? dateEnd { get; set; }

    }
}
