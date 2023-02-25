import { MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div style={{
        display:"flex",
        flexDirection:'column',
        alignItems:"center"
    }}>
        <MDBContainer
      className="mt-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <Link to="/">
        <MDBIcon fas icon="home" />
      </Link>
      <br />
      <MDBRow>
        <h2>Payment Done Successfully<i class="fas fa-check"></i></h2>
      </MDBRow>
      <MDBRow>
        <Link to="/">
          <i class="fas fa-arrow-left"></i>
          Continue Shopping
        </Link>
        <br />
      </MDBRow>
    </MDBContainer>
    </div>
  );
};

export default PaymentSuccess;
