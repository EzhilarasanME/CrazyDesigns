import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useTemplateContext } from "context/GetTemplate/TemplateContext.tsx";
import { Modal, Button } from "react-bootstrap";

// This values are the props in the UI
// const amount = "7.00";
const currency = "USD";

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ isPending }] = usePayPalScriptReducer();
  const { viewDetailInput } = useTemplateContext();
  const style = { layout: "vertical", label: "pay" };
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    message: "",
    header: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailId, setEmailId] = useState("");


  const emailOnchange = (value) => {
    setEmailId(value.target.value)
    if (!value.target.value) {
      setIsEmailValid(false);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.target.value)
    ) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const onCloseModal = () =>
    setPaymentModal((current) => ({
      ...current,
      isOpen: false,
    }));

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}

      <div>Enter the emailId : {"  "}</div>
      <input
        onChange={(e) => emailOnchange(e)}
        style={{
          width: "100%",
          marginBottom: "4px",
        }}
        type="text"
      ></input>
      {!isEmailValid && (
        <div style={{ color: "red" }}>Invalid email address</div>
      )}

      <PayPalButtons
        disabled={!isEmailValid}
        style={style}
        forceReRender={[viewDetailInput.viewDetailData.amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: viewDetailInput.viewDetailData.amount,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING", // Exclude the billing address
                custom: viewDetailInput.viewDetailData.title + emailId,
              },
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          

          return actions.order.capture().then(function (data) {
            if (data.status === "COMPLETED") {
              setPaymentModal((current) => ({
                ...current,
                isOpen: true,
                message:
                  "Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order and files.",
                header: "Payment successful",
              }));
            } else {
              setPaymentModal((current) => ({
                ...current,
                isOpen: true,
                message:
                  "Unfortunately, your payment was not successful. We apologize for any inconvenience this may have caused. If you believe this is in error, please check your payment information and try again. If you continue to experience issues, please contact our support team for assistance. Thank you for choosing our services.",
                header: "Payment failed",
              }));
            }
            // Your code here after cadepture the order
          });
        }}
      />
      <Modal
        show={paymentModal.isOpen}
        // onHide={onCloseModal}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header style={{ backgroundColor: "bisque" }}>
          <Modal.Title>{paymentModal.header}</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <div>{paymentModal.message}</div>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "bisque" }}>
          <Button onClick={onCloseModal} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default function Paypal() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px", minWidth: "300px" }}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
          currency: "USD",
          components: 'buttons'
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
