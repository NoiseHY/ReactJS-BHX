﻿using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public partial interface IproductRepository
    {
        product GetProductByID(int id);
        List<product> GetAll(int pageNumber, int pageSize);
        List<product> GetNewProducts ();
        List<product> SearchProductByName(string Name, int pageNumber, int pageSize);
        bool Create(product product);
        bool Update(product product);
        bool Delete(int id);
        bool UpdateImageFilePath(int productId, string imagePath);
    }
}
