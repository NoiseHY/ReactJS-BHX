using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class user_invDetails
    {
        public int id { get; set; }
        public int idInv { get; set; }
        public int idPro { get; set; }
        public int num { get; set; }
        public decimal up { get; set; }
        public decimal countInv { get; set; }
        public int idDisc { get; set; }

        public int InvoiceDetailID { get; set; }
        public int ProductID { get; set; }
        public string? ProductName { get; set; }
        public string? Img { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
