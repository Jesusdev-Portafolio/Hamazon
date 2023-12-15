using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hamazonUnitTests
{
    public class MoqData
    {
        public static IEnumerable<Product> Products = new List<Product>()
        {
            new Product(){ Name = "product1", Id  = 1} ,
            new Product(){ Name  = "product2" , Id = 2 } ,
            new Product(){ Name = "product3" , Id = 3}
        };

    }
}
