import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Header from "../Product/Header";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = () => {
    axios
      .get("http://localhost:8075/order/getAllOrders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleDeleteOrder = (id, type) => {
    if (type.toLowerCase() === "manual") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8075/order/deleteOrder/${id}`)
            .then(() => {
              fetchAllOrders();
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting order:", error);
              Swal.fire("Error!", "Failed to delete order.", "error");
            });
        }
      });
    } else {
      console.log("Cannot delete order of type auto.");
    }
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

  const filteredOrders = orders.filter((order) =>
    order.OrderID.includes(searchQuery)
  );

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header />
      <div className="container mt-5">
        <h2 style={{color: '#81684A'}}>All Orders</h2>

        <div style={{ height: "10px" }}></div>

        <div class="row">
          <div class="col-10">
            <Form.Group controlId="formBasicSearch">
              <Form.Control
                type="text"
                placeholder="Search by Order ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form.Group>
          </div>
          <div class="col-2">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle" style={{backgroundColor: '#5B3E31',border:' #5B3E31',color:'#EDE1D2'}}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Table
              </button>
              <ul class="dropdown-menu">
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
        </div>

        <div style={{ height: "50px" }}></div>

        <Table striped bordered hover >
          <thead>
            <tr>
              <th style={{color: 'white',background:'#63483D' }}>Order ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Product Name</th>
              <th style={{color: 'white',background:'#63483D' }}>User ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Order Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Delivery Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Status</th>

              <th style={{color: 'white',background:'#63483D' }}>Type</th>
              <th style={{color: 'white',background:'#63483D' }}>Actions</th>
              <th style={{color: 'white',background:'#63483D' }}>View More</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.OrderID}</td>
                <td>{order.ProductID}</td>
                <td>{order.UserID}</td>
                <td>{formatDate(order.OrderDate)}</td>
                <td>{formatDate(order.PickupDate)}</td>
                <td>{order.Status}</td>

                <td>{order.Type}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteOrder(order._id, order.Type)}
                    disabled={order.Type.toLowerCase() !== "manual"}
                  >
                    Delete
                  </Button>
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
                <p>
                  <strong>Order ID:</strong> {selectedOrder.OrderID}
                </p>
                <p>
                  <strong>Product Name:</strong> {selectedOrder.ProductName}
                </p>
                <p>
                  <strong>User ID:</strong> {selectedOrder.UserID}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {formatDate(selectedOrder.OrderDate)}
                </p>
                <p>
                  <strong>Delivery Date:</strong>{" "}
                  {formatDate(selectedOrder.PickupDate)}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.Status}
                </p>
                <p>
                  <strong>Total Amount:</strong> {selectedOrder.TotalAmount}
                </p>
                <p>
                  <strong>Type:</strong> {selectedOrder.Type}
                </p>
                <p>
                  <strong>Description:</strong> {selectedOrder.Description}
                </p>
              </div>
            )}
          </Modal.Body>
        </Modal>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default AllOrders;
