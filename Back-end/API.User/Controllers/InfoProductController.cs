using BLL.Inerfaces.admin;
using DTO.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoProductController : ControllerBase
    {
        private IproductBusiness _iproductBusiness;

        public InfoProductController(IproductBusiness iproductBusiness)
        {
            _iproductBusiness = iproductBusiness;
        }


        [Route("SearchProductByName")]
        [HttpGet]
        public IActionResult SearchProductByName(string Name, int pageNumber, int pageSize)
        {
            if (pageNumber < 1 || pageSize < 1)
            {
                return BadRequest("Không thể tạo !!");
            }

            if (Name == null)
            {
                return Ok("Không có sản phẩm !");
            }

            var products = _iproductBusiness.SearchProductByName(Name, pageNumber, pageSize);
            return Ok(products);
        }


        [Route("GetNewProducts")]
        [HttpGet]
        public IActionResult GetNewProducts()
        {

            var products = _iproductBusiness.GetNewProducts();
            return Ok(products);
        }

        [Route("GetBestViewProducts")]
        [HttpGet]
        public IActionResult GetBestViewProducts()
        {

            var products = _iproductBusiness.GetBestViewProducts();
            return Ok(products);
        }

        [Route("GetProductByID")]
        [HttpGet]
        public detailProduct GetProductByID(int id)
        {
            return _iproductBusiness.GetProductByID(id);
        }
        [Route("GetAllProduct")]
        [HttpGet]
        public List<product> GetAll()
        {
            return _iproductBusiness.GetAll();
        }
    }
}
