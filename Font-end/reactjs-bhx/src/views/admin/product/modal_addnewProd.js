import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import { postCreateProd } from '../../../services/admin/productsServices';


const Modal_addnewProd = (props) => {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [desProd, setdesProd] = useState("");
  const [num, setNum] = useState("");
  const [up, setUp] = useState("");
  const [idCat, setIDCat] = useState("");
  const [idUnits, setIDUnits] = useState("");
  const [img, setImg] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handledesProd = (event) => {
    setdesProd(event.target.value);
  };

  const handleNum = (event) => {
    setNum(event.target.value);
  };

  const handleUp = (event) => {
    setUp(event.target.value);
  };

  const handleIDCat = (event) => {
    setIDCat(event.target.value);
  };

  const handleIDUnits = (event) => {
    setIDUnits(event.target.value);
  };

  const handleImg = (event) => {
    setImg(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await postCreateProd({
        name, desProd,
        num, up, idCat, idUnits, img
      });
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
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miêu tả </label>
          <input
            type="text"
            className="form-control"
            id="desProd"
            value={desProd}
            onChange={handledesProd}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng </label>
          <input
            type="number"
            className="form-control"
            id="num"
            value={num}
            onChange={handleNum}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idCuts" className="form-label">Giá cả </label>
          <input
            type="number"
            className="form-control"
            id="up"
            value={up}
            onChange={handleNum}
          />
        </div>


        <div className="mb-3">
          <label className="form-label"> Danh mục </label>
          <input
            type=""
            className="form-control"
            id="up"
            value={up}
            onChange={handleNum}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idCuts" className="form-label"> Đơn vị </label>
          <input
            type=""
            className="form-control"
            id="up"
            value={up}
            onChange={handleNum}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idCuts" className="form-label"> Ảnh </label>
          <input
            type=""
            className="form-control"
            id="up"
            value={up}
            onChange={handleNum}
          />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Tạo </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default Modal_addnewProd;
