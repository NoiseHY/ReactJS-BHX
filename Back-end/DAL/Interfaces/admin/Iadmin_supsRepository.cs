using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.admin
{
    public partial interface Iadmin_supsRepository
    {
        List<Sups> GetAllSups();

    }
}
