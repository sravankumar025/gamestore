import {
  MDBContainer,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbar,
  MDBIcon,
  MDBBadge
} from "mdb-react-ui-kit";
import React, { useContext } from "react";
import {Link} from "react-router-dom";
import ProductContext from "./context/ProductContext";

const NavBar = () => {
    const {count}=useContext(ProductContext);
  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="light" className="mb-3 fixed-top">
        <MDBContainer fluid>
          <MDBNavbarNav left fullWidth={false} className="d-flex flex-row">
            <MDBNavbarItem className="me-3 me-lg-2">
                <Link to="/">
                   <h3>GAMESTORE</h3>
                </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav right fullWidth={false} className="d-flex flex-row">
            
          </MDBNavbarNav>
          <MDBNavbarNav right fullWidth={false} className="d-flex flex-row">
            <MDBNavbarItem>
            <h5>Your shopping Cart</h5>
                <Link to="/product/cart">
                    <span>
                    <MDBIcon fas icon="shopping-cart"/>
                    </span>
                    <MDBBadge>
                        {count}
                    </MDBBadge>
                </Link>
                
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default NavBar;
