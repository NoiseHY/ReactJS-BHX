using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.user
{
    public partial interface Iuser_customerRepository
    {
        List<user_customer> GetCustomerByID(int id);

    }
}
