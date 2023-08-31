import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import http from "../../components/services/http";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { selectWarehouse, setWarehouse } from "../../store/warehouse";
import {
  selectAddProduct,
  setProductId,
  setWarehouseId,
  setQuantity,
  setState,
} from "../../store/addProduct";

export const Home = () => {
  const data = [
    {
      name: "January",
      planned_orders: 4000,
      orders_received: 2400,
      amt: 2400,
    },
    {
      name: "February",
      planned_orders: 3000,
      orders_received: 1398,
      amt: 2210,
    },
    {
      name: "March",
      planned_orders: 2000,
      orders_received: 9800,
      amt: 2290,
    },
    {
      name: "April",
      planned_orders: 2780,
      orders_received: 3908,
      amt: 2000,
    },
  ];
  return <p className="home">aca van las graficas</p>;
};

export const List = () => {
  const warehouse = useSelector(selectWarehouse);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (warehouse) => {
    dispatch(setWarehouse(warehouse));
    navigate("/Warehouse/Inventory");
  };
  const url = "/api/warehouse";
  const [warehouses, setWarehouses] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    const respuesta = await http.get(url);
    setWarehouses(respuesta.data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },

    onSubmit: (values) => {
      http
        .post(url, values)
        .then((res) => {})
        .catch((error) => {});
      window.location.reload(false);
    },
  });

  return (
    <div className="tablecontainer">
      <div className="container-fluid col-12 table-row-group" clas>
        {/* Cabecera */}
        <div className="Header">
          <h3>Warehouses</h3>
        </div>
        {/* Tabla */}
        <div className="row col-12 ">
          <div className="table-resposive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Go Invntory</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {warehouses.map((warehouse, i) => (
                  <tr key={warehouse.id}>
                    <td>{i + 1}</td>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.address}</td>
                    <td>{warehouse.email}</td>
                    <td>{warehouse.phone}</td>
                    <td>
                      <a
                        onClick={() => handleClick(warehouse)}
                        class="btn btn-primary "
                      >
                        Inventory
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Botom añadir */}
        {/* <div className='row mt-3'>
            <div className='col-md-4 offset-4'>
                <div className='d-grid mx-auto'>
                    <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalWarehouses'>
                        <i className='fa-solid fa-circle-plus'></i> Add
                    </button>
                </div>
            </div>
        </div> */}
      </div>
      {/* Button trigger modal */}
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Warehouse
      </button>

      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                New Warehouse
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    class="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    class="form-control"
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    class="form-control"
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    class="form-control"
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShowInventory = () => {
  const warehouse = useSelector(selectWarehouse);
  const addProduct = useSelector(selectAddProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => navigate("/warehouses/list");
  const url = `/GetInventoryByWarehouse/${warehouse.id}`;
  const [inventory, setInventory] = useState([]);
  const [id, setId] = useState("/");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    getInventory();
  }, []);

  const addProducttoWarehouse = (warehouse) => {
    dispatch(setWarehouseId(warehouse.id));
    navigate("/Warehouse/Inventory/AddProducts");
  };

  const getInventory = async () => {
    const respuesta = await http.get(url);
    setInventory(respuesta.data);
  };

  return (
    <div className="tablecontainer">
      <div className="container-fluid col-12">
        {/* Cabecera */}
        <div className="Header">
          <h3>Inventory</h3>
        </div>
        {/* Tabla */}
        <div className="row col-12">
          <div className="table-resposive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {inventory.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-2">
            <a onClick={() => handleClick()} class="btn btn-primary ">
              Back to Warehouses
            </a>
          </div>
          <div className="col-2">
            <a
              onClick={() => addProducttoWarehouse(warehouse)}
              class="btn btn-primary "
            >
              Add Product to inventory
            </a>
          </div>
        </div>
        {/* Botom añadir */}
        {/* <div className='row mt-3'>
                <div className='col-md-4 offset-4'>
                    <div className='d-grid mx-auto'>
                        <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalWarehouses'>
                            <i className='fa-solid fa-circle-plus'></i> Add
                        </button>
                    </div>
                </div>
            </div> */}
      </div>
    </div>
  );
};

export const AddProductsToWarehouse = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productToAdd = useSelector(selectAddProduct);

  const url = "/api/Product";

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await http.get(url);
    setProducts(res.data);
  };

  const addProductId = (product) => {
    dispatch(setProductId(product.id));
  };

  const enviarData = () => {
    http
      .post(url, productToAdd)
      .then((res) => {})
      .catch((error) => {});
  };

  const formik = useFormik({
    initialValues: {
      quantity: "",
      state: "",
    },

    onSubmit: (values) => {
      dispatch(setQuantity(values.quantity));
      dispatch(setState(values.state));
      enviarData();
    },
  });

  return (
    <div className="tablecontainer">
      <h1>alshdkljas</h1>
      <div className="container-fluid col-12 table-row-group">
        {/* Cabecera */}
        <div className="Header">
          <h3>Products</h3>
        </div>
        {/* Tabla */}
        <div className="row col-12 ">
          <div className="table-resposive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th>PO</th>
                  <th>Height</th>
                  <th>Width</th>
                  <th>Depth</th>
                  <th>Weight</th>
                  <th>Add to inventory</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {products.map((product, i) => (
                  <tr key={product.id}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.description}</td>
                    <td>{product.po}</td>
                    <td>{product.height}</td>
                    <td>{product.width}</td>
                    <td>{product.depth}</td>
                    <td>{product.weight}</td>
                    <td>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => addProductId(product)}
                      >
                        Add to Inventory{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Botom añadir */}
        {/* <div className="row mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalWarehouses"
              >
                <i className="fa-solid fa-circle-plus"></i> Add
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    class="form-control"
                    id="quantity"
                    name="quantity"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="state">
                    State
                  </label>
                  <input
                    class="form-control"
                    id="state"
                    name="state"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
