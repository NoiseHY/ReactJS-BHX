import React from "react";

import { Carousel } from "react-bootstrap";

import carousel1 from '../../../assets/img/bia-2711202313372.jpg';
import carousel2 from '../../../assets/img/gio-qua-tet-2411202394433.jpg';
import carousel3 from '../../../assets/img/cham-soc-ca-nhan-giam-den-50-1111202319183.jpeg';

function CarouselBanner() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel1} alt="First slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="Second slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel3} alt="Third slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselBanner;