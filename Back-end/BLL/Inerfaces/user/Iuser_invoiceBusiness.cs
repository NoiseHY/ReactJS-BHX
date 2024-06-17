using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Inerfaces.user
{
    public partial interface Iuser_invoiceBusiness
    {
        bool AddProductsToInvoiceDetails(int customerId, decimal countInv, List<user_invDetails> products);
        List<user_customer> GetCustomerDetailsByID(int id);

        List<user_invDetails> GetInvoiceDetailsByID(int id);

        List<user_invoice> GetInvoicesByCustomerID(int id);
        List<user_invoice> GetLatestInvoiceID();


    }
}
