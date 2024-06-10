import React from 'react';

import User_userDetailsForm from './user';

function user_detailsForm() {
  return (
    <div className="row">
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Giỏ hàng</span>
          <span className="badge badge-secondary badge-pill">2</span>
        </h4>
        <ul className="list-group mb-3">
          <input type="hidden" name="sanphamgiohang[1][sp_ma]" value="2" />
          <input type="hidden" name="sanphamgiohang[1][gia]" value="11800000.00" />
          <input type="hidden" name="sanphamgiohang[1][soluong]" value="2" />
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Apple Ipad 4 Wifi 16GB</h6>
              <small className="text-muted">11800000.00 x 2</small>
            </div>
            <span className="text-muted">23600000</span>
          </li>
          <input type="hidden" name="sanphamgiohang[2][sp_ma]" value="4" />
          <input type="hidden" name="sanphamgiohang[2][gia]" value="14990000.00" />
          <input type="hidden" name="sanphamgiohang[2][soluong]" value="8" />
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Apple iPhone 5 16GB White</h6>
              <small className="text-muted">14990000.00 x 8</small>
            </div>
            <span className="text-muted">119920000</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Tổng thành tiền</span>
            <strong>143520000</strong>
          </li>
        </ul>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Mã khuyến mãi" />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Xác nhận</button>
          </div>
        </div>
      </div>
      
      <User_userDetailsForm></User_userDetailsForm>

    </div>

  );
}

export default user_detailsForm;
