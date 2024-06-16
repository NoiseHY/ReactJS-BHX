using DAL.Helper;
using DAL.Interfaces;
using DTO.Admin;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class productRepository : IproductRepository
    {
        private ExcuteProcedure _excuteProcedure;
        public productRepository (ExcuteProcedure excuteProcedure)
        {
            _excuteProcedure = excuteProcedure;
        }

        public bool UpdateImageFilePath(int productId, string imagePath)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "UpdateSanPhamImg",
                     "@MaSP", productId,
                     "@Img", imagePath);
                if (!string.IsNullOrEmpty(msg))
                {
                    return false;
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<product> GetNewProducts()
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetNewProducts");

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<product>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<product> GetBestViewProducts()
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetBestViewProducts");

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<product>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public detailProduct GetProductByID(int id)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetProductById",
                     "@ProductId", id);
                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg );
                return dt.ConvertTo<detailProduct>().FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<product> GetAll()
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetAllProducts");

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<product>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<units> GetUnitsByID(int id)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetUnitByID",
                    "@UnitID", id);

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<units>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<categories> GetCategoriesByID(int id)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetCatByID",
                    "@CategoryID", id);

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<categories>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<product> SearchProductByName(string Name, int pageNumber, int pageSize)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "SearchProductByName",
                    "@ProductName",Name,
                    "@PageNumber", pageNumber,
                    "@PageSize", pageSize);

                if (!string.IsNullOrEmpty(msg))
                    throw new Exception(msg);

                return dt.ConvertTo<product>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(product product)
        {
            string msg = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                out msg, "AddProduct",
                "@nameProd", product.nameProd,
                "@desProd", product.desProd,
                "@num", product.num,
                "@up", product.up,
                "@img", product.img,
                "@rating", product.rating,
                "@viewProd", product.viewProd,
                "@idCat", product.idCat,
                "@idUnits", product.idUnits
                );

                if (result != null || !string.IsNullOrEmpty(msg))
                {
                    throw new Exception(Convert.ToString(result) + msg);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public bool Update(product product)
        {
            string msg = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msg, "UpdateProduct",
                    "@id", product.id,
                    "@nameProd", product.nameProd,
                    "@desProd", product.desProd,
                    "@num", product.num,
                    "@up", product.up,
                    "@img", product.img,
                    "@rating", product.rating,
                    "@viewProd", product.viewProd,
                    "@idCat", product.idCat,
                    "@idUnits", product.idUnits
                 );

                if (result != null || !string.IsNullOrEmpty(msg))
                {
                    throw new Exception(Convert.ToString(result) + msg);
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
            string msg = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msg, "DeleteProduct",
                    "id", id);

                if (result != null || !string.IsNullOrEmpty(msg))
                {
                    throw new Exception(Convert.ToString(result) + msg);
                }

                return true;    
            }
            catch 
            {
                return false;
            }
        }



    }
}
