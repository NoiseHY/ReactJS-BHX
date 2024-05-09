import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal_editUser from './modal_editUser'; // Import Modal_editUser component

import { fetchAllUser } from '../services/usersServices';
import { delUser } from '../services/usersServices'; // Import delUser function

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // Trạng thái để điều khiển việc hiển thị modal chỉnh sửa
  const [userDataToEdit, setUserDataToEdit] = useState(null); // Trạng thái để lưu thông tin người dùng cần chỉnh sửa
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Trạng thái để hiển thị thông báo xóa thành công

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

  const handleEditUser = (userId) => {
    const userToEdit = listUsers.find(user => user.id === userId); // Tìm người dùng cần chỉnh sửa dựa trên id
    if (userToEdit) {
      setUserDataToEdit(userToEdit); // Gán dữ liệu người dùng cần chỉnh sửa vào trạng thái
      setShowEditModal(true); // Hiển thị modal chỉnh sửa
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
    if (confirmation) {
      try {
        await delUser(userId);
        setShowSuccessMessage(true); // Hiển thị thông báo xóa thành công
        setTimeout(() => setShowSuccessMessage(false), 5000); // Ẩn thông báo sau 5 giây
        getUsers(); // Cập nhật lại danh sách người dùng sau khi xóa thành công
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <>
      {/* Hiển thị thông báo xóa thành công */}
      {showSuccessMessage && (
        <div className="alert alert-success mt-3" role="alert">
          Người dùng đã được xóa thành công!
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Tên tài khoản</th>
            <th>Mật khẩu</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th></th>
            <th></th>
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
              <th><button className='btn btn-warning' onClick={() => handleEditUser(item.id)}>Sửa</button></th>
              <th><button className='btn btn-danger' onClick={() => handleDeleteUser(item.id)}>Xóa</button></th>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Hiển thị modal chỉnh sửa */}
      {showEditModal && (
        <Modal_editUser
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          userId={userDataToEdit.id} // Truyền id của người dùng cần chỉnh sửa vào modal
          userData={userDataToEdit} // Truyền thông tin người dùng cần chỉnh sửa vào modal
        />
      )}

    </>
  );
};

export default TableUsers;
