using BLL.Inerfaces.admin;
using DTO.Admin;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_BHX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class supsController : ControllerBase
    {
        private Iadmin_supsBusiness _iadmin_SupsBusiness;
        public supsController(Iadmin_supsBusiness iadmin_SupsBusiness)
        {
            _iadmin_SupsBusiness = iadmin_SupsBusiness;
        }


        [Route("GetAllSups")]
        [HttpGet]
        public List<Sups> GetAllCats()
        {
            return _iadmin_SupsBusiness.GetAllSups();
        }
    }
}
