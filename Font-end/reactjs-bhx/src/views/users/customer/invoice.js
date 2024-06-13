import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park',
  },
];

const User_invDetails = () => {
  const [selectionType, setSelectionType] = useState('checkbox');

  const handleSelectionChange = (e) => {
    setSelectionType(e.target.value);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const pagination = {
    pageSize: 5,
  };

  return (
    <div>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={data}
        pagination={pagination}
      >
        <Column title="Name" dataIndex="name" key="name" render={(text) => <a>{text}</a>} />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
      </Table>
    </div>
  );
};

export default User_invDetails;
