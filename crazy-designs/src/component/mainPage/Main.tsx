import React, { useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import SearchIcon from "../../assests/Images/search.png";
import "./style.css";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import ViewDetailModel from "./ViewDetailModel.tsx";
import { useTemplateContext } from "context/GetTemplate/TemplateContext.tsx";

export default function Main() {
  const {
    isLoading,
    templateData,
    setShowViewDetailModel,
    setViewDetailData,
    viewDetailInput,
  } = useTemplateContext();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const clonedtemplateData = useMemo(() => {
    if (searchValue) {
      const filteredList = templateData.bundleList?.filter((x) =>
        x.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredList.length > 0) {
        return { bundleList: filteredList };
      }
      return null;
    }

    return cloneDeep(templateData);
  }, [searchValue, templateData]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchValue]);

  if (isLoading) return <>Loading</>;

  //Paypal
  // Initialize PayPal client
  // const environment = new PayPalHttpClient.core.LiveEnvironment(process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX, process.env.REACT_APP_PAYPAL_CLIENT_SECRET_SANDBOX); // Use 'Production' for live environment

  const onclickDetailView = (event) => {
    const buttonValue = event.target.value;

    const dataa = templateData.bundleList.filter(
      (x) => x.id === Number(buttonValue)
    );

    if (dataa?.length > 0) {
      setViewDetailData(dataa[0]);
      setShowViewDetailModel(true);
    }
  };

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

  if (isLoading) return <>Loading</>;
  debugger;
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
            {clonedtemplateData != null ? (
              <div key={uuidv4()} className="bundles-container">
                {clonedtemplateData.bundleList?.map((x) => {
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
                        <button
                          value={x.id}
                          onClick={onclickDetailView}
                          className="primary-button"
                        >
                          Buy Now ${x.amount}
                        </button>
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

      {viewDetailInput.showViewDetailModel && <ViewDetailModel />}
    </>
  );
}
