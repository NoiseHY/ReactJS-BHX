import axios from "../cuts_axio_users";
import { toast } from 'react-toastify';

const AddProductsToInvoiceDetails = async (request) => {
  try {
    const response = await axios.post("/api/Invoice/AddProductsToInvoiceDetails", request);
    
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

const GetCustomerDetailsByID = async (id) => {
  try {
    const response = await axios.get(`/api/Invoice/GetCustomerDetailsByID/${id}`);
    if (response) {
      toast.success("Danh sách đã được tải thành công!");
    } else {
      toast.error("Không có dữ liệu .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải danh sách sản phẩm: " + error.message);
    throw error;
  }
}

export {AddProductsToInvoiceDetails, GetCustomerDetailsByID}