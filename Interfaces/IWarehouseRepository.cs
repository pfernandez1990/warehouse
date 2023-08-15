using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseApi.Models;

namespace WarehouseApi.Interfaces
{
    public interface IWarehouseRepository
    {
        /* Obtener listado de almacenes */
        ICollection<Warehouse> GetWarehouses();
        /* Obtener un almacen dado el id */
        Warehouse GetWarehouseById(int warehouseId);
        /* Obtener un almacen dado el nombre */
        Warehouse GetWarehouseByName(string warehouseName);
        /* Comprobar que existe un almacen dado el id */
        bool WarehouseExist (int warehouseId);
        /* Crear un almacen  */
        bool CreateWarehouse(Warehouse warehouse);
        /* Guardar datos */
        bool Save();
        /* Obtener Inventario dado el id del almacen*/
        ICollection<Inventory> GetInventoryByWarehouseId (int warehouseId);
        /* Agregar productos al inventario dado el producto y el almacen  */
        bool AddProductToWarehouse ( Inventory inventory);
        

    }
}