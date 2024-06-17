using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Admin
{
    public class productDetails
    {
        public int id { get; set; }

        public string? ing {  get; set; }
        public string? note { get; set; }
        public string? stor {  get; set; }

        public string? pop {  get; set; }
        public int idUnit { get; set; }
        public int idSup {get; set; }
        public int idProd { get; set; }
        public int ?img { get; set; }
    }
}
