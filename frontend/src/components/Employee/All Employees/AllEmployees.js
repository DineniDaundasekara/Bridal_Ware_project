import React, { useState, useEffect } from "react";
import axios from "axios";
import "../All Employees/AllEmployees.css";
import Modal from 'react-modal';
import Header from '../../Product/Header';
import html2pdf from "html2pdf.js";
import logo from "../../Inquiry/Img/MSR.png";
import { Link } from 'react-router-dom';

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Eid');
  const [sortOption, setSortOption] = useState(null);

  //Get employees
  useEffect(() => {
    async function getEmployees() {
      try {
        const res = await axios.get("http://localhost:8075/employee");
        setEmployees(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching employees data:", err);
        alert("An error occurred while fetching employees data. Please try again later.");
      }
    }
    getEmployees();
  }, []);

  const generateIDCard = (employee) => {
    const employeeDetails =
    
    `
    <div id="employee-id-card-${employee.Eid}" class="employee-id-card" style="position: relative;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px;">
    <h4 style=" text-align: left; margin-top:40px; margin-left:25px">Employee ID Card</h4>
    <img src="${logo}" alt="Employee Image" style="position: absolute; top: 0; right: 0; max-width: 80px; margin-top:20px; margin-right:25px">
    </div>
    <hr style="color:#000000"></hr>
    <div style="margin-left:25px ; margin-top:50px; ">
    <h5>Full Name: ${employee.fname || ''} ${employee.lname || ''}</h5>
    <hr style="color:#000000"></hr>
    <h5>Employee ID: ${employee.Eid}</h5>
    <hr style="color:#000000"></hr>
    <h5>Hired Date: ${new Date(employee.hireDate).toLocaleDateString()}</h5>
    <hr style="color:#000000"></hr>
    <h5>Job Role: ${employee.jobrole}</h5>
    <hr style="color:#000000"></hr>
    <div>
  </div>
    `;

    const opt = {
      margin:       0,
      filename:     `${employee.fname}_${employee.lname}_IDCard.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a6', orientation: 'portrait' }
    };

    html2pdf().from(employeeDetails).set(opt).save();
  };

  // Configure modal styles (optional)
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  Modal.defaultStyles.content.backgroundColor = '#fff';

  // Update employee function
  const handleUpdate = (employee) => {
    openUpdateModal();
    // Set form fields with selected employee data
    setFname(employee.fname || "");
    setLname(employee.lname || "");
    setPhoneNumber(employee.phoneNumber || "");
    setAddress(employee.address || "");
    setEmail(employee.email || "");
    setJobRole(employee.jobrole || "");
    setDOB(employee.DOB || "");
    setHireDate(employee.hireDate || "");
    setSalary(employee.salary || "");
    setSelectedEmployee(employee);
  };
  

  // Define state variables for the update form
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [DOB, setDOB] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  
  // Fetch employees from the server
  useEffect(() => {
    async function getEmployees() {
      try {
        const res = await axios.get("http://localhost:8075/employee");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees data:", err);
        alert("An error occurred while fetching employees data. Please try again later.");
      }
    }

    getEmployees();
  }, []);

  // Handle employee selection
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // Open the update modal and populate the form fields
  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  // Handle form submission and update employee details
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Create an object with updated employee details
    const updatedEmployee = {
      fname,
      lname,
      phoneNumber,
      address,
      email,
      jobrole,
      DOB,
      hireDate,
      salary,
    };
  
    try {
      // Make a PUT request to update the employee data
      await axios.put(
        `http://localhost:8075/employee/update/${selectedEmployee._id}`,
        updatedEmployee
      );
  
      // Refresh the list of employees
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === selectedEmployee._id ? { ...emp, ...updatedEmployee } : emp
        )
      );
  
      // Close the modal
      closeUpdateModal();
  
      // Notify the user of successful update
      alert(
        `Employee ${selectedEmployee.fname} ${selectedEmployee.lname} has been successfully updated.`
      );
    } catch (err) {
      console.error("Error updating employee data:", err);
      alert(
        "An error occurred while updating the employee data. Please try again later."
      );
    }
  };

  // Delete employees
  const handleDelete = async (employee) => {
    // Confirmation dialog before deleting
    const confirmDelete = window.confirm(`Are you sure you want to delete employee ${employee.fname} ${employee.lname}?`);

    if (confirmDelete) {
      try {
        // Make a DELETE request to the server
        await axios.delete(`http://localhost:8075/employee/delete/${employee._id}`);
        
        // Remove the deleted employee from the state
        setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== employee._id));
        
        // Close the modal after deletion
        setSelectedEmployee(null);
        
        // Notify the user of successful deletion
        alert(`Employee ${employee.fname} ${employee.lname} has been successfully deleted.`);
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("An error occurred while deleting the employee. Please try again later.");
      }
    }
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search option change
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  // Handle sort option change
  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter employees based on search term and option
  const filteredEmployees = employees.filter(employee =>
    employee[searchOption] && employee[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on sort option
  const sortedEmployees = sortOption ? [...filteredEmployees].sort((a, b) => a[sortOption].localeCompare(b[sortOption])) : filteredEmployees;

  //send whatsapp message

  const handlegenerateIDCard = () => {

    const phoneNumber="+94752050397";
    const message =`generated idcard`//change this as your prefered
    const WhatsAppUrl=`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    //open the whatsapp chat in new tab
    window.open(WhatsAppUrl,"_blank")
  }

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header/>
      <div id="All_details_container" className="container ">
        <div className="row">
          <div className="col-12">
            <div className="card"  style={{borderRadius:'0px',backgroundColor: '#D0BCA0'}}>
              <div className="card-body text-center">
                <h2 className="card-title m-b-0" style={{fontWeight:'700', textDecoration:'underline', marginTop:'20px', marginBottom:'20px', fontSize:'27px',color:'#81684A'}}>Employees Table</h2>
              </div>
              <div className="table-responsive">
                <div style={{textAlign:'center',marginBottom:'30px'}}>
                <div className="search-filter-container">
                  <input
                    type="text"
                    placeholder="Select an option before searching.."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                    style={{padding:'8px', width:'28%'}}
                  />
                  <select value={searchOption} style={{padding:'8px', marginLeft:'8px'}} onChange={handleSearchOptionChange} className="search-select">
                    <option value="Eid">Employee ID</option>
                    <option value="fname">First Name</option>
                    <option value="lname">Last Name</option>
                  </select>
                  </div>
                </div>
                <table className="table" style={{marginBottom:'40px',background:'#D0BCA0'}}>
                  <thead className="thead-light" >
                    <tr>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}} scope="col">#</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}} scope="col">Employee ID</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">First Name</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Last Name</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Phone Number</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Email</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Job Role</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Salary</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">Employee ID Card</th>
                      <th style={{border:'1px solid #ccc', backgroundColor:'#63483D',color:'white'}}scope="col">send message</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEmployees.map((employee, index) => (
                      <tr key={employee._id}>
                        <td style={{border:'1px solid #ccc'}}>{index + 1}</td>
                        <td style={{border:'1px solid #ccc'}} onClick={() => handleEmployeeClick(employee)}>{employee.Eid}</td>
                        <td style={{border:'1px solid #ccc'}} onClick={() => handleEmployeeClick(employee)}>
                          {employee.fname}
                        </td>
                        <td style={{border:'1px solid #ccc'}} >{employee.lname}</td>
                        <td style={{border:'1px solid #ccc'}}>{employee.phoneNumber}</td>
                        <td style={{border:'1px solid #ccc'}}>{employee.email}</td>
                        <td style={{border:'1px solid #ccc'}}>{employee.jobrole}</td>
                        <td style={{border:'1px solid #ccc'}}>{employee.salary}</td>
                        
                        <td>
                          <button style={{padding:'9px', backgroundColor:'#5B3E31', color:'#EDE1D2', border:'none', fontSize:'15px'}} onClick={() => generateIDCard(employee)}>Generate Card</button>
                        </td>
                        <td><button style={{padding:'9px', backgroundColor:'#5B3E31', color:'#EDE1D2', border:'none', fontSize:'15px'}} onClick={handlegenerateIDCard}send whatsapp message> send</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* All details Pop Up Modal component */}
      <Modal
          isOpen={selectedEmployee !== null}
          onRequestClose={() => setSelectedEmployee(null)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)"
            },
            content: {
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "0px",
              padding: "50px",
              maxWidth: "580px",
              margin: "auto",
              maxHeight:'500px'
            }
          }}
          contentLabel="Employee Details" >
  {/* Modal content */}
      

        <div className="modal-content">
          <h2 style={{textAlign:'center'}} id="Headeremp2"> Full Name : {selectedEmployee?.fname} {selectedEmployee?.lname}</h2>
          {/* Table to display employee details */}
          <table  id="employee-details-" className="employee-details-table">
            <tbody style={{fontSize:'18px'}}>
              <tr>
                <td><b>Employee ID:</b></td>
                <td>{selectedEmployee?.Eid}</td>
              </tr>
              <tr>
                <td><b>Phone Number:</b></td>
                <td>{selectedEmployee?.phoneNumber}</td>
              </tr>
              <tr>
                <td><b>Address:</b></td>
                <td>{selectedEmployee?.address}</td>
              </tr>
              <tr>
                <td><b>Email:</b></td>
                <td>{selectedEmployee?.email}</td>
              </tr>
              <tr>
                <td><b>Job Role:</b></td>
                <td>{selectedEmployee?.jobrole}</td>
              </tr>
              <tr>
                <td><b>Date of Birth:</b></td>
                <td>{selectedEmployee?.DOB ? new Date(selectedEmployee.DOB).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</td>
              </tr>
              <tr>
                <td><b>Hire Date:</b></td>
                <td>{selectedEmployee?.hireDate ? new Date(selectedEmployee.hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</td>
              </tr>
              <tr>
                <td><b>Base Salary:</b></td>
                <td>{selectedEmployee?.salary}</td>
              </tr>

              
            </tbody>
          </table>
        </div>
        {/* Button group at the bottom */}
        <div style={{textAlign:'center', marginTop:'20px'}} id="button-group" className="button-group">
          <button id="button-4" onClick={() => setSelectedEmployee(null)} className="btn btn-secondary">
            <b>Cancel</b>
          </button>
          <button id="button-27" onClick={() => handleUpdate(selectedEmployee)} className="btn btn-primary">
            Update
          </button>
          <button id="button-27" onClick={() => handleDelete(selectedEmployee)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </Modal>
      {/* Update Employee Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
          },
          content: {
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "0px",
            padding: "50px",
            maxWidth: "550px",
            margin: "auto",
            maxHeight:'750px'
          }
        }}
        contentLabel="Update Employee"
      >
        <div className="modal-content">
          <h3 id="Headeremp" >Update Employee</h3>
          {/* Form to update employee details */}
          <form onSubmit={handleFormSubmit} className="form-control" style={{padding:'20px'}}>
            {/* First Name */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="fname">First Name</label>
              <input type="text" id="fname" value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.fname}
              />
            </div>
            {/* Last Name */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="lname">Last Name</label>
              <input type="text" id="lname" value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.lname}
              />
            </div>
            {/* Phone Number */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.phoneNumber}
              />
            </div>
            {/* Address */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="address">Address</label>
              <input type="text" id="address" value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.address}
              />
            </div>
            {/* Email */}
            <div style={{marginBottom:'15px', display:'grid'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="email">Email</label>
              <input type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width:'100%'}}
                className="form-control" placeholder={selectedEmployee?.email}
              />
            </div>
            {/* Job Role */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="jobrole">Job Role</label>
              <select
                id="jobrole"
                value={jobrole} // Bind the current value of jobrole
                onChange={(e) => setJobRole(e.target.value)}
                className="form-control"
              >
                <option value="">Select Job Role</option> {/* Placeholder option */}
                <option value="Tailor">Tailor</option>
                <option value="Admin Staff">Admin Staff</option>
                <option value="Delivery Driver">Delivery Driver</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="DOB">Date of Birth</label>
              <input type="date" id="DOB" value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.DOB}
              />
            </div>
            {/* Hire Date */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="hireDate">Hire Date</label>
              <input type="date" id="hireDate" value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="form-control" placeholder={selectedEmployee?.hireDate}
              />
            </div>
            {/* Salary */}
            <div style={{marginBottom:'15px'}} className="form-group">
              <label style={{marginBottom:'8px'}} htmlFor="salary">Salary</label>
              <input type="number" id="salary"
                value={salary} onChange={(e) => setSalary(parseFloat(e.target.value))}
                className="form-control" placeholder={selectedEmployee?.salary}
              />
            </div>
        
            {/* Submit button */}
            <div style={{marginTop:'25px',marginBottom:'15px' , display:'flex', justifyContent:'space-between'}} className="form-group">
              <button style={{padding:'6px 12px', border:'none'}} id="button-27" type="submit" className="btn btn-primary">
                Update
              </button>
              <button style={{padding:'12px 12px', backgroundColor:'black', color:'white'}} id="button-44" onClick={closeUpdateModal} className="btn">
            <b>Cancel</b>
            </button>
            </div>
          </form>
          {/* Button to close the update modal */}
          {/* send whatsapp message */}
          
          
        </div>
      </Modal>
      {/* <button onClick={handlegenerateIDCard}send whatsapp message></button> */}
      <div style={{ height: "500px" }}></div>
    </div>
  );
}
                                            