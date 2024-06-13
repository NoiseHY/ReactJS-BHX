
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


import TableUsers from './tableUsers';
import Modal_addnew from './modal_addnewUser';
import Modal_editUser from './modal_editUser';

import '../../../App.scss';

import { useState } from 'react';

function Admin_Account() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
  };

  return (
    <>
      <div className="app-container">
        
        <Container>
          <div className="my-3 add-new">
            <h2>Danh sách người dùng :</h2>
            <button
              className="btn btn-success"
              onClick={() => setIsShowModalAddNew(true)}
            >
              Thêm
            </button>
          </div>
          <TableUsers />
          {/* ToastContainer để hiển thị toast */}
          <ToastContainer />
          <Modal_addnew show={isShowModalAddNew} handleClose={handleClose} />
          <Modal_editUser show={isShowModalEdit} handleClose={handleClose} />
        </Container>
      </div>
    </>
  );
}

export default Admin_Account;
