import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './CustomShirt.css';
import Header from "../../Inquiry/Contact Us/UserHeader";
import Footer from "../../Inquiry/Contact Us/UserFooter";

const ShirtCustomizationForm = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser ? loggedInUser._id : null; // Using loggedInUser.UserID
    const { productId } = useParams();
    const [fabric, setFabric] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [neck, setNeck] = useState(0);
    const [chest, setChest] = useState(0);
    const [waist, setWaist] = useState(0);
    const [shirtLength, setShirtLength] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!loggedInUser) {
            window.location.href = "/login"; // Redirect to login page if not logged in
        }
    }, [loggedInUser]);

    const fabricOptions = ['Cotton', 'Linen', 'Silk', 'Georgette']; // Relevant fabric options for shirts
    const colorOptions = ['white', 'Gold', 'Red', 'Pink']; // Relevant color options for shirts
    const typeOptions = ['Kandian', 'Indian']; // Options for shirt type

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            setQuantity(parseInt(value));
        } else {
            switch (name) {
                case 'fabric':
                    setFabric(value);
                    break;
                case 'color':
                    setColor(value);
                    break;
                case 'type':
                    setType(value);
                    break;
                case 'blouseLength':
                    setNeck(parseInt(value));
                    break;
                case 'shoulderWidth':
                    setChest(parseInt(value));
                    break;
                case 'sleeveLength':
                    setWaist(parseInt(value));
                    break;
                case 'neckDepth':
                    setShirtLength(parseInt(value));
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        const errors = {};
        if (!fabric) {
            errors.fabric = 'Fabric is required';
        }
        if (!color) {
            errors.color = 'Color is required';
        }
        if (!type) {
            errors.type = 'Type is required';
        }
        if (neck <= 0 || chest <= 0 || waist <= 0 || shirtLength <= 0) {
            errors.measurements = 'All measurements must be greater than 0';
        }
        if (quantity <= 0) {
            errors.quantity = 'Quantity must be greater than 0';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        // Form submission logic
        try {
            const formData = {
                userId: userId,
                fabric: fabric,
                color: color,
                type: type,
                measurements: {
                    blouseLength: blouseLength,
                    shoulderWidth: shoulderWidth,
                    sleeveLength: sleeveLength,
                    neckDepth: neckDepth,
                },
                quantity: quantity,
                productId: productId
            };
            const response = await axios.post('http://localhost:8075/order/products/cart/add', formData);
            console.log(response.data); // Log the response from the server
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <Header />
        
        <div className="bridalSarees-customization-form">
            <h1>Bridal Sarees Customization Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fabric">Fabric:</label>
                    <select id="fabric" name="fabric" value={fabric} onChange={handleChange} className="form-control">
                        <option value="">Select Fabric</option>
                        {fabricOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.fabric && <div className="text-danger">{errors.fabric}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <select id="color" name="color" value={color} onChange={handleChange} className="form-control">
                        <option value="">Select Color</option>
                        {colorOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.color && <div className="text-danger">{errors.color}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" value={type} onChange={handleChange} className="form-control">
                        <option value="">Select Type</option>
                        {typeOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.type && <div className="text-danger">{errors.type}</div>}
                </div>
                <div>
                    <div className="form-group">
                        <label>Measurements:</label>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="blouseLength">Blouse Length</label>
                                <input type="number" id="blouseLength" name="blouseLength" value={blouseLength} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="shoulderWidth">Shoulder Width</label>
                                <input type="number" id="shoulderWidth" name="shoulderWidth" value={shoulderWidth} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="sleeveLength">Sleeve Length</label>
                                <input type="number" id="sleeveLength" name="sleeveLength" value={waist} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="neckDepth">Neck Depth</label>
                                <input type="number" id="neckDepth" name="neckDepth" value={shirtLength} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                    </div>
                    {errors.measurements && <div className="text-danger">{errors.measurements}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleChange} className="form-control" />
                    {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                </div>
                <button type="submit" className="btn" id="submit">Submit</button>
            </form><br></br>
            <h2>Instructions for sizes:</h2>
            <ul>
                <li>Blouse Length:  Measure from the shoulder to the waist or desired length.</li>
                <li>Shoulder Width: Measure across your back, from one shoulder to the other.</li>
                <li>Sleeve Length: Measure from shoulder to where you want the sleeve to end.</li>
                <li>Neck Depth: Measure from the shoulder down to your preferred neckline depth front and back.</li>
            </ul>
        </div>
        <Footer />
        </div>
    );
};

export default ShirtCustomizationForm;
