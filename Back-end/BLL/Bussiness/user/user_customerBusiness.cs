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
    public partial class user_customerBusiness : Iuser_customerBusiness
    {
        private Iuser_customerRepository _iuser_CustomerRepository;
        public user_customerBusiness(Iuser_customerRepository iuser_CustomerRepository)
        {
            _iuser_CustomerRepository = iuser_CustomerRepository;
        }

        public List<user_customer> GetCustomerByID(int id)
        {   
            return _iuser_CustomerRepository.GetCustomerByID(id);
        }


    }
}
