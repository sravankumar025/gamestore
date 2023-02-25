import React, { useContext } from "react";
import { MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProductContext from "./context/ProductContext";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "inr",
});

export const truncate = (str,n)=>{
    return String(str).length>n? String(str).substring(0,n-1)+"...":str
}
const Products = ({ items }) => {
  const { searchTerm } = useContext(ProductContext);
  return (
    <>
      <SearchBar />
      <MDBRow
        style={{
          minHeight: "100vh",
        }}
        id={"products"}
        className="mb-4 d-flex align-items-center justify-content-center"
      >
        {items
          ?.filter((val) => {
            if (searchTerm === " ") {
              return val;
            } else if (
              val?.gameDescription
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
            return false;
          })
          ?.map((x, i) => {
            return (
              <>
                <MDBCol
                  key={i}
                  size={6}
                  md={4}
                  lg={3}
                  className="card shadow-3 m-5 mt-0 g-3 d-flext align-items-center justify-content-center"
                  style={{ height: "480px", border: "0px solid black" }}
                >
                  <MDBRipple
                    rippleColor="dark"
                    rippleTag={"div"}
                    className="bg-image hover-zoom"
                  >
                    <Link to={`/product/${x?.id}`}>
                      <img
                        src={x?.gameasset?.imageURL}
                        alt="gameimg"
                        height="300px"
                        width="250px"
                        style={{
                          padding: "20px",
                        }}
                      />
                    </Link>
                  </MDBRipple>
                  <div className="card-body me-auto">
                    <Link to={`/product/${x?.id}`}>
                      <p className="card-title text-dark">{truncate(x?.gameName,25)}</p>
                      <strong className="text-dark">
                        {formatter.format(x?.gamePrice)}
                      </strong>
                    </Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{x.category}</small>
                  </div>
                </MDBCol>
              </>
            );
          })}
      </MDBRow>
    </>
  );
};

export default Products;
