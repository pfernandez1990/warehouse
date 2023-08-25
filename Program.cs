using Microsoft.EntityFrameworkCore;
using WarehouseApi.Data;
using WarehouseApi.Interfaces;
using WarehouseApi.Repository;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
/* Configurando CORS */
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, policy => {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
    );
});
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

/* Variables de entorno */
// var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
// var dbName = Environment.GetEnvironmentVariable("DB_NAME");
// var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
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
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

