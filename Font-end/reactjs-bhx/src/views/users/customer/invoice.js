import React, { useState, useEffect } from 'react';
import { Table, Spin, Button, Space } from 'antd';
import { GetInvoicesByCustomerID } from '../../../services/user/invoiceServices';
import UserModalInvDetails from './modal_invDetails';

const { Column } = Table;

const User_invDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionType, setSelectionType] = useState('checkbox');
  const customerID = sessionStorage.getItem('idCuts');
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // State to store the selected record

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoiceData = await GetInvoicesByCustomerID(customerID);
        setData(invoiceData);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [customerID]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.countInv === 0, 
      name: record.id,
    }),
  };

  const pagination = {
    pageSize: 5,
  };

  const handleDetails = (record) => {
    console.log('Details for:', record);
    setIsShowModal(true); 
    setSelectedRecord(record); 
  };

  const handleDelete = (record) => {
    console.log('Delete:', record);
    // Implement the logic for deleting the record here
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        pagination={pagination}
      >
        <Column title="Invoice ID" dataIndex="id" key="id" />
        <Column title="Count" dataIndex="countInv" key="countInv" />
        <Column title="Customer ID" dataIndex="idCus" key="idCus" />
        <Column title="Date Begin" dataIndex="dateBegin" key="dateBegin" />
        <Column title="Date End" dataIndex="dateEnd" key="dateEnd" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={() => handleDetails(record)}>Chi tiết</Button>
              <Button onClick={() => handleDelete(record)} danger>Xóa</Button>
            </Space>
          )}
        />
      </Table>

      {/* Render the modal only if isShowModal is true */}
      {isShowModal && (
        <UserModalInvDetails
          visible={isShowModal}
          onCancel={() => setIsShowModal(false)}
          record={selectedRecord}
        />
      )}
    </div>
  );
};

export default User_invDetails;
