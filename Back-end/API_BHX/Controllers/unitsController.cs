using BLL.Inerfaces.admin;
using DTO.Admin;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_BHX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class unitsController : ControllerBase
    {
        private Iadmin_unitsBusiness _iadmin_UnitsBusiness;
        public unitsController(Iadmin_unitsBusiness iadmin_UnitsBusiness)
        {
            _iadmin_UnitsBusiness = iadmin_UnitsBusiness;
        }


        [Route("GetAllUnits")]
        [HttpGet]
        public List<units> GetAllUnits()
        {
            return _iadmin_UnitsBusiness.GetAllUnits();
        }
    }
}
