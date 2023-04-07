import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { popups as pp } from '../store/atoms'
import provider from '../store/web3Provider'
import '../static/css/info.scss';
import Error_return from '../components/error_return';

export default function ProductInfo() {

    const [productInfo, setProductInfo] = useState('');
    const [sellerInfo, setSellerInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const setPopup = useSetRecoilState(pp);
    const productId = window.location.pathname.split('/')[2];
    const [Error_found, setError] = useState(false);  

    useEffect(() => {


        async function fetchData (){
            try{
              await fetch("http://localhost:8000/product_details/"+productId)
                .then(response => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json()
                })
                .then(data => {
                  setProductInfo(data);
                  setLoading(false);
                })
                .catch(error => {
                  setPopup("The Product is Fake!")
                  console.log(error);
                //   window.location.replace("/")
                    setError(true);
                  setLoading(false);
                });
            }catch(e){
              console.log(e);
            }
          }
          

          console.log(productInfo);
          fetchData();

        // async function fetchProductInfo() {
        //     try {
        //         const response = await provider.callTransaction('productDetails', [productId])
        //         setProductInfo(response);
        //     }
        //     catch (e) {
        //         setPopup("Failed to fetch product info")
        //         console.error(e);
        //     }
        // }

        // async function fetchSellerInfo() {
        //     try {
        //         const response = await provider.callTransaction('productSeller', [productId])

        //         setSellerInfo(response);

        //     }
        //     catch (e) {
        //         // product is sold
        //         setPopup("Product is sold")
        //         console.error(e);
        //     }
        //     finally {
        //         setLoading(false)
        //     }
        // }
        // fetchProductInfo();
        // fetchSellerInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    if (loading) {
        return (<Loader />)
    }
    if(Error_found){
        return <Error_return />
    }
    return (

        <div className="container CI my-4">
            <div className="d-flex small">
                <div className="left">
                    <div>
                        <div className="product-details">
                            <h2>Product Info</h2>
                            <div>
                                <p>Name : <span>
                                    {productInfo.name}
                                </span></p>

                                <p>Price : <span>
                                    {productInfo.price}
                                </span></p>

                                <p>ID : <span>
                                    {productId}
                                </span></p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="right">
                    <div>
                        <div className="product-details">
                            <h2>Seller Info</h2>
                            <p>Name : <span>
                                {sellerInfo.name}
                            </span></p>


                            <p>Details : <span>
                                {sellerInfo.details}
                            </span></p>

                        </div>
                    </div>
                </div> */}
            </div>
            <div className="fullWidth">

                {/* <div className="buttons">
                    <Link to="/buy" className="btn btn-primary btn-lg ">Verify</Link>
                </div> */}
            </div>
        </div>

    )
}