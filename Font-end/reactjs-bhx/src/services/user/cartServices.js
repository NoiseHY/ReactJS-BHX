import axios from "../cuts_axio_users";
import { toast } from 'react-toastify';

const user_cartServices = async (id) => {
  try {
    const response = await axios.get("/api/Cart/GetAllDetailsProductsByID/" + id);
    if (response) {
      toast.success("Danh sách đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi : " + error.message);
    throw error;
  }
}

const AddMultipleProductsToCart = async (request) => {
  try {
    const response = await axios.post("/api/Cart/AddMultipleProductsToCart", request);

    if (response) {
      toast.success("Tạo hóa đơn thành công !");
    } else {
      toast.error("Đã xảy ra lỗi !.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi " + error.message);
    throw error;
  }
};

const AddProductToCart = async (request) => {
  const { idPro, num } = request;
  const idCuts = sessionStorage.getItem('idCuts');
  console.log(request);
  try {
    const encodedUrl = `/api/Cart/AddProductToCart?customerId=${encodeURIComponent(idCuts)}&productId=${encodeURIComponent(idPro)}&quantity=${encodeURIComponent(num)}`;

    const response = await axios.post(encodedUrl);

    if (response) {
      toast.success("Thêm thành công !");
    } else {
      toast.error("Đã xảy ra lỗi !.");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi !");
    throw error;
  }
};

const delDetails = async (id) => {
  try {
    const response = await axios.delete(`/api/cartDetails/Delete/` + id);
    // Kiểm tra dữ liệu và hiển thị toast tương ứng
    if (response) {
      toast.success("Xóa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi khi xóa .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa : " + error.message);
    throw error;
  }
};


export { user_cartServices, AddProductToCart, delDetails };