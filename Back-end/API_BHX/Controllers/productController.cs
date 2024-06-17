using BLL.Bussiness;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using Microsoft.AspNetCore.Authorization;
using DTO.Admin;
using DTO.User;
using BLL.Inerfaces.admin;

namespace API_BHX.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {
        private IproductBusiness _iproductBusiness;

        public productController(IproductBusiness iproductBusiness ) 
        {
            _iproductBusiness = iproductBusiness;
        }

        [Route("GetAll")]
        [HttpGet]
        public List<product> GetAll()
        {          
            return _iproductBusiness.GetAll();
        }

        [Route("GetProductByID")]
        [HttpGet]
        public detailProduct GetProductByID(int id)
        {
            return _iproductBusiness.GetProductByID(id);
        }

        [Route("GetCategoriesByID/{id}")]
        [HttpGet]
        public List<categories> GetCategoriesByID(int id)
        {
            return _iproductBusiness.GetCategoriesByID(id);
        }

        [Route("GetUnitsByID/{id}")]
        [HttpGet]
        public List<units> GetUnitsByID(int id)
        {
            return _iproductBusiness.GetUnitsByID(id);
        }

        [Route("Create")]
        [HttpPost]
        public IActionResult Create([FromBody] product product)
        {
            if (product == null )
            {
                return BadRequest("Dữ liệu sản phẩm hoặc ảnh không hợp lệ !");
            }

            bool isSuccess = _iproductBusiness.Create(product);

            if (isSuccess)
            {
                return Ok("Thêm sản phẩm thành công !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi khi tạo sản phẩm !");
            }
        }

        [Route("AddProductDetail")]
        [HttpPost]
        public IActionResult AddProductDetail([FromBody] productDetails product)
        {
            if (product == null)
            {
                return BadRequest("Dữ liệu sản phẩm hoặc ảnh không hợp lệ !");
            }

            bool isSuccess = _iproductBusiness.CreateProdDetails(product);

            if (isSuccess)
            {
                return Ok("Thêm chi tiết sản phẩm thành công !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi khi tạo chi tiết sản phẩm !");
            }
        }

        [Route("Update")]
        [HttpPut]
        public IActionResult Update([FromBody] product product)
        {
            if (product == null)
            {
                return BadRequest("Dữ liệu sản phẩm hoặc ảnh không hợp lệ !");
            }

            bool isSuccess = _iproductBusiness.Update(product);

            if (isSuccess)
            {
                return Ok("Sửa sản phẩm mã " + product.id + " thành công !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi khi sửa sản phẩm !");
            }
        }

        [Route("Delete")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            bool isSuccess = _iproductBusiness.Delete(id);
            if (isSuccess)
            {
                return Ok("Xóa thành công sản phẩm !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi khi xóa sản phẩm !");
            }
        }
    }
}
