import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { useNavigate, useParams } from "react-router-dom";
// import ProductContext from "./context/ProductContext";
import { MDBContainer,MDBRow,MDBCol,MDBBtn } from "mdb-react-ui-kit";
const stripe=loadStripe
('pk_test_51Mf6UZSBMrqQsHDAl51HUJStGztFoYCmiSfB67GdoByN9hi7KBPq8aFQfXRX2Dpka0JEps5Smd7gAQirS1Te5R8A00HpZSwecJ');


const loader=`auto`
const Checkout=()=>{
    const {id}=useParams()
    const clientSecret=id;
    if(id){
        return(
           <Elements stripe={stripe} options={{clientSecret,loader}}>
                <CheckoutForm/>
           </Elements>
        )
    }
    
}


function CheckoutForm(){
    const stripe=useStripe();
    const elements=useElements();

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {error}=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:'http://localhost:3000/payment/success'
            }
        });
        if(error){
            navigate("/");
        }
    }

    return(
        <MDBContainer className="mt-5">
            <MDBRow center>
                <MDBCol md={12} lg={6}>
                    <form>
                        <h3>Payment Time</h3>
                        <PaymentElement/>
                        <div className="d-flex justify-content-end mt-3">
                            <MDBBtn onClick={()=>navigate("/")} style={{
                                margin:"3px"
                            }}>
                                Back
                            </MDBBtn>
                            <MDBBtn onClick={handleSubmit} style={{
                                margin:"3px"
                            }}>
                                Submit
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default Checkout