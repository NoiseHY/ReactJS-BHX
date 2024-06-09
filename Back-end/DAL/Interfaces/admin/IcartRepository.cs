using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.admin
{
    public partial interface IcartRepository
    {
        List<cartDetails> GetAllByID(int id);
        bool Create(user_cart cart);
        bool Update(user_cart cart);
        bool Delete(int id);
        int Count(int id);
        bool CheckProductInCart(int id, int productId);
    }
}
