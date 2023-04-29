import React, { useState } from "react";
import run from "../../backend/GetItems.js";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { urlConstants } from "./../../model/Constant.ts";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function MainPage() {
  const [name, setName] = useState("Mehul");

  async function displayRazorpay() {
    debugger;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const data = await fetch("http://localhost:1337/razorpay", {
    //   method: "POST",
    // }).then((t) => t.json());

    var options = {
      key: "rzp_test_GKIy23FWyASw2m", // Enter the Key ID generated from the Dashboard
      amount: "135600",
      currency: "INR",
      description: "Acme Corp",
      image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: +919900000000,
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "Most Used Methods",
              instruments: [
                {
                  method: "wallet",
                  wallets: ["freecharge"],
                },
                {
                  method: "upi",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: function (response) {
        alert("Success");
        alert(response.razorpay_payment_id);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const callDynamodb = () => {
    debugger;
    run();
  };

  window.addEventListener("scroll", function () {
    if (document.querySelector("header")) {
      if (window.scrollY > 200) {
        document.querySelector("header").className = "active";
      } else {
        document.querySelector("header").classList.remove("active");
      }
    }
  });

  function DetailPage1() {
    debugger;

    Window.location.href = "http://localhost:3000/CrazyDesign/DetailsPage";
  }

  return (
    <>
      {/* <h1>crazy Designs</h1>
      <button onClick={displayRazorpay}> Buy Now</button>
      <button onClick={callDynamodb}>call dynamodb</button> */}

      {/* Header  */}
      <header>
        <nav>
          <div className="logo-holder">
            <img src="../../assests/Images/CF-logo.webp" alt="Not found" />
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#templates">Templates</a>
            <a href="#features">Features</a>
            <a href="#faq">Faq</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* Banner */}
      <section className="banner" id="home">
        <div className="banner-container">
          <p>Animated Templates</p>
          <h1>Create Amazing Videos For</h1>
          <span>
            Digital menu board, instagram stories, social media posts and more.
            enjoy!
          </span>
          <a href="#templates">
            <button className="primary-button">Browse Templates</button>
          </a>
        </div>
      </section>

      {/* Our Bundles */}
      <section className="bundles" id="templates">
        <h2>Our Bundles</h2>
        <div className="bundles-container">
          {[1, 2, 3].map((x) => {
            return (
              <div className="template">
                <Swiper
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  loop={true}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://templates-mini-image.s3.ap-south-1.amazonaws.com/Slide1.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCmFwLXNvdXRoLTEiRzBFAiEAmAhQaDvisQM22Yqo798nHwDjlO5Kgyq4k0A2j5gsWbcCIEI73hK9N2wgu%2FA%2F%2B%2F7NKXq8KPEXjfB%2Fa75teIEM4xWWKugCCHcQABoMNjU5ODczMjk0ODkwIgwwYhF%2FRF9LsJJP5fgqxQJd1OLCDx5WDWQFe%2BakY%2FNaMBPl3gHOxKTRCdmmDhX8VF2Yw1X8XE5Gampb3sYq%2FvKiFLTBkwgG8wC1Y%2FZnOIXTjWodPJgLbwQKaIIFCIF3oSXOmBa1GZWlaTwAZnKw7P8CmFJ%2FgbTxdvSGibbXgR2jHVJuUGoFNpILk41b7vIuMGSUKQkqNuYcViJ%2FumM9pRVOJhYY0nf6uNqo%2F6UOUOtXFDsN674P6%2BUPgDAk6tBC07J0eF7%2FX35asUv1QGEWY2a9JXpIkyPSSELFTGFmAgkrKTU94%2FyuxxMPZJuWcV7cJTyf%2BnUJmUW6kwGp5r0PX1GV%2Bdw9h9dIj%2Btpz2%2F2EaYwj6Pf2UYPb%2Bz02QA76LbpmSbOt9LaEXbGr45AxBtg1AkeLoRWUvlvh00EmEfk%2FVAirazgdKEp%2B2hFZc9CFNRyVBZkiP7RMLzDtKIGOrMCYhiIEp1%2FYX7K8IgZ2bdoo%2FbeTviZYEnGsVRDLlWfcOWWj1IFmogvyTH6UkEVHmorj%2B%2FxsuuJNHR7RkASrx99zxkewdTrRxgSybIdstUxBnLZ5UijjxnrcHPI2vo6mb6MkYFGGbDT73DijH5uD1ZJim8HyvPzXSG7H6wJgy6pHnu2D3fMfxk5q2MuhRvBQmqrcWOoGxuiDE3NmNcsUVHs4suxvsaSDgEdZbMsEV2rzyFsr%2BFPCKOcBUGl%2B9XD%2Bdn29YWHMwzt0i8QmOJPCEkhyASZ7MP5FBBZLeEx1IlVCTrphsF5hf%2F4whoVZwKT8Kr6tq%2BZh5myLWiNHqIvuvcFhnHj%2BtVCuN%2Bh9z8GxcYqxLXg8mXbe0JCgrkFP9f66vrZexw1GSHMT06Oz76IK%2FRt%2FyAtGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230429T163154Z&X-Amz-SignedHeaders=host&X-Amz-Expires=18000&X-Amz-Credential=ASIAZTI4DNIVI4TJ6R5V%2F20230429%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e53198abe3b76fdaaa0057953fff1a3144ddd730c8654fd37b48ccfa7d2efaa0"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={require("https://templates-mini-image.s3.ap-south-1.amazonaws.com/Slide1.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCmFwLXNvdXRoLTEiRzBFAiEAmAhQaDvisQM22Yqo798nHwDjlO5Kgyq4k0A2j5gsWbcCIEI73hK9N2wgu%2FA%2F%2B%2F7NKXq8KPEXjfB%2Fa75teIEM4xWWKugCCHcQABoMNjU5ODczMjk0ODkwIgwwYhF%2FRF9LsJJP5fgqxQJd1OLCDx5WDWQFe%2BakY%2FNaMBPl3gHOxKTRCdmmDhX8VF2Yw1X8XE5Gampb3sYq%2FvKiFLTBkwgG8wC1Y%2FZnOIXTjWodPJgLbwQKaIIFCIF3oSXOmBa1GZWlaTwAZnKw7P8CmFJ%2FgbTxdvSGibbXgR2jHVJuUGoFNpILk41b7vIuMGSUKQkqNuYcViJ%2FumM9pRVOJhYY0nf6uNqo%2F6UOUOtXFDsN674P6%2BUPgDAk6tBC07J0eF7%2FX35asUv1QGEWY2a9JXpIkyPSSELFTGFmAgkrKTU94%2FyuxxMPZJuWcV7cJTyf%2BnUJmUW6kwGp5r0PX1GV%2Bdw9h9dIj%2Btpz2%2F2EaYwj6Pf2UYPb%2Bz02QA76LbpmSbOt9LaEXbGr45AxBtg1AkeLoRWUvlvh00EmEfk%2FVAirazgdKEp%2B2hFZc9CFNRyVBZkiP7RMLzDtKIGOrMCYhiIEp1%2FYX7K8IgZ2bdoo%2FbeTviZYEnGsVRDLlWfcOWWj1IFmogvyTH6UkEVHmorj%2B%2FxsuuJNHR7RkASrx99zxkewdTrRxgSybIdstUxBnLZ5UijjxnrcHPI2vo6mb6MkYFGGbDT73DijH5uD1ZJim8HyvPzXSG7H6wJgy6pHnu2D3fMfxk5q2MuhRvBQmqrcWOoGxuiDE3NmNcsUVHs4suxvsaSDgEdZbMsEV2rzyFsr%2BFPCKOcBUGl%2B9XD%2Bdn29YWHMwzt0i8QmOJPCEkhyASZ7MP5FBBZLeEx1IlVCTrphsF5hf%2F4whoVZwKT8Kr6tq%2BZh5myLWiNHqIvuvcFhnHj%2BtVCuN%2Bh9z8GxcYqxLXg8mXbe0JCgrkFP9f66vrZexw1GSHMT06Oz76IK%2FRt%2FyAtGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230429T163154Z&X-Amz-SignedHeaders=host&X-Amz-Expires=18000&X-Amz-Credential=ASIAZTI4DNIVI4TJ6R5V%2F20230429%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e53198abe3b76fdaaa0057953fff1a3144ddd730c8654fd37b48ccfa7d2efaa0")}
                      alt="Not found"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://www.powerpointvideoads.com/wp-content/themes/pva/img/mega-pack-post-18.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://www.powerpointvideoads.com/wp-content/themes/pva/img/mega-pack-post-18.jpg"
                    />
                  </SwiperSlide>
                </Swiper>
                <p>
                  MEGA PACK DIGITAL MENU BOARDS - POWERPOINT ANIMATED TEMPLATES
                </p>
                <div className="buttons-wrap">
                  <button className="">More Details</button>
                  <button className="primary-button">Buy Now</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Individual templates */}
      <section className="bundles" id="templates">
        <h2>Individual Templates</h2>
        <div className="bundles-container">
          {[1, 2, 3].map((x) => {
            return (
              <div className="template">
                <Swiper
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  loop={true}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://templates-mini-image.s3.ap-south-1.amazonaws.com/Slide1.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCmFwLXNvdXRoLTEiRzBFAiEAmAhQaDvisQM22Yqo798nHwDjlO5Kgyq4k0A2j5gsWbcCIEI73hK9N2wgu%2FA%2F%2B%2F7NKXq8KPEXjfB%2Fa75teIEM4xWWKugCCHcQABoMNjU5ODczMjk0ODkwIgwwYhF%2FRF9LsJJP5fgqxQJd1OLCDx5WDWQFe%2BakY%2FNaMBPl3gHOxKTRCdmmDhX8VF2Yw1X8XE5Gampb3sYq%2FvKiFLTBkwgG8wC1Y%2FZnOIXTjWodPJgLbwQKaIIFCIF3oSXOmBa1GZWlaTwAZnKw7P8CmFJ%2FgbTxdvSGibbXgR2jHVJuUGoFNpILk41b7vIuMGSUKQkqNuYcViJ%2FumM9pRVOJhYY0nf6uNqo%2F6UOUOtXFDsN674P6%2BUPgDAk6tBC07J0eF7%2FX35asUv1QGEWY2a9JXpIkyPSSELFTGFmAgkrKTU94%2FyuxxMPZJuWcV7cJTyf%2BnUJmUW6kwGp5r0PX1GV%2Bdw9h9dIj%2Btpz2%2F2EaYwj6Pf2UYPb%2Bz02QA76LbpmSbOt9LaEXbGr45AxBtg1AkeLoRWUvlvh00EmEfk%2FVAirazgdKEp%2B2hFZc9CFNRyVBZkiP7RMLzDtKIGOrMCYhiIEp1%2FYX7K8IgZ2bdoo%2FbeTviZYEnGsVRDLlWfcOWWj1IFmogvyTH6UkEVHmorj%2B%2FxsuuJNHR7RkASrx99zxkewdTrRxgSybIdstUxBnLZ5UijjxnrcHPI2vo6mb6MkYFGGbDT73DijH5uD1ZJim8HyvPzXSG7H6wJgy6pHnu2D3fMfxk5q2MuhRvBQmqrcWOoGxuiDE3NmNcsUVHs4suxvsaSDgEdZbMsEV2rzyFsr%2BFPCKOcBUGl%2B9XD%2Bdn29YWHMwzt0i8QmOJPCEkhyASZ7MP5FBBZLeEx1IlVCTrphsF5hf%2F4whoVZwKT8Kr6tq%2BZh5myLWiNHqIvuvcFhnHj%2BtVCuN%2Bh9z8GxcYqxLXg8mXbe0JCgrkFP9f66vrZexw1GSHMT06Oz76IK%2FRt%2FyAtGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230429T163154Z&X-Amz-SignedHeaders=host&X-Amz-Expires=18000&X-Amz-Credential=ASIAZTI4DNIVI4TJ6R5V%2F20230429%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e53198abe3b76fdaaa0057953fff1a3144ddd730c8654fd37b48ccfa7d2efaa0"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={require("https://templates-mini-image.s3.ap-south-1.amazonaws.com/Slide1.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCmFwLXNvdXRoLTEiRzBFAiEAmAhQaDvisQM22Yqo798nHwDjlO5Kgyq4k0A2j5gsWbcCIEI73hK9N2wgu%2FA%2F%2B%2F7NKXq8KPEXjfB%2Fa75teIEM4xWWKugCCHcQABoMNjU5ODczMjk0ODkwIgwwYhF%2FRF9LsJJP5fgqxQJd1OLCDx5WDWQFe%2BakY%2FNaMBPl3gHOxKTRCdmmDhX8VF2Yw1X8XE5Gampb3sYq%2FvKiFLTBkwgG8wC1Y%2FZnOIXTjWodPJgLbwQKaIIFCIF3oSXOmBa1GZWlaTwAZnKw7P8CmFJ%2FgbTxdvSGibbXgR2jHVJuUGoFNpILk41b7vIuMGSUKQkqNuYcViJ%2FumM9pRVOJhYY0nf6uNqo%2F6UOUOtXFDsN674P6%2BUPgDAk6tBC07J0eF7%2FX35asUv1QGEWY2a9JXpIkyPSSELFTGFmAgkrKTU94%2FyuxxMPZJuWcV7cJTyf%2BnUJmUW6kwGp5r0PX1GV%2Bdw9h9dIj%2Btpz2%2F2EaYwj6Pf2UYPb%2Bz02QA76LbpmSbOt9LaEXbGr45AxBtg1AkeLoRWUvlvh00EmEfk%2FVAirazgdKEp%2B2hFZc9CFNRyVBZkiP7RMLzDtKIGOrMCYhiIEp1%2FYX7K8IgZ2bdoo%2FbeTviZYEnGsVRDLlWfcOWWj1IFmogvyTH6UkEVHmorj%2B%2FxsuuJNHR7RkASrx99zxkewdTrRxgSybIdstUxBnLZ5UijjxnrcHPI2vo6mb6MkYFGGbDT73DijH5uD1ZJim8HyvPzXSG7H6wJgy6pHnu2D3fMfxk5q2MuhRvBQmqrcWOoGxuiDE3NmNcsUVHs4suxvsaSDgEdZbMsEV2rzyFsr%2BFPCKOcBUGl%2B9XD%2Bdn29YWHMwzt0i8QmOJPCEkhyASZ7MP5FBBZLeEx1IlVCTrphsF5hf%2F4whoVZwKT8Kr6tq%2BZh5myLWiNHqIvuvcFhnHj%2BtVCuN%2Bh9z8GxcYqxLXg8mXbe0JCgrkFP9f66vrZexw1GSHMT06Oz76IK%2FRt%2FyAtGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230429T163154Z&X-Amz-SignedHeaders=host&X-Amz-Expires=18000&X-Amz-Credential=ASIAZTI4DNIVI4TJ6R5V%2F20230429%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e53198abe3b76fdaaa0057953fff1a3144ddd730c8654fd37b48ccfa7d2efaa0")}
                      alt="Not found"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://www.powerpointvideoads.com/wp-content/themes/pva/img/mega-pack-post-18.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      alt="Not found"
                      src="https://www.powerpointvideoads.com/wp-content/themes/pva/img/mega-pack-post-18.jpg"
                    />
                  </SwiperSlide>
                </Swiper>
                <p>
                  MEGA PACK DIGITAL MENU BOARDS - POWERPOINT ANIMATED TEMPLATES
                </p>
                <div className="buttons-wrap">
                  <button className="secondary-button">More Details</button>
                  <button className="primary-button">Buy Now</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact us */}
      <section className="contact-us" id="contact">
        <h2>For Queries</h2>
        <p>
          If you have any doubt in how to use this template or any other
          information, send an e-mail to:{" "}
          <a href="mailto:crazyfoods@gmail.com">crazyfoods@gmail.com</a> We will
          be happy to answer.
        </p>
        <a href="mailto:crazyfoods@gmail.com">
          <button className="primary-button">Contact Us</button>
        </a>
      </section>

      {/* Footer */}
      <footer>
        <p>copy rights reserved</p>
      </footer>
    </>
  );
}

export default MainPage;
