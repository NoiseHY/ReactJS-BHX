import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "antd";
import { StarFilled, StarTwoTone, ArrowUpOutlined, NumberOutlined } from '@ant-design/icons'; // Import các icon từ Ant Design
import { Link } from "react-router-dom";
import '../../../App.scss';

import { AddProductToCart } from "../../../services/user/cartServices";
import { fetchProductsNew } from "../../../services/user/productsServices";

const { Meta } = Card;

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
      stars.push(<StarFilled key={i} style={{ color: "#ffc107" }} />);
    }
    if (decPart > 0) {
      stars.push(<StarTwoTone key={intPart} twoToneColor="#ffc107" />);
    }
    return stars;
  };

  const addToCart = async (productId, productQuantity) => {
    try {
      const idCuts = sessionStorage.getItem('idCuts');

      const cartDetailData = {
        idCuts: idCuts,
        idPro: productId,
        num: productQuantity
      };

      const result = await AddProductToCart(cartDetailData);

      if (result) {
        console.log("Thêm sản phẩm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.log("Lỗi thêm sản phẩm vào giỏ hàng:", error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="my-3 d-flex justify-content-between">
          <h2>Sản phẩm mới</h2>
          <span className="text-secondary">Xem thêm</span>
        </div>

        <Row gutter={16}>
          {listProductsNew.map((product, index) => {
            const imagePath = product.img ? require(`../../../assets/img/${product.img}`) : "";

            return (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Link className=" link-no-style" to={`/product/${product.id}`}>
                  <Card
                    cover={<img alt={product.nameProd} src={imagePath} />}
                    actions={[
                      <Button type="primary" onClick={() => addToCart(product.id, 1)}>Thêm vào giỏ hàng</Button>
                    ]}
                  >
                    <Meta title={product.nameProd} description={product.desProd} />
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <ArrowUpOutlined /> {product.up} đ
                      </div>
                      <div>
                        <NumberOutlined /> {product.num} 
                      </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      {renderStars(product.rating)}
                    </div>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default ProductsNew;
