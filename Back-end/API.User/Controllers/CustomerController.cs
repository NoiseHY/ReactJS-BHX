using BLL.Bussiness.user;
using BLL.Inerfaces.user;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private Iuser_customerBusiness _iuser_CustomerBusiness;
        public CustomerController(Iuser_customerBusiness iuser_CustomerBusiness)
        {
            _iuser_CustomerBusiness = iuser_CustomerBusiness;
        }


        [Route("GetCustomerByID/{id}")]
        [HttpGet]
        public List<user_customer> GetCustomerByID(int id)
        {
            return _iuser_CustomerBusiness.GetCustomerByID(id);
        }
    }
}
