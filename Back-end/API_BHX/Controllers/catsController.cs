using BLL.Bussiness.user;
using BLL.Inerfaces.admin;
using BLL.Inerfaces.user;
using DTO.Admin;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_BHX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class catsController : ControllerBase
    {
        private Iadmin_catsBusiness _iadmin_CatsBusiness;
        public catsController(Iadmin_catsBusiness iadmin_CatsBusiness)
        {
            _iadmin_CatsBusiness = iadmin_CatsBusiness;
        }


        [Route("GetAllCats")]
        [HttpGet]
        public List<categories> GetAllCats()
        {
            return _iadmin_CatsBusiness.GetAllCategories();
        }
    }
}
