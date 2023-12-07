import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;
export default function QuanLyHoaDon() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
  
    useEffect(async () => {
      try {
        // const admin = localStorage.getItem('admin');
        // if (admin) {
        //   window.location.href = "/home";
        //   return;
        // }
  
        // const data = await (
        //   await axios.post(
        //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
        //   )
        // ).data;
        let data = [
          {
            ma_hoa_don: "001",
            khach_hang: "Lê Bá Nhật0",
            sdt: "0789963234",
            ngay_tao: "12/02/2023",
            nguoi_lap: "Nhật2",
            tong_tien: 10000,
          },
          {
            ma_hoa_don: "002",
            khach_hang: "Lê Bá Nhật1",
            sdt: "0789963234",
            ngay_tao: "12/02/2023",
            nguoi_lap: "Nhật2",
            tong_tien: 10000,
          },
          {
            ma_hoa_don: "003",
            khach_hang: "Lê Bá Nhật2",
            sdt: "0789963234",
            ngay_tao: "12/02/2023",
            nguoi_lap: "Nhật2",
            tong_tien: 20000,
          },
          {
            ma_hoa_don: "004",
            khach_hang: "Lê Bá Nhật3",
            sdt: "0789963234",
            ngay_tao: "12/02/2023",
            nguoi_lap: "Nhật2",
            tong_tien: 10000,
          },
        ];
  
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    }, []);
  
    const columns = [
      {
        title: "Mã hóa đơn",
        dataIndex: "ma_hoa_don",
        key: "ma_hoa_don",
      },
      {
        title: "Ngày tạo",
        dataIndex: "ngay_tao",
        key: "ngay_tao",
      },
      {
        title: "Khách hàng",
        dataIndex: "khach_hang",
        key: "khach_hang",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "Người lập",
        dataIndex: "nguoi_lap",
        key: "nguoi_lap",
      },
      {
        title: "Tổng tiền",
        dataIndex: "tong_tien",
        key: "tong_tien",
      },
      {
        title: "",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary">Xem chi tiết</Button>
          </Space>
        ),
      },
    ];
    const [isModalClose, setIsModalClose] = useState(false);
    const showModal = () => {
      setIsModalClose(true);
    };
    const handleOk = () => {
      setIsModalClose(false);
    };
    const handleCancel = () => {
      setIsModalClose(false);
    };
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách hóa đơn</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Tạo hóa đơn
            </Button>
            {/* <Modal
              title="Tạo hóa đơn"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemNhanVien />
            </Modal> */}
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  