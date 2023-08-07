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
    [Route("[api/controller]")]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger,IProductRepository productRepository, IMapper mapper)
        {
           
            _mapper = mapper;
            _logger = logger;
            _productRepository = productRepository;
        }

        #region Endpoint para obtener todos los productos
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        public IActionResult GetProducts(){
            var products = _mapper.Map<List<Product>>(_productRepository.GetProducts());

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            return Ok(products);
            
        }
        #endregion

        #region Endpoint para obtener un producto dado el id
        [HttpGet("/GetProductById/[productId]")]
        [ProducesResponseType(200, Type = typeof(Product))]
        [ProducesResponseType(400)]
        public IActionResult GEtProductById(int productId) {
            if (!_productRepository.ProductExist(productId)) {
                return NotFound();
            }

            var product = _mapper.Map<ProductDto>(_productRepository.GetProductById(productId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(product);
            
        }
        #endregion

        #region Endpoint para obtener un producto dado el nombre
        [HttpGet("/GetProductByName")]
        [ProducesResponseType(200, Type = typeof(Product))]
        [ProducesResponseType(400)]
        public IActionResult GetProductByName(string productName) {
            try
            {
                var product = _mapper.Map<ProductDto>(_productRepository.GetProductByName(productName));
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                return Ok(product);
            }
            catch (System.Exception)
            {
                
                throw new SystemException("The name of the product does not exist.");
            }
        }
        #endregion

        #region Endpoint para crear un producto
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateProduct ([FromBody]CreateProductDto createProductDto) {
            if (createProductDto == null)
            {
                return BadRequest(ModelState);
            }

            var product = _productRepository.GetProducts()
                .Where(p => p.Name.Trim().ToUpper() == createProductDto.Name.TrimEnd().ToUpper()).FirstOrDefault();

            if (product != null)
            {
                ModelState.AddModelError("", "Product already exist.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productMap = _mapper.Map<Product>(createProductDto);
            if (!_productRepository.CreateProduct(productMap)) 
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            
            return Ok("Successfully created.");
        }
        #endregion

    }
}