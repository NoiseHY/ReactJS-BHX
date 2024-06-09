using DAL.Helper;
using DAL.Interfaces.user;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.user
{
    public partial class user_cartRepository : Iuser_cartRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public user_cartRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }
        public List<user_cart> GetAllByID(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetCartDetailsByCustomerId",
                     "@CustomerId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<user_cart>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
