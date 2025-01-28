import React from 'react';
import logo from '../Img/SwarnaLogo.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  const footerStyle = {
    backgroundColor: '#400106',
    color: '#000000',
    padding: '45px 0',
  };

  const sectionStyle = {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
  };

  const flexContainer = {
    display: 'flex',
    gap: '20px', // Added gap property here
    marginBottom:'-15px'
  };

  const listItemStyle = {
    marginBottom: '10px', // Added margin bottom here
    fontWeight:'490'
  };

  return (
    <footer style={footerStyle}>
        <div style={{ maxWidth: '1170px', margin: '0 auto' }}>
            <div style={flexContainer}>
                    <div style={{ display: 'grid', fontSize: '15px' }}> 
                <img src={logo} alt="Logo" style={{ width: '70px', height: '70px', marginLeft: '10px', marginBottom:'50px' }} />
                {/* <span style={{ maxWidth: '400px', display: 'block', margin: '0 auto',color:'#858383'}}>Specializing in Elegant Wedding Suits, Exquisite Kurthas for Sale & Rent, Precision Tailoring of Office Attires, Sophisticated Party Wears, and Premium School Uniforms. Experience the Height of Style and Comfort with Our Tailored Creations.</span> */}
        </div>

          {/* Products Section */}
          <div style={{ flex: '1', marginLeft: '80px' }}>
            <h5 style={{color:'#A18D71', marginBottom:'15px'}}>Products</h5>
            <ul style={sectionStyle}>
              <li style={listItemStyle}><a style={linkStyle} href="/productlistCustom/buyproducts">Customize</a></li>
              <li style={listItemStyle}><a style={linkStyle} href="#">Rental</a></li>
              <li style={listItemStyle}><a style={linkStyle} href="/buyproducts/accessories">Accessories</a></li>
            </ul>
          </div>
          {/* Company Section */}
          <div style={{ flex: '1', marginLeft: '50px' }}>
            <h5 style={{color:'#A18D71', marginBottom:'15px'}}>Company</h5>
            <ul style={sectionStyle}>
              <li style={listItemStyle}><a style={linkStyle} href="/contactus">Contact Us</a></li>
              <li style={listItemStyle}><a style={linkStyle} href="/aboutus">About Us</a></li> 
            </ul>
          </div>
          {/* Follow Us Section */}
          <div style={{ flex: '1', marginLeft: '50px' }}>
            <h5 style={{color:'#A18D71', marginBottom:'10px'}}>Follow Us</h5>
            <ul style={{ ...sectionStyle, display: 'flex', gap: '15px', fontSize: '25px' }}>
              <li><a style={{color:'#1877F2', marginLeft:'8px'}} href="https://www.facebook.com/msrtailors/"><FaFacebook /></a></li>
              <li><a style={{color:'#cd486b'}} href="https://www.instagram.com/msr_tailors/"><FaInstagram /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
