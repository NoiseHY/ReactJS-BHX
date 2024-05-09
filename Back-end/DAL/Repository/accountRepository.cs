using DAL.Helper;
using DAL.Interfaces;
using DTO;
using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DAL.Repository
{
    public partial class accountRepository : IaccountRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public accountRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }
        public List<account> GetAll(int pageNumber, int pageSize)
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetAllAccounts",
                    "@PageNumber", pageNumber,
                    "@PageSize", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<account>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(account account)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                out msgError, "CreateAccount",
                "@Name", account.nameAcc, 
                "@Password", account.pasAcc, 
                "@Email", account.email, 
                "@AuthorizationID", account.idAuth, 
                "@CustomerID", account.idCuts
                );

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


        public bool Update(account account)
        {
            string msgError = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateAccount",
                    "@AccountID", account.id,
                    "@Name", account.nameAcc,
                    "@Password", account.pasAcc,
                    "@Email", account.email,
                    "@AuthorizationID", account.idAuth,
                    "@CustomerID", account.idCuts
                 );

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
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msgError, "DeleteAccount",
                    "@AccountID", id);

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
