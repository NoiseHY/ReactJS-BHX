using BLL.Inerfaces.admin;
using DAL.Interfaces.admin;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.admin
{
    public partial class cartBusiness : IcartBusiness
    {
        private IcartRepository _icartRepository;
        public cartBusiness(IcartRepository icartRepository)
        {
            _icartRepository = icartRepository;
        }
        public List<cartDetails> GetAllByID(int id)
        {
            return _icartRepository.GetAllByID(id);
        }
        public bool Create(user_cart cart)
        {
            return _icartRepository.Create(cart);
        }
        public bool Update(user_cart cart)
        {
            return _icartRepository.Update(cart);
        }
        public bool Delete(int id)
        {
            return _icartRepository.Delete(id);
        }
        public int Count(int id)
        {
            return _icartRepository.Count(id);
        }

        public bool CheckProductInCart(int id, int productId)
        {
            return _icartRepository.CheckProductInCart(id, productId);
        }
    }
}
