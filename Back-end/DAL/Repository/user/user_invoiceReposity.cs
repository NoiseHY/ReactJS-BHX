using DAL.Helper;
using DAL.Interfaces.user;
using DTO;
using DTO.User;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.user
{
    public partial class user_invoiceRepository : Iuser_invoiceRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public user_invoiceRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }

        public bool AddProductsToInvoiceDetails(int customerId, decimal countInv, List<user_invDetails> products)
        {
            string msgError = "";
            try
            {

                string productsJson = JsonConvert.SerializeObject(products.Select(p => new { p.idPro, p.num }));

                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msgError, "AddMultipleProductsToInvoiceDetails",
                    "@CustomerId", customerId,
                    "@CountInv", countInv,
                    "@Products", productsJson);

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

        public List<user_customer> GetCustomerDetailsByID(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetCustomerByID",
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

        public List<user_invDetails> GetInvoiceDetailsByID(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetInvoiceDetailsByID",
                     "@InvoiceID", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<user_invDetails>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<user_invoice> GetInvoicesByCustomerID(int id)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetInvoicesByCustomerID",
                     "@CustomerId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<user_invoice>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<user_invoice> GetLatestInvoiceID()
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetLatestInvoiceID");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<user_invoice>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
