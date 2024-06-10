import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import User_detailsForm from "./details";


const user_invoice = (props) => {
  return (
    <>
      <Header></Header>
      <main role="main">
        <div className="container mt-4">
          <form className="needs-validation" name="frmthanhtoan" method="post" action="#">
            <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

            <div className="py-5 text-center">
              <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
              <h2>Thanh toán</h2>
              <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
            </div>
            
            <User_detailsForm></User_detailsForm>
            <hr className="mt-4" />
          </form>
        </div>
      </main>



      <Footer></Footer>
    </>
  )
}

export default user_invoice;