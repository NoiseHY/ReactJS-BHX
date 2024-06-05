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
    public partial class cartDetailsRepository : IcartDetailsRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public cartDetailsRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }

        public bool Create(cartDetails cartDetails)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msgError, "AddProductToCart",
                    "@CustomerId", cartDetails.idCart,
                    "@ProductId", cartDetails.idPro,
                    "@Quantity", cartDetails.num);

                if (result != null || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
