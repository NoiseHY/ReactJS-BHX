using DTO.Admin;
using DTO.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public partial interface ILoginRepository
    {
        account Login(string username, string password);

        List<account> GetAccountImgAndCartCount(int id);

    }
}
