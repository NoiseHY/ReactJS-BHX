import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spin } from 'antd';

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import CarouselBanner from "./carousel";
import GetProductsNew from "./products_news";
import GetBestViewProducts from "./products_views";

const User = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <hr className="mb-4" />
      <Container >
        <CarouselBanner />
        {/* danh mục  */}
        {/* bán chạy  */}
        {/* giảm giá  */}
        {/* khuyến mãi  */}
        {/* voucher  */}

        <GetProductsNew />
        
        <GetBestViewProducts />
      </Container>
      <hr className="mt-4" />
      <Footer />
    </>
  );
};

export default User;
