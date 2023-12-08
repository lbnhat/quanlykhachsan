import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
const { TabPane } = Tabs;

export default function KhachHang() {
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
            ten_khach_hang: "Lê Bá Nhật",
            sdt: "0789963234",
            email: "lebanhat@gmail.com",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_khach_hang: "Lê Bá Nhật",
            sdt: "0789963234",
            email: "lebanhat@gmail.com",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_khach_hang: "Lê Bá Nhật",
            sdt: "0789963234",
            email: "lebanhat@gmail.com",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_khach_hang: "Lê Bá Nhật",
            sdt: "0789963234",
            email: "lebanhat@gmail.com",
            dia_chi: "46 xuân đán 1",
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
    const columns = [
      {
        title: "Tên khách hàng",
        dataIndex: "ten_khach_hang",
        key: "ten_khach_hang",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Địa chỉ",
        dataIndex: "dia_chi",
        key: "dia_chi",
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
          <h2>Danh sách khách hàng</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Thêm khách hàng
            </Button>
            <Modal
              title="Thêm khách hàng"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemKhachHang />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemKhachHang(props) {
    const [ten_khach_hang, setTenKhachHang] = useState("");
    const [sdt, setSoDienThoai] = useState();
    const [email, setEmail] = useState();
    const [dia_chi, setDiaChi] = useState();
  
    async function ThemKhachHang() {
      let newroom = {
        ten_khach_hang,
        sdt,
        email,
        dia_chi,
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
        if (
          ten_khach_hang === "" ||
          sdt === "" ||
          email === "" ||
          dia_chi === ""
        ) {
          newroom = null;
        }
  
        props.parentCallback(newroom);
        setTenKhachHang("");
        setSoDienThoai("");
        setEmail("");
        setDiaChi("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <input
          value={ten_khach_hang}
          onChange={(e) => {
            setTenKhachHang(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Tên khách hàng"
        />
        <input
          value={sdt}
          onChange={(e) => {
            setSoDienThoai(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Số điện thoại"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Email"
        />
        <input
          value={dia_chi}
          onChange={(e) => {
            setDiaChi(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Địa chỉ"
        />
      </div>
    );
  }

  