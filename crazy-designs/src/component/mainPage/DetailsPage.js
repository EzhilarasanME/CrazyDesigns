import React from "react";
import "./style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { urlConstants } from "../../model/Constant.ts";


export default function DetailsPage() {

  return (
    <>
      {/* header */}
      <header className="active">
        <nav>
          <div className="logo-holder">
            <img alt="Not found" src="./images/food-images/CF-logo.png" />
          </div>
          <div className="nav-links">
            <a href={urlConstants.baseUrl}>Back</a>
          </div>
        </nav>
      </header>

      {/* Main */}
      <section className="details-layout">
        <div className="left-details">
          <h2>POWER CARS – POWERPOINT ANIMATED TEMPLATE FOR CAR DEALERS</h2>

          <p>
            Power Cars it´s a Powerpoint Animated Template for cars presentation
            or car dealers.
          </p>
          <p>Insert your photos and text and enjoy! It’s very easy to edit.</p>
          <p>Resolution: 1920×1080</p>

          <h3>The ZIP file contains:</h3>
          <ul>
            <li>1 .PPT file</li>
            <li>1 .TXT “Read Me” file</li>
          </ul>
          <h3>Music is not included.</h3>
          <h3>HOW CAN YOU USE THIS TEMPLATE?</h3>
          <p>
            Digital menu boards are menus displayed on computer monitors or TV
            screens. This kind of videos are ideal for promoting your products
            and services.
          </p>
          <h3>You just need to follow these 3 steps:</h3>
          <p>
            Download the template and change it with your own images and text.
            Within PowerPoint export your presentation as an .MP4 video file.
            Transfer your video to a flash drive, connect it to the USB port of
            your TV and start the video.
          </p>
          <p>
            <b>
              You can also publish the video that you create on YouTube,
              Instagram, Facebook or any other social media that you want.
            </b>
          </p>
        </div>
        <div className="right-details">
          <img src="https://www.powerpointvideoads.com/wp-content/themes/pva/img/mega-pack-post-18.jpg" />
          <p className="price-title">Price:</p>
          <h3 className="price">
            $9,99<span>$19,99</span>
          </h3>
          <button  className="primary-button">buy Now</button>
          <p className="secure-payments">Secure Payment:</p>
          <p className="license">Licence:</p>
          <p className="license-points">
            You can use this template for your personal or business project.
          </p>
          <p className="license-points">
            You can use this template in multiple projects.
          </p>

          {/* Contact us */}
          <section className="contact-us" id="contact">
            <h2>For Queries</h2>
            <p>
              If you have any doubt in how to use this template or any other
              information, send an e-mail to:
              <a href="mailto:crazyfoods@gmail.com">crazyfoods@gmail.com</a> We
              will be happy to answer.
            </p>
            <a href="mailto:crazyfoods@gmail.com">
              <button className="primary-button">Contact Us</button>
            </a>
          </section>

          {/* Footer */}
          <footer>
            <p>copy rights reserved</p>
          </footer>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <p>copy rights reserved</p>
      </footer>
    </>
    
  );
}

