import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { generateOrderID, generateTransactionID } from "../../utils/genId";
import { Link } from "react-router-dom";
import Header from "../Product/Header";

const OrderForm = () => {
  const initialOrderID = generateOrderID();
  const initialTransactionID = generateTransactionID();

  const [formData, setFormData] = useState({
    orderDetails: {
      OrderID: initialOrderID,
      UserID: "",
      MaterialID: "",
      OrderDate: new Date().toISOString().slice(0, 10),
      PickupDate: "",
      Status: "New",
      Type: "Manual",
      TransactionID: initialTransactionID,
      Amount: "",
      Description: "",
      Measurement: {
        blouseLength: "",
        shoulderWidth: "",
        sleeveLength: "",
        neckDepth: "",
        chest: "",
        waist: "",
        hips: "",
        shoulders: "",
        LehengaLength: "",
        neck: "",
        jacketLength: "",
      },
    },
    transactionDetails: {
      TransactionID: initialTransactionID,
      Amount: "",
      PaymentType: "Manual",
      TransDate: new Date().toISOString().slice(0, 10),
    },
  });

  const [userIDs, setUserIDs] = useState([]);
  const [filteredUserIDs, setFilteredUserIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productIDs, setProductIDs] = useState([]);
  const [filteredProductIDs, setFilteredProductIDs] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8075/user/getAllUsers")
      .then((response) => {
        const users = response.data;
        const onlineUserIDs = users.map((user) => user.UserID);
        setUserIDs(onlineUserIDs);
        setFilteredUserIDs(onlineUserIDs);
      })
      .catch((error) => {
        console.error("Error fetching user IDs:", error);
      });

    axios
      .get("http://localhost:8075/inventory/retrieve")
      .then((response) => {
        const products = response.data;
        const filteredProducts = products.filter(
          (product) =>
            product.raw_material_type === "Material" ||
            product.raw_material_type === "Other"
        );
        const productIDs = filteredProducts.map((product) => product.productId);
        setProductIDs(productIDs);
        setFilteredProductIDs(productIDs);
      })
      .catch((error) => {
        console.error("Error fetching product IDs:", error);
      });
  }, []);

  useEffect(() => {
    if (formData.orderDetails.UserID) {
      axios
        .get(
          `http://localhost:8075/user/getUserByUserID/${formData.orderDetails.UserID}`
        )
        .then((response) => {
          setSelectedUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [formData.orderDetails.UserID]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredIDs = userIDs.filter((userID) =>
      userID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUserIDs(filteredIDs);
  };

  const handleUserIDChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      orderDetails: {
        ...prevState.orderDetails,
        UserID: e.target.value,
      },
    }));
  };

  const handleProductIDChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      orderDetails: {
        ...prevState.orderDetails,
        MaterialID: e.target.value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name === "Amount") {
        return {
          ...prevState,
          orderDetails: {
            ...prevState.orderDetails,
            Amount: value,
          },
          transactionDetails: {
            ...prevState.transactionDetails,
            Amount: value,
          },
        };
      } else if (name.startsWith("Measurement")) {
        const measurementKey = name.split("_")[1];
        return {
          ...prevState,
          orderDetails: {
            ...prevState.orderDetails,
            Measurement: {
              ...prevState.orderDetails.Measurement,
              [measurementKey]: value,
            },
          },
        };
      } else {
        return {
          ...prevState,
          orderDetails: {
            ...prevState.orderDetails,
            [name]: value,
          },
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post transaction details
    axios
      .post(
        "http://localhost:8075/transaction/addTransaction",
        formData.transactionDetails
      )
      .then(() => {
        // Once transaction is successfully posted, post order details
        axios
          .post("http://localhost:8075/order/addOrder", formData.orderDetails)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Thank you for your order! We have received your request.",
              showConfirmButton: false,
              timer: 1700,
              customClass: {
                title: "my-title-class",
              },
            });

            setFormData({
              orderDetails: {
                OrderID: generateOrderID(),
                UserID: "",
                MaterialID: "",
                OrderDate: new Date().toISOString().slice(0, 10),
                PickupDate: "",
                Status: "New",
                Type: "Manual",
                TransactionID: generateTransactionID(),
                Amount: "",
                Description: "",
                Measurement: {
                  blouseLength: "",
                  shoulderWidth: "",
                  sleeveLength: "",
                  neckDepth: "",
                  chest: "",
                  waist: "",
                  hips: "",
                  shoulders: "",
                  LehengaLength: "",
                  neck: "",
                  jacketLength: "",
                },
              },
              transactionDetails: {
                TransactionID: generateTransactionID(),
                Amount: "",
                PaymentType: "Manual",
                TransDate: new Date().toISOString().slice(0, 10),
              },
            });
          })
          .catch((error) => {
            console.error("Error submitting order:", error);
          });
      })
      .catch((error) => {
        console.error("Error submitting transaction:", error);
      });
  };

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header />
      <div className="container col-md-10">
        <div style={{ height: "34px" }}></div>
        <div className="row">
          <div className="col-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle" style={{backgroundColor: '#5B3E31',border:' #5B3E31',color:'#EDE1D2'}}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Form
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/AddOrderNewUser" className="dropdown-item">
                    New User Order
                  </Link>
                </li>
                <li>
                <Link to="/AddOrderExUser" className="dropdown-item">
                    Existing User Order
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/AddRentNewUser" className="dropdown-item">
                    New User Rental
                  </Link>
                </li>
                <li>
                  <Link to="/AddRentExUser" className="dropdown-item">
                    Existing User Rental
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-8">
            <form onSubmit={handleSubmit}>
              <h2 style={{color: '#81684A'}}>Add User Details</h2>
              <div className="mb-3">
                <label htmlFor="UserID" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  User ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="UserID"
                  name="UserID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                  placeholder="Search or Select User ID"
                />
                <select
                  className="form-select mt-2"
                  onChange={handleUserIDChange}
                  value={formData.orderDetails.UserID}
                  style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                >
                  <option value="" disabled>
                    Select User ID
                  </option>
                  {filteredUserIDs.map((userID) => (
                    <option key={userID} value={userID}>
                      {userID}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="FirstName"
                      value={selectedUser.FirstName || ""}
                      style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="LastName"
                      value={selectedUser.LastName || ""}
                      style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>Contact Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ContactNumber"
                      value={selectedUser.ContactNumber || ""}
                      style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Address"
                      value={selectedUser.Address || ""}
                      style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <h2 style={{color: '#81684A'}}>Add New Order</h2>
              <div className="mb-3">
                <label htmlFor="ProductName" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Product ID:
                </label>
                <select
                  className="form-select"
                  onChange={handleProductIDChange}
                  value={formData.orderDetails.MaterialID}
                  style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                >
                  <option value="" disabled>
                    Select Product ID
                  </option>
                  {filteredProductIDs.map((productID) => (
                    <option key={productID} value={productID}>
                      {productID}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="PickupDate" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                    Pickup Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="PickupDate"
                    value={formData.orderDetails.PickupDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Set min date to today
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="TotalAmount" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                    Total Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="TotalAmount"
                    name="Amount"
                    value={formData.orderDetails.Amount}
                    onChange={handleChange}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    required
                  />
                </div>
              </div>

              <h2 style={{color: '#81684A'}}>Add Measurement Details</h2>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="blouseLength" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Blouse Length:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="blouseLength"
                    name="Measurement_blouseLength"
                    value={formData.orderDetails.Measurement.blouseLength}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="shoulderWidth" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Shoulder Width:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="shoulderWidth"
                    name="Measurement_shoulderWidth"
                    value={formData.orderDetails.Measurement.shoulderWidth}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="sleeveLength" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Sleeve Length:
                  </label>
                  <input
                    type="number"
                    className="
                    form-control"
                    id="sleeveLength"
                    name="Measurement_sleeveLength"
                    value={formData.orderDetails.Measurement.sleeveLength}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="neckDepth" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Neck Depth:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="neckDepth"
                    name="Measurement_neckDepth"
                    value={formData.orderDetails.Measurement.neckDepth}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="chest" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Chest:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="chest"
                    name="Measurement_chest"
                    value={formData.orderDetails.Measurement.chest}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="waist" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  waist:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="waist"
                    name="Measurement_waist"
                    value={formData.orderDetails.Measurement.waist}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="hips" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Hips:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="hips"
                    name="Measurement_hips"
                    value={formData.orderDetails.Measurement.hips}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="shoulders" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Shoulders:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="shoulders"
                    name="Measurement_shoulders"
                    value={formData.orderDetails.Measurement.shoulders}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="LehengaLength" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Lehenga Length:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="LehengaLength"
                    name="Measurement_LehengaLength"
                    value={formData.orderDetails.Measurement.LehengaLength}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="neck" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                    Neck:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="neck"
                    name="Measurement_neck"
                    value={formData.orderDetails.Measurement.neck}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="jacketLength" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                  Jacket Length:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="jacketLength"
                    name="Measurement_jacketLength"
                    value={formData.orderDetails.Measurement.jacketLength}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="Description" className="form-label" style={{ color: '#64473A', fontWeight: 'bold' }}>
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="Description"
                    name="Description"
                    value={formData.orderDetails.Description}
                    style={{background: '#8b6c5c',border:'#8F7664',color:'white'}}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-dark mt-3" style={{ background: '#5B3E31', color: '#EDE1D2', border: 'none' }}>
                Submit
              </button>
              </div>
            </form>
            <div style={{ height: "300px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;

                 
