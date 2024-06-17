using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Inerfaces.user
{
    public partial interface IcartDetailsBusiness
    {
        bool Create(cartDetails cartDetails);
        public bool Delete(int id);
    }
}
