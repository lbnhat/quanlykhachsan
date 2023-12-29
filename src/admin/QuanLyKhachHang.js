import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getKhachHang, getRooms } from "../services/api";
const { TabPane } = Tabs;

export default function QuanLyKhachHang() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [khachHangmoi, setKhachHangMoi] = useState();
    const [typeAction, setTypeAction] = useState();
    const [titleModal, setTitleModal] = useState();
    const [duplicateKhachHang, setduplicateKhachHang] = useState();
  
    useEffect(async () => {
      try {
        // const admin = localStorage.getItem('admin');
        // if (admin) {
        //   window.location.href = "/home";
        //   return;
        // }
  
        const data = await (
          await axios.get(
            "http://localhost:8888/api/khach-hang"
          )
        ).data.data;
        // let data = [
        //   {
        //     id_khach_hang:"01",
        //     ten_khach_hang: "Lê Bá Nhật",
        //     gioi_tinh:"Nam",
        //     so_cmnd:"84232839",
        //     sdt: "0789963234",
        //     email: "lebanhat@gmail.com",
        //     dia_chi: "46 xuân đán 1",
        //   },
        //   {
        //     id_khach_hang:"02",
        //     ten_khach_hang: "Lê Bá Nhật",
        //     gioi_tinh:"Nam",
        //     so_cmnd:"84232839",
        //     sdt: "0789963234",
        //     email: "lebanhat@gmail.com",
        //     dia_chi: "46 xuân đán 1",
        //   },
        //   {
        //     id_khach_hang:"03",
        //     ten_khach_hang: "Lê Bá Nhật",
        //     gioi_tinh:"Nam",
        //     so_cmnd:"84232839",
        //     sdt: "0789963234",
        //     email: "lebanhat@gmail.com",
        //     dia_chi: "46 xuân đán 1",
        //   },
        //   {
        //     id_khach_hang:"04",
        //     ten_khach_hang: "Lê Bá Nhật",
        //     gioi_tinh:"Nam",
        //     so_cmnd:"84232839",
        //     sdt: "0789963234",
        //     email: "lebanhat@gmail.com",
        //     dia_chi: "46 xuân đán 1",
        //   },
        // ];
  
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    }, [])
  
    const [isModalClose, setIsModalClose] = useState(false);
    const showModal = (khachHangmoi, action) => {
      if (action === "xem_chi_tiet") {
        setTitleModal("Xem chi tiết");
        setKhachHangMoi(khachHangmoi);
      } else if (action === "chinh_sua") {
        setTitleModal("Chỉnh sửa");
        setKhachHangMoi(khachHangmoi);
      } else if (action === "them_khach_hang") {
        setTitleModal("Thêm khách hàng");
        setKhachHangMoi({
          id_khach_hang: "",
          gioi_tinh:"",
          so_cmnd:"",
          ten_khach_hang: "",
          sdt: "",
          email: "",
          dia_chi: "",
        });
      }
      setTypeAction(action);
      setIsModalClose(true);
    };
      const handleOk = () => {
        setIsModalClose(false);
        setKhachHangMoi({
        id_khach_hang: "",
        ten_khach_hang: "",
        gioi_tinh:"",
          so_cmnd:"",
        sdt: "",
        email: "",
        dia_chi: "",
        });
    };
    const handleCancel = () => {
      setIsModalClose(false);
      setKhachHangMoi({
        id_khach_hang: "",
        ten_khach_hang: "",
        gioi_tinh:"",
          so_cmnd:"",
        sdt: "",
        email: "",
        dia_chi: "",
      })
    };
    const columns = [
      {
        title: "Tên khách hàng",
        dataIndex: "ten_khach_hang",
        key: "ten_khach_hang",
      },
      {
        title: "Giới tính",
        dataIndex: "gioi_tinh",
        key: "gioi_tinh",
      },
      {
        title: "Số CMND",
        dataIndex: "so_cmnd",
        key: "so_cmnd",
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
        render: (_, khachHangTren1Dong) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                showModal(khachHangTren1Dong, "xem_chi_tiet");
              }}
            >
              Xem chi tiết
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showModal(khachHangTren1Dong, "chinh_sua");
              }}
            >
              Chỉnh sữa
            </Button>
            <Button
            type="primary"
            onClick={() => {
              showModal(khachHangTren1Dong, "xoa");
            }}
          >
            Xóa
          </Button>
          </Space>
        ),
      },
    ];
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách khách hàng</h2>
          <>
          <Button
            type="primary"
            onClick={() => {
              showModal(null, "them_khach_hang");
            }}
          >
            Thêm khách hàng
          </Button>
            <Modal
            title={titleModal}
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <KhachHangMoi khachHangmoi={khachHangmoi} typeAction={typeAction} />
          </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function KhachHangMoi(khachHangTuBang) {
    const [id_khach_hang, setMaKhachHang] = useState(khachHangTuBang.khachHangmoi.id_khach_hang);
    const [ten_khach_hang, setTenKhachHang] = useState(khachHangTuBang.khachHangmoi.ten_khach_hang);
    const [gioi_tinh, setGioiTinh] = useState(khachHangTuBang.khachHangmoi.gioi_tinh);
    const [so_cmnd, setSoChungMinhNhanDan] = useState(khachHangTuBang.khachHangmoi.so_cmnd);
    const [sdt, setSoDienThoai] = useState(khachHangTuBang.khachHangmoi.sdt);
    const [email, setEmail] = useState(khachHangTuBang.khachHangmoi.email);
    const [dia_chi, setDiaChi] = useState(khachHangTuBang.khachHangmoi.dia_chi);
    const [disabledInput, setDisabledInput] = useState(false);

    useEffect(async () => {
      try {
        setMaKhachHang(khachHangTuBang.khachHangmoi.id_khach_hang);
        setTenKhachHang(khachHangTuBang.khachHangmoi.ten_khach_hang);
        setGioiTinh(khachHangTuBang.khachHangmoi.gioi_tinh);
        setSoChungMinhNhanDan(khachHangTuBang.khachHangmoi.so_cmnd);
        setSoDienThoai(khachHangTuBang.khachHangmoi.sdt);
        setEmail(khachHangTuBang.khachHangmoi.email);
        setDiaChi(khachHangTuBang.khachHangmoi.dia_chi);
        if (khachHangTuBang.typeAction === "xem_chi_tiet") {
          setDisabledInput(true);
        } else {
          setDisabledInput(false);
        }
      } catch (error) {}
    }, [khachHangTuBang]);
  
    async function ThemKhachHang() {
      let newKhachHang = {
        ten_khach_hang,
        gioi_tinh,
        so_cmnd,
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
          gioi_tinh === "" ||
          so_cmnd === "" ||
          sdt === "" ||
          email === "" ||
          dia_chi === ""
        ) {
          newKhachHang = null;
        }
  
        khachHangTuBang.parentCallback(newKhachHang);
        setTenKhachHang("");
        setGioiTinh("");
        setSoChungMinhNhanDan("");
        setSoDienThoai("");
        setEmail("");
        setDiaChi("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
            <label htmlFor="ten_khach_hang" style={{ fontWeight: "bold" }}>
        Tên khách hàng:
      </label>
        <input
          value={ten_khach_hang}
          onChange={(e) => {
            setTenKhachHang(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Tên khách hàng"
        />
         <label htmlFor="gioi_tinh" style={{ fontWeight: "bold" }}>
        Giới tính:
      </label>
        <input
          value={gioi_tinh}
          onChange={(e) => {
            setGioiTinh(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Giới tính"
        />
         <label htmlFor="sdt" style={{ fontWeight: "bold" }}>
        Số CMND:
      </label>
        <input
          value={so_cmnd}
          onChange={(e) => {
            setSoChungMinhNhanDan(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Số CMND"
        />
              <label htmlFor="sdt" style={{ fontWeight: "bold" }}>
        Số điện thoại:
      </label>
        <input
          value={sdt}
          onChange={(e) => {
            setSoDienThoai(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Số điện thoại"
        />
         <label htmlFor="email" style={{ fontWeight: "bold" }}>
        Email:
      </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Email"
        />
         <label htmlFor="dia_chi" style={{ fontWeight: "bold" }}>
        Địa chỉ:
      </label>
        <input
          value={dia_chi}
          onChange={(e) => {
            setDiaChi(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Địa chỉ"
        />
      </div>
    );
  }

  