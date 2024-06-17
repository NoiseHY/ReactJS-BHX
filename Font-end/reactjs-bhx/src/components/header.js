import React, { useState, useEffect } from 'react';
import { Container, Navbar, NavDropdown, Form, Button, Modal } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ShoppingCartOutlined, BellOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import '../App.scss';

import Login from '../views/admin/login';
import { user_fetchAllProd } from '../services/user/productsServices';
import { fetchImgAndCount } from '../services/admin/loginServices';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [idAuth] = useState(sessionStorage.getItem("idAuth"));
  const [idCuts] = useState(sessionStorage.getItem("idCuts"));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [img, setImg] = useState('');
  const [cartProductCount, setCartProductCount] = useState(0);


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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await user_fetchAllProd();
      const results = res.filter(prod => prod.nameProd.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(results);
      setShowSearchModal(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  };

  const getListAcc = async () => {
    try {
      const res = await fetchImgAndCount();

      if (res && res.length > 0) {
        setCartProductCount(res[0].cartProductCount)
        setImg(res[0].img && require(`../assets/img/${res[0].img}`));
      }
    } catch (error) {
      console.log("Error fetching img and count", error);
    }
  };

  useEffect(() => {
    getListAcc();
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" />

      <div className='d-flex justify-content-between'>
        <Container>
          <Navbar expand="lg" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="/" className="text-dark text-decoration-none">
              Bách Hóa Xanh
            </Navbar.Brand>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                  <BsSearch />
                </button>
              </div>
            </form>

            <div className="d-flex align-items-center">
              <Button variant="link" className="text-dark me-3" onClick={() => console.log('Bell clicked')}>
                <BellOutlined className="icon-lg" />
              </Button>

              <div className="d-flex align-items-center me-3 position-relative">
                <Button variant="link" href={`/cart/${idCuts}`} className="text-dark" onClick={() => console.log('Cart clicked')}>
                  <ShoppingCartOutlined className="icon-lg" />
                </Button>
                {cartProductCount > 0 && (
                  <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle">
                    {cartProductCount}
                  </span>
                )}
              </div>

              {idAuth ? (
                <NavDropdown title={
                  <img src={img} alt="User" width="32" height="32" className="rounded-circle" />
                } id="dropdownUser1" align="end">
                  <NavDropdown.Item href={`/profile/${idCuts}`}>Trang cá nhân</NavDropdown.Item>
                  <NavDropdown.Item href="#">Cài đặt</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div>
                  <Button variant="link" className="link-no-style" onClick={handleOpenLoginModal}>
                    Đăng nhập
                  </Button>
                  <Button variant="link" className="link-no-style">
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

      <Modal show={showSearchModal} onHide={handleCloseSearchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Kết quả tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((prod, index) => (
                <li key={index}>
                  <img src={require(`../assets/img/${prod.img}`)} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '5px' }} />                 <a href={`http://localhost:3000/product/${prod.id}`} target="_blank" rel="noopener noreferrer" className='link-no-style'>
                    {prod.nameProd}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không tìm thấy sản phẩm nào.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSearchModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
