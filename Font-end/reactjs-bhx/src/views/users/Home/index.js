import React from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "../../../components/header";
import Footer from "../../../components/footer";
import CarouselBanner from "./carousel";
import GetProductsNew from "./products_news";
import GetBestViewProducts from "./products_views";


const User = (props) => {
  return (
    <>
      <Header />
      <hr className="mb-4" />
      <Container >
        <CarouselBanner></CarouselBanner>
        {/* danh mục  */}
        {/* bán chạy  */}
        {/* giảm giá  */}
        {/* khuyến mãi  */}
        {/* voucher  */}

        <GetProductsNew />
        
        <GetBestViewProducts></GetBestViewProducts>
      </Container>
      <hr className="mt-4" />
      <Footer></Footer>
    </>
  );
};

export default User;
