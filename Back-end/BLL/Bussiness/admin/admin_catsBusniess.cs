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
    public partial class admin_catsBusniess : Iadmin_catsBusiness
    {
        private Iadmin_catsRepository _iadmin_catsRepository;
        public admin_catsBusniess(Iadmin_catsRepository iadmin_catsRepository)
        {
            _iadmin_catsRepository = iadmin_catsRepository;
        }
        public List<categories> GetAllCategories()
        {
            return _iadmin_catsRepository.GetAllCategories();
        }
    }
}
