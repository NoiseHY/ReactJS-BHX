using DAL.Helper;
using DAL.Interfaces.admin;
using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.admin
{
    public partial class admin_supsRepository : Iadmin_supsRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public admin_supsRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }
        public List<Sups> GetAllSups()
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetAllSups");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<Sups>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
