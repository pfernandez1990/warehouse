import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./styles.css";
import http from "../../components/services/http";
import { useFormik } from "formik";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const url = "/api/Product";

  const getProducts = async () => {
    const res = await http.get(url);
    setProducts(res.data);
  };

  const formik = useFormik({
    initialValues: {
      po: "",
      code: "",
      description: "",
      name: "",
      height: "",
      width: "",
      depth: "",
      weight: "",
    },

    onSubmit: (values) => {
      http
        .post(url, values)
        .then((res) => {})
        .catch((error) => {});
      window.location.reload(false);
    },
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="tablecontainer">
      <div className="container-fluid col-12 table-row-group" clas>
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
      {/* Button trigger modal */}
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Product
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
                New Product
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
                  <label class="form-label" htmlFor="po">
                    PO
                  </label>
                  <input
                    class="form-control"
                    id="po"
                    name="po"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.po}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="code">
                    Code
                  </label>
                  <input
                    class="form-control"
                    id="code"
                    name="code"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.code}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="description">
                    Description
                  </label>
                  <input
                    class="form-control"
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </div>
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
                  <label class="form-label" htmlFor="height">
                    Height
                  </label>
                  <input
                    class="form-control"
                    id="height"
                    name="height"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.height}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="width">
                    Width
                  </label>
                  <input
                    class="form-control"
                    id="width"
                    name="width"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.width}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="depth">
                    Depth
                  </label>
                  <input
                    class="form-control"
                    id="depth"
                    name="depth"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.depth}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="weight">
                    Weight
                  </label>
                  <input
                    class="form-control"
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
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
