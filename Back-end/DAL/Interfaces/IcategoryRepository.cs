﻿using DTO.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public partial interface IcategoryRepository
    {
        List<category> GetCategories();

        List<category> GetNameCategories(int id);
    }
}
