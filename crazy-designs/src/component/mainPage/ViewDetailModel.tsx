import React from "react";
import { Modal } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Paypal from "./Paypal";
import { Autoplay, Pagination, Navigation } from "swiper";
import { v4 as uuidv4 } from "uuid";
import { useTemplateContext } from "context/GetTemplate/TemplateContext.tsx";


export default function ViewDetailModel() {
 
  const {viewDetailInput,setShowViewDetailModel}= useTemplateContext()

  return (
    <Modal show={viewDetailInput.showViewDetailModel}
    onHide={() => setShowViewDetailModel(!viewDetailInput.showViewDetailModel)}
    size="xl"
     >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
              {viewDetailInput.viewDetailData.imageLinks.horizontal.map((y, index) => {
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
                  src={viewDetailInput.viewDetailData.videoLink}
                  title="YouTube video player"
                ></iframe>
              </SwiperSlide>
            </Swiper>
            <p>{viewDetailInput.viewDetailData.title}</p>
          </div>
          {viewDetailInput.viewDetailData.imageLinks.vertical.length > 0 ? (
            <div className="template">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                className="mySwiper"
              >
                {viewDetailInput.viewDetailData.imageLinks.vertical.map((z) => {
                  return (
                    <>
                      <SwiperSlide key={uuidv4()}>
                        <img alt="Not found" src={z} />
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
              <p>{viewDetailInput.viewDetailData.title}</p>
            </div>
          ) : (
            <></>
          )}

          <div className="bundle-btn-wrap">
            <Paypal></Paypal>
          </div>
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
    </Modal>
  );
}
