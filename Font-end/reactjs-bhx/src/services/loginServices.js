import axios from "./cust_axios_admin";
import { toast } from "react-toastify";

const login = async (loginRequest) => {
  try {
    const response = await axios.post("api/login/login", loginRequest);

    if (response) {

      toast.success("Đăng nhập thành công");  

      const { idAuth, idCuts, Token } = response;

      // Lưu thông tin đăng nhập vào sessionStorage
      sessionStorage.setItem("idAuth", idAuth);
      sessionStorage.setItem("idCuts", idCuts);
      sessionStorage.setItem("Token", Token);

      if (idAuth === 1) {
        
        window.location.href = "/admin";
      } else {
        window.location.reload();
      }

      return { idAuth, idCuts, Token };
      
    } else {
      
      toast.error("Lỗi !");
      
    }
  } catch (error) {
    console.log("Đã xảy ra lỗi : " + error.message);
    throw error;
  }
}

export default login;