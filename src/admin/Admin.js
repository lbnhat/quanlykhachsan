import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import QuanLyNhanVien from "./QuanLyNhanVien";
import QuanLyKhachHang from "./QuanLyKhachHang";
import QuanLyPhong from "./QuanLyPhong";
import QuanLyDichVu from "./QuanLyDichVu";
import QuanLyDatPhong from "./QuanLyDatPhong";
import QuanLyHoaDon from "./QuanLyHoaDon";
import QuanLyDoanhThu from "./QuanLyDoanhThu";
import QuanLyTaiKhoan from "./QuanLyTaiKhoan";
const { TabPane } = Tabs;
function Adminscreen() {
    useEffect(() => {
      const admin = localStorage.getItem("admin");
      console.log(admin);
      if (!admin) {
        window.location.href = "/home";
        return;
      }
    }, []);
  
    return (
      <div className="ml-3 mr-3 mt-3 bs">
        <h1 className="text-3xl text-center">Quản lý khách sạn</h1>
        <Tabs defaultActiveKey="1">
  
        <TabPane tab="Quản lý nhân viên" key="1">
            <QuanLyNhanVien />
          </TabPane>
          <TabPane tab="Quản lý khách hàng" key="2">
            <QuanLyKhachHang />
          </TabPane>
      
          <TabPane tab="Quản lý phòng" key="3">
            <QuanLyPhong />
          </TabPane>
          <TabPane tab="Quản lý dịch vụ" key="4">
            <QuanLyDichVu />
          </TabPane>
          <TabPane tab="Quản lý đặt phòng" key="5">
            <QuanLyDatPhong />
          </TabPane>
       
          {/* <TabPane tab="Add Room" key="3">
            <Addroom />
          </TabPane> */}
          <TabPane tab="Quản lý hóa đơn" key="6">
            <QuanLyHoaDon />
          </TabPane>
          <TabPane tab="Quản lý doanh thu" key="7">
            <QuanLyDoanhThu />
          </TabPane>
          <TabPane tab="Quản lý tài khoản" key="8">
            <QuanLyTaiKhoan />
          </TabPane>
        </Tabs>
      </div>
    );
  }
  
  export default Adminscreen;