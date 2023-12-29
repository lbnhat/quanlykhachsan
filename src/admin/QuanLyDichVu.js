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
    const [dichVu, setDichVu] = useState();
    const [typeAction, setTypeAction] = useState();
    const [titleModal, setTitleModal] = useState();
  
    const [isModalClose, setIsModalClose] = useState(false);
    useEffect(async () => {
      try {

        
      const data = await (
        await axios.get(
          "http://localhost:8888/api/dich-vu"
        )
      ).data.data;
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
        // let data = [
        //   {
        //     id_dich_vu: "02",
        //     ten_dich_vu: "xe máy",
        //     so_luong: "1",
        //     gia_dich_vu: "100k",
        //   },
        //   {
        //     id_dich_vu: "02",
        //     ten_dich_vu: "Giặt ủi",
        //     so_luong: "1",
        //     gia_dich_vu: "100k",
        //   },
        //   {
        //     id_dich_vu: "02",
        //     ten_dich_vu: "ăn uống",
        //     so_luong: "1",
        //     gia_dich_vu: "100k",
        //   },
        // ];
  
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    }, []);

    
  const showModal = (dichVu, action) => {
    if (action === "xem_chi_tiet") {
      setTitleModal("Xem chi tiết");
      setDichVu(dichVu);
    } else if (action === "chinh_sua") {
      setTitleModal("Chỉnh sửa");
      setDichVu(dichVu);
    } else if (action === "them_dich_vu") {
      setTitleModal("Thêm dịch vụ");
      setDichVu({
        id_dich_vu: "",
        ten_dich_vu: "",
        so_luong: "",
        gia_dich_vu: "",
      });
    }
    setTypeAction(action);
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
    setDichVu({
      id_dich_vu: "",
      ten_dich_vu: "",
      so_luong: "",
      gia_dich_vu: "",
    });
  };
  const handleCancel = () => {
    setIsModalClose(false);
    setDichVu({
      id_dich_vu: "",
      ten_dich_vu: "",
      so_luong: "",
      gia_dich_vu: "",
    });
  };

  
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
        render: (_, dichVuTren1Dong) => (
          <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal(dichVuTren1Dong, "xem_chi_tiet");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(dichVuTren1Dong, "chinh_sua");
            }}
          >
            Chỉnh sữa
          </Button>
        </Space>
        ),
      },
    ];
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách dịch vụ</h2>
          <>
          <Button
            type="primary"
            onClick={() => {
              showModal(null, "them_dich_vu");
            }}
          >
            Thêm dịch vụ
          </Button>
          <Modal
            title={titleModal}
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
              <ThemDichVu dichVu={dichVu} typeAction={typeAction} />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemDichVu(dichVuTuBang) {
    const [id_dich_vu, setMaDichVu] = useState(dichVuTuBang.dichVu.id_dich_vu);
    const [ten_dich_vu, setTenDichVu] = useState(dichVuTuBang.dichVu.ten_dich_vu);
    const [so_luong, setSoLuong] = useState(dichVuTuBang.dichVu.so_luong);
    const [gia_dich_vu, setGiaDichVu] = useState(dichVuTuBang.dichVu.gia_dich_vu);
    const [disabledInput, setDisabledInput] = useState(false);

    
  useEffect(async () => {
    try {
      setMaDichVu(dichVuTuBang.dichVu.id_dich_vu);
      setTenDichVu(dichVuTuBang.dichVu.ten_dich_vu);
      setSoLuong(dichVuTuBang.dichVu.so_luong);
      setGiaDichVu(dichVuTuBang.dichVu.gia_dich_vu);
      if (dichVuTuBang.typeAction === "xem_chi_tiet") {
        setDisabledInput(true);
      } else {
        setDisabledInput(false);
      }
    } catch (error) {}
  }, [dichVuTuBang]);
  
    async function ThemDichvu() {
      let newDichVu = {
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
          newDichVu = null;
        }
  
        dichVuTuBang.parentCallback(newDichVu);
        setTenDichVu("");
        setSoLuong("");
        setGiaDichVu("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
           <label htmlFor="ten_dich_vu" style={{ fontWeight: "bold" }}>
        Tên dịch vụ:
      </label>
        <input
          value={ten_dich_vu}
          onChange={(e) => {
            setTenDichVu(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Tên dịch vụ"
        />
             <label htmlFor="so_luong" style={{ fontWeight: "bold" }}>
       Số lượng:
      </label>
        <input
          value={so_luong}
          onChange={(e) => {
            setSoLuong(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Số lượng"
        />
             <label htmlFor="gia_dich_vu" style={{ fontWeight: "bold" }}>
       Giá dịch vụ:
      </label>
        <input
          value={gia_dich_vu}
          onChange={(e) => {
            setGiaDichVu(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Giá dịch vụ"
        />
      </div>
    );
  }