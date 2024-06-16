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
    public partial class admin_unitsRepository : Iadmin_unitsRepository
    {
        public ExcuteProcedure _excuteProcedure;
        public admin_unitsRepository(ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }
        public List<units> GetAllUnits()
        {
            string msgError = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msgError, "GetAllUnits");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<units>().ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
