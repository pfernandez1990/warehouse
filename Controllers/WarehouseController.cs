using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WarehouseApi.Dto;
using WarehouseApi.Interfaces;
using WarehouseApi.Models;

namespace WarehouseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class WarehouseController : Controller
    {
        private readonly ILogger<WarehouseController> _logger;
        private readonly IWarehouseRepository _warehouseRepository;
        private readonly IMapper _mapper;

        public WarehouseController(ILogger<WarehouseController> logger, IWarehouseRepository warehouseRepository, IMapper mapper)
        {
            _logger = logger;
            _warehouseRepository = warehouseRepository;
            _mapper = mapper;
        }

       #region Endpoint para obtener todos los almacenes
       [HttpGet]
       [ProducesResponseType(200, Type = typeof(IEnumerable<Warehouse>))]
       public IActionResult GetWarehouses() {
        var warehouses = _mapper.Map<List<WarehouseDto>>(_warehouseRepository.GetWarehouses());

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }       

        return Ok(warehouses);

       }
       #endregion

       #region Endpoint para obtener un almacen dado un id
       [HttpGet("/GetWarehouseById/{warehouseId}")]
       [ProducesResponseType(200, Type = typeof(Warehouse))]
       [ProducesResponseType(400)]
       public IActionResult GetWarehouseById(int warehouseId) {
        if (!_warehouseRepository.WarehouseExist(warehouseId))
        {
            return NotFound();
        }
        
        var warehouse = _mapper.Map<WarehouseDto>(_warehouseRepository.GetWarehouseById(warehouseId));

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(warehouse);
       }

       #endregion

       #region Endpoint para obtener un alamcen dado el nombre
       [HttpGet("/GetWarehouseByName/{warehouseName}")]
       [ProducesResponseType(200, Type = typeof (Warehouse))]
       [ProducesResponseType(400)]
       public IActionResult GetWarehouseByName(string warehouseName) {
        try
        {
            var warehouse = _mapper.Map<WarehouseDto>(_warehouseRepository.GetWarehouseByName(warehouseName));
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            return Ok(warehouse);
        }
        catch (System.Exception)
        {
            
            throw new SystemException("The name of the warehouse does not exist.");
        }
       }
       #endregion

       #region Endpoint para obtener el inventario de un almacen dado el id
       [HttpGet("/GetInventoryByWarehouse/{warehouseId}")]
       [ProducesResponseType(200, Type =typeof(IEnumerable<Inventory>))]
       [ProducesResponseType(400)]
       public IActionResult GetInventoryByWarehouse(int warehouseId) {
        var inventory = _mapper.Map<List<InventoryDto>>(_warehouseRepository.GetInventoryByWarehouseId(warehouseId));
        if (!ModelState.IsValid){
            return BadRequest();
        }
        return Ok(inventory);
        
       }
       #endregion

       #region Endpoint para crear warehouse
       [HttpPost]
       [ProducesResponseType(204)]
       [ProducesResponseType(400)]
       public IActionResult CreateWarehouse ([FromBody]CreateWarehouseDto createWarehouseDto) {
        if (createWarehouseDto == null) {
            return BadRequest(ModelState);
        }

        var warehouse = _warehouseRepository.GetWarehouses()
            .Where(w => w.Name.Trim().ToUpper() == createWarehouseDto.Name.TrimEnd().ToUpper()).FirstOrDefault();
        
        if (warehouse != null) {
            ModelState.AddModelError("", "Warehouse already Exist.");
            return StatusCode(422, ModelState);
        }

        if (!ModelState.IsValid){
            return BadRequest(ModelState);
        }

        var warehouseMap = _mapper.Map<Warehouse>(createWarehouseDto);
        if (!_warehouseRepository.CreateWarehouse(warehouseMap)){
            ModelState.AddModelError("", "Something went wrong while saving.");
            return StatusCode(500, ModelState);
        }

        return Ok("Successfully created.");
        
       }
       #endregion
    }
}