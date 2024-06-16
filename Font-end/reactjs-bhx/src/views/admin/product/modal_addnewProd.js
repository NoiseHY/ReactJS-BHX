import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { postCreateProd } from '../../../services/admin/productsServices';
import { fetchAllCats } from "../../../services/admin/catsServices";
import { fetchAllUnits } from "../../../services/admin/unitsServices";

const Modal_addnewProd = (props) => {
  const { show, handleClose } = props;
  const [formData, setFormData] = useState({
    nameProd: "",
    desProd: "",
    num: 0,
    up: 0,
    idCat: 0,
    idUnits: 0,
    img: "" 
  });
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchCategoriesAndUnits();
  }, []);

  const fetchCategoriesAndUnits = async () => {
    try {
      const [catsRes, unitsRes] = await Promise.all([fetchAllCats(), fetchAllUnits()]);
      setCategories(catsRes);
      setUnits(unitsRes);
    } catch (error) {
      console.error('Error fetching categories and units:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        img: file.name
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await postCreateProd(formData);
      if (res) {
        toast.success("Sản phẩm đã được tạo thành công!", {
          autoClose: 2000,
          onClose: () => {
            handleClose();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
        });

      } else {
        toast.error("Đã xảy ra lỗi khi tạo sản phẩm.");
      }
    } catch (error) {
      const errorMessage = error.message || "Đã xảy ra lỗi khi tạo.";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="nameProd"
            name="nameProd"
            value={formData.nameProd}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miêu tả</label>
          <input
            type="text"
            className="form-control"
            id="desProd"
            name="desProd"
            value={formData.desProd}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            id="num"
            name="num"
            value={formData.num}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá cả</label>
          <input
            type="number"
            className="form-control"
            id="up"
            name="up"
            value={formData.up}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className="form-control"
            id="idCat"
            name="idCat"
            value={formData.idCat}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nameCat}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Đơn vị</label>
          <select
            className="form-control"
            id="idUnits"
            name="idUnits"
            value={formData.idUnits}
            onChange={handleChange}
          >
            <option value="">Chọn đơn vị</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.nameUn}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh</label>
          <input
            type="file"
            className="form-control"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Tạo</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_addnewProd;

