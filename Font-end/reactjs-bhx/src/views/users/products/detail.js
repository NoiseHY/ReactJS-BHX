import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { toast } from "react-toastify";
import './products.scss';

import { getProductByID } from "../../../services/admin/productsServices";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByID(id);

        if (res) {
          setProduct(res);

        } else {
          toast.error("Không có dữ liệu sản phẩm.");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tải chi tiết sản phẩm: " + error.message);
      }
    };

    fetchProduct();
  }, [id]);

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

  const imagePath = product.img ? require(`../../../assets/img/${product.img}`) : "";

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    
    <Container>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src={imagePath} alt="Product Image" className="img-fluid rounded" />
          </div>
          <div class="col-md-6">
            <h1 className="product-name">{product.nameProd}</h1>
            <p className="product-category">{product.nameCat}</p>
            {/* <p className="product-subcategory">Bò viên đông lạnh</p> */}
            <ul className="product-info">

              <li>Number of Units: {product.num}</li>
              <li>Unit Price: {product.up}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <p className="product-description">{product.desProd}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h2 className="product-ratings">Ratings and Reviews</h2>
            <p className="rating">Rating: {renderStars(product.rating)}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h2 className="product-specifications">Product Specifications</h2>
            <ul className="product-specs">
              <li>Ingredients: {product.ing}</li>
              <li>Storage Instructions: {product.stor}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h2 className="product-supplier">Supplier Information</h2>
            <p className="supplier-name">{product.nameSup}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button className="btn btn-primary" type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
