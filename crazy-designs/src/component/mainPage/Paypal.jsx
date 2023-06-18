import { useEffect, useContext } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import TemplateContext from "../../shared/customProvider/TemplateContext";

// This values are the props in the UI
// const amount = "7.00";
const currency = "USD";


// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const { templateName, amount } = useContext(TemplateContext);
  const style = { layout: "vertical" };
  // if(!(Number(amount) > 0)){
  //   amount = "7.00"
  // }

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
              application_context: {
                shipping_preference: 'NO_SHIPPING', // Exclude the billing address
                custom: templateName,
              },
            })
            .then((orderId) => {
              // 
              console.log(orderId);
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          // 
          console.log(data, actions);

          return actions.order.capture().then(function (data) {
            // 
            if(data.status === 'COMPLETED'){
              alert("Order placed successfully.You get a templates via email.")
            }else{
              alert("Something went wrong payment not completed")
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
  ;
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px", minWidth: "300px" }}>
      <PayPalScriptProvider
        options={{
          clientId: "AXBGMaJoIdv5dEVSMz-ZrWUXhXFdE1QDqPZWVCzV5Hn_wAspMXOC2qEwDE9zC-OxoALy5av7oSF3QIXG",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
