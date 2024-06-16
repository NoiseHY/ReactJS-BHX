import axios from "../cust_axios_admin";
import { toast } from 'react-toastify';

const fetchAllUnits = async () => {
  try {
    const response = await axios.get("/api/units/GetAllUnits");
    if (response) {
      // toast.success("Danh sách đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải danh sách : " + error.message);
    throw error;
  }
};

export {fetchAllUnits}