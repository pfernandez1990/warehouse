using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int ? PO { get; set; }
        public string ? Code { get; set; }
        public string ? Description { get; set; }
        public string ? Name { get; set; }
        public float ? Height { get; set; }
        public float ? Width { get; set; }
        public float ? Depth { get; set; }
        public float ? Weight { get; set; }
        public ICollection<Inventory> ProductsInventory { get; set; }
    }
}