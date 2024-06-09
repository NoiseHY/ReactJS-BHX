import axios from "../cust_axios_admin";
import { toast } from 'react-toastify';

const createCartDetails = async (cartDetailData) => {
  try {
    const response = await axios.get("/api/cartDetails/Create", cartDetailData);
    if (response) {
      toast.success("Thêm sản phẩm thành công !");
    } else {
      toast.error("Lỗi thêm sản phẩm ");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi : " + error.message);
    throw error;
  }
};

export {createCartDetails}