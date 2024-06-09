import React, { useState, useEffect } from "react";
import { fetchGetBestViewProducts, fetchProductsNew } from "../../../services/user/productsServices";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar, FaStarHalf } from 'react-icons/fa';

import '../../../App.scss'

function ProductsHot() {
  const [listProductsNew, setListProducts] = useState([]);

  useEffect(() => {
    GetBestViewProducts();
  }, []);

  const GetBestViewProducts = async () => {
    try {
      const res = await fetchGetBestViewProducts();
      if (res) {
        setListProducts(res);
      }
    } catch (error) {
      console.log("error fetching products");
    }
  };

  const renderStars = (rating) => {
    const intPart = Math.floor(rating);
    const decPart = rating - intPart;

    const stars = [];
    for (let i = 0; i < intPart; i++) {
      stars.push(<FaStar key={i} style={{ color: "#ffc107" }} />);
    }
    if (decPart > 0) {
      stars.push(<FaStarHalf key={intPart} style={{ color: "#ffc107" }} />);
    }
    return stars;
  };



  return (
    <>
      <Container>
        <div className="my-3 d-flex justify-content-between">
          <h2 >Sản phẩm nhiều lượt xem</h2>
          <span href="#" className="text-secondary">Xem thêm</span>
        </div>


        <Row>
          {listProductsNew.map((product, index) => {

            const imagePath = product.img ? require(`../../../assets/img/${product.img}`) : "";

            return (
              <>
                <Col key={index} xs={12} md={4} className="app-container">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imagePath} />
                    <Card.Body>
                      <Card.Title>{product.nameProd}</Card.Title>
                      <Card.Text>
                        {product.desProd}
                      </Card.Text>
                      <div>
                        <p>Price: <span>{product.up} đ</span></p>
                        <p>Quantity: <span>{product.num}</span></p>
                      </div>
                      <Button variant="primary" className="btn btn-primary">Buy Now</Button>
                    </Card.Body>
                  </Card>
                </Col>



              </>


            );
          })}

        </Row>
      </Container>
    </>
  );
}

export default ProductsHot;
