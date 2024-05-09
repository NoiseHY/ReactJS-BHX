import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { postCreateUser } from "../services/usersServices";

const Modal_addnew = (props) => {
  const { show, handleClose } = props;
  const [nameAcc, setNameAcc] = useState("");
  const [pasAcc, setPasAcc] = useState("");
  const [email, setEmail] = useState("");
  const [idAuth, setIDAuth] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      await postCreateUser({ nameAcc, pasAcc, email, idAuth }); // Gọi hàm postCreateUser với thông tin người dùng
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Ẩn thông báo sau 1 giây
        handleClose(); // Đóng modal sau khi tạo người dùng thành công
        window.location.reload(); // Làm mới trang sau khi tạo người dùng thành công
      }, 1000);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo người dùng:", error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
      {/* Hiển thị thông báo thành công */}
      {showSuccessMessage && (
        <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
          Người dùng đã được tạo thành công!
        </Alert>
      )}
    </Modal>
  );
};

export default Modal_addnew;
