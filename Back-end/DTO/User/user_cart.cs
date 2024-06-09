using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class user_cart
    {
        

        public int  CartDetailId { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string Img { get; set; }

        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string UnitName { get; set; }
        public string SupplierName { get; set; }


    }
}
