import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from './Editproduct.module.css';
import Swal from "sweetalert2";
import Header from '../Header';
import LoadingMessage from "../LoadingMessage";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    type: "",
    size: "",
    images: [] // Initialize images as an empty array
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [voiceCommand, setVoiceCommand] = useState('');
  const [buttonColor, setButtonColor] = useState('#524A4E');
  const [currentColor, setCurrentColor] = useState('#FF342B');
  
  const [isListening, setIsListening] = useState(false); 
  const handleVoiceCommand = (command) => {
    let responseText = '';
    switch (command) {
      default:
        responseText = "Sorry, You have to update manually.";
        break;
    }
    // Speak the response text
    speak(responseText);
  };
  

// Function to start or stop voice recognition
const toggleVoiceRecognition = () => {
    if (isListening) {
        // Stop voice recognition
        setIsListening(false);
    } else {
        // Start voice recognition
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript.toLowerCase();
            setVoiceCommand(result);
            handleVoiceCommand(result);
            setIsListening(false); // Turn off microphone after task is completed
        };
        recognition.start();
    }
};

// Function to speak the given text
const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8075/product/${productId}`);
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          type: response.data.type,
          size: response.data.size, // Set size in formData
          images: response.data.images // Set images in formData
        });
        setInitialFormData({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          type: response.data.type,
          size: response.data.size, // Set size in initialFormData
          images: response.data.images // Set images in initialFormData
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setFormData({ ...formData, images: selectedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when form is submitted
    
    // Validation
    if (!formData.name || formData.price <= 0 || !formData.category || !formData.type || !formData.size) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields and ensure price is a positive number.",
        confirmButtonColor: "#000000" 
      });
      setIsLoading(false); // Stop loading after validation error
      return;
    }
  
    // Check if at least 4 images are selected
    if (formData.images.length < 4) {
      Swal.fire({
        icon: "error",
        title: "Image Selection Error",
        text: "Please select at least 4 images.",
        confirmButtonColor: "#000000" 
      });
      setIsLoading(false); // Stop loading after image selection error
      return;
    }
  
    // Check if formData is the same as initialFormData
    const isFormDataChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);
    const isImageChanged = JSON.stringify(formData.images) !== JSON.stringify(initialFormData.images);
    
    // If formData is unchanged, display message and return
    if (!isFormDataChanged) {
      Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "No changes were made.",
        confirmButtonColor: "#000000" // Black color for confirm button
      });
      setIsLoading(false); // Stop loading after no changes made
      return;
    }
  
    // If formData is changed but images remain unchanged, display alert
    if (!isImageChanged) {
      Swal.fire({
        icon: "warning",
        title: "Image Update Required",
        text: "According to company policy, please update the images along with other changes.",
        confirmButtonColor: "#000000" // Black color for confirm button
      });
      setIsLoading(false); // Stop loading after image update alert
      return;
    }
  
    try {
      const formDataWithImages = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => {
            formDataWithImages.append("images", image);
          });
        } else {
          formDataWithImages.append(key, value);
        }
      });
  
      await axios.patch(`http://localhost:8075/product/update/${productId}`, formDataWithImages, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      console.log("Product updated!");
  
      // SweetAlert for successful upload
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully!",
        confirmButtonColor: "#000000" // Black color for confirm button
      }).then(() => {
        // Reload the page after success message
        window.location.reload();
      });
  
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false); // Stop loading after form submission completes
    }
  };
  

  const handleClear = () => {
    setFormData({ ...initialFormData });
  };

  return (
    <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
      <div>
        <Header/>
      </div>
      <div className={styles.heading}  style={{backgroundColor: '#D0BCA0'}}> 
        <h1>Edit products</h1>
      </div>
      <div>
        
        {/* <button
                  style={{
                      position: 'fixed',
                      bottom: '20px',
                      right: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '6px 10px',
                      gap: '8px',
                      height: '30px',
                      width: '100px',
                      border: 'none',
                      background: isListening ? 'black' : buttonColor, // Change color to red when listening
                      borderRadius: '20px',
                      cursor: 'pointer',
                      animation: 'scale 1s infinite', // Apply animation
                      transition: 'background-color 0.3s' // Apply transition
                  }}
                  onClick={toggleVoiceRecognition}
              >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      viewBox="0 0 24 24"
                      height="24"
                      fill="none"
                      className="svg-icon"
                      style={{ stroke: '#ffff' }}
                  >
                      <g strokeWidth="2" strokeLinecap="round">
                          <rect y="3" x="9" width="6" rx="3" height="11"></rect>
                          <path d="m12 18v3"></path>
                          <path d="m8 21h8"></path>
                          <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path>
                      </g>
                  </svg>
                  <span
                      className="label"
                      style={{
                          lineHeight: '20px',
                          fontSize: '17px',
                          color: currentColor,
                          fontFamily: 'sans-serif',
                          letterSpacing: '1px'
                      }}
                  >
                      Speak
                  </span>
              </button> */}
        </div>
      <div className={styles.container}>
        <div className={`${styles.uploadImages} ${styles.imageContainer}`}>
             {/* Render loading spinner when isLoading is true */}
             {isLoading && <LoadingMessage />}
          <h2 className={styles.imageTitle} style={{color: '#81684A'}}>Images</h2>
          {product.images && product.images.length > 0 ? (
            <div className={styles.imageGrid}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Product Image ${index + 1}`}
                  style={index === 0 ?  { marginLeft: '25px', width: '500px' } : {  width: '100px'  }}
                  className={`${styles.productImage} ${index >= 1 && index <= 4 ? styles.productImage1 : ""}`}
                />
              ))}
            </div>
          ) : (
            <p className={styles.noImagesMessage}>No images found</p>
          )}
        </div>
        <div className={styles.productDetails}>
          <h2 style={{color: '#81684A'}}>Product Details</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.label} style={{ color: '#64473A', fontWeight: 'bold' }}>
                <label>Name:</label>
              </div>
              <div className={styles.input}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.inputField} style={{background: '#8F7664'}}/>
              </div>
            </div>
          <div className={styles.inlineInputs}>
  <div className={styles.inputWrapper} style={{ color: '#64473A', fontWeight: 'bold' }}>
    <label htmlFor="type">Type:</label>
    <select
      id="type"
      name="type"
      className={styles.input}
      value={formData.type}
      onChange={handleChange}
      style={{background: '#8F7664'}}
    >
      <option value={formData.type}>{formData.type}</option>
      <option value="rent">Rent</option>
      <option value="buy">Buy</option>
    </select>
  </div>

  <div className={styles.inputWrapper} style={{ marginLeft: '20px',color: '#64473A', fontWeight: 'bold' }}>
    <label  style={{ marginLeft: '-30px' }}htmlFor="category">Category:</label>
    <select
      id="category"
      name="category"
      className={styles.input}
      value={formData.category}
      onChange={handleChange}
      style={{ marginLeft: '-30px',background: '#8F7664' }}
      

      disabled={formData.type === "rent"} // Disable category selection if type is rent
    >
      {formData.type === "rent" ? ( // Render options based on type
        <option value="bridalSaree">Bridal Sarees</option>
      ) : (
        <>
          <option value="bridalSaree">Bridal Sarees</option>
          <option value="bridesmaidSaree">Bridesmaids sarees</option>
          <option value="lehenga">Lehengas</option>
          <option value="jwellery">Jewelleries</option>
          <option value="flowerBouquet">Flower Bouquet</option>
        </>
      )}
    </select>
  </div>
</div>

            <div className={styles.inputRow}>
              <div className={styles.label} style={{ color: '#64473A', fontWeight: 'bold' }}>
                <label>Size:</label>
              </div>
              <div className={styles.input}>
                <input type="text" name="size" value={formData.size} onChange={handleChange} className={styles.inputField} style={{background: '#8F7664'}} />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.label} style={{ color: '#64473A', fontWeight: 'bold' }}>
                <label>Description:</label>
              </div>
              <div className={styles.input}>
                <textarea name="description" value={formData.description} onChange={handleChange} className={styles.inputField} style={{background: '#8F7664'}}></textarea>
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.label} style={{ color: '#64473A', fontWeight: 'bold' }}>
                <label>Price:</label>
              </div>
              <div className={styles.input}>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.inputField} style={{background: '#8F7664'}}  />
              </div>
            </div>
            {/* Add file input for updating images */}
            <div className={styles.inputRow} >
              <div className={styles.label} style={{ color: '#64473A', fontWeight: 'bold' }} >
                <label>Update Images:</label>
              </div>
              
              
              <div className={styles.uploadImages}>
                <input type="file" name="images" onChange={handleImageChange} multiple className={styles.inputField} />
              </div>
            </div>
            <div className={styles.buttons}>
            <br/>
              <button type="submit" className={styles.submitButton}>Update</button>
              <button type="button" onClick={handleClear} className={styles.cancelButton}>Cancel</button>
            </div>
            <br></br>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
