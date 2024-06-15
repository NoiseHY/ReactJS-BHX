
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.scss';

import TableProd from './tableProd';
import Modal_addnewProd from './modal_addnewProd';

import { useState } from 'react';

function Admin_Prod() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);


  const handleClose = () => {
    setIsShowModalAddNew(false);
  }

  return (
    <>
      <div className="app-container">
        <Container>
          <div className="my-3 add-new">
            <h2>Danh sách sản phẩm :</h2>
            <button
              className="btn btn-success"
              onClick={() => setIsShowModalAddNew(true)} // Open the modal when the button is clicked
            >
              Thêm
            </button>
          </div>
          <TableProd />
          <ToastContainer />
          <Modal_addnewProd show={isShowModalAddNew} handleClose={handleClose} /> {/* Render the modal */}
        </Container>
      </div>
    </>
  )
}
export default Admin_Prod;