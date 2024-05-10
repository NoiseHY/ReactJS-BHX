import React from "react";
import { Container } from "react-bootstrap";


import Header from "../../../components/header";
import CarouselBanner from "./carousel";
import GetProductsNew from "./products_new";

const User = (props) => {
  return (
    <>
      <Header />
      <Container>
        <CarouselBanner></CarouselBanner>
        <GetProductsNew />
      </Container>

    </>
  );
};

export default User;
