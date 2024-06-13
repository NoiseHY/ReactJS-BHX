import React from 'react';
import { Card, Col, Row } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Admin_Dashboard = () => {
  return (
    <div className="container mt-4">
      <Row gutter={16}>
        <Col span={6}>
          <Card className="mb-4" title="Users" extra={<ArrowDownOutlined />}>
            <p>26K</p>
            <p>-12.4%</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="mb-4" title="Income" extra={<ArrowUpOutlined />}>
            <p>$6.200</p>
            <p>40.9%</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="mb-4" title="Conversion Rate" extra={<ArrowUpOutlined />}>
            <p>2.49%</p>
            <p>84.7%</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="mb-4" title="Sessions" extra={<ArrowDownOutlined />}>
            <p>44K</p>
            <p>-23.6%</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin_Dashboard;
