import React, { useState, useEffect } from 'react';
import { GetInvoiceDetailsByID } from '../../../services/user/invoiceServices';

import UserDetailsForm from './user';

function ProdcutsForm() {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  const getInvoiceDetails = async () => {
    try {
      const res = await GetInvoiceDetailsByID(10);
      if (res) {
        setInvoiceDetails(res);
      }
    } catch (error) {
      console.log("Error fetching invoice details:", error);
      setError("Error fetching invoice details. Please try again later.");
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 order-md-2 mb-4">

        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Chi tiết hóa đơn</span>
        </h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <ul className="list-group mb-3">
          {invoiceDetails.map((item) => (
            <li key={item.invoiceDetailID} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{item.productName}</h6>
                <small className="text-muted">{item.quantity} x {item.unitPrice.toLocaleString()} đ </small>
              </div>
              <span className="text-muted">{!isNaN(item.totalPrice) && item.totalPrice.toLocaleString()} đ</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <span>Tổng thành tiền</span>
            <strong>{invoiceDetails.reduce((total, item) => total + (isNaN(item.totalPrice) ? 0 : item.totalPrice), 0).toLocaleString()} đ</strong>          </li>
        </ul>

      </div>

      <UserDetailsForm></UserDetailsForm>

    </div>

  );
}

export default ProdcutsForm;
