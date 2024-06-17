using DAL.Helper;
using DAL.Interfaces;
using DTO.Admin;
using DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;


namespace DAL.Repository
{
    public class loginRepository : ILoginRepository
    {
        private ExcuteProcedure _excuteProcedure;
        private readonly AppSettings _appSettings;

        public loginRepository(ExcuteProcedure excuteProcedure, IOptions<AppSettings> appSettings)
        {
            _excuteProcedure = excuteProcedure;
            _appSettings = appSettings.Value;
        }
        public account Login(string username, string password)
        {
            account accountInfo = new account();
            string msg = "";

            try
            {
                var login = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "LoginAccount",
                    "@Username", username,
                    "@Password", password);

                var user = login.Rows[0];

                if ((int)user["Result"] == 1)
                {

                    accountInfo.idAuth = Convert.ToInt32(user["idAuth"].ToString());
                    accountInfo.idCuts = Convert.ToInt32(user["idCuts"].ToString());

                }

                if ((int)user["Result"] == 0)
                {
                    accountInfo = null;
                }
            }
            catch (Exception e)
            {
                // Xử lý ngoại lệ nếu cần
                msg = e.Message;
                
            }

            return accountInfo;
        }

        public List<account> GetAccountImgAndCartCount(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetAccountImgAndCartCount",
                     "@id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<account>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
