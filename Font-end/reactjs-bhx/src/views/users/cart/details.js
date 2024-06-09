import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { user_cartServices } from '../../../services/user/cartServices';

function User_CartDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return { ...item };
      })
    );
  };

  return (
    <div>
      {cartItems.map((item) => {
        const imagePath = item.img ? require(`../../../assets/img/${item.img}`) : "";

        return (
          <div className="card mb-3" key={item.id}>
            <div className="card-body">
              <h5 className="card-title">{item.supplierName}</h5>
              <div className="d-flex">
                <img src={imagePath} className="img-thumbnail" style={{ width: '70px', height: '70px', marginRight: '20px' }} alt="Product" />
                <div className="flex-grow-1">
                  <h6 className="card-subtitle mb-2 text-muted">{item.productName}</h6>
                  <div className="d-flex align-items-baseline">
                    <span className="text-decoration-line-through text-muted me-2">{item.unitPrice}</span>
                    <span className="text-danger fw-bold">{item.unitName}</span>
                  </div>
                </div>

                <div className="ms-auto">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="btn btn-link text-danger p-0 me-2">-</button>
                  <span className="text-muted">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="btn btn-link text-danger p-0">+</button>
                  <button className="btn btn-link text-danger p-0 me-2">Xóa</button>
                  <button className="btn btn-link text-danger p-0">Tìm sản phẩm tương tự</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default User_CartDetails;
