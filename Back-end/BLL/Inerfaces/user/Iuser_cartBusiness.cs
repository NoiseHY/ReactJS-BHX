﻿using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Inerfaces.user
{
    public partial interface Iuser_cartBusiness
    {
        List<user_cart> GetAllByID(int id);
    }
}
