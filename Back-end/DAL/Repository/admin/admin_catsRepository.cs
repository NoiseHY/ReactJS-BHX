using DAL.Helper;
using DAL.Interfaces.admin;
using DTO.Admin;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.admin
{
    public partial class admin_catsRepository : Iadmin_catsRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public admin_catsRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }
        public List<categories> GetAllCategories()
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetAllCategories");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<categories>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
