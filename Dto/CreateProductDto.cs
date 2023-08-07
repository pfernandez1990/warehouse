using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseApi.Dto
{
    public class CreateProductDto
    {
        public int ? PO { get; set; }
        public string ? Code { get; set; }
        public string ? Description { get; set; }
        public string ? Name { get; set; }
        public float ? Height { get; set; }
        public float ? Width { get; set; }
        public float ? Depth { get; set; }
        public float ? Weight { get; set; }
    }
}