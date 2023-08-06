using Microsoft.EntityFrameworkCore;
using WarehouseApi.Data;
using WarehouseApi.Interfaces;
using WarehouseApi.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
/* Agregando mapper */
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

/* Agregando los repositorios y las interfaces */
builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/* Agregando el DbContext */
builder.Services.AddDbContext<WarehouseContext>(Options => {
    Options.UseSqlServer(builder.Configuration.GetConnectionString("WarehouseDB"));
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
