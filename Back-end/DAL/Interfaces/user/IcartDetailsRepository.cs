using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.user
{
    public partial interface IcartDetailsRepository
    {
        bool Create(cartDetails cartDetails);
        bool Delete(int id);

    }
}
