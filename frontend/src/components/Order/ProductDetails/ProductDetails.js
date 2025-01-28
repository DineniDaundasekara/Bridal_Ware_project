import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Inquiry/Contact Us/UserHeader';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.css'; // Import CSS module
import '@fortawesome/fontawesome-free/css/all.css';
import { FaStar } from 'react-icons/fa';
import Footer from "../../Inquiry/Contact Us/UserFooter";
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState({});
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const isLoggedIn = !!loggedInUser;
    const UserId = loggedInUser ? loggedInUser._id : null;
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8075/order/products/${productId}`);
            setProduct(response.data);
            setAllReviews(response.data.ratings);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleSubmitReview = async () => {
        try {
            const response = await axios.post(`http://localhost:8075/order/products/${productId}/reviews`, {
                review: review,
                starRating: rating,
                userId: UserId
            });
            console.log('Review submitted successfully:', response.data);
            // Fetch all reviews after submitting a review
            fetchProductDetails();
            // Show submitted message with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Rating Submitted Successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            // Clear review and rating inputs
            setReview('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleCustomizationRedirect = () => {
        if (!isLoggedIn) {
            // Redirect to sign-in page if user is not logged in
            window.location.href = '/login';
            return; // Stop further execution
        }

        if (product) {
            const { category } = product;
            switch (category) {
                case 'bridalSaree':
                    navigate(`/order/customsuit/${productId}`);
                    break;
                case 'bridesmaidSaree':
                    navigate(`/order/customshirt/${productId}`);
                    break;
                case 'lehenga':
                    navigate(`/order/customtrouser/${productId}`);
                    break;
                case 'jwellery':
                    navigate('/'); // No customization page for 'bow', navigate to home or another page
                    break;
                case 'flowerBouquet':
                    navigate('/'); // No customization page for 'tie', navigate to home or another page
                    break;
                default:
                    navigate('/'); // Navigate to home for unknown categories
            }
        }
    };

    //to add accessories to cart
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            // Redirect to login page if user is not logged in
            window.location.href = '/login';
            return;
        }
        if (Object.keys(errors).length === 0) {
            try {
                // Send data to the backend using Axios
                const response = await axios.post('http://localhost:8075/order/products/cart/addaccess', {
                    userId: UserId,
                    productId: productId, // Include productId in the request body
                    quantity,
                });
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Item Added to Cart',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Refresh page
                window.location.reload();
            } catch (error) {
                console.error('Error: frontend', error);
            }
        } else {
            setErrors(errors);
        }
    };

    // Case converter
    const toParagraphCase = (description) => {
        // Split the description into sentences
        const sentences = description.split('. ');

        // Capitalize the first letter of each sentence
        const capitalizedSentences = sentences.map(sentence => {
            // Trim any leading/trailing whitespace
            sentence = sentence.trim();
            // Capitalize the first letter and make the rest lowercase
            return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
        });

        // Join the sentences back together with a period and space
        return capitalizedSentences.join('. ');
    };

    return (
        <div>
            <Header />

            <div className={styles.container}>
                <h1 className={`${styles.heading} mt-5 mb-4`}>Product Details</h1>
                {product && (
                    <div className="row">
                        <div className="col-md-6">
                            <div id="productCarousel" className={`carousel slide ${styles.carousel}`} data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {product.images.map((image, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={`data:image/jpeg;base64,${image}`} className="d-block w-100" alt={`Product ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className={`carousel-control-prev ${styles.controlPrev}`} type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                    <span className={`carousel-control-prev-icon ${styles.controlIcon}`} aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className={`carousel-control-next ${styles.controlNext}`} type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                    <span className={`carousel-control-next-icon ${styles.controlIcon}`} aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className={`mb-3 ${styles.productName}`}>{product.name}</h2>
                            <p className={`mb-3 ${styles.price}`} style={{ fontSize: '18px' }}>LKR {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            <p className={`mb-3 ${styles.description}`} style={{ fontSize: '20px' }}>{toParagraphCase(product.description)}</p>
                            {product.category === 'bow' || product.category === 'tie' ? (
                                <div>
                                    <div className="mb-3 mt-5">
                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                                                style={{ color: 'black' }} // Change color to black
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className={`${styles.quantitycount}`}
                                                id="quantity-prod"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                min="1"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                style={{ color: 'black' }} // Change color to black
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button className={`${styles.submitButton} btn btn-primary`} onClick={handleAddToCart}>Add to Cart</button>
                                </div>
                            ) : (
                                <button className={`${styles.customizationButton} btn btn-primary`} onClick={handleCustomizationRedirect}>Customization</button>
                            )}
                        </div>
                    </div>
                )}
                {isLoggedIn && (
                    <>
                        <hr className={`${styles.hrLine} mt-5`} />
                        <div className="mt-4">

                            <h3>Rating and Review</h3><br />
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Your Review"
                                    value={review}
                                    onChange={e => setReview(e.target.value)}
                                    style={{ width: '50%' }}
                                />
                            </div>
                            <div className={styles.starRating}>
                                <span>Rating: </span>
                                {[...Array(5)].map((_, index) => {
                                    const value = index + 1;
                                    return (
                                        <span
                                            key={index}
                                            className={`btnrating btn btn-default btn-sm ${value <= rating ? 'btn-warning' : ''}`}
                                            data-attr={value}
                                            onClick={() => setRating(value)}
                                        >
                                            <i className={`fa fa-star ${value <= rating ? 'selected' : ''}`} aria-hidden="true" style={{ color: 'black' }}></i>
                                        </span>
                                    );
                                })}
                            </div>
                            <button className={`${styles.submitButton} btn btn-primary mt-3`} onClick={handleSubmitReview}>
                                Submit Review
                            </button>

                        </div>
                    </>
                )}
                <hr className="my-4 bg-primary"></hr>
                <div className="mt-4">
                    <h3>Reviews</h3><br />
                    <div className="row">
                        {allReviews.map((review, index) => (
                            review.user && review.user.FirstName && (
                                <div key={index} className={`col-md-6 mb-3 ${styles.review}`}>
                                    <div>
                                        <div>
                                            <span className={`${styles.userName}`}>
                                                {review.user.FirstName} {review.user.LastName}
                                            </span>
                                            <span className={styles.rating}>
                                                {[...Array(review.starRating)].map((_, i) => (
                                                    <FaStar key={i} className={styles.starIcon} />
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={`${styles.reviewContent}`}>{review.review}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
