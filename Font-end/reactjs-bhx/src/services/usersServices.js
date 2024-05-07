import axios from "axios"

const fetchAllUser = () => {
  return axios.get("https://localhost:7118/api/InfoProduct/GetNewProductsAll?pageNumber=1&pageSize=10")
}

export { fetchAllUser }