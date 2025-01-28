import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Em_Header from '../../Employee/Employee Home/EmployeeHeader';
import Swal from 'sweetalert2';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [currentpassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails) {
      // Handle case where userDetails is not found
      return;
    }
    fetchEmployeeByEid(userDetails.Eid);
  }, []);
//const response = await axios.get(`http://localhost:8075/employee/get/${eid}`);
  const fetchEmployeeByEid = async (eid) => {
    try {
      const response = await axios.get(`http://localhost:8075/employeeAccount/get/${eid}`);
      setEmployee(response.data);
      setUpdatedFirstName(response.data.firstName);
      setUpdatedLastName(response.data.lastName);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!employee) {
        console.error('Employee details not found');
        return;
      }
  //await axios.put(`http://localhost:8075/employee/update/${employee._id}`, updatedEmployee);
      const updatedEmployee = { ...employee, firstName: updatedFirstName, lastName: updatedLastName };
      await axios.put(`http://localhost:8075/employeeAccount/update/${employee._id}`, updatedEmployee);
      fetchEmployeeByEid();
      setShowUpdatePopup(false);
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee details have been updated.',
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (currentpassword !== employee.password) {
        setPasswordError('Incorrect current password');
        return;
      }

      setPasswordError('');
      setShowPasswordPopup(false);

      const updatedEmployee = { ...employee, password: newPassword };
 //await axios.put(`http://localhost:8075/employee/update/${employee._id}`, updatedEmployee);
      await axios.put(`http://localhost:8075/employeeAccount/update/${employee._id}`, updatedEmployee);

      fetchEmployeeByEid();

      setShowUpdatePopup(false);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password has been updated.',
      });
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  if (!employee) {
    return ;
  }

  return (
    <div>
      <Em_Header />

    <div  style={{ backgroundColor: '#A18D71', height: '100vh', display: 'flex', alignItems: 'bottom', justifyContent: 'center'}}>
    {/* <div className="container" style={{width:'40%', marginTop:'70px', marginBottom:'60px'}}>Added container class for Bootstrap layout  */}
      <div className="container mt-5" style={{ width: '40%', marginBottom: '10px',marginTop:'100px', border: '1px solid #ccc', padding: '30px',background:'#400106' }}>
        
        <h2 style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '50px',color:'#A18D71' }}>Profile</h2>
        <div style={{ marginLeft: '25px' }}>
          <div className="mb-3" >
            <label className="form-label " style={{ color: '#A18D71' }}>First Name:</label>
            <input type="text" className="form-control" style={{ width: '90%' }} value={updatedFirstName} onChange={(e) => setUpdatedFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#A18D71' }}>Last Name:</label>
            <input type="text" className="form-control" style={{ width: '90%' }} value={updatedLastName} onChange={(e) => setUpdatedLastName(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', width: '30%', marginLeft: '20px',textAlign: 'center' }}>
          <button className="btn btn-primary ms-2" style={{ marginBottom: '10px', width: '100%',backgroundColor:'#F5E0C4',color:'#400106',border:'#F5E0C4'  }} onClick={handleUpdate}>Save Changes</button>
          <button className="btn btn-secondary" style={{ marginLeft: '7px', width: '130%', marginBottom: '15px',backgroundColor:'#F5E0C4',color:'#400106'  }} onClick={() => setShowPasswordPopup(true)}>Change Password</button>
        </div>

        {showPasswordPopup && (
          <div className="mt-3" style={{ marginLeft: '25px' }}>
            <hr style={{ marginBottom: '30px' }}></hr>
            <label style={{ marginBottom: '10px',color: '#A18D71' }}> Enter Your Current Password</label>
            <input style={{ width: '90%' }} type="password" className="form-control mb-2" placeholder="Enter current password" value={currentpassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <label style={{ marginBottom: '10px', marginTop: '10px',color: '#A18D71' }}> Enter New Password</label>
            <input style={{ width: '90%' }} type="password" className="form-control mb-2" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button style={{ marginTop: '10px',backgroundColor:'#F5E0C4',color:'#400106',border:'#F5E0C4' }} className="btn btn-primary" onClick={handlePasswordUpdate}>Change Password</button>
            {passwordError && <p className="text-danger mt-2">{passwordError}</p>}
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default EmployeeDetails;
