using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseApi.Models;

namespace WarehouseApi.Interfaces
{
    public interface IProductRepository
    {
        /* Obtener listado de Productos */   
        ICollection<Product> GetProducts();
        /* Obtener Producto dado el id */
        Product GetProductById(int productId);
        /* Obtener producto dado el nombre */
        Product GetProductByName(string productName);
        /* COmprobar si existe un producto dado un id */
        bool ProductExist(int productId);
        /* Crear Producto */
        bool CreateProduct(Product product);
        /* Guardar datos */
        bool Save();
    }
}