import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Header from "../Product/Header";

const AllRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllRentals();
  }, []);

  const fetchAllRentals = () => {
    axios
      .get("http://localhost:8075/rent/getAllRents")
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rentals:", error);
      });
  };

  const handleDeleteRental = (id, type) => {
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
            .delete(`http://localhost:8075/rent/deleteRent/${id}`)
            .then(() => {
              fetchAllRentals();
              Swal.fire("Deleted!", "Your rental has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting rental:", error);
              Swal.fire("Error!", "Failed to delete rental.", "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Cannot delete rental of type auto.", "error");
    }
  };

  const handleViewDetails = (rental) => {
    setSelectedRental(rental);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRentals = rentals.filter((rental) =>
    rental.RentID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header />
      <div className="container mt-5">
        <h2 style={{color: '#81684A'}}>All Rentals</h2>
        <div style={{ height: "10px" }}></div>
        <div class="row">
          <div class="col-10">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by Rental ID"
                value={searchTerm}
                onChange={handleSearchChange}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{color: 'white',background:'#63483D' }}>Rental ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Product ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Product Name</th>
              <th style={{color: 'white',background:'#63483D' }}>User ID</th>
              <th style={{color: 'white',background:'#63483D' }}>Rental Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Return Date</th>
              <th style={{color: 'white',background:'#63483D' }}>Status</th>
              <th style={{color: 'white',background:'#63483D' }}>Type</th>
              <th style={{color: 'white',background:'#63483D' }}>Actions</th>
              <th style={{color: 'white',background:'#63483D' }}>View More</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.RentID}</td>
                <td>{rental.ProductID}</td>
                <td>{rental.ProductName}</td>
                <td>{rental.UserID}</td>
                <td>{formatDate(rental.PickupDate)}</td>
                <td>{formatDate(rental.ReturnDate)}</td>
                <td>{rental.Status}</td>
                <td>{rental.Type}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteRental(rental._id, rental.Type)}
                    disabled={rental.Type.toLowerCase() !== "manual"}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(rental)}
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
            <Modal.Title>Rental Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRental && (
              <div>
                <p>
                  <strong>Rental ID:</strong> {selectedRental.RentID}
                </p>
                <p>
                  <strong>Product Name:</strong> {selectedRental.ProductName}
                </p>
                <p>
                  <strong>User ID:</strong> {selectedRental.UserID}
                </p>
                <p>
                  <strong>Rental Date:</strong>{" "}
                  {formatDate(selectedRental.RentDate)}
                </p>
                <p>
                  <strong>Return Date:</strong>{" "}
                  {formatDate(selectedRental.ReturnDate)}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRental.Status}
                </p>
                <p>
                  <strong>Payment:</strong> {selectedRental.Amount}
                </p>
                
                <p>
                  <strong>Type:</strong> {selectedRental.Type}
                </p>
                {/* Add more rental details here */}
              </div>
            )}
          </Modal.Body>
        </Modal>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default AllRentals;
