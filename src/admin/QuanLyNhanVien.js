import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;
export default function QuanLyNhanVien() {
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
            ten_nhan_vien: "Lê Bá Nhật",
            sdt: "0789963234",
            chuc_vu: "Nhân viên",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_nhan_vien: "Lê Bá Nhật",
            sdt: "0789963234",
            chuc_vu: "Nhân viên",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_nhan_vien: "Lê Bá Nhật",
            sdt: "0789963234",
            chuc_vu: "Nhân viên",
            dia_chi: "46 xuân đán 1",
          },
          {
            ten_nhan_vien: "Lê Bá Nhật",
            sdt: "0789963234",
            chuc_vu: "Nhân viên",
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
        title: "Tên nhân viên",
        dataIndex: "ten_nhan_vien",
        key: "ten_nhan_vien",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "Chức vụ",
        dataIndex: "chuc_vu",
        key: "chuc_vu",
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
            <Button type="primary">Xem chi tiết</Button>
            <Button type="primary">Chỉnh sữa</Button>
          </Space>
        ),
      },
    ];
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách nhân viên</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Thêm nhân viên
            </Button>
            <Modal
              title="Thêm nhân viên"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemNhanVien />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemNhanVien(props) {
    const [ten_nhan_vien, setTenNhanVien] = useState("");
    const [sdt, setSoDienThoai] = useState();
    const [chuc_vu, setChucVu] = useState();
    const [dia_chi, setDiaChi] = useState();
  
    async function ThemNhanVien() {
      let newroom = {
        ten_nhan_vien,
        sdt,
        chuc_vu,
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
          ten_nhan_vien === "" ||
          sdt === "" ||
          chuc_vu === "" ||
          dia_chi === ""
        ) {
          newroom = null;
        }
  
        props.parentCallback(newroom);
        setTenNhanVien("");
        setSoDienThoai("");
        setChucVu("");
        setDiaChi("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <input
          value={ten_nhan_vien}
          onChange={(e) => {
            setTenNhanVien(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Tên nhân viên"
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
          value={chuc_vu}
          onChange={(e) => {
            setChucVu(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Chức vụ"
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