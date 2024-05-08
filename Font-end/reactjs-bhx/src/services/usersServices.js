import axios from "axios"

const fetchAllUser = () => {
  return axios.get("https://localhost:7117/api/account/GetAll?pageNumber=1&pageSize=10")
}

export { fetchAllUser }