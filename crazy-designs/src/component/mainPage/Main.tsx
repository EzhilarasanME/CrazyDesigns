import { IRazorpayConfig, Razorpay } from "razorpay-typescript";
import {
  IRazorOrder,
  RazorOrders,
} from "razorpay-typescript/dist/resources/order";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import SearchIcon from "../../assests/Images/search.png";
import "./style.css";
import PayPalHttpClient from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
import path from "path";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import TemplateContext from "../../shared/customProvider/TemplateContext";

const jsondata = {
  bundleList: [
    {
      id: 11,
      title: "Digital menu template horizontal",
      imageLinks: {
        vertical: [],
        horizontal: [
          "https://i.ibb.co/20zbhcy/Slide1.png",
          "https://i.ibb.co/JcdYwF2/Slide2.png",
          "https://i.ibb.co/QbkJH80/Slide3.png",
          "https://i.ibb.co/N3cngjp/Slide4.png",
          "https://i.ibb.co/jyc0W9J/Slide5.png",
        ],
      },
      amount: "1.00",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
    {
      id: 2,
      title: "Ice Cream menu template Vertical",
      imageLinks: {
        vertical: [
          "https://i.ibb.co/9WwR4KL/Slide1.png",
          "https://i.ibb.co/8KfbmFT/Slide2.png",
          "https://i.ibb.co/0cjLnrs/Slide3.png",
          "https://i.ibb.co/q1W293k/Slide4.png",
          "https://i.ibb.co/8MfNj4x/Slide5.png",
          "https://i.ibb.co/cT27rvZ/Slide6.png",
          "https://i.ibb.co/G7vxWVW/Slide7.png",
          "https://i.ibb.co/cLHt5SC/Slide8.png",
          "https://i.ibb.co/7rpNgfQ/Slide9.png",
          "https://i.ibb.co/fx96ttW/Slide10.png",
        ],
        horizontal: [
          "https://i.ibb.co/vLTzDXk/Slide2.png",
          "https://i.ibb.co/J5337S5/Slide1.png",
          "https://i.ibb.co/TT8kCz5/Slide3.png",
          "https://i.ibb.co/SPVgFZB/Slide4.png",
          "https://i.ibb.co/YhTMM9Q/Slide5.png",
          "https://i.ibb.co/HDtmTk8/Slide6.png",
          "https://i.ibb.co/3449ygr/Slide8.png",
          "https://i.ibb.co/0MXLYmK/Slide7.png",
          "https://i.ibb.co/59kknQF/Slide9.png",
          "https://i.ibb.co/hmhBbXn/Slide10.png",
        ],
      },
      amount: "7.00",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
  ],
};

export default function Main() {
  const RazorpayType = useRazorpay();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const { setTemplateName, setAmount } = useContext(TemplateContext);

  const clonedJsondata = useMemo(() => {
    if (searchValue) {
      const filteredList = jsondata.bundleList.filter((x) =>
        x.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredList.length > 0) {
        return { bundleList: filteredList };
      }
      return null;
    }

    return cloneDeep(jsondata);
  }, [searchValue]);

  useEffect(() => {
    // dotenv.config({ path: path.resolve("../../../.env") });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchValue]);

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
    //   
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

  //Paypal
  // Initialize PayPal client
  // const environment = new PayPalHttpClient.core.LiveEnvironment(process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX, process.env.REACT_APP_PAYPAL_CLIENT_SECRET_SANDBOX); // Use 'Production' for live environment
  const environment = new PayPalHttpClient.core.SandboxEnvironment(
    "AXBGMaJoIdv5dEVSMz-ZrWUXhXFdE1QDqPZWVCzV5Hn_wAspMXOC2qEwDE9zC-OxoALy5av7oSF3QIXG",
    "ENcz7_omAPr3UUHVxbHczsRJnZ4v2a0YAzMa-qD2pyGC8PwNyfcknybk4m4yvMyIFj8Ar7fc1zO2NI1P"
  ); // Use 'Production' for live environment

  const client = new PayPalHttpClient.core.PayPalHttpClient(environment);

  const handlePaymentPaypal = async () => {
    ;
    createOrder();
  };

  const createOrder = async () => {
    ;
    const request = new PayPalHttpClient.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "10.00",
          },
        },
      ],
    });

    try {
      ;
      const response = await client.execute(request);
      console.log(response.result);
      // Capture the order and perform further processing
    } catch (error) {
      ;
      console.error(error);
    }
  };

  const onclickDetailView = useCallback(
    (event) => {
      
      const buttonValue = event.target.value;

      const dataa = jsondata.bundleList.filter(
        (x) => x.id === Number(buttonValue)
      );

      if (dataa?.length > 0) {
        ;
        setTemplateName(dataa[0].title);
        setAmount(dataa[0].amount);
        navigate("/CrazyDesign/ViewDetail", {
          state: dataa[0],
        });
      }
    },
    [navigate, setAmount, setTemplateName]
  );

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Perform your custom logic or submit the form data
    // ...

    // Optionally, return false to indicate a "false" call
    return false;
  }

  return (
    <>
      {/* Header  */}
      <header className="zindex">
        <nav>
          <div key={uuidv4()} className="logo-holder">
            <img
              src={require("./images/food-images/logo.png")}
              alt="Not found"
            />
          </div>
          <div key={uuidv4()} className="nav-links">
            <a href="#home">Home</a>
            <a href="#templates">Templates</a>
            {/* <a href="#features">Features</a>
            <a href="#faq">Faq</a> */}
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* Banner */}
      <section className="banner" id="home">
        <div key={uuidv4()} className="banner-container">
          <p>Crazy Designs</p>
          <h1>Create Amazing Videos For</h1>
          <span>
            Digital menu board, instagram stories, social media posts and more.
            enjoy!
          </span>
          <div key={uuidv4()} className="search-field">
            <input
              type="text"
              value={searchValue}
              ref={inputRef}
              onChange={handleInputChange}
              placeholder="Search..."
            ></input>
            <img src={SearchIcon} alt="" />
          </div>
          {/* <a href="#templates">
            <button onClick={onClickSearch} className="primary-button">
              Browse Templates
            </button>
          </a> */}
        </div>
      </section>

      {/* Our Bundles */}
      <section className="bundles" id="templates">
        <h2>Our Bundles</h2>

        <Alert variant="info">
          <span>
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
          </span>
          <p className="mb-0">
            Click{"  "}
            <span>
              <Button variant="warning" size="sm" disabled>
                View Detail
              </Button>
            </span>
            {"  "}for a better visual representation.
          </p>
          <hr color="black" />
          <p className="mb-0">
            If the template has{"  "}
            <span>
              <Button variant="warning" size="sm" disabled>
                vertical templates included
              </Button>
            </span>{" "}
            {"  "}tag, both horizontal and vertical sizes are included no extra
            cost.
          </p>
        </Alert>

        <form onSubmit={handleSubmit}>
          <div key={uuidv4()} className="">
            {clonedJsondata != null ? (
              <div key={uuidv4()} className="bundles-container">
                {clonedJsondata.bundleList.map((x, index) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={`template ${
                        x.imageLinks.vertical.length > 0 ? "vertical" : ""
                      }`}
                    >
                      <Swiper
                        key={uuidv4()}
                        // autoplay={{
                        //   delay: 2500,
                        //   disableOnInteraction: false,
                        // }}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        loop={true}
                        className="mySwiper"
                      >
                        {x.imageLinks.horizontal.map((y, index) => {
                          return (
                            <>
                              <SwiperSlide key={index}>
                                <img alt="Not found" src={y} />
                              </SwiperSlide>
                            </>
                          );
                        })}
                        <SwiperSlide key={uuidv4()}>
                          <iframe
                            src={x.videoLink}
                            title="YouTube video player"
                          ></iframe>
                        </SwiperSlide>
                      </Swiper>
                      <p>{x.title}</p>
                      <div key={uuidv4()} className="buttons-wrap">
                        <button
                          value={x.id}
                          onClick={onclickDetailView}
                          className="secondary-button"
                        >
                          View Details
                        </button>
                        {/* <button
                        onClick={handlePaymentPaypal}
                        data-amount={x.amount}
                        className="primary-button"
                      >
                        Buy Now
                      </button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Alert variant="warning">
                    <span>
                      <Alert.Heading>No result found</Alert.Heading>
                    </span>
                    <p className="mb-0">
                      Please try a different search term like tag words,key
                      words...
                    </p>
                    <hr color="black" />
                  </Alert>
                </div>
              </>
            )}
          </div>
        </form>
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
