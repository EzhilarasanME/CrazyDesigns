import { IRazorpayConfig, Razorpay } from "razorpay-typescript";
import {
  IRazorOrder,
  RazorOrders,
} from "razorpay-typescript/dist/resources/order";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import SearchIcon from "../../assests/Images/search.png"
import "./style.css";

const jsondata = {
  bundleList: [
    {
      id: 11,
      title: "Digital menu template horizontal",
      imageLinks: [
        "https://i.ibb.co/20zbhcy/Slide1.png",
        "https://i.ibb.co/JcdYwF2/Slide2.png",
        "https://i.ibb.co/QbkJH80/Slide3.png",
        "https://i.ibb.co/N3cngjp/Slide4.png",
        "https://i.ibb.co/jyc0W9J/Slide5.png",
      ],
      price: "999",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
    {
      id: 12,
      title: "Digital menu template horizontal",
      imageLinks: [
        "https://i.ibb.co/20zbhcy/Slide1.png",
        "https://i.ibb.co/JcdYwF2/Slide2.png",
        "https://i.ibb.co/QbkJH80/Slide3.png",
        "https://i.ibb.co/N3cngjp/Slide4.png",
        "https://i.ibb.co/jyc0W9J/Slide5.png",
      ],
      price: "999",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
    {
      id: 13,
      title: "Digital menu template horizontal",
      imageLinks: [
        "https://i.ibb.co/20zbhcy/Slide1.png",
        "https://i.ibb.co/JcdYwF2/Slide2.png",
        "https://i.ibb.co/QbkJH80/Slide3.png",
        "https://i.ibb.co/N3cngjp/Slide4.png",
        "https://i.ibb.co/jyc0W9J/Slide5.png",
      ],
      price: "999",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
    {
      id: 14,
      title: "Digital menu template horizontal",
      imageLinks: [
        "https://i.ibb.co/20zbhcy/Slide1.png",
        "https://i.ibb.co/JcdYwF2/Slide2.png",
        "https://i.ibb.co/QbkJH80/Slide3.png",
        "https://i.ibb.co/N3cngjp/Slide4.png",
        "https://i.ibb.co/jyc0W9J/Slide5.png",
      ],
      price: "999",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    },
    {
      id: 15,
      title: "Digital menu template horizontal",
      imageLinks: [
        "https://i.ibb.co/20zbhcy/Slide1.png",
        "https://i.ibb.co/JcdYwF2/Slide2.png",
        "https://i.ibb.co/QbkJH80/Slide3.png",
        "https://i.ibb.co/N3cngjp/Slide4.png",
        "https://i.ibb.co/jyc0W9J/Slide5.png",
      ],
      price: "999",
      videoLink: "https://www.youtube.com/embed/AEzNmGJ7zWU",
    }    
  ],
};

export default function Main() {
  const RazorpayType = useRazorpay();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const clonedJsondata = useMemo(() => {
    debugger
    if (searchValue) {
      const filteredList = jsondata.bundleList.filter((x) =>
        x.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      if(filteredList.length > 0){

        return { bundleList: filteredList };
      }
      return null
    }
    return cloneDeep(jsondata);
  }, [searchValue]);

  useEffect(() => {
    inputRef.current.focus();
  }, [clonedJsondata]);

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

  // const onclickDetailView = (event) => {
  //     const buttonValue = event.target.value;

  //     const dataa = jsondata.bundleList.filter(
  //       (x) => x.id === Number(buttonValue)
  //     );

  //     navigate("/CrazyDesign/ViewDetail", {
  //       state: dataa[0],
  //     });
  //   },
  //   [navigate];

  const onclickDetailView = useCallback(
    (event) => {
      const buttonValue = event.target.value;

      const dataa = jsondata.bundleList.filter(
        (x) => x.id === Number(buttonValue)
      );
      navigate("/CrazyDesign/ViewDetail", {
        state: dataa[0],
      });
    },
    [jsondata.bundleList, navigate]
  );

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    inputRef.current.focus();
  };

  const onClickSearch = () => {
    debugger;
    // if (searchValue) {
    //   const filteredList = jsondata.bundleList.filter((x) =>
    //     x.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    //   );
    //   if (filteredList) {
    //     clonedJsondata({ bundleList: filteredList });
    //   } else {
    //     clonedJsondata(null);
    //   }
    // } else {
    //   clonedJsondata(cloneDeep(jsondata));
    // }
  };

  return (
    <>
      {/* <h1>crazy Designs</h1>
      <button onClick={displayRazorpay}> Buy Now</button>
      <button onClick={callDynamodb}>call dynamodb</button> */}

      {/* Header  */}
      <header>
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
          <div className="search-field">
            <input
              type="text"
              value={searchValue}
              ref={inputRef}
              onChange={handleInputChange}
              placeholder="Search..."
            ></input>
            <img src={SearchIcon} alt="" />
          </div>
          <a href="#templates">
            <button onClick={onClickSearch} className="primary-button">
              Browse Templates
            </button>
          </a>
        </div>
      </section>

      {/* Our Bundles */}
      <section className="bundles" id="templates">
        <h2>Our Bundles</h2>
        <p className="hint-text">Click <span>"View Detail"</span> for a better visual representation.</p>
        <form onSubmit={handlePayment}>
          <div key={uuidv4()} className="bundles-container">
            {clonedJsondata != null ? (
              clonedJsondata.bundleList.map((x, index) => {
                debugger;
                return (
                  <div key={uuidv4()} className="template">
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
                      {x.imageLinks.map((y) => {
                        return (
                          <>
                            <SwiperSlide key={uuidv4()}>
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
                        More Details
                      </button>
                      <button
                        onClick={handlePayment}
                        data-price={x.price}
                        className="primary-button"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div>
                  <p>No result found</p>
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
