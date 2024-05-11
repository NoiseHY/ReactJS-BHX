import React, { useState, useEffect } from "react";
import { fetchProductsNew } from "../../../services/productsServices";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar, FaStarHalf } from 'react-icons/fa';

import '../../../App.scss'

function ProductsNew() {
  const [listProductsNew, setListProducts] = useState([]);

  useEffect(() => {
    getProducts10();
  }, []);

  const getProducts10 = async () => {
    try {
      const res = await fetchProductsNew();
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
          <h2 >Sản phẩm mới</h2>
          <span href="#" className="text-secondary">Xem thêm</span>
        </div>


        <Row>
          {listProductsNew.map((product, index) => {

            const imagePath = product.img ? require(`../../../assets/img/${product.img}`) : "";

            return (
              <>
                <Col key={index} xs={12} md={4} className="app-container">
                  <Card>
                    <div className="d-flex flex-wrap">
                      <div className="img-container" style={{ width: "200px", height: "250px", paddingRight: "10px" }}>
                        <Card.Img src={imagePath} alt={product.nameProd} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div className="mt-auto" style={{ width: "50%" }}>
                        <Card.Body>
                          <Card.Title>{product.nameProd}</Card.Title>
                          <Card.Text>{product.desProd}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-flex flex-column justify-content-between h-100">
                          <div>
                            <Card.Text style={{ fontSize: "1.2em", marginBottom: "10px" }}>{product.up} đ</Card.Text>
                            <Card.Text style={{ fontSize: "1.2em", marginBottom: "10px" }}>{product.num}</Card.Text>
                            <Card.Text>{renderStars(product.rating)}</Card.Text>
                            <Button variant="primary" onClick={() => console.log('Add to Cart')}>
                              Add to Cart
                            </Button>
                          </div>
                        </Card.Footer>
                      </div>
                    </div>
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

export default ProductsNew;
