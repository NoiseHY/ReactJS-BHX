import axios from "../cuts_axio_users";
import { toast } from 'react-toastify';

const AddProductsToInvoiceDetails = async (request) => {
  try {
    const response = await axios.post("/api/Invoice/AddProductsToInvoiceDetails", request);

    if (response) {
      toast.success("Tạo hóa đơn thành công !");
      toast.success("Vui lòng kiểm tra thông tin nhận hàng !");
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

const GetInvoiceDetailsByID = async (id) => {
  try {
    const response = await axios.get(`/api/Invoice/GetInvoiceDetailsByID/${id}`);
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

const GetInvoicesByCustomerID = async (id) => {
  try {
    const response = await axios.get(`/api/Invoice/GetInvoicesByCustomerID/${id}`);
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

const GetLatestInvoiceID = async () => {
  try {
    const response = await axios.get("/api/Invoice/GetLatestInvoiceID");
    if (response) {
      // toast.success("Tải thành công!");
    } else {
      toast.error("Không có dữ liệu .");
    }
    return response;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải : " + error.message);
    throw error;
  }
}

export {
  AddProductsToInvoiceDetails, GetCustomerDetailsByID,
  GetInvoiceDetailsByID, GetInvoicesByCustomerID, GetLatestInvoiceID
}