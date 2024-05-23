import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ProductDetail from "./detail";

const detailProduct = (props) => {
  return (
    <>
      <Header></Header>
      <hr className="mb-4" />
      <ProductDetail></ProductDetail>
      <hr className="mb-4" />
      <Footer></Footer>
    </>
  )
}

export default detailProduct;