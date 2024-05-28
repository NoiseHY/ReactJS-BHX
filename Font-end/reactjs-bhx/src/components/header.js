import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast từ react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho ToastContainer
import Login from '../views/admin/login';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    // Hiển thị toast khi modal mở
    toast.info("Vui lòng đăng nhập!");
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {/* Đặt ToastContainer ở đầu ứng dụng */}
      <ToastContainer />

      <div className='d-flex justify-content-between'>
        <Container>
          <Navbar expand="lg" className="d-flex justify-content-between">
            <Navbar.Brand href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              Bách Hóa Xanh
            </Navbar.Brand>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0">
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                <button className="btn " type="button" onClick={() => console.log("Search button clicked!")}>
                  <BsSearch />
                </button>
              </div>
            </form>

            <Nav className="col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
              <NavDropdown title={<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />} id="dropdownUser1" className="text-end">
                <NavDropdown.Item onClick={handleOpenLoginModal}>
                  Đăng nhập
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Container>
      </div>

      {/* Modal đăng nhập */}
      <Login show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
}

export default Header;
