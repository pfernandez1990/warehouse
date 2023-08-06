using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Models;

namespace WarehouseApi.Data
{
    public class WarehouseContext : DbContext
    {
        public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options) {

        }

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