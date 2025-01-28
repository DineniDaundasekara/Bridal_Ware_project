import Header from '../../Inquiry/Contact Us/UserHeader'; // Import your Header component
import { Link } from 'react-router-dom';
import './ProductCustom.css'; // Import CSS for styling
import bridesmaidSareeImage from '../../../img/bridesmaid.jpg';
import bridalSareeImage from '../../../img/bridalSaree.jpeg';
import lehengaImage from '../../../img/lehenga.jpeg';
import Footer from "../../Inquiry/Contact Us/UserFooter";

const ProductListCustom = () => {

    return (
        <div className='bg' style={{backgroundColor: '#A18D71'}}>
            <Header />

            <div className="container mt-4" style={{backgroundColor: '#A18D71'}}id='prodcust'>
            
                {/* Horizontal tiles */}
                <div className="col mt-4" style={{backgroundColor: '#A18D71', margin: '30px', marginLeft: '100px', marginRight: '100px' }}>
                    <Link to="/productlistsuit/buyproducts" style={{ textDecoration: 'none' }}>
                    <div className="row-md-4">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-4 order-md-2">
                                    <img src={bridalSareeImage} className="card-img" alt="Suit" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="col-md-8 order-md-1">
                                    <div className="card-body">
                                        <h5 className="card-title">Bridal Sarees</h5>
                                        <p className="card-text">Experience the elegance of a bridal saree that’s meticulously crafted to fit you perfectly <br />designed to enhance your beauty and celebrate your unique style on your special day.</p>
                                        <Link to="/productlistsuit/buyproducts" className="shop-btn">Shop</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <Link to="/productlistshirt/buyproducts" style={{ textDecoration: 'none' }}>
                    <div className="row-md-4">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={bridesmaidSareeImage} className="card-img" alt="Shirt" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body mid">
                                        <h5 className="card-title">Bridesmaids Sarees</h5>
                                        <p className="card-text">Discover the epitome of refined grace with our bridesmaid sarees,expertly tailored to your precise measurements and personal style,ensuring a perfect fit and an unforgettable look for your special occasion.</p>
                                        <Link to="/productlistshirt/buyproducts" className="shop-btn">Shop</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <Link to="/productlisttrouser/buyproducts" style={{ textDecoration: 'none' }}>
                    <div className="row-md-4">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-4 order-md-2">
                                    <img src={lehengaImage} className="card-img" alt="Trouser" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="col-md-8 order-md-1">
                                    <div className="card-body">
                                        <h5 className="card-title">Lehengas</h5>
                                        <p className="card-text">Elevate your elegance with a bespoke lehenga,<br /> crafted to fit you flawlessly and tailored to enhance your unique style.</p>
                                        <Link to="/productlisttrouser/buyproducts" className="shop-btn">Shop</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ProductListCustom;
