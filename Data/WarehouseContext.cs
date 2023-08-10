using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using WarehouseApi.Models;

namespace WarehouseApi.Data
{
    public class WarehouseContext : DbContext
    {
        public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options) {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect())
                    {
                        databaseCreator.Create();
                    }
                    if (!databaseCreator.HasTables())
                    {
                        databaseCreator.CreateTables();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /* Tablas de mi base de datos */
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Inventory> Inventories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Inventory>()
                .HasKey(i => new {i.WarehouseId, i.ProductId});
            modelBuilder.Entity<Inventory>()
                .HasOne(i => i.Product)
                .WithMany(p => p.ProductsInventory)
                .HasForeignKey(i => i.ProductId);
            modelBuilder.Entity<Inventory>()
                .HasOne(i => i.Warehouse)            
                .WithMany(w => w.WarehouseInventory)
                .HasForeignKey(i => i.WarehouseId);
        }


    }
}