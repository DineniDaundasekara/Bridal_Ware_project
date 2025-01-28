import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Product/Header";


const OrderList = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({}); // State to store product details

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8075/order/getAllOrders")
      .then((response) => {
        const newOrders = response.data.filter(
          (order) => order.Status === "New"
        );
        const pendingOrders = response.data.filter(
          (order) => order.Status === "Pending"
        );
        setNewOrders(newOrders);
        setPendingOrders(pendingOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:8075/product/buyproducts")
      .then((response) => {
        const productDict = {};
        response.data.forEach((product) => {
          productDict[product._id] = product.name;
        });
        setProducts(productDict);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleStatusChange = (id, status, userId, type) => {
    axios
      .put(`http://localhost:8075/order/updateOrder/${id}`, { Status: status })
      .then(() => {
        fetchOrders();
        if (type === "Manual") {
          axios
            .get(`http://localhost:8075/user/getUserByUserID/${userId}`)
            .then((response) => {
              const userEmail = response.data.Email;
              sendEmail(
                userEmail,
                "Order Status Updated",
                `Your order status has been updated to ${status}.`
              );
              Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: `Order status has been updated to ${status}. An email has been sent to the user.`,
              });
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an issue fetching user details.",
              });
            });
        } else {
          Swal.fire({
            icon: "success",
            title: "Status Updated",
            text: `Order status has been updated to ${status}.`,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an issue updating the order status.",
        });
      });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNewOrders = newOrders.filter((order) =>
    order.OrderID.includes(searchQuery)
  );

  const filteredPendingOrders = pendingOrders.filter((order) =>
    order.OrderID.includes(searchQuery)
  );

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <Link to="/order/inventoryRequest" className="btn btn-primary" style={{backgroundColor: '#5B3E31',border:' #5B3E31',color:'#EDE1D2'}}>
            Check Inventory Status
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle" style={{backgroundColor: '#5B3E31',border:' #5B3E31',color:'#EDE1D2'}}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Table
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/ManageOrder" className="dropdown-item">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/ManageRent" className="dropdown-item">
                  Rentals
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link to="/AllOrders" className="dropdown-item">
                  All Orders
                </Link>
              </li>
              <li>
                <Link to="/AllRentals" className="dropdown-item">
                  All Rentals
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="mt-4"  style={{color: '#81684A'}}>New Orders</h2>
        <div className="row">
          <div className="col-10">
            <Form.Group controlId="formBasicSearch">
              <Form.Control
                type="text"
                placeholder="Search by Order ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form.Group>
          </div>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th style={{color: 'white',background:'#63483D' }}>Order ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Product Name</th>
              <th style={{color: 'white',background:'#63483D' }}>Material ID</th>
              <th style={{color: 'white',background:'#63483D' }}>User ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Order Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Delivery Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Amount</th>
              <th style={{color: 'white',background:'#63483D' }}>Description</th>
              <th style={{color: 'white',background:'#63483D' }}>Type</th>
              <th style={{color: 'white',background:'#63483D' }}>Actions</th>
              <th style={{color: 'white',background:'#63483D' }}>View More</th>
            </tr>
          </thead>
          <tbody>
            {filteredNewOrders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{products[order.ProductID]}</td>
                <td>{order.MaterialID}</td>
                <td>{order.UserID}</td>
                <td>{formatDate(order.OrderDate)}</td>
                <td>{formatDate(order.PickupDate)}</td>
                <td>{order.Amount}</td>
                <td>{order.Description}</td>
                <td>{order.Type}</td>
                <td>
                  {order.Status !== "Finished" && (
                    <Button
                      variant="warning"
                      onClick={() =>
                        handleStatusChange(
                          order._id,
                          "Pending",
                          order.UserID,
                          order.Type
                        )
                      }
                    >
                      Pending
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(order)}
                  >
                    More
                  </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2 className="mt-4"  style={{color: '#81684A'}}>Pending Orders</h2>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th style={{color: 'white',background:'#63483D' }}>Order ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Product Name</th>
              <th style={{color: 'white',background:'#63483D' }}>Material ID</th>
              <th style={{color: 'white',background:'#63483D' }}>User ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Order Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Delivery Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Amount</th>
              <th style={{color: 'white',background:'#63483D' }}>Description</th>
              <th style={{color: 'white',background:'#63483D' }}>Type</th>
              <th style={{color: 'white',background:'#63483D' }}>Actions</th>
              <th style={{color: 'white',background:'#63483D' }}>View More</th>
            </tr>
          </thead>
          <tbody>
            {filteredPendingOrders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{products[order.ProductID]}</td>
                <td>{order.MaterialID}</td>
                <td>{order.UserID}</td>
                <td>{formatDate(order.OrderDate)}</td>
                <td>{formatDate(order.PickupDate)}</td>
                <td>{order.Amount}</td>
                <td>{order.Description}</td>
                <td>{order.Type}</td>
                <td>
                  {order.Status !== "Finished" && (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleStatusChange(
                          order._id,
                          "Finished",
                          order.UserID,
                          order.Type
                        )
                      }
                    >
                      Finish
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(order)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div>
                <h4>Measurement Details</h4>
                <p><strong>Blouse Length:</strong> {selectedOrder.Measurement?.blouseLength}</p>
                <p><strong>Shoulder Width:</strong> {selectedOrder.Measurement?.shoulderWidth}</p>
                <p><strong>Sleeve Length:</strong> {selectedOrder.Measurement?.sleeveLength}</p>
                <p><strong>Neck Depth:</strong> {selectedOrder.Measurement?.neckDepth}</p>
                <p><strong>Chest:</strong> {selectedOrder.Measurement?.chest}</p>
                <p><strong>Waist:</strong> {selectedOrder.Measurement?.waist}</p>
                <p><strong>Hips:</strong> {selectedOrder.Measurement?.hips}</p>
                <p><strong>Shoulders:</strong> {selectedOrder.Measurement?.shoulders}</p>
                <p><strong>Lehenga Length:</strong> {selectedOrder.Measurement?.LehengaLength}</p>
                <p><strong>Neck:</strong> {selectedOrder.Measurement?.neck}</p>
                <p><strong>Jacket Length:</strong> {selectedOrder.Measurement?.jacketLength}</p>
                <p><strong>Description:</strong> {selectedOrder.Description}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default OrderList;

// Function to send email
const sendEmail = (to, subject, message) => {
  // Email content
  const mailOptions = {
    from: "arm.medi.lab@gmail.com",
    to: to,
    subject: subject,
    text: message,
  };

  
};
