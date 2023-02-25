import React, { useContext } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ProductContext from "./context/ProductContext";
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "inr",
});
export const truncate = (str,n)=>{
    return String(str).length>n? String(str).substring(0,n-1)+"...":str
}

const ProductsInCart = () => {
  const { basket, setBasket,count,setCount} = useContext(ProductContext);

  const navigate=useNavigate();
  let aggregate=basket.reduce((prevVal,currVal)=>{
    return prevVal+currVal?.gamePrice
  },0)

  const handleClick=async()=>{
    await axios.get(`http://localhost:8080/secret/${aggregate}`)
    .then((res)=>{
      navigate(`/checkout/${res.data.client_secret}`)
    })
  }
  const removeFromCart=(i)=>{
    const newCartList=basket.filter((x,index)=>index!==i)
    setBasket([...newCartList]);
    setCount(count-1);
  }

  return (
    <MDBContainer
      className="mt-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <Link to="/">
        <MDBIcon fas icon="home" />
      </Link>
      <MDBRow>
        <MDBCol md={12} lg={6}>
          {basket?.length === 0 ? (
            <div>
              <h4>Cart is Empty</h4>
            </div>
          ) : (
            basket?.map((_,index) => (
              <div
              key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px 0px",
                  padding: "10px 0px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                }}
              >
                <Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  to={`/product/${_.id}`}
                >
                  <img
                    src={_?.gameasset.imageURL}
                    alt="game"
                    style={{ maxHeight: "100px", maxWidth: "70px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "0px 20px",
                      padding: "0px",
                      fontSize: "25px",
                    }}
                  >
                    <p className="text-dark m-0 p-0">{truncate(_?.gameName,25)}</p>
                    <strong className="text-dark">
                      {formatter.format(_?.gamePrice)}
                    </strong>
                  </div>
                </Link>
                <span onClick={()=>removeFromCart(index)}>
                  <MDBIcon
                    color="danger"
                    style={{ cursor: "pointer" }}
                    far
                    icon="trash-alt"
                  />
                </span>
              </div>
            ))
          )}
        </MDBCol>
        {
            basket?.length>0 && <MDBCol>
            <MDBCard>
              <MDBCardTitle>
                <h3 className="m-0 text-center mt-2">Checkout</h3>
              </MDBCardTitle>
              <hr />
              <MDBCardFooter
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <small>Total : </small>
                <strong
                  style={{
                    fontSize: "28px",
                  }}
                >
                  {formatter.format(aggregate)}
                </strong>
              </MDBCardFooter>
            </MDBCard>
            <div className="mt-5 d-grid gap-2 d-md-flex justify-content-md-end">
              <MDBBtn onClick={handleClick} color="info" type="primary">
                Pay Now
              </MDBBtn>
            </div>
          </MDBCol>
        }
        
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductsInCart;
