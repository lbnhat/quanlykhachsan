class Path {
  constructor() {
    this.home = "/";
    this.searchHotel = "/hotel/search";
    this.register = "/register";
    this.login = "/login";
    this.hotelDetail = "/hotel/:id";
    this.bookingDetail = "/booking/:id";
    this.registerMember = "/register-member";
    this.user = "/user";
    this.changePass = this.user + "/password";
    this.dashboard = "/dashboard";
    this.purchase = this.user + "/purchase";
    this.createRoom = this.dashboard + "/create-room";
    this.overview = this.dashboard + "/overview";
    this.hotelProfile = this.dashboard + "/hotel-profile";
    this.bookingManagement = this.dashboard + "/booking-management/hotel";
    this.notFound = "*";
    this.admin = "/admin";
  }
}
export const path = new Path();
