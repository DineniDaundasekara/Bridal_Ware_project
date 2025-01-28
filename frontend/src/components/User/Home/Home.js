import React, { useEffect } from "react";
import styles from './Home.module.css'; // Importing CSS module
import Header from "../../Inquiry/Contact Us/UserHeader";
import img1 from './img/homeImg01.jpg'
import img2 from './img/homeImg02.jpg'
import img3 from './img/homeImg03.jpg'
import UserFooter from "../../Inquiry/Contact Us/UserFooter";
import videoSource from './img/Home.mp4'; // Importing the video file

const HomePage = () => {
  useEffect(() => {
    const valueDisplays = document.querySelectorAll(".num");
    const interval = 4000;

    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(() => {
        startValue += 1;
        if (startValue <= endValue) {
          valueDisplay.textContent = startValue;
        }
        if (startValue >= endValue) {
          clearInterval(counter);
          valueDisplay.textContent = endValue + "+";
        }
      }, duration);
    });

    const words = ['Your Style', 'Your Fit', 'Your Way'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const word = words[wordIndex];
      const typingEffect = document.getElementById('typing-effect');

      if (isDeleting) {
        typingEffect.textContent = word.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEffect.textContent = word.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
        setTimeout(type, 3000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex === words.length) {
          wordIndex = 0;
        }
        setTimeout(type, 500);
      } else {
        setTimeout(type, 100);
      }
    }

    type();
  }, []);

  return (
    <div className='bg' style={{backgroundColor: '#A18D71'}}>
      <Header />
      <div className={styles.all}>
        <video className={styles.bgVideo} autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* <button className={styles.contact} href="#con">Customize Now</button> */}

        <div className={styles.elements}>
          {/* <p className={styles.welcome}>Tailored to<br /><b><span style={{color: '#bf1e2d'}}>Perfection</span></b><br /></p> */}
          
          <div id="typing-container" className={styles.typingContainer}>
            <span id="typing-effect" className={styles.typingEffect}></span>
            <p id="typing-placeholder" className={styles.typingPlaceholder}>&nbsp;</p>
          </div>
        </div>    

        {/* <div className={styles.wrapper}>
          <div className={styles.container}>
            <span className="num" style={{fontWeight:'bold', fontSize:'3vw'}} data-val="500">00</span>
            <span className="text">Users</span>
          </div>
          <div className={styles.container}>
            <span className="num" style={{fontWeight:'bold', fontSize:'3vw'}} data-val="35">000</span>
            <span className="text">Collections</span>
          </div>
          <div className={styles.container}>
            <span className="num" style={{fontWeight:'bold', fontSize:'3vw'}} data-val="100">000</span>
            <span className="text">Designs</span>
          </div>
        </div> */}
      </div>

      <div style={{ backgroundColor: '#A18D71', padding: '20px 0' }}> {/* New div with background color */}
  <h2 style={{textAlign: 'center', marginTop: '0px', marginBottom: '60px', fontWeight: 'bold'}}>What Makes Us <span style={{color: '#bf1e2d'}}>Unique</span> ?</h2>
  <div className={styles.row}>
    <div className={styles.column}>
      <div className={styles.imageContainer}>
        <img src={img1} className={styles.image} alt="Image 1" />
        <div className={styles.imageText}></div>
      </div>
    </div>
    <div className={styles.column}>
      <div className={styles.imageContainer}>
        <img src={img2} className={styles.image} alt="Image 2" />
        <div className={styles.imageText}></div>
      </div>
    </div>
    <div className={styles.column}>
      <div className={styles.imageContainer}>
        <img src={img3} className={styles.image} alt="Image 3" />
        <div className={styles.imageText}></div>
      </div>
    </div>
  </div>
</div>


      <h2 style={{backgroundColor: '#A18D71', textAlign: 'center', marginTop: '0px', marginBottom: '60px', fontWeight: 'bold'}}>Location</h2>
      <div className="container col-md-9">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.87822599711!2d80.57704057225234!3d7.254697674063253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3692cbc92e509%3A0x434db46c0724229f!2sSalon%20Swarna%20Vilasitha!5e0!3m2!1sen!2slk!4v1723522587576!5m2!1sen!2slk" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <br/><br/>
      <UserFooter/>
    </div>
  );
};

export default HomePage;