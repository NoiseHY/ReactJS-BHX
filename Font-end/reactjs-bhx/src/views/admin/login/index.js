import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

import login from '../../../services/admin/loginServices';

function Login({ show, handleClose }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ nameAcc: username, pasAcc: password });
      
      if (response) {
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Vui lòng kiểm tra lại tên người dùng và mật khẩu.");
      }
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <AiOutlineUser /> Tên đăng nhập
            </Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <AiOutlineLock /> Mật khẩu
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
