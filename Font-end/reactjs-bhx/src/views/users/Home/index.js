import React from "react";
import { Container } from "react-bootstrap";


import Header from "../../../components/header";
import CarouselBanner from "./carousel";
import GetProductsNew from "./products_new";
import 'bootstrap/dist/css/bootstrap.min.css';


const User = (props) => {
  return (
    <>
      <Header />
      <Container >
        <CarouselBanner></CarouselBanner>
        <GetProductsNew />
        <hr class="hr-line hr-info"></hr>
      </Container>

    </>
  );
};

export default User;
