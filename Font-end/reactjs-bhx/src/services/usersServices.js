import axios from "./cust_axios"

const fetchAllUser = () => {
  return axios.get("/api/account/GetAll?pageNumber=1&pageSize=10")
}

const postCreateUser = (userData) => {
  return axios.post("/api/account/Create", userData);
}

const putEditUser = (userData) => {
  return axios.put("/api/account/Update", userData);
}

const delUser = (id) => {
  return axios.delete(`/api/account/Delete/${id}`);
};

export { fetchAllUser, postCreateUser, putEditUser, delUser }