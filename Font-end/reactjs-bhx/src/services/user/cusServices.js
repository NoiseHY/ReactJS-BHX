import axios from "../cuts_axio_users";
import { toast } from 'react-toastify';

const user_getCusServices = async () => {
  try {
    const response = await axios.get("/api/Customer/GetCustomerByID/1");
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

export {user_getCusServices}