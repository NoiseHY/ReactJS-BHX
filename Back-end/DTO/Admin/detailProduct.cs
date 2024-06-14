using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Admin
{
    public class detailProduct
    {
        public int idProd {  get; set; }
        public string nameProd {  get; set; }
        public string desProd { get; set; }
        public int num {  get; set; }
        public float up { get; set; }
        public float rating { get; set; }
        public int idCat { get; set; }
        public int idUnits { get; set; }
        public string? img {  get; set; }
        public string? imgDetails { get; set; }


        public string ing {  get; set; }
        public string note { get; set; }
        public string stor { get; set; }
        public string pop { get; set; }
        public string nameUn { get; set; }
        public string nameSup { get; set; }
        public string nameCat { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime dateEnd { get; set; }


    }
}
