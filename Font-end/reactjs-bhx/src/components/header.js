import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast từ react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho ToastContainer
import Login from '../views/admin/login';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [idAuth] = useState(sessionStorage.getItem("idAuth"));

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    
    toast.info("Vui lòng đăng nhập!");
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    
    window.location.href = '/';
  };

  return (
    <>
      {/* Đặt ToastContainer ở đầu ứng dụng */}
      <ToastContainer position="bottom-right" />

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

            {idAuth ? (
              <NavDropdown title={
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              } id="dropdownUser1" className="text-end">
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="input-group">
                <button type="button" className="btn" onClick={handleOpenLoginModal}>
                  Đăng nhập
                </button>

                <button className="btn">
                  Đăng ký
                </button>
              </div>
            )}
          </Navbar>
        </Container>
      </div>

      {/* Modal đăng nhập */}
      {showLoginModal && (
        <Login show={showLoginModal} handleClose={handleCloseLoginModal} />
      )}
    </>
  );
}

export default Header;