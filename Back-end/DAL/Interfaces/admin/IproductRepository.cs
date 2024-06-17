using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.admin
{
    public partial interface IproductRepository
    {
        detailProduct GetProductByID(int id);
        List<product> GetAll();
        List<units> GetUnitsByID(int id);
        List<categories> GetCategoriesByID(int id);

        List<product> GetNewProducts();
        List<product> GetBestViewProducts();

        List<product> SearchProductByName(string Name, int pageNumber, int pageSize);
        bool Create(product product);
        bool CreateProdDetails(productDetails productDetails);

        bool Update(product product);
        bool Delete(int id);
        bool UpdateImageFilePath(int productId, string imagePath);
    }
}
