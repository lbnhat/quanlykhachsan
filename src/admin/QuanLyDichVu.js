import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
const { TabPane } = Tabs;
export default function QuanLyDichVu() {
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
            ten_dich_vu: "xe máy",
            so_luong: "1",
            gia_dich_vu: "100k",
          },
          {
            ten_dich_vu: "Giặt ủi",
            so_luong: "1",
            gia_dich_vu: "100k",
          },
          {
            ten_dich_vu: "ăn uống",
            so_luong: "1",
            gia_dich_vu: "100k",
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
        title: "Tên Dịch vụ",
        dataIndex: "ten_dich_vu",
        key: "ten_dich_vu",
      },
      {
        title: "Số Lượng",
        dataIndex: "so_luong",
        key: "so_luong",
      },
      {
        title: "Giá dịch vụ",
        dataIndex: "gia_dich_vu",
        key: "gia_dich_vu",
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
          <h2>Danh sách dịch vụ</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Thêm dịch vụ
            </Button>
            <Modal
              title="Thêm dịch vụ"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemDichVu />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemDichVu(props) {
    const [ten_dich_vu, setTenDichVu] = useState("");
    const [so_luong, setSoLuong] = useState();
    const [gia_dich_vu, setGiaDichVu] = useState();
  
    async function ThemDichvu() {
      let newroom = {
        ten_dich_vu,
        so_luong,
        gia_dich_vu,
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
        if (ten_dich_vu === "" || so_luong === "" || gia_dich_vu === "") {
          newroom = null;
        }
  
        props.parentCallback(newroom);
        setTenDichVu("");
        setSoLuong("");
        setGiaDichVu("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <input
          value={ten_dich_vu}
          onChange={(e) => {
            setTenDichVu(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Tên dịch vụ"
        />
        <input
          value={so_luong}
          onChange={(e) => {
            setSoLuong(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Số lượng"
        />
        <input
          value={gia_dich_vu}
          onChange={(e) => {
            setGiaDichVu(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Giá dịch vụ"
        />
      </div>
    );
  }