import { useState, useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { putEditUser } from "../../../services/admin/usersServices";
import { toast } from "react-toastify";

const Modal_editUser = (props) => {
  const { show, handleClose, userId, userData } = props; // Nhận id và thông tin người dùng từ props
  const [id, setId] = useState("");
  const [nameAcc, setNameAcc] = useState("");
  const [pasAcc, setPasAcc] = useState("");
  const [email, setEmail] = useState("");
  const [idAuth, setIDAuth] = useState("");

  useEffect(() => {
    if (userData) {
      setId(userData.id);
      setNameAcc(userData.nameAcc);
      setPasAcc(userData.pasAcc);
      setEmail(userData.email);
      setIDAuth(userData.idAuth);
    }
  }, [userData]); // Sử dụng useEffect để cập nhật thông tin người dùng khi userData thay đổi

  const handeId = (event) => {
    setId(event.target.value);
  };

  const handleNameAccChange = (event) => {
    setNameAcc(event.target.value);
  };

  const handlePasAccChange = (event) => {
    setPasAcc(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdCutsChange = (event) => {
    setIDAuth(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await putEditUser({ id,userId, nameAcc, pasAcc, email, idAuth });
      if (res){
        toast.success("Sửa thành công người dùng !")
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi sửa người dùng:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="mb-3">
          <label htmlFor="nameAcc" className="form-label">Mã tài khoản</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={handeId}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nameAcc" className="form-label">Tên tài khoản</label>
          <input
            type="text"
            className="form-control"
            id="nameAcc"
            value={nameAcc}
            onChange={handleNameAccChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pasAcc" className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="pasAcc"
            value={pasAcc}
            onChange={handlePasAccChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="idCuts" className="form-label">Mã phân quyền</label>
          <input
            type="text"
            className="form-control"
            id="idAuth"
            value={idAuth}
            onChange={handleIdCutsChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Sửa</Button>
      </Modal.Footer>
      
    </Modal>
  );
};

export default Modal_editUser;
