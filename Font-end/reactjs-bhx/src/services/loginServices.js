import axios from "./cust_axios_admin";
import { toast } from "react-toastify";

const login = async (loginRequest) => {
  try {
    const response = await axios.post("api/login/login", loginRequest);

    if (response) {
      toast.success("Đăng nhập thành công ");
      
      const { idAuth, idCuts, Token } = response;
      
      return { idAuth, idCuts, Token };
    }

  } catch (error) {
    console.log("Đã xảy ra lỗi : " + error.message);
    throw error;
  }
}

export default login;
