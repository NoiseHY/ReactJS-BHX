import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { user_cartServices } from '../../../services/user/cartServices';
import UserModalDetails from './modal_details';
import { Spin, Button, Checkbox, Image, Input, Card, Typography } from 'antd';
import { delDetails } from '../../../services/user/cartServices';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

function User_CartDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const GetAllByID = async () => {
    try {
      const res = await user_cartServices(id);
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

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (confirmation) {
      try {
        await delDetails(id);
        toast.success("Xóa thành công!");
        GetAllByID();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error("Đã xảy ra lỗi khi xóa người dùng: " + error.message);
      }
    }
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {cartItems.map((item) => (
          <ItemComponent key={item.id} item={item} onSelectItem={handleSelectItem} onQuantityChange={handleQuantityChange} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="mt-4">
        <p>Sản phẩm chọn: {selectedItems.map(item => item.productName).join(', ')}</p>
        <p>Tổng tiền: {totalPrice.toLocaleString()} đ</p>
        <Button type="primary" onClick={handleConfirm}>Xác nhận!</Button>
      </div>

      <UserModalDetails
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedItems={selectedItems}
        totalPrice={totalPrice}
      />
    </div>
  );
}

const ItemComponent = ({ item, onSelectItem, onQuantityChange, handleDelete }) => {
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
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <Card className="mb-3 w-100">
      <div className="d-flex align-items-center">
        <Checkbox checked={selected} onChange={handleItemSelect} style={{ marginRight: '10px' }} />
        <Image src={imagePath} width={200} height={100} alt="Product" className="me-3" />
        <div>
          <Title level={5} className="mb-2">{item.productName}</Title>
          <Text type="secondary" className="d-block mb-2">{item.supplierName}</Text>
          <Text type="secondary" className="d-block mb-2">{item.productDescription}</Text>
          <div className="d-flex align-items-baseline">
            <Text type="danger" strong>{item.unitPrice.toLocaleString()} đ</Text>
            <Text className="ms-1">{item.unitName}</Text>
          </div>
        </div>
        <div className="ms-auto">
          <div className="d-flex align-items-center">
            <label htmlFor={`quantity-${item.id}`} className="me-2 mb-0">Số lượng:</label>
            <Input
              id={`quantity-${item.id}`}
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: '60px' }}
            />
            <Button className='btn btn-danger' onClick={() => handleDelete(item.cartDetailId)}>Xóa</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default User_CartDetails;
