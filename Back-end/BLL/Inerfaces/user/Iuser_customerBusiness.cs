using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Inerfaces.user
{
    public partial interface Iuser_customerBusiness
    {
        List<user_customer> GetCustomerByID(int id);

    }
}
