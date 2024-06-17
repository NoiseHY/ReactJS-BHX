using BLL.Bussiness;
using BLL.Inerfaces;
using BLL.Inerfaces.user;
using DTO.Rating;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class cartDetailsController : ControllerBase
    {
        private IcartDetailsBusiness _icartDetailsBusiness;
        public cartDetailsController(IcartDetailsBusiness icartDetailsBusiness)
        {
            _icartDetailsBusiness = icartDetailsBusiness;
        }

        [Route("Create")]
        [HttpPost]
        public IActionResult Create([FromBody] cartDetails cartDetails)
        {

            bool isSuccess = _icartDetailsBusiness.Create(cartDetails);

            if (isSuccess)
            {
                return Ok("Thêm thành công !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi !");
            }
        }
        [Route("Delete/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            bool isSuccess = _icartDetailsBusiness.Delete(id);
            if (isSuccess)
            {
                return Ok("Xóa thành công !");
            }
            else
            {
                return BadRequest("Đã xảy ra lỗi khi xóa !");
            }
        }
    }
}
