// 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import QuanLyNhanVien from "./QuanLyNhanVien";
import QuanLyKhachHang from "./QuanLyKhachHang";
import QuanLyPhong from "./QuanLyPhong";
import QuanLyDichVu from "./QuanLyDichVu";
import QuanLyDatPhong from "./QuanLyDatPhong";
import QuanLyHoaDon from "./QuanLyHoaDon";
import QuanLyDoanhThu from "./QuanLyDoanhThu";
import QuanLyTaiKhoan from "./QuanLyTaiKhoan";
import 'antd/dist/antd.css'; 
const { TabPane } = Tabs;

function Adminscreen() {
  const profile = useSelector((state) => state.auth.profile);
  const roleId = profile?.user?.roleId;
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
      window.location.href = "/";
      return;
    }
  }, [activeTabKey]);

  const customTabsStyle = {
    display: 'flex',
    justifyContent: 'normal', // You can replace 'normal' with other valid values
  };

  const commonTabs = [
    { key: "1", title: "Quản lý đặt phòng", component: <QuanLyDatPhong /> },
    { key: "2", title: "Quản lý hóa đơn", component: <QuanLyHoaDon /> },
    { key: "3", title: "Quản lý doanh thu", component: <QuanLyDoanhThu /> },
    { key: "4", title: "Quản lý nhân viên", component: <QuanLyNhanVien /> },
    { key: "5", title: "Quản lý khách hàng", component: <QuanLyKhachHang /> },
    { key: "6", title: "Quản lý phòng", component: <QuanLyPhong /> },
    { key: "7", title: "Quản lý dịch vụ", component: <QuanLyDichVu /> },
    { key: "8", title: "Quản lý tài khoản", component: <QuanLyTaiKhoan /> },
  ];

  const tabsToRender = roleId === 3 ? commonTabs : commonTabs.slice(0, 2);

  const renderTabs = () => {
    return tabsToRender.map((tab) => (
      <TabPane tab={tab.title} key={tab.key} forceRender={true}>
        {activeTabKey === tab.key && tab.component}
      </TabPane>
    ));
  };

  return (
    <div className="ml-3 mr-3 mt-3 bs">
      <h1 className="text-3xl text-center">Quản lý khách sạn</h1>
      <Tabs
        className="custom-tabs"
        defaultActiveKey="1"
        activeKey={activeTabKey}
        onChange={handleTabChange}
      >
        {renderTabs()}
      </Tabs>
    </div>
  );
}

export default Adminscreen;
