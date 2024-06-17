import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout, Card, Button, Row, Col, Typography, Image, Spin, Divider, Rate } from 'antd';
import { FaHeart } from 'react-icons/fa';
import { toast } from "react-toastify";
import './products.scss';
import { getProductByID } from "../../../services/user/productsServices";
import { AddProductToCart } from "../../../services/user/cartServices";

const { Content } = Layout;
const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const idCuts = sessionStorage.getItem('idCuts');
      if (!idCuts) {
        toast.error("Vui lòng đăng nhập trước!");
        return;
      }
      const response = await AddProductToCart({ idPro: idCuts, num: quantity });
      if (response) {
        toast.success("Thêm thành công!");
      } else {
        toast.error("Đã xảy ra lỗi!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
    }
  };

  const imagePath = product?.img ? require(`../../../assets/img/${product.img}`) : "";
  const imgDetailsArray = product?.imgDetails ? product.imgDetails.split(',').map(img => img.trim()) : [];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      <Content className="product-detail-content">
        <div className="product-detail-container">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div className="image-center">
                <Image src={imagePath} alt="Product Image" className="product-image" />
              </div>
              <Card className="recent-photos-card">
                <Title level={4}>Recent photos</Title>
                <div className="recent-photos">
                  {imgDetailsArray.map((img, index) => (
                    <Image key={index} src={require(`../../../assets/img/${img}`)} alt={`Detail ${index + 1}`} className="recent-photo" />
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Title level={2} className="product-name">{product?.nameProd}</Title>
              <Text className="product-category">{product?.nameCat}</Text>
              <Divider />
              <ul className="product-info">
                <li>Number of Units: {product?.num}</li>
                <li>Unit Price: {product?.up}</li>
              </ul>
              <div className="form-group">
                <label htmlFor="soluong">Số lượng đặt mua:</label>
                <input
                  type="number"
                  className="form-control"
                  id="soluong"
                  name="soluong"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div className="action">
                <Button type="primary" className="add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                <Button type="default" className="like" icon={<FaHeart />} />
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <Title level={3}>Product Description</Title>
                <Text>{product?.desProd}</Text>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Title level={3}>Ratings and Reviews</Title>
                <Rate allowHalf defaultValue={product?.rating} />
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Title level={3}>Product Specifications</Title>
                <ul className="product-specs">
                  <li>Ingredients: {product?.ing}</li>
                  <li>Storage Instructions: {product?.stor}</li>
                </ul>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Title level={3}>Supplier Information</Title>
                <Text>{product?.nameSup}</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ProductDetail;
