using BLL.Bussiness;
using BLL.Inerfaces.admin;
using BLL.Inerfaces.user;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public class CartRequest
        {
            public int CustomerId { get; set; }
            public List<cartDetails> Products { get; set; }
        }

        private Iuser_cartBusiness _iuser_CartBusiness;
        public CartController(Iuser_cartBusiness iuser_CartBusiness)
        {
            _iuser_CartBusiness = iuser_CartBusiness;
        }

        [Route("GetAllDetailsProductsByID/{id}")]
        [HttpGet]
        public List<user_cart> GetAllDetailsProductsByID(int id)
        {
            return _iuser_CartBusiness.GetAllDetailsProductsByID(id);
        }

        [Route("AddMultipleProductsToCart")]
        [HttpPost]
        public IActionResult AddMultipleProductsToCart([FromBody] CartRequest request)
        {
            try
            {
                bool result = _iuser_CartBusiness.AddMultipleProductsToCart(request.CustomerId, request.Products);
                if (result)
                {
                    return Ok(new { message = "Thêm sản phẩm vào giỏ hàng thành công" });
                }
                else
                {
                    return BadRequest(new { message = "Lỗi khi thêm sản phẩm vào giỏ hàng" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }


        //[Route("Update")]
        //[HttpPut]
        //public IActionResult Update([FromBody] cart cart)
        //{
        //    bool isSuccess = _icartBusiness.Update(cart);

        //    if (isSuccess)
        //    {
        //        return Ok("Sửa sản phẩm trong giỏ hàng thành công !");
        //    }
        //    else
        //    {
        //        return BadRequest("Đã xảy ra lỗi khi sửa !");
        //    }
        //}


        //[Route("Delete/{id}")]
        //[HttpDelete]
        //public IActionResult Delete(int id)
        //{
        //    bool isSuccess = _icartBusiness.Delete(id);
        //    if (isSuccess)
        //    {
        //        return Ok("Xóa thành công giỏ hàng !");
        //    }
        //    else
        //    {
        //        return BadRequest("Đã xảy ra lỗi khi xóa !");
        //    }
        //}

        //[Route("Count/{id}")]
        //[HttpGet]
        //public IActionResult Count(int id)
        //{
        //    try
        //    {
        //        int productCount = _icartBusiness.Count(id);
        //        //return Ok($"Số lượng sản phẩm trong giỏ hàng của khách hàng có ID {id} là: {productCount}");
        //        return Ok(productCount);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Đã xảy ra lỗi: {ex.Message}");
        //    }
        //}


    }
}
