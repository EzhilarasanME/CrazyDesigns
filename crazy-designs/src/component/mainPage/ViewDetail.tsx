import { IRazorpayConfig, Razorpay } from "razorpay-typescript";
import {
  IRazorOrder,
  RazorOrders,
} from "razorpay-typescript/dist/resources/order";
import React from "react";
import { useCallback } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "./style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation } from "react-router-dom";
export default function ViewDetail() {
    debugger
  const { state } = useLocation();
  const RazorpayType = useRazorpay();

  const handlePayment = useCallback(async () => {

    const options: RazorpayOptions = {
      key: "rzp_test_GKIy23FWyASw2m",
      amount: "135600",
      currency: "INR",
      description: "Acme Corp",
      image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: "+919900000000",
      },
      config: {
        display: {
          language: "en",
        },
      },
      handler: function (response) {
        alert("Success");
        alert(response.razorpay_payment_id);
      },
      name: "abc",
      order_id: "",
    };

    const orderdetail: IRazorOrder = {
      amount: 0,
      currency: "",
    };
    const config: IRazorpayConfig = {
      authKey: {
        key_id: "rzp_test_GKIy23FWyASw2m",
        key_secret: "oqJSmMsw98L7dVkjMEssKSIW",
      },
    };
    const aa = new Razorpay(config);

    const orderId = new RazorOrders(aa);

    const params: IRazorOrder = {
      amount: 0,
      currency: "",
    };

    // const getorderId: Promise<IRazorOrderId> = orderId.create(params);
    // getorderId.then(function (result) {
    //   debugger
    //   return (result);
    // })

    // options.order_id = (await getorderId).id;

    const rzpay = new RazorpayType(options);

    rzpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzpay.open();
  }, [RazorpayType]);
  
  return (
    <>
      {/* <h1>crazy Designs</h1>
      <button onClick={displayRazorpay}> Buy Now</button>
      <button onClick={callDynamodb}>call dynamodb</button> */}

      {/* Header  */}
      <header>
        <nav>
          <div className="logo-holder">
            <img
              src={require("./images/food-images/logo.png")}
              alt="Not found"
            />
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

      {/* Our Bundles */}
      <section className="bundles page" id="templates">
        <h2>Our Bundles</h2>
        <div className="bundles-container vertical-dual">
          <div className="template">
            <Swiper
            //   autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            //   }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              className="mySwiper"
            >
              {state.imageLinks.map((y) => {
                return (
                  <>
                    <SwiperSlide>
                      <img alt="Not found" src={y} />
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
            <p>{state.title}</p>
          </div>
          <div className="template vertical">
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              className="mySwiper"
            >
              {state.imageLinks.map((y) => {
                return (
                  <>
                    <SwiperSlide>
                      <img alt="Not found" src="https://i.ibb.co/9WwR4KL/Slide1.png" />
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
            <p>{state.title}</p>
          </div>
          <div className="bundle-btn-wrap">
              {/* <button
                value={state.id}
                className="secondary-button"
              >
                Add to cart
              </button> */}
              <button
                onClick={handlePayment}
                data-price={state.price}
                className="primary-button"
              >
                Buy Now
              </button>
            </div>
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
        <p>ALL RIGHTS RESERVED © CRAZY DESIGNS - 2022</p>
      </footer>
    </>
  );
}
