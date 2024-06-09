import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { user_cartServices } from '../../../services/user/cartServices';

function User_CartDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const GetAllByID = async () => {
    try {
      const res = await user_cartServices();
      if (res) {
        setCartItems(res);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllByID();
  }, []);

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  const handleSelectItem = (item, selected) => {
    if (selected) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {cartItems.map((item) => (
        <ItemComponent key={item.id} item={item} onSelectItem={handleSelectItem} onQuantityChange={handleQuantityChange} />
      ))}
      <p>Sản phẩm chọn : {selectedItems.map(item => item.productName).join(', ')} </p>
      <p>Tổng tiền : {totalPrice.toLocaleString()} đ</p>
      <button type="button" className="btn btn-success" onClick={handleConfirm}>Xác nhận !</button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sản phẩm đã chọn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItems.length > 0 ? (
            <ul className="list-unstyled">
              {selectedItems.map((item) => (
                <li key={item.id} className="d-flex align-items-center mb-2">
                  <img src={item.img ? require(`../../../assets/img/${item.img}`) : ""} alt="Product" className="img-thumbnail" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div>
                    <p className="mb-1">{item.productName}</p>
                    <p className="mb-1">Số lượng: {item.quantity} </p>
                    <p className="mb-0">Đơn giá: {item.unitPrice.toLocaleString()} đ = Tổng: {item.quantity * item.unitPrice}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có sản phẩm nào được chọn.</p>
          )}
          <p>Tổng tiền: {totalPrice.toLocaleString()} đ</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const ItemComponent = ({ item, onSelectItem, onQuantityChange }) => {
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const imagePath = item.img ? require(`../../../assets/img/${item.img}`) : "";

  const handleItemSelect = () => {
    setSelected((prevSelected) => {
      const newSelected = !prevSelected;
      onSelectItem(item, newSelected);
      return newSelected;
    });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleDelete = () => {
    // Add delete logic here
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={handleItemSelect}
            style={{ marginRight: '10px' }}
          />
          <img src={imagePath} className="img-thumbnail" style={{ width: '70px', height: '70px', marginRight: '20px' }} alt="Product" />
          <div>
            <h5 className="card-title mb-2">{item.productName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{item.supplierName}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{item.productDescription}</h6>
            <div className="d-flex align-items-baseline">
              <span className="text-danger fw-bold">{item.unitPrice.toLocaleString()} đ / </span>
              <span className="text fw-bold">{item.unitName}</span>
            </div>
          </div>
          <div className="ms-auto">
            <div className="d-flex align-items-center">
              <label htmlFor={`quantity-${item.id}`} className="me-2 mb-0">Số lượng:</label>
              <input
                id={`quantity-${item.id}`}
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: '50px' }}
              />
              <button onClick={handleDelete} className="btn btn-link text-danger p-0 ms-2">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default User_CartDetails;
