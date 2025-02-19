﻿using BLL.Inerfaces.admin;
using DAL.Interfaces.admin;
using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.admin
{
    public partial class productBusiness : IproductBusiness
    {
        private IproductRepository iproductRepository;
        public productBusiness(IproductRepository _iproductRepository)
        {
            iproductRepository = _iproductRepository;
        }
        public detailProduct GetProductByID(int id)
        {
            return iproductRepository.GetProductByID(id);
        }
        public List<units> GetUnitsByID(int id)
        {
            return iproductRepository.GetUnitsByID(id);
        }
        public List<categories> GetCategoriesByID(int id)
        {
            return iproductRepository.GetCategoriesByID(id);
        }
        public List<product> GetAll()
        {
            return iproductRepository.GetAll();
        }
        public List<product> GetNewProducts()
        {
            return iproductRepository.GetNewProducts();
        }
        public List<product> GetBestViewProducts()
        {
            return iproductRepository.GetBestViewProducts();
        }
        public List<product> SearchProductByName(string Name, int pageNumber, int pageSize)
        {
            return iproductRepository.SearchProductByName(Name, pageNumber, pageSize);
        }
        public bool Create(product product)
        {
            return iproductRepository.Create(product);
        }
        public bool CreateProdDetails(productDetails productDetails)
        {
            return iproductRepository.CreateProdDetails(productDetails);

        }
        public bool Update(product product)
        {
            return iproductRepository.Update(product);
        }
        public bool Delete(int id)
        {
            return iproductRepository.Delete(id);
        }
        public bool UpdateImageFilePath(int productId, string imagePath)
        {
            return iproductRepository.UpdateImageFilePath(productId, imagePath);
        }
    }
}
