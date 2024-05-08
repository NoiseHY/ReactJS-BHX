import axios from "./cust_axios"

const fetchAllUser = () => {
  return axios.get("/api/account/GetAll?pageNumber=1&pageSize=10")
}


export { fetchAllUser }