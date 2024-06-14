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
    public partial class user_invoiceBusiness : Iuser_invoiceBusiness
    {
        private Iuser_invoiceRepository _iuser_InvoiceRepository;
        public user_invoiceBusiness(Iuser_invoiceRepository iuser_InvoiceRepository)
        {
            _iuser_InvoiceRepository = iuser_InvoiceRepository;
        }

        public bool AddProductsToInvoiceDetails(int customerId, decimal countInv, List<user_invDetails> products)
        {
            return _iuser_InvoiceRepository.AddProductsToInvoiceDetails(customerId, countInv, products);
        }
        public List<user_customer> GetCustomerDetailsByID(int id)
        {
            return _iuser_InvoiceRepository.GetCustomerDetailsByID(id);
        }

        public List<user_invDetails> GetInvoiceDetailsByID(int id)
        {
            return _iuser_InvoiceRepository.GetInvoiceDetailsByID(id);
        }
        public List<user_invoice> GetInvoicesByCustomerID(int id)
        {
            return _iuser_InvoiceRepository.GetInvoicesByCustomerID(id);
        }
    }
}
