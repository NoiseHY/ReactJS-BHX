using BLL.Inerfaces.user;
using DAL.Interfaces.admin;
using DAL.Interfaces.user;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.user
{
    public partial class user_cartBusiness : Iuser_cartBusiness
    {
        private Iuser_cartRepository _iuser_CartRepository;
        public user_cartBusiness(Iuser_cartRepository iuser_CartRepository)
        {
            _iuser_CartRepository = iuser_CartRepository;
        }

        public List<user_cart> GetAllDetailsProductsByID(int id)
        {
            return _iuser_CartRepository.GetAllDetailsProductsByID(id);
        }
        public bool AddMultipleProductsToCart(int customerId, List<cartDetails> products)
        {
            return _iuser_CartRepository.AddMultipleProductsToCart(customerId, products);
        }

        public bool AddOneProductToCart(int customerId, int productId, int quantity)
        {
            return _iuser_CartRepository.AddOneProductToCart(customerId, productId, quantity);
        }
    }
}
