import http from "../utils/http";
export const bookingApi = {
  booking(data) {
    return http.post("/api/dat-phong/dat", data);
  },
  getPurchase(config) {
    return http.get("/api/dat-phong/khach-hang", config);
  },
  getPurchaseByStatus(config) {
    return http.get("/booking/hotel", config);
  },
  updateStatus(data) {
    return http.put("/booking/hotel", data);
  },
  getRevenue(config) {
    return http.get("/booking/hotel/revenue", config);
  },
  getDichVu(config) {
    return http.get("/api/dich-vu", config);
  },
};
