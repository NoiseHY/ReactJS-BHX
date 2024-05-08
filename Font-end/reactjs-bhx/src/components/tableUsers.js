import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { fetchAllUser } from '../services/usersServices';

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await fetchAllUser();
      if (res) {
        setListUsers(res);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  console.log(listUsers);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Tên tài khoản</th>
          <th>Mật khẩu</th>
          <th>Email</th>
          <th>Ngày tạo</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && listUsers.map((item, index) => (
          <tr key={`users-${index}`}>
            <td>{item.id}</td>
            <td>{item.nameAcc}</td>
            <td>{item.pasAcc}</td>
            <td>{item.email}</td>
            <td>{item.dateBegin}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
