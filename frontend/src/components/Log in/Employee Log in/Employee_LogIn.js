import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import logo from "../../../res/Swarna.png"; 
import { Link } from 'react-router-dom';
import backgroundImage from "../../../res/emplogin.jpeg";

const Login = () => {
  const [formData, setFormData] = useState({
    Eid: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const response = await axios.post("http://localhost:8075/employee/login", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8075/employeeAccount/login", formData);
      if (response.data.success) {
        // Save user details in local storage
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        // Redirect to dashboard or profile page
        window.location.href = "/employee/leaveRequest";
      } else {
        setError("Invalid Eid or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Add background image
        backgroundSize: 'cover', // Make sure the image covers the whole container
        backgroundPosition: 'center', // Center the image
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
 
    
    <div className="container" style={{width:'40%', marginTop:'70px', marginBottom:'60px'}}>{/*Added container class for Bootstrap layout  */}
    <div className="card" style={{borderRadius:'0px',backgroundColor:'rgba(64, 1, 6, 0.8)'}}>
          <img src={logo} style={{ width: '80px', margin: '0 auto', display: 'block', marginTop:'20px',borderRadius:'100px' }}></img>
          <hr></hr>
     <div/>     
     <h2 className="mb-4" style={{textAlign:'center', textDecoration:'underline', marginTop:'10px',color:'#A18D71'}}>Employee Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{marginRight:'25px'}}>
        <div className="form-group" style={{display:'grid', marginTop:'20px', justifyContent:'center', marginRight:'40px'}}> {/* Added form-group class for Bootstrap form styling */}
          <label style={{fontWeight:'600', marginBottom:'10px', fontSize:'18px',color:'#A18D71'}}>Eid:</label>
          <input
            type="text"
            name="Eid"
            value={formData.Eid}
            onChange={handleChange}
            required
            className="form-control"
            style={{width:'130%'}}
            placeholder='Must Starts With "EID"'
          />
        </div>
        <div className="form-group" style={{display:'grid',justifyContent:'center', marginTop:'20px', marginRight:'40px'}} > 
          <label style={{fontWeight:'600',marginBottom:'10px', fontSize:'18px',color:'#A18D71'}}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
            style={{width:'130%'}}
          />
        </div>
        </div>
        <div style={{marginBottom:'30px'}}>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{border:'none',display: 'block', margin: '0 auto', width:'30%', padding:'12px',backgroundColor:'#F5E0C4',color:'#400106', borderRadius:'0px', fontWeight:'650', fontSize:'18px', marginTop:'33px'}}
      >
          Login
        </button>
        </div>
        <p className="mt-3" style={{textAlign:'center',color:'#A18D71'}}>
                Don't have an account? <Link to="/employee/signin">Sign Up</Link>
              </p>
        <p style={{textAlign:"center", marginBottom:'30px',color:'#A18D71'}}className="mt-3">
                Forgot your password? <Link to="/employee/resetpassword">Reset</Link>
        </p>
        
      </form>
    </div>
    </div>
    </div>//new
    
  );
};

export default Login;
