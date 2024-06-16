﻿using BLL.Bussiness;
using BLL.Inerfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using Microsoft.AspNetCore.Authorization;
using DTO.Admin;
using DTO.User;

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


        [Route("uploadImage")]
        [HttpPost]
        public async Task<IActionResult> UploadImage(int productID, IFormFile file)
        {
            try
            {
                if (file == null || file.Length <= 0)
                {
                    return BadRequest("File không hợp lệ.");
                }

                // Đọc dữ liệu từ file thành mảng byte
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    byte[] imageBytes = ms.ToArray();

                    // Nén hình ảnh trước khi chuyển đổi thành base64
                    byte[] compressedImageBytes;
                    using (Image image = Image.Load(imageBytes))
                    {
                        var encoder = new JpegEncoder(); 
                        image.Mutate(x => x.Resize(200, 200)); 
                        using (var compressedStream = new MemoryStream())
                        {
                            image.Save(compressedStream, encoder);
                            compressedImageBytes = compressedStream.ToArray();
                        }
                    }

                    // Chuyển đổi mảng byte đã nén thành chuỗi base64
                    string base64String = Convert.ToBase64String(compressedImageBytes);

                    if (productID == 0)
                    {
                        return BadRequest("Mã sản phẩm = 0");
                    }

                    // Lưu trữ chuỗi base64 vào cơ sở dữ liệu
                    bool success = _iproductBusiness.UpdateImageFilePath(productID, base64String);

                    if (success)
                    {
                        return Ok("Thêm hình ảnh thành công!");
                    }
                    else
                    {
                        return BadRequest("Đã xảy ra lỗi khi cập nhật base64 vào cơ sở dữ liệu.");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
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
