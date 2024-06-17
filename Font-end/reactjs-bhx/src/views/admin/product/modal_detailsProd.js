import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Image } from 'react-bootstrap';
import { Rate } from 'antd';
import { toast } from 'react-toastify';
import { putEditDetailsProd } from '../../../services/admin/productsServices';
import EditProductModal from './modal_editDetailsProd';

const ProductDetailsModal = ({ show, handleClose, product }) => {
  const [loading, setLoading] = useState(true);
  const [detailedProduct, setDetailedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (product) {
      setDetailedProduct(product);
      setLoading(false);
    }
  }, [product]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveChanges = async (updatedProduct) => {
    try {
      console.log(updatedProduct);
      await putEditDetailsProd(updatedProduct);
      toast.success("Sản phẩm đã được cập nhật thành công!");
      setDetailedProduct(updatedProduct);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const imagePath = detailedProduct?.img ? require(`../../../assets/img/${detailedProduct.img}`) : "";
  const imgDetailsArray = detailedProduct?.imgDetails ? detailedProduct.imgDetails.split(',').map(img => img.trim()) : [];

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="product-detail-container">
            <div className="row">
              <div className="col-md-6">
                <div className="image-center">
                  <Image src={imagePath} alt="Product Image" className="product-image" fluid />
                </div>
                <Card.Title>Hình ảnh chi tiết</Card.Title>
                <Card className="recent-photos-card">
                  <div className="recent-photos">
                    {imgDetailsArray.map((img, index) => (
                      <Image key={index} src={require(`../../../assets/img/${img}`)} alt={`Detail ${index + 1}`} className="recent-photo" fluid />
                    ))}
                  </div>
                </Card>
              </div>
              <div className="col-md-6">
                <h4 className="product-name">{detailedProduct?.nameProd}</h4>
                <p className="product-category">{detailedProduct?.catName}</p>
                <hr />
                <ul className="product-info">
                  <li>Số lượng: {detailedProduct?.num}</li>
                  <li>Đơn giá: {detailedProduct?.up.toLocaleString()} đ</li>
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Card>
                  <Card.Body>
                    <Card.Title>Mô tả sản phẩm</Card.Title>
                    <Card.Text>{detailedProduct?.desProd}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Đánh giá và nhận xét</Card.Title>
                    <Rate allowHalf defaultValue={detailedProduct?.rating} />
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Thông số kỹ thuật</Card.Title>
                    <ul className="product-specs">
                      <li>Thành phần: {detailedProduct?.ing}</li>
                      <li>Hướng dẫn bảo quản: {detailedProduct?.stor}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Thông tin nhà cung cấp</Card.Title>
                    <p>{detailedProduct?.nameSup}</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEdit}>
            Sửa
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {showEditModal && (
        <EditProductModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          product={detailedProduct}
          handleSaveChanges={handleSaveChanges}
        />
      )}
    </>
  );
};

export default ProductDetailsModal;
