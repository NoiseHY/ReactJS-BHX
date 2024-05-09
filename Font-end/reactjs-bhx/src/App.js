import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css'

import { Container } from 'react-bootstrap';

import Header from './components/header';
import TableUsers from './components/tableUsers';
import Modal_addnew from './components/modal_addnewUser';
import Modal_editUser from './components/modal_editUser'; // Import Modal_editUser component

import { useState } from 'react';

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false); // Thêm trạng thái để hiển thị modal chỉnh sửa

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false); // Đóng cả modal chỉnh sửa khi đóng app
  };

  return (
    <div className="app-container">
      <Header />
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
        {/* Hiển thị modal thêm mới */}
        <Modal_addnew show={isShowModalAddNew} handleClose={handleClose} /> 
        {/* Hiển thị modal chỉnh sửa */}
        <Modal_editUser show={isShowModalEdit} handleClose={handleClose} /> 
      </Container>
    </div>
  );
}

export default App;
