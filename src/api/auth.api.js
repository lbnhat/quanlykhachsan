import http from "../utils/http";

const authApi = {
  register(data) {
    return http.post("user/register", data);
  },
  login(data) {
    return http.post("api/nhan-vien/login", data);
  },
  registerMember(data) {
    return http.post("user/manager", data);
  },
  updateProfile(data) {
    return http.put("user", data);
  },
  changePass(data) {
    return http.put("user/pass", data);
  },
  logout() {
    return;
  },
};

export default authApi;
