import React, { useContext } from "react";
import {MDBBtn,MDBInput,MDBRow,MDBCol} from "mdb-react-ui-kit";
import ProductContext from "./context/ProductContext";
const SearchBar=()=>{
    const {setSearchTerm}=useContext(ProductContext);
    const handleChange=(e)=>{
        e.preventDefault();
        setSearchTerm(e.target.value);
    }
    return(
        <div>
            <form>
            
                <MDBRow className="mt-5 mb-6">
                    
                    <MDBCol size={8} md={10}>
                        <MDBInput onChange={handleChange} label="Enter Product Name" type="text"/>
                    </MDBCol>
                    <MDBCol size={4} md={2}>
                        <MDBBtn type="submit" online color="primary">
                            Search
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </form>
        </div>
    )
}
export default SearchBar;