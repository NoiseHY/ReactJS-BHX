import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { AddProductsToInvoiceDetails } from '../../../services/user/invoiceServices';

import { toast } from 'react-toastify'; // Import toast for notifications

const UserModalDetails = ({ showModal, handleCloseModal, selectedItems, totalPrice }) => {
  
  const handleConfirm = async () => {
    const customerId = sessionStorage.getItem('idCuts');

    if (!customerId) {
      console.error("customerId không tồn tại trong ss");
      toast.error("Không thể tìm thấy ID khách hàng");
      return;
    }

    const products = selectedItems.map(item => ({
      idPro: item.productId,
      num: item.quantity,
    }));

    const totalInv = selectedItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0); // Tính tổng countInv

    const request = {
      customerId: parseInt(customerId, 10),
      countInv: totalInv, 
      products: products,  
    };
    

    console.log("Request data:", request);

    try {
      const response = await AddProductsToInvoiceDetails(request);
      console.log("Response:", response);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding products to cart", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng: " + error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sản phẩm đã chọn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedItems.length > 0 ? (
          <ul className="list-unstyled">
            {selectedItems.map((item) => (
              <li key={item.id} className="d-flex align-items-center mb-2">
                <img src={item.img ? require(`../../../assets/img/${item.img}`) : ""} alt="Product" className="img-thumbnail" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <div>
                  <p className="mb-1">{item.productName}</p>
                  <p className="mb-1">Số lượng: {item.quantity}</p>
                  <p className="mb-0">Đơn giá: {item.unitPrice.toLocaleString()} đ = Tổng: {(item.quantity * item.unitPrice).toLocaleString()} đ</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có sản phẩm nào được chọn.</p>
        )}
        <p>Tổng tiền: {totalPrice.toLocaleString()} đ</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModalDetails;
