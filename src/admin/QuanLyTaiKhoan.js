import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;
export default function QuanLyTaiKhoan() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
  
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
            ten_tai_khoan: "Adminlebanhat1",
            mat_khau: "123123123",
            vai_tro: "Admink",
          },
          {
            ten_tai_khoan: "Nhanvienlebanhat1",
            mat_khau: "123123123",
            vai_tro: "Nhân viên",
          },
          {
            ten_tai_khoan: "Khachhanglebanhat1",
            mat_khau: "123123123",
            vai_tro: "Khách hàng",
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
        title: "Tên tài khoản",
        dataIndex: "ten_tai_khoan",
        key: "ten_tai_khoan",
      },
      {
        title: "Mật khẩu",
        dataIndex: "mat_khau",
        key: "mat_khau",
      },
      {
        title: "Vai trò",
        dataIndex: "vai_tro",
        key: "vai_tro",
      },
  
      {
        title: "",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary">Chỉnh sữa</Button>
          </Space>
        ),
      },
    ];
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách tài khoản</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Thêm tài khoản
            </Button>
            <Modal
              title="Thêm tài khoản"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemTaiKhoan />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemTaiKhoan(props) {
    const [ten_tai_khoan, setTenTaiKhoan] = useState("");
    const [mat_khau, setMatKhau] = useState();
    const [vai_tro, setVaiTro] = useState();
  
    async function ThemTaiKhoan() {
      let newroom = {
        ten_tai_khoan,
        mat_khau,
        vai_tro,
      };
  
      try {
        // const admin = localStorage.getItem('admin');
        // if (admin) {
        //   window.location.href = "/home";
        //   return;
        // }
        // const result = await (
        //   await axios.post(
        //     "https://hotelwebsite-backend.herokuapp.com/api/v1/addroom",
        //     newroom
        //   )
        // ).data;
        if (ten_tai_khoan === "" || mat_khau === "" || vai_tro === "") {
          newroom = null;
        }
  
        props.parentCallback(newroom);
        setTenTaiKhoan("");
        setMatKhau("");
        setVaiTro("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <input
          value={ten_tai_khoan}
          onChange={(e) => {
            setTenTaiKhoan(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Tên tài khoản"
        />
        <input
          value={mat_khau}
          onChange={(e) => {
            setMatKhau(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Mật khẩu"
        />
        <input
          value={vai_tro}
          onChange={(e) => {
            setVaiTro(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Vai trò"
        />
      </div>
    );
  }