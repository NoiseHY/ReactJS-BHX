
using BLL.Bussiness;
using BLL.Inerfaces;
using DAL.Helper;
using DAL.Interfaces;
using DTO.Admin;
using DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace API_BHX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ILoginBusiness _loginBusiness;

        public loginController(IOptions<AppSettings> appSettings, ILoginBusiness loginBusiness)
        {
            _appSettings = appSettings.Value;
            _loginBusiness = loginBusiness;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] account loginRequest)
        {
            var accountInfo = _loginBusiness.Login(loginRequest.nameAcc, loginRequest.pasAcc);

            if (accountInfo != null)
            {
                if (accountInfo.idAuth == 1)
                {
                    var token = GenerateJwtToken(accountInfo);
                    return Ok(new { idAuth = accountInfo.idAuth, idCuts = accountInfo.idCuts, Token = token });
                }
                else
                {
                    return Ok(new { idAuth = accountInfo.idAuth, idCuts = accountInfo.idCuts });
                }
            }
            else
            {
                return BadRequest(new { error = "Tài khoản hoặc mật khẩu không đúng." });
            }
        }

        private string GenerateJwtToken(account account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, account.idAuth.ToString())

                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [Route("GetAccountImgAndCartCount/{id}")]
        [HttpGet]
        public List<account> GetAccountImgAndCartCount(int id)
        {
            return _loginBusiness.GetAccountImgAndCartCount(id);
        }

    }
}
