using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseApi.Interfaces;
using WarehouseApi.Data;
using WarehouseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace WarehouseApi.Repository
{
    public class WarehouseRepository : IWarehouseRepository
    {
        private readonly WarehouseContext _context;
        public WarehouseRepository(WarehouseContext context)
        {
            _context = context;
        }

        /* Crear Warehouse */
        public bool CreateWarehouse(Warehouse warehouse)
        {
            _context.Add(warehouse);
            return Save();
        }

        /*Obtener Warehouse dado el id  */
        public Warehouse GetWarehouseById(int warehouseId)
        {
            return _context.Warehouses.Where( w => w.Id == warehouseId ).FirstOrDefault();
        }

        /* Obtener warehouse dado el nomnre */
        public Warehouse GetWarehouseByName(string warehouseName)
        {
            return _context.Warehouses.Where(w => w.Name == warehouseName).FirstOrDefault();
        }

        /* Obtener todos los almacenes */
        public ICollection<Warehouse> GetWarehouses()
        {
            return _context.Warehouses.OrderBy( w => w.Name).ToList();
        }

        /* Gardar datos */
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ?  true : false;
        }

        /* Comprobar si existe un almacen dado el id */
        public bool WarehouseExist(int warehouseId)
        {
            return _context.Warehouses.Any(w => w.Id == warehouseId);
        }

        /* Obtener inventario dado el id del almacen */
        public ICollection<Inventory> GetInventoryByWarehouseId(int warehouseId)
        {
            return _context.Inventories.Include(i => i.Product).Where(i => i.WarehouseId == warehouseId).ToList();
        }
        
        /* Agregar producto al inventario dado el warehouse y el producto */
        public bool AddProductToWarehouse( Inventory inventory)
        {                      
            _context.Add(inventory);
            return Save();
        }
    }
}