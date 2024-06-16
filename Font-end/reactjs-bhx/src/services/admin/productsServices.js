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

const fetchAllUnits = async () => {
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


const fetchAllCats = async () => {
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
    const response = await axios.get("/api/product/GetUnitsByID/" + id);
    if (response) {
      // toast.success("Tải thành công!");
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
    const response = await axios.get("/api/product/GetCategoriesByID/" + id);
    if (response) {
      // toast.success("Tải thành công!");
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

const getProductByID = async (id) => {
  try {
    const response = await axios.get("/api/product/GetProductByID?id=" + id);
    if (response) {
      toast.success("Chi tiết sản phẩm  đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu sản phẩm .");
    }
    return response;
  }
  catch (error) {
    toast.error("Đã xảy ra lỗi khi tải chi tiết sản phẩm : " + error.message);
    throw error;
  }
}

const postCreateProd = async (Data) => {
  try {
    const response = await axios.post("/api/product/Create", Data);
    
    if (response) {
      toast.success("Sản phẩm đã được tạo thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi tạo sản phẩm .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tạo sản phẩm : " + error.message);
    throw error;
  }
};

const putEditProd = async (data) => {
  try {
    const response = await axios.put("/api/product/Update", data);
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
    const response = await axios.delete(`/api/product/Delete?id=${id}`);
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
  getCatByID, getUnitByID, getProductByID,fetchAllCats, fetchAllUnits
};
