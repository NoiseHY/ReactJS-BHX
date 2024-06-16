import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { putEditProd } from '../../../services/admin/productsServices';
import { fetchAllCats } from "../../../services/admin/catsServices";
import { fetchAllUnits } from "../../../services/admin/unitsServices";

const Modal_editProd = (props) => {
  const { show, handleClose, Id, productData } = props;
  const [nameProd, setNameProd] = useState("");
  const [desProd, setDesProd] = useState("");
  const [num, setNum] = useState("");
  const [up, setUp] = useState("");
  const [idCat, setIdCat] = useState("");
  const [idUnits, setIdUnits] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (productData) {
      setNameProd(productData.nameProd || "");
      setDesProd(productData.desProd || "");
      setNum(productData.num || "");
      setUp(productData.up || "");
      setIdCat(productData.idCat || "");
      setIdUnits(productData.idUnits || "");
      setImg(productData.img || "");
    }
  }, [productData]);

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
    switch (name) {
      case 'nameProd':
        setNameProd(value);
        break;
      case 'desProd':
        setDesProd(value);
        break;
      case 'num':
        setNum(value);
        break;
      case 'up':
        setUp(value);
        break;
      case 'idCat':
        setIdCat(value);
        break;
      case 'idUnits':
        setIdUnits(value);
        break;
      case 'img':
        setImg(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImg(base64String);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', Id);
      formData.append('nameProd', nameProd);
      formData.append('desProd', desProd);
      formData.append('num', num);
      formData.append('up', up);
      formData.append('idCat', idCat);
      formData.append('idUnits', idUnits);
      formData.append('img', img);

      let res = await putEditProd(formData);
      if (res) {
        toast.success("Sửa sản phẩm thành công!");
        handleClose();
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi sửa sản phẩm: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameProd" className="form-label">Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              id="nameProd"
              name="nameProd"
              value={nameProd}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desProd" className="form-label">Miêu tả</label>
            <input
              type="text"
              className="form-control"
              id="desProd"
              name="desProd"
              value={desProd}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="num" className="form-label">Số lượng</label>
            <input
              type="number"
              className="form-control"
              id="num"
              name="num"
              value={num}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="up" className="form-label">Giá cả</label>
            <input
              type="number"
              className="form-control"
              id="up"
              name="up"
              value={up}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Danh mục</label>
            <select
              className="form-control"
              id="idCat"
              name="idCat"
              value={idCat}
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
              value={idUnits}
              onChange={handleChange}
            >
              <option value="">Chọn đơn vị</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.nameUn}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">Ảnh</label><br></br>

            {img && (
              <div className="mt-2">
                <img src={img} alt="Hình ảnh được chọn" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '5px' }} />
              </div>
            )} <br />
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="img-file"
                name="img-file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
              />
            </div>
          </div>


          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" type='submit'>
              Sửa
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Modal_editProd;
