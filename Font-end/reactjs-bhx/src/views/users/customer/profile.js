import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Row, Col, Typography, Image, Spin, Menu } from 'antd';
import { user_getCusServices } from '../../../services/user/cusServices';
import User_invDetails from '../../users/customer/invoice';

const { Content } = Layout;
const { Title, Text } = Typography;

const User_profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const imagePath = userData && userData.img ? require(`../../../assets/img/users/${userData.img}`) : "";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const customerData = await user_getCusServices();
        setUserData(customerData[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = (key) => {
    if (key === '1') {
      setShowInvoice(true);
    } else {
      setShowInvoice(false);
    }
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
                    <Button type="primary" style={{ height: '36px', marginTop: '16px' }}>
                      Edit profile
                    </Button>
                  </div>
                  <div className="profile-info" style={{ marginLeft: '16px', marginTop: '130px' }}>
                    <Title level={5} style={{ color: '#fff' }}>{userData.img}</Title>
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
                        <input type="text" className="form-control" name="kh_ten" id="kh_ten" value={userData.nameCus} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Địa chỉ</label>
                        <input type="text" className="form-control" name="kh_diachi" id="kh_diachi" value={userData.addressCus} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Điện thoại</label>
                        <input type="text" className="form-control" name="kh_dienthoai" id="kh_dienthoai" value={userData.num} readOnly />
                      </div>
                      <div className="col-md-12">
                        <label>Email</label>
                        <input type="text" className="form-control" name="kh_email" id="kh_email" value={userData.email} readOnly />
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
                  <Menu.Item key="2" style={{ fontSize: '16px' }}>Đổi mật khẩu</Menu.Item>
                  <Menu.Item key="3" style={{ fontSize: '16px' }}>Khác</Menu.Item>
                </Menu>
                {showInvoice && <User_invDetails />}
              </Card>

            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default User_profile;
