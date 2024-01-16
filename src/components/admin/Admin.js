import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
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
  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };
  useEffect(() => {
    console.log(
      `Tab ${activeTabKey} is active. Call API or perform necessary tasks.`
    );
    const admin = localStorage.getItem("admin");
    console.log(admin);
    if (!admin) {
      window.location.href = "/home";
      return;
    }
  }, [activeTabKey]);

  return (
    <div className="ml-3 mr-3 mt-3 bs">
      <h1 className="text-3xl text-center">Quản lý khách sạn</h1>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTabKey}
        onChange={handleTabChange}
      >
        <TabPane tab="Quản lý đặt phòng" key="1" forceRender={true}>
          {activeTabKey === "1" && <QuanLyDatPhong />}
        </TabPane>
        <TabPane tab="Quản lý hóa đơn" key="2" forceRender={true}>
          {/* <QuanLyHoaDon /> */}
          {activeTabKey === "2" && <QuanLyHoaDon />}
        </TabPane>
        <TabPane tab="Quản lý nhân viên" key="3">
          <QuanLyNhanVien />
        </TabPane>
        <TabPane tab="Quản lý khách hàng" key="4">
          <QuanLyKhachHang />
        </TabPane>

        <TabPane tab="Quản lý phòng" key="5">
          <QuanLyPhong />
        </TabPane>
        <TabPane tab="Quản lý dịch vụ" key="6">
          <QuanLyDichVu />
        </TabPane>
        {/* <TabPane tab="Add Room" key="3">
            <Addroom />
          </TabPane> */}

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
