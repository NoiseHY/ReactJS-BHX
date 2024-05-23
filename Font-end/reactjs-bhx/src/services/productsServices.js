import axios from "./cuts_axio_users";
import { toast } from "react-toastify";

const fetchProductsNew = async () => {
  try {
    const response = await axios.get("/api/InfoProduct/GetNewProducts");
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
}

const fetchGetBestViewProducts = async () => {
  try {
    const response = await axios.get("/api/InfoProduct/GetBestViewProducts");
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
}

const getProductByID = async (id) => {
  try {
    const response = await axios.get("/api/InfoProduct/GetProductByID?id=" + id);
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


export { fetchProductsNew, fetchGetBestViewProducts, getProductByID };