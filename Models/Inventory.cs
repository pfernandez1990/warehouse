using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseApi.Models
{
    public class Inventory
    {
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public Warehouse Warehouse { get; set; }
        public Product Product { get; set; }
        public string State { get; set; }
        public int Quantity { get; set; }

    }
}