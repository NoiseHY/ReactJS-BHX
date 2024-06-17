using BLL.Inerfaces.admin;
using DAL.Interfaces.admin;
using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.admin
{
    public partial class admin_supsBusiness : Iadmin_supsBusiness
    {
        private Iadmin_supsRepository _iadmin_SupsRepository;
        public admin_supsBusiness(Iadmin_supsRepository iadmin_SupsRepository)
        {
            _iadmin_SupsRepository = iadmin_SupsRepository;
        }
        public List<Sups> GetAllSups()
        {
            return _iadmin_SupsRepository.GetAllSups();
        }

    }
}
