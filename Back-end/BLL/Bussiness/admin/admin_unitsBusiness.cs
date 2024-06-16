using BLL.Inerfaces.admin;
using DAL.Interfaces.admin;
using DTO.Admin;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.admin
{
    public partial class admin_unitsBusiness : Iadmin_unitsBusiness
    {
        private Iadmin_unitsRepository _iadmin_UnitsRepository;
        public admin_unitsBusiness(Iadmin_unitsRepository iadmin_UnitsRepository)
        {
            _iadmin_UnitsRepository = iadmin_UnitsRepository; 
        }
        public List<units> GetAllUnits()
        {
            return _iadmin_UnitsRepository.GetAllUnits();
        }
    }
}
