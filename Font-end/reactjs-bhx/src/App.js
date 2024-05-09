import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styles

import Header from './components/header';
import TableUsers from './components/tableUsers';
import Modal_addnew from './components/modal_addnewUser';
import Modal_editUser from './components/modal_editUser';
import { useState } from 'react';

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
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
        {/* ToastContainer để hiển thị toast */}
        <ToastContainer />
        <Modal_addnew show={isShowModalAddNew} handleClose={handleClose} />
        <Modal_editUser show={isShowModalEdit} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default App;
