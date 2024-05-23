﻿using DAL.Helper;
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

        public List<product> GetAll(int pageNumber, int pageSize)
        {
            string msg = "";
            try
            {
                var dt = _excuteProcedure.ExecuteSProcedureReturnDataTable(out msg, "GetPaginatedProducts",
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
                var productId = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                    out msg, "AddProduct");

                if (productId != null || !string.IsNullOrEmpty(msg))
                {
                    throw new Exception(Convert.ToString(productId) + msg);
                }


                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool Update(product product)
        {
            string msg = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(
                     out msg, "UpdateProduct")
                     ; 

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

        public bool Delete(int id)
        {
            string msg = "";
            try
            {
                var result = _excuteProcedure.ExecuteScalarSProcedureWithTransaction(out msg, "DeleteProduct",
                    "@MaSP", id);

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
