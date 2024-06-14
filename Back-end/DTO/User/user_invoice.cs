using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class user_invoice
    {

        public int id {  get; set; }
	 
        public decimal countInv {  get; set; }
        public int idCus {  get; set; }
        public DateTime dateBegin {  get; set; }

        public DateTime dateEnd {  get; set; }
    }
}
