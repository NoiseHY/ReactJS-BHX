import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { GetInvoiceDetailsByID } from '../../../services/user/invoiceServices';

function UserModalInvDetails({ visible, onCancel, record }) {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && record) {
      getInvoiceDetails(record.id);
    }
  }, [visible, record]);

  const getInvoiceDetails = async (id) => {
    try {
      const res = await GetInvoiceDetailsByID(id);
      if (res) {
        setInvoiceDetails(res);
      }
    } catch (error) {
      console.log("Error fetching invoice details:", error);
      setError("Error fetching invoice details. Please try again later.");
    }
  };

  return (
    <Modal
      title="Chi tiết hóa đơn"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group mb-3">
        {invoiceDetails.map((item) => {
          const imagePath = item.img ? require(`../../../assets/img/${item.img}`) : "";
          return (
            <li key={item.invoiceDetailID} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <img src={imagePath} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '5px' }} /> {/* Add image */}
                <h6 className="my-0">{item.productName}</h6>
                <small className="text-muted">{item.quantity} x {item.unitPrice.toLocaleString()} đ </small>
              </div>
              <span className="text-muted">{!isNaN(item.totalPrice) && item.totalPrice.toLocaleString()} đ</span>
            </li>
          );
        })}
        <li className="list-group-item d-flex justify-content-between">
          <span>Tổng thành tiền</span>
          <strong>{invoiceDetails.reduce((total, item) => total + (isNaN(item.totalPrice) ? 0 : item.totalPrice), 0).toLocaleString()} đ</strong>
        </li>
      </ul>
    </Modal>
  );
}

export default UserModalInvDetails;
