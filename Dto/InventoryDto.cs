using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseApi.Dto
{
    public class InventoryDto
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string State { get; set; }
    }
}