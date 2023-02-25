import React, { useContext, useEffect } from "react";
import { MDBContainer,MDBRow,MDBCol,MDBIcon,MDBBtn} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductContext from "./context/ProductContext";
import axios from "axios";
export const formatter=new Intl.NumberFormat('en-US',{
    style:"currency",
    currency:'INR'
})
export const truncate = (str,n)=>{
    return String(str).length>n? String(str).substring(0,n-1)+"...":str
}
const ProductDetails=()=>{
    const {product,setProduct,count,setCount,basket,setBasket}=useContext(ProductContext);
    
    const {id}=useParams()
   
    const navigate=useNavigate()
    const handleClick=async()=>{
        await axios.get(`http://localhost:8080/secret/${product?.gamePrice}`)
        .then((res)=>{
            console.log(res);
            navigate(`/checkout/${res.data.client_secret}`)
        })
    }
    const handleSubmit = () => {
        setCount(count + 1);
        setBasket([...basket, product]);
    };
    const query =`query($id:ID){
        item(where:{id:$id}){
            id
            gameName
            gameDescription
            category
            gamePrice
            gameasset
            createdAt
        }
    }`
    
    const variables={
        id:id
    }

    useEffect(()=>{
        async function getProductDetails(){
            await axios.request({
                url:"https://api-ap-south-1.hygraph.com/v2/clei4kxv22ozv01uhegt8fiyy/master",
                method:"POST",
                data:{
                    query,
                    variables
                }
            }).then((res)=>{
                setProduct(res.data.data.item)
            })
        }
        getProductDetails()
    },[id,setProduct])


    return(
        <MDBContainer className="mt-5 mb-5">
            <Link to="/">
                <MDBIcon fas icon="home"/>
            </Link>
            <MDBRow>
                <MDBCol size={12} lg={4} id="firstCol">
                    <p>Product Details:</p>
                    <p>Product Id:{product?.id}</p>
                    <p>#{product?.category}</p>
                    <hr/>
                    <img src={product?.gameasset?.imageURL} 
                            alt="game"
                            style={{maxHeight:"300px",maxWidth:"300px"}}/>
                    <hr/>
                </MDBCol>
                <MDBCol style={{
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"30px"
                }} size={12} lg={4} id="thirdCol">
                    <b>Description</b>
                    <p>{truncate(product?.gameDescription,250)}</p>
                    <h3 className="fw=400">{product?.gameName}</h3>
                    <strong className="mb-5" style={{
                        fontSize:"32px"
                    }}>
                    {formatter.format(product?.gamePrice)}
                </strong>
                    <MDBBtn onClick={()=>handleSubmit()} className="ms-2" tag={'a'}  size="lg" >
                        <MDBIcon fas icon="shopping-cart"/>
                        Add to Cart
                    </MDBBtn>
                    <MDBBtn onClick={handleClick} className="ms-2 mt-2" tag={'a'}  size="lg">
                        Buy Now
                    </MDBBtn>
                </MDBCol>
                
            </MDBRow>
        </MDBContainer>
    )
}
export default ProductDetails