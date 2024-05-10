import axios from "./cuts_axio_users";
import { toast } from "react-toastify";

const fetchProductsNew = async () => {
  try {
    const response = await axios.get("/api/InfoProduct/GetNewProducts");
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
}

export  {fetchProductsNew};