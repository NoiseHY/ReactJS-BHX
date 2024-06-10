using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces.user
{
    public partial interface Iuser_invoiceRepository
    {
        bool AddProductsToInvoiceDetails(int customerId, decimal countInv,List<user_invDetails> products);
        List<user_customer> GetCustomerDetailsByID(int id);
    }
}
