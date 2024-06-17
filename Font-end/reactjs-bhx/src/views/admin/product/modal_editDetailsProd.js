import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchAllSups } from '../../../services/admin/supsServices';

const EditProductModal = ({ show, handleClose, product, handleSaveChanges }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetchAllSups();
        setSuppliers(res);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  };

  const handleSave = () => {
    handleSaveChanges(editedProduct);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="nameProd"
              value={editedProduct.nameProd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              name="desProd"
              value={editedProduct.desProd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              name="num"
              value={editedProduct.num}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đơn giá</Form.Label>
            <Form.Control
              type="number"
              name="up"
              value={editedProduct.up}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Thành phần</Form.Label>
            <Form.Control
              type="text"
              name="ing"
              value={editedProduct.ing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hướng dẫn bảo quản</Form.Label>
            <Form.Control
              type="text"
              name="stor"
              value={editedProduct.stor}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={editedProduct.note}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pop</Form.Label>
            <Form.Control
              type="text"
              name="pop"
              value={editedProduct.pop}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nhà cung cấp</Form.Label>
            <Form.Control
              as="select"
              name="idSup"
              value={editedProduct.idSup}
              onChange={handleChange}
            >
              <option value="">Chọn nhà cung cấp</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.nameSup}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Lưu thay đổi
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
