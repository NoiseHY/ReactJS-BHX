import axios from "./cust_axios_admin";
import { toast } from 'react-toastify'; // Import toast

const fetchAllUser = async () => {
  try {
    const response = await axios.get("/api/account/GetAll?pageNumber=1&pageSize=10");
    if (response) {
      toast.success("Danh sách người dùng đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu người dùng.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải danh sách người dùng: " + error.message);
    throw error;
  }
};

const postCreateUser = async (userData) => {
  try {
    const response = await axios.post("/api/account/Create", userData);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Người dùng đã được tạo thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi tạo người dùng.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tạo người dùng: " + error.message);
    throw error;
  }
};

const putEditUser = async (userData) => {
  try {
    const response = await axios.put("/api/account/Update", userData);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Thông tin người dùng đã được cập nhật thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng: " + error.message);
    throw error;
  }
};

const delUser = async (id) => {
  try {
    const response = await axios.delete(`/api/account/Delete/${id}`);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Người dùng đã được xóa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi xóa người dùng.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa người dùng: " + error.message);
    throw error;
  }
};

export { fetchAllUser, postCreateUser, putEditUser, delUser };
