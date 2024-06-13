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
    public partial class user_customerRepository : Iuser_customerRepository
    {
        public ExcuteProcedure excuteProcedure;
        public user_customerRepository(ExcuteProcedure excuteProcedure)
        {
            this.excuteProcedure = excuteProcedure;
        }

        public List<user_customer> GetCustomerByID(int id)
        {
            string msgError = "";
            try
            {
                var dt = excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetCustomerByID",
                     "@CustomerId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<user_customer>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
