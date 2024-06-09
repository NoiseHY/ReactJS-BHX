import axios from "../cuts_axio_users";
import { toast } from 'react-toastify';

const user_cartServices = async () => {
  try {
    const response = await axios.get("/api/Cart/GetAllByID/1");
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

export {user_cartServices};