using BLL.Bussiness.user;
using BLL.Inerfaces;
using BLL.Inerfaces.user;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static API.User.Controllers.CartController;

namespace API.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        public class InvoiceRequest
        {
            public int CustomerId { get; set; }
            public int CountInv { get; set; }
            public List<user_invDetails> Products { get; set; }
        }

        private Iuser_invoiceBusiness _iuser_InvoiceBusiness;
        public InvoiceController(Iuser_invoiceBusiness iuser_InvoiceBusiness)
        {
            _iuser_InvoiceBusiness = iuser_InvoiceBusiness;
        }

        [Route("AddProductsToInvoiceDetails")]
        [HttpPost]
        public IActionResult AddMultipleProductsToCart([FromBody] InvoiceRequest request)
        {
            try
            {
                bool result = _iuser_InvoiceBusiness.AddProductsToInvoiceDetails(request.CustomerId, request.CountInv, request.Products);
                if (result)
                {
                    return Ok(new { message = "Thêm sản phẩm vào hóa đơn thành công !" });
                }
                else
                {
                    return BadRequest(new { message = "Lỗi khi thêm hóa đơn" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }

        [Route("GetCustomerDetailsByID/{id}")]
        [HttpGet]
        public List<user_customer> GetCustomerDetailsByID(int id)
        {
            return _iuser_InvoiceBusiness.GetCustomerDetailsByID(id);
        }

        [Route("GetInvoiceDetailsByID/{id}")]
        [HttpGet]
        public List<user_invDetails> GetInvoiceDetailsByID(int id)
        {
            return _iuser_InvoiceBusiness.GetInvoiceDetailsByID(id);
        }

        [Route("GetInvoicesByCustomerID/{id}")]
        [HttpGet]
        public List<user_invoice> GetInvoicesByCustomerID(int id)
        {
            return _iuser_InvoiceBusiness.GetInvoicesByCustomerID(id);
        }
    }
}
