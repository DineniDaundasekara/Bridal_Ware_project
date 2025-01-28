import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../Product/Header';
import gif from '../Img/warning.gif';

const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    raw_material_type: '',
    color: '',
    received_stock: '',
    date: '',
    unit_price: '',
    retailer_name: '',
    name: '',
    description: '',
    used_stock: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8075/inventory/upload", formData);
      setFormData({
        raw_material_type: '',
        color: '',
        received_stock: '',
        date: '',
        unit_price: '',
        retailer_name: '',
        name: '',
        description: '',
        used_stock: 0
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Item added successfully.',
        confirmButtonText: 'OK',
        customClass: {
          container: 'custom-swal-container',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        style: {
          fontFamily: 'Arial, sans-serif',
          padding: '20px'
        }
      });
    } catch (error) {
      console.error('Error adding inventory item:', error);
      alert('Error adding inventory item');
    }
  };

  const maxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  const handleInstructionsClick = () => {
    Swal.fire({
      title: 'Before Adding The Same Raw Material Twice In Same Color',
      text: 'If you are trying to add the same raw material stock in same color which received more than once in the same day then no need to add again just update it in the current stock page and add a note in description as well.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <div>
        <Header />
      </div>
      <div style={{ margin: 'auto', maxWidth: '400px', padding: '30px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '65px', marginBottom: '45px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#81684A', marginTop: '25px', textDecoration: 'underline' }}>Add New Stock</h2>
        <div style={{ display: 'flex',alignItems:'center',justifyContent:'center', textAlign: 'center', marginBottom: '20px' }}>
          {/* <a onClick={handleInstructionsClick}style={{ display: 'flex',alignItems:'center'}}>
            <img src={gif} style={{ marginBottom: '15px',width: '80%', height: '90%', cursor: 'pointer' }} alt="Description of GIF" />
          </a> */}
          <h4 style={{ cursor: 'pointer',color:'#81684A' }} onClick={handleInstructionsClick}>Instructions</h4>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Raw Material Type:</label>
            <select name="raw_material_type" value={formData.raw_material_type} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }}>
              <option value="">Select Raw Material Type</option>
              <option value="Material">Material</option>
              <option value="Button">Button</option>
              <option value="Threads">Threads</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {formData.raw_material_type === 'Other' && (
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Type:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }} />
            </div>
          )}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Color:</label>
            <select name="color" value={formData.color} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }}>
              <option value="">Select Color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Received Stock:</label>
            <input type="number" name="received_stock" value={formData.received_stock} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} max={maxDate()} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Unit Price:</label>
            <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Retailer Name:</label>
            <input type="text" name="retailer_name" value={formData.retailer_name} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',background: '#8b6c5c',border:'#8F7664',color:'white' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px',color: '#64473A', fontWeight: 'bold' }}>Description:</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="If it's multicolor or any different designs in it, mention it"
              style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', minHeight: '100px',background: '#8b6c5c',border:'#8F7664',color:'white' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-dark mt-3" style={{ background: '#5B3E31', color: '#EDE1D2', border: 'none' }}>
                Submit
              </button>
              </div>
        </form>
      </div>
      <div style={{ height: "150px" }}></div>
    </div>
  );
};

export default AddInventoryForm;
