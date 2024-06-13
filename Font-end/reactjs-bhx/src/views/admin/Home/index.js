import React, { useState } from 'react';
import { Header } from 'antd/es/layout/layout';

import Admin_Dashboard from '../dashboard/dashboard';
import Admin_Account from '../account/index';

import Admin_Header from '../../../components/header';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

const items = [
  { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', component: <Admin_Dashboard /> },
  { key: '2', icon: <UserOutlined />, label: 'Tài khoản', component: <Admin_Account /> },
  { key: '3', icon: <UploadOutlined />, label: 'Uploads' },
  { key: '4', icon: <BarChartOutlined />, label: 'Charts' },
  { key: '5', icon: <CloudOutlined />, label: 'Cloud' },
  { key: '6', icon: <AppstoreOutlined />, label: 'Apps' },
  { key: '7', icon: <TeamOutlined />, label: 'Teams' },
  { key: '8', icon: <ShopOutlined />, label: 'Shop' },
];

const Admin_tmp = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[selectedKey]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        {items.map((item) => {
          if (item.key === selectedKey) {
            return (
              <>
                <Admin_Header></Admin_Header>
                <hr className="mt-4" />
                <div key={item.key}>{item.component}</div>
              </>
            );
          }
          return null;
        })}
      </Layout>
    </Layout>
  );
};

export default Admin_tmp;
