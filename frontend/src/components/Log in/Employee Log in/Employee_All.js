import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Header from '../../Product/Header'

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Eid');

//axios.get('http://localhost:8075/employee/get')
  useEffect(() => {
    axios.get('http://localhost:8075/employeeAccount/get')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleDelete = async (eid) => {
    // Display confirmation dialog
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  //changed

  // // Delete the employee account
  // await axios.delete(`http://localhost:8075/employee/delete/${eid}`);
        
  // // Fetch the updated list of employees
  // const response = await axios.get('http://localhost:8075/employee/get');
  // setEmployees(response.data);
    // Proceed with deletion if user confirms
    if (confirmationResult.isConfirmed) {
      try {
        // Delete the employee account
        await axios.delete(`http://localhost:8075/employeeAccount/delete/${eid}`);
        
        // Fetch the updated list of employees
        const response = await axios.get('http://localhost:8075/employeeAccount/get');
        setEmployees(response.data);
        
        // Show success message
        Swal.fire('Deleted!', 'Employee account has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire('Error!', 'Failed to delete employee account.', 'error');
      }
    }
  };
  
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOptionChange = event => {
    setSearchOption(event.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header/>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{marginTop:'30px', marginBottom:'25px', textDecoration:'underline',color:'#81684A'}}>Employee Accounts</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Select An Option Before Searching.."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding:'8px', width:'24%' }}
        />
        <select  style={{padding:'8px', width:'11%'}} value={searchOption} onChange={handleOptionChange}>
          <option value="Eid">Employee ID</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
      </div>
      <div style={{marginBottom:'30px', marginTop:'30px'}}>
                <Link to="/employee/all"><button style={{backgroundColor:'black', color:'white', border:'none', padding:'15px',background:'#5B3E31'}} >All Employees</button></Link>
                </div>
      <table style={{ borderCollapse: 'collapse', width: '70%', margin: '0 auto', border: '1px solid #ddd' }}>
        <thead style={{ backgroundColor: '#63483D',color:'white' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.Eid}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.firstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.lastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button 
                style={{backgroundColor:'black', color:'white', padding:'10px', border:'none',background:'#5B3E31'}} 
                onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ height: "350px" }}></div>
    </div>
  );
};

export default EmployeeTable;
