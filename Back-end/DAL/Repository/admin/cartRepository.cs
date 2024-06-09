using DAL.Helper;
using DAL.Interfaces.admin;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.admin
{
    public partial class cartRepository : IcartRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public cartRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }

        public List<cartDetails> GetAllByID(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetCartDetailsByCustomerId",
                     "@CustomerId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<cartDetails>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(user_cart cart)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msgError, "AddProductToCart",
                    "@CustomerId",
                    "@ProductId",
                    "@Quantity");

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
        public bool Update(user_cart cart)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msgError, "UpdateCartItem",
                    "@CartId");

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
        public bool Delete(int id)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msgError, "RemoveFromCart",
                    "@CartId", id);

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

        public int Count(int id)
        {
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out string msgError, "CountProductsInCartByCustomerId",
                    "@CustomerId", id);

                if (result == null && !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }


                if (int.TryParse(result.ToString(), out int count))
                {
                    return count;
                }

                throw new Exception("Lỗi !");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckProductInCart(int id, int productId)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msgError, "CheckProductInCart",
                    "@MaKH", id,
                    "@MaSP", productId);


                if (result != null && (bool)result)
                {

                    return true;
                }


                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
