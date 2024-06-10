import React, { useState, useEffect } from 'react';
import { GetCustomerDetailsByID } from '../../../services/user/invoiceServices';

function UserDetailsForm() {
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const customerData = await GetCustomerDetailsByID(1);
        setCustomerDetails(customerData[0]);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchData();
  }, []);

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Thông tin khách hàng</h4>
      <div className="row">
        <div className="col-md-12">
          <label >Họ tên</label>
          <input type="text" className="form-control" name="kh_ten" id="kh_ten" value={customerDetails.nameCus} readOnly />
        </div>
        <div className="col-md-12">
          <label >Địa chỉ</label>
          <input type="text" className="form-control" name="kh_diachi" id="kh_diachi" value={customerDetails.addressCus} readOnly />
        </div>
        <div className="col-md-12">
          <label >Điện thoại</label>
          <input type="text" className="form-control" name="kh_dienthoai" id="kh_dienthoai" value={customerDetails.num} readOnly />
        </div>
        <div className="col-md-12">
          <label >Email</label>
          <input type="text" className="form-control" name="kh_email" id="kh_email" value={customerDetails.email} readOnly />
        </div>

      </div><br></br>

      <h4 className="mb-3">Hình thức thanh toán</h4>
      <div className="d-block my-3">
        <div className="custom-control custom-radio">
          <input id="httt-1" name="httt_ma" type="radio" className="custom-control-input" required value="1" />
          <label className="custom-control-label" htmlFor="httt-1">Tiền mặt</label>
        </div>
        <div className="custom-control custom-radio">
          <input id="httt-2" name="httt_ma" type="radio" className="custom-control-input" required value="2" />
          <label className="custom-control-label" htmlFor="httt-2">Chuyển khoản</label>
        </div>
        <div className="custom-control custom-radio">
          <input id="httt-3" name="httt_ma" type="radio" className="custom-control-input" required value="3" />
          <label className="custom-control-label" htmlFor="httt-3">Ship COD</label>
        </div>

      </div>
      <button className="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">Đặt hàng</button>
    </div>
  );
}

export default UserDetailsForm;
