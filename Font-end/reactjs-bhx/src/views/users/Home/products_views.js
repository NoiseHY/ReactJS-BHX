import React, { useState, useEffect } from "react";
import { fetchGetBestViewProducts } from "../../../services/user/productsServices";
import { Row, Col, Card, Button } from "antd";
import { StarFilled, StarTwoTone, ArrowUpOutlined, NumberOutlined } from '@ant-design/icons'; // Import các icon từ Ant Design

import '../../../App.scss';

const { Meta } = Card;

function ProductsHot() {
  const [listProductsNew, setListProducts] = useState([]);

  useEffect(() => {
    getBestViewProducts();
  }, []);

  const getBestViewProducts = async () => {
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
      stars.push(<StarFilled key={i} style={{ color: "#ffc107" }} />);
    }
    if (decPart > 0) {
      stars.push(<StarTwoTone key={intPart} twoToneColor="#ffc107" />);
    }
    return stars;
  };

  return (
    <>
      <div className="container">
        <div className="my-3 d-flex justify-content-between">
          <h2>Sản phẩm nhiều lượt xem</h2>
          <span className="text-secondary">Xem thêm</span>
        </div>

        <Row gutter={16}>
          {listProductsNew.map((product, index) => {
            
            const imagePath = product.img ? require(`../../../assets/img/${product.img}`) : "";

            return (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  cover={<img alt={product.nameProd} src={imagePath} />}
                  actions={[
                    <Button type="primary" >Thêm vào giỏ hàng</Button>
                  ]}
                >
                  <Meta
                    title={product.nameProd}
                    description={product.desProd}
                  />

                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <ArrowUpOutlined /> {product.up.toLocaleString()} đ
                    </div>
                    <div>
                      <NumberOutlined /> {product.num} 
                    </div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    {renderStars(product.rating)}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default ProductsHot;
