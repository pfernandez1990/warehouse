using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseApi.Data;
using WarehouseApi.Interfaces;
using WarehouseApi.Models;

namespace WarehouseApi.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly WarehouseContext _context;
        public ProductRepository(WarehouseContext context)
        {
            _context = context;
            
        }
        /* Crear Product */
        public bool CreateProduct(Product product)
        {
            _context.Add(product);
            return Save();
        }

        /* Obtener el producto dado el id */
        public Product GetProductById(int productId)
        {
            return _context.Products.Where(p => p.Id == productId).FirstOrDefault();
        }

        /* Obtener un producto dado el nombre */
        public Product GetProductByName(string productName)
        {
            return _context.Products.Where(p => p.Name == productName).FirstOrDefault();
        }

        /* Obtener todos los productos */
        public ICollection<Product> GetProducts()
        {
            return _context.Products.OrderBy(p => p.Name).ToList();
        }

        /* Guardar datos */
        public bool ProductExist(int productId)
        {
            return _context.Products.Any(p => p.Id == productId);            
        }

        /* Comprobar que existe un producto dado el id */
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}