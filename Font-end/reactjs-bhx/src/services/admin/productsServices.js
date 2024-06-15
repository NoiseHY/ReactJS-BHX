import axios from "../cust_axios_admin";
import { toast } from 'react-toastify';

const fetchAllProd = async () => {
  try {
    const response = await axios.get("/api/product/GetAll");
    if (response) {
      toast.success("Danh sách sản phẩm  đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu sản phẩm .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải danh sách sản phẩm : " + error.message);
    throw error;
  }
};

const getUnitByID = async (id) => {
  try {
    const response = await axios.get("/api/product/GetCategoriesByID?id=" + id);
    if (response) {
      toast.success("Tải thành công!");
    } else {
      toast.error("Không có dữ liệu.");
    }
    return response;
  }
  catch (error) {
    toast.error("Đã xảy ra lỗi khi tải : " + error.message);
    throw error;
  }
}

const getCatByID = async (id) => {
  try {
    const response = await axios.get("/api/product/GetCatByID?id=" + id);
    if (response) {
      toast.success("Tải thành công!");
    } else {
      toast.error("Không có dữ liệu ");
    }
    return response;
  }
  catch (error) {
    toast.error("Đã xảy ra lỗi khi tải : " + error.message);
    throw error;
  }
}

const postCreateProd = async (userData) => {
  try {
    const response = await axios.post("/api/product/Create", userData);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Người dùng đã được tạo thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi tạo sản phẩm .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tạo sản phẩm : " + error.message);
    throw error;
  }
};

const putEditProd = async (userData) => {
  try {
    const response = await axios.put("/api/product/Update", userData);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Thông tin sản phẩm  đã được cập nhật thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin sản phẩm .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi cập nhật thông tin sản phẩm : " + error.message);
    throw error;
  }
};

const delProd = async (id) => {
  try {
    const response = await axios.delete(`/api/product/Delete/${id}`);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Người dùng đã được xóa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa sản phẩm : " + error.message);
    throw error;
  }
};

export {
  fetchAllProd, postCreateProd, putEditProd, delProd,
  getCatByID, getUnitByID
};
