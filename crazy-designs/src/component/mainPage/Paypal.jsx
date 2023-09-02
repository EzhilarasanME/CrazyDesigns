import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useTemplateContext } from "context/GetTemplate/TemplateContext.tsx";

// This values are the props in the UI
// const amount = "7.00";
const currency = "USD";

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ isPending }, dispatch] =
    usePayPalScriptReducer();
  const {viewDetailInput} = useTemplateContext()
  const style = { layout: "vertical", label: "pay" };

  // if(!(Number(amount) > 0)){
  //   amount = "7.00"
  // }

  // useEffect(() => {
  //   dispatch({
  //     type: "resetOptions",
  //     value: {
  //       ...options,
  //       currency: currency,
  //     },
  //   });
  // }, [currency, dispatch, options]);

  //   const   {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  // } = useForm();

  const [isEmailValid, setIsEmailValid] = useState(false);
  console.log("isEmailValid", isEmailValid);
  const emailOnchange = (value) => {
    debugger;
    if (!value.target.value) {
      setIsEmailValid(false);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.target.value)) {
      setIsEmailValid(false);
    }else{
      setIsEmailValid(true);
    }
  };

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
      {!isEmailValid && <div style={{ color:"red" }}>Invalid email address</div>}
 
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
                custom: viewDetailInput.viewDetailData.title,
              },
            })
            .then((orderId) => {
              console.log(orderId);
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          console.log(data, actions);

          return actions.order.capture().then(function (data) {
            if (data.status === "COMPLETED") {
              alert("Order placed successfully.You get a templates via email.");
            } else {
              alert("Something went wrong payment not completed");
            }
            console.log(data);
            // Your code here after cadepture the order
          });
        }}
      />
    </>
  );
};

export default function Paypal() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px", minWidth: "300px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AXBGMaJoIdv5dEVSMz-ZrWUXhXFdE1QDqPZWVCzV5Hn_wAspMXOC2qEwDE9zC-OxoALy5av7oSF3QIXG",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
