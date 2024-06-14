import React, { useState } from 'react';
import { Container, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ShoppingCartOutlined, BellOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import '../App.scss';

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
      <ToastContainer position="bottom-right" />

      <div className='d-flex justify-content-between'>
        <Container>
          <Navbar expand="lg" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="/" className="text-dark text-decoration-none">
              Bách Hóa Xanh
            </Navbar.Brand>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0">
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-outline-secondary" type="button">
                  <BsSearch />
                </button>
              </div>
            </form>

            <div className="d-flex align-items-center">
              <Button variant="link" className="text-dark me-3" onClick={() => console.log('Bell clicked')}>
                <BellOutlined className="icon-lg" />
              </Button>

              <Button variant="link" className="text-dark me-3" onClick={() => console.log('Cart clicked')}>
                <ShoppingCartOutlined className="icon-lg" />
              </Button>

              {idAuth ? (
                <NavDropdown title={
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                } id="dropdownUser1" align="end">
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div>
                  <Button variant="link" className="text-dark" onClick={handleOpenLoginModal}>
                    Đăng nhập
                  </Button>
                  <Button variant="link" className="text-dark">
                    Đăng ký
                  </Button>
                </div>
              )}
            </div>
          </Navbar>
        </Container>
      </div>

      {showLoginModal && (
        <Login show={showLoginModal} handleClose={handleCloseLoginModal} />
      )}
    </>
  );
}

export default Header;