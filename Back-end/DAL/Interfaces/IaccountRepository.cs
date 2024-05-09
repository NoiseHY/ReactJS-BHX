using DTO;
using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public partial interface IaccountRepository
    {
        List<account> GetAll();
        bool Create(account account);
        bool Update(account account);
        bool Delete(int id);
    }
}
