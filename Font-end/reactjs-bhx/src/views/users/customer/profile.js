import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Layout, Card, Button, Row, Col, Typography, Image, Spin, Menu, Modal, Form, Input } from 'antd';
import { user_getCusServices } from '../../../services/user/cusServices';
import User_invDetails from '../../users/customer/invoice';

const { Content } = Layout;
const { Title, Text } = Typography;

const EditCustomerModal = ({ visible, onClose, userData, handleSave }) => {
  const [editedData, setEditedData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    handleSave(editedData);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={handleSaveChanges}
      title="Chỉnh sửa thông tin khách hàng"
    >
      <Form layout="vertical">
        <Form.Item label="Họ tên">
          <Input name="nameCus" value={editedData.nameCus} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input name="addressCus" value={editedData.addressCus} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Điện thoại">
          <Input name="num" value={editedData.num} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" value={editedData.email} onChange={handleChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ChangePasswordModal = ({ visible, onClose, handleChangePassword }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword === passwordData.confirmNewPassword) {
      handleChangePassword(passwordData);
      onClose();
    } else {
      // Handle password mismatch error
      console.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={handleSavePassword}
      title="Đổi mật khẩu"
    >
      <Form layout="vertical">
        <Form.Item label="Mật khẩu hiện tại">
          <Input.Password name="currentPassword" value={passwordData.currentPassword} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          <Input.Password name="newPassword" value={passwordData.newPassword} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu mới">
          <Input.Password name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handleChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const User_profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const { id } = useParams();
  const imagePath = userData && userData.img ? require(`../../../assets/img/${userData.img}`) : "";

  const fetchUserData = async () => {
    try {
      const customerData = await user_getCusServices(id);
      setUserData(customerData[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleMenuClick = (key) => {
    if (key === '1') {
      setShowInvoice(true);
    } else {
      setShowInvoice(false);
    }
  };

  const handleSaveChanges = (updatedData) => {
    // Logic để lưu thay đổi thông tin khách hàng
    setUserData(updatedData);
    setEditModalVisible(false);
  };

  const handleChangePassword = (passwordData) => {
    // Logic để đổi mật khẩu
    console.log('Password data:', passwordData);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Layout>
        <Content className="gradient-custom-2">
          <Row justify="center" align="middle" className="py-5">
            <Col span={24} style={{ maxWidth: '900px' }}>
              <Card>
                <div className="profile-header" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="profile-image-container" style={{ width: '150px', marginLeft: '16px', marginBottom: '16px' }}>
                    <Image
                      src={imagePath}
                      alt="Profile"
                      className="img-thumbnail"
                      style={{ width: '150px', zIndex: '1' }}
                    />
                    <Button type="primary" style={{ height: '36px', marginTop: '16px' }} onClick={() => setEditModalVisible(true)}>
                      Sửa thông tin
                    </Button>
                  </div>
                  <div className="profile-info" style={{ marginLeft: '16px', marginTop: '130px' }}>
                    <Title level={5} style={{ color: '#fff' }}>{userData.nameCus}</Title>
                    <Text style={{ color: '#fff' }}>{userData.location}</Text>
                  </div>
                </div>
                <div className="profile-stats" style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
                  <Row justify="end" gutter={16} style={{ textAlign: 'center' }}>
                    <Col>
                      <Text className="h5">{userData.photos}</Text>
                      <Text className="small text-muted">Photos</Text>
                    </Col>
                    <Col>
                      <Text className="h5">{userData.followers}</Text>
                      <Text className="small text-muted">Followers</Text>
                    </Col>
                    <Col>
                      <Text className="h5">{userData.following}</Text>
                      <Text className="small text-muted">Following</Text>
                    </Col>
                  </Row>
                </div>
                <div className="profile-about" style={{ padding: '16px' }}>
                  <div className="about-section">
                    <Title level={4}>About</Title>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Họ tên</label>
                        <input type="text" className="form-control" name="nameCus" value={userData.nameCus} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Địa chỉ</label>
                        <input type="text" className="form-control" name="addressCus" value={userData.addressCus} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Điện thoại</label>
                        <input type="text" className="form-control" name="num" value={userData.num} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" value={userData.email} readOnly />
                      </div>
                    </div>
                  </div>
                </div>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}
                  onClick={({ key }) => handleMenuClick(key)}
                >
                  <Menu.Item key="1" style={{ fontSize: '16px' }}>Hóa đơn</Menu.Item>
                  <Menu.Item key="2" style={{ fontSize: '16px' }} onClick={() => setChangePasswordModalVisible(true)}>Đổi mật khẩu</Menu.Item>
                  <Menu.Item key="3" style={{ fontSize: '16px' }}>Khác</Menu.Item>
                </Menu>
                {showInvoice && <User_invDetails />}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <EditCustomerModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        userData={userData}
        handleSave={handleSaveChanges}
      />

      <ChangePasswordModal
        visible={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
        handleChangePassword={handleChangePassword}
      />
    </>
  );
};

export default User_profile;
