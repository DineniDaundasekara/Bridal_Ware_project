import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Img/Swarna.png"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHistory } from '@fortawesome/free-solid-svg-icons'; // Import the history icon
import './UserHeader.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggedInUser"));
    const [redirectPath, setRedirectPath] = useState("");

    const handleLogout = () => {
        // Clear user details from local storage
        localStorage.removeItem("loggedInUser");
        // Redirect to the home page
        window.location.href = "/";
    };
    

    const handleLogin = () => {
        // Redirect back to the same path
        window.location.href = "/signup";
    };

    const handleLog_In = () => {
        // Redirect back to the same path
        window.location.href = "/login";
    };

    if (redirectPath) {
        window.location.href = "/";
    }

    return (
        // bg-light
        <nav className="navbar navbar-expand-lg navbar-light " id="user-header-cont">    
            <a className="navbar-brand" href="/">
                <img style={{marginLeft:'30px'}} src={logo} alt="Logo"    />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/productlistCustom/buyproducts">Customize</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/rentProducts">Rental</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/buyproducts/accessories">Accessories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contactus">Contact Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/aboutus">About Us</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-nav ml-auto" style={{backgroundColor: '#400106',marginRight:'10px'}}>
                {isLoggedIn ? (
                    <div style={{display:'flex'}}> 
                        <a style={{fontSize:'19px', color:'white',marginRight:'5px'}} className="nav-link" href="/order/cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </a>
                        <a style={{fontSize:'19px',color:'white', marginRight:'5px'}} className="nav-link" href="/profile">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                        <a style={{fontSize:'19px',color:'white', marginRight:'5px'}} className="nav-link" href="/order/orderhistory"> {/* Add link to order history */}
                            <FontAwesomeIcon icon={faHistory} />
                        </a>
                        <button className="logout" style={{marginRight:'5px', padding:'12px', backgroundColor:'#400106', color:'white', border:'none', fontWeight:'650'}} onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div> 
                        <button className="login" style={{marginRight:'10px', padding:'12px', backgroundColor: '#400106', color:'white', border:'none', fontWeight:'650'}} onClick={handleLog_In}>
                            Log In
                        </button>
                        <button className="login" style={{marginRight:'10px', padding:'12px', backgroundColor: '#400106', color:'white', border:'none', fontWeight:'650'}} onClick={handleLogin}>
                            Sign Up
                        </button>
                    </div> 
                )}
            </div>
        </nav>
        
    );
}

export default Header;