using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class user_customer
    {
        public int id {  get; set; }
        public string nameCus {get; set; }
        public string addressCus {get; set; }
        public string num { get; set; }
	    public string email {get; set; }
        public string? img { get; set; }
	    public DateTime dateBegin { get; set; }
	
        public DateTime dateEnd {get; set; }
    }
}
