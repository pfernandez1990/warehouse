import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

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
  const navigate = useNavigate();
  const handleClick = () => navigate("/OpWarehouseEast/Inventory");
  const url = "http://localhost:5000/api/warehouse";
  const [warehouses, setWarehouses] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getWarehouses();
  });

  const getWarehouses = async () => {
    const respuesta = await axios.get(url);
    setWarehouses(respuesta.data);
  };

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
                      <a onClick={handleClick} class="btn btn-primary ">
                        Go Inventory
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
    </div>
  );
};

export const ShowInventory = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/warehouses/list");
  const url = "http://localhost:5000/GetInventoryByWarehouse/1";
  const [inventory, setInventory] = useState([]);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    getInventory();
  });

  const getInventory = async () => {
    const respuesta = await axios.get(url);
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
            <a onClick={handleClick} class="btn btn-primary ">
              Go Warehouses
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
