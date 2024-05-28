import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal_editUser from './modal_editUser';
import { fetchAllUser, delUser } from '../../../services/usersServices';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate'; // Import react-paginate

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDataToEdit, setUserDataToEdit] = useState(null);
  const [pageNumber, setPageNumber] = useState(0); // State for current page number
  const usersPerPage = 10; // Number of users to display per page

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
    const userToEdit = listUsers.find(user => user.id === userId);
    if (userToEdit) {
      setUserDataToEdit(userToEdit);
      setShowEditModal(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
    if (confirmation) {
      try {
        await delUser(userId);
        toast.success("Người dùng đã được xóa thành công!");
        getUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error("Đã xảy ra lỗi khi xóa người dùng: " + error.message);
      }
    }
  };

  // Calculate number of pages
  const pageCount = Math.ceil(listUsers.length / usersPerPage);

  // Slice the listUsers array to display only users for the current page
  const displayUsers = listUsers
    .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
    .map((item, index) => (
      <tr key={`users-${index}`}>
        <td>{item.id}</td>
        <td>{item.nameAcc}</td>
        <td>{item.pasAcc}</td>
        <td>{item.email}</td>
        <td>{item.dateBegin}</td>
        <th><button className='btn btn-warning' onClick={() => handleEditUser(item.id)}>Sửa</button></th>
        <th><button className='btn btn-danger' onClick={() => handleDeleteUser(item.id)}>Xóa</button></th>
      </tr>
    ));

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
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
          {displayUsers}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="pagination-container d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"page-item disabled"}
          activeClassName={"page-item active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      </div>
      {/* Modal */}
      {showEditModal && (
        <Modal_editUser
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          userId={userDataToEdit.id}
          userData={userDataToEdit}
        />
      )}
    </>
  );
};

export default TableUsers;
