using BLL.Inerfaces.user;
using DAL.Interfaces.user;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Bussiness.user
{
    public partial class cartDetailsBusiness : IcartDetailsBusiness
    {
        private IcartDetailsRepository _icartDetailsRepository;
        public cartDetailsBusiness(IcartDetailsRepository icartDetailsRepository)
        {
            _icartDetailsRepository = icartDetailsRepository;
        }
        public bool Create(cartDetails cartDetails)
        {
            return _icartDetailsRepository.Create(cartDetails);
        }
        public bool Delete(int id)
        {
            return _icartDetailsRepository.Delete(id);
        }
    }
}
