import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Product/Header'

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('UserID');

  useEffect(() => {
    axios.get('http://localhost:8075/onlineuser/getAllUsers')
      .then(response => {
        // Filter users with role "User" and remove password field
        const filteredUsers = response.data.filter(user => user.Role === 'User')
          .map(({ Password, ...user }) => user);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOptionChange = event => {
    setSearchOption(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <Header/>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginTop: '50px', marginBottom: '25px', textDecoration: 'underline', color:'#81684A' }}>User Table</h2>
      <div style={{ marginBottom: '20px', }}>
        <input
          type="text"
          placeholder="Select An Option Before Searching.."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding:'8px', width:'25%' }}
        />
        <select style={{padding:'8px'}} value={searchOption} onChange={handleOptionChange}>
          <option value="UserID">User ID</option>
          <option value="FirstName">First Name</option>
          <option value="LastName">Last Name</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto', border: '1px solid #63483D' }}>
        <thead style={{ backgroundColor: '#63483D' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>User ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',color: 'white' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',color: 'white' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',color: 'white' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',color: 'white' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',color: 'white' }}>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.UserID}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.FirstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.LastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.Email}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.Address}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.ContactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ height: "350px" }}></div>
    </div>
  );
};

export default UserTable;
