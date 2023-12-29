import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
const { TabPane } = Tabs;
export default function QuanLyHoaDon() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [hoaDon, setHoaDon] = useState();
    const [typeAction, setTypeAction] = useState();
    const [titleModal, setTitleModal] = useState();
    const [isModalClose, setIsModalClose] = useState(false);
  
    useEffect(async () => {
      try {
        const data = await (
          await axios.get(
            "http://localhost:8888/api/hoa-don"
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
        //     id_hoa_don: "001",
        //     khach_hang: "Lê Bá Nhật0",
        //     sdt: "0789963234",
        //     ngay_tao: "12/02/2023",
        //     nguoi_lap_phieu: "Nhật2",
        //     tong_tien: "1.000.000vnd",
        //   },
        //   {
        //     id_hoa_don: "002",
        //     khach_hang: "Lê Bá Nhật1",
        //     sdt: "0789963234",
        //     ngay_tao: "12/02/2023",
        //     nguoi_lap_phieu: "Nhật2",
        //     tong_tien:"1.000.000vnd",
        //   },
        //   {
        //     id_hoa_don: "003",
        //     khach_hang: "Lê Bá Nhật2",
        //     sdt: "0789963234",
        //     ngay_tao: "12/02/2023",
        //     nguoi_lap_phieu: "Nhật2",
        //     tong_tien:"1.000.000vnd",
        //   },
        //   {
        //     id_hoa_don: "004",
        //     khach_hang: "Lê Bá Nhật3",
        //     sdt: "0789963234",
        //     ngay_tao: "12/02/2023",
        //     nguoi_lap_phieu: "Nhật2",
        //     tong_tien:"1.000.000vnd",
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

    const showModal = (hoaDon, action) => {
      if (action === "xem_chi_tiet") {
        setTitleModal("Xem chi tiết");
        setHoaDon(hoaDon);
      } else if (action === "chinh_sua") {
        setTitleModal("Chỉnh sửa");
        setHoaDon(hoaDon);
      } else if (action === "tao_hoa_don") {
        setTitleModal("Tạo hóa đơn");
        setHoaDon({
          id_hoa_don: "",
          khach_hang: "",
          sdt: "",
          ngay_tao: "",
          nguoi_lap_phieu: "",
          tong_tien: "",
        });
      }
      setTypeAction(action);
      setIsModalClose(true);
    };
    const handleOk = () => {
      setIsModalClose(false);
      setHoaDon({
        id_hoa_don: "",
        khach_hang: "",
        sdt: "",
        ngay_tao: "",
        nguoi_lap_phieu: "",
        tong_tien: "",
      });
    };
    const handleCancel = () => {
      setIsModalClose(false);
      setHoaDon({
        id_hoa_don: "",
        khach_hang: "",
        sdt: "",
        ngay_tao: "",
        nguoi_lap_phieu: "",
        tong_tien: "",
      });
    };
  
    const columns = [
      {
        title: "Mã hóa đơn",
        dataIndex: "id_hoa_don",
        key: "id_hoa_don",
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
        title: "Người lập phiếu",
        dataIndex: "nguoi_lap_phieu",
        key: "nguoi_lap_phieu",
      },
      {
        title: "Tổng tiền",
        dataIndex: "tong_tien",
        key: "tong_tien",
      },
      {
        title: "",
        key: "action",
        render: (_, hoadonTren1Dong) => (
          <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal(hoadonTren1Dong, "xem_chi_tiet");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(hoadonTren1Dong, "chinh_sua");
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
          <h2>Danh sách hóa đơn</h2>
          <>
            <Button type="primary" onClick={showModal}>
              Tạo hóa đơn
              </Button>
          <Modal
            title={titleModal}
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <HoaDon hoaDon={hoaDon} typeAction={typeAction} />
          </Modal>
        </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function HoaDon(hoaDonTuBang) {
    const [id_hoa_don, setMaHoaDon] = useState(hoaDonTuBang.hoaDon.id_hoa_don);
    const [khach_hang, setKhachHang] = useState( hoaDonTuBang.hoaDon.khach_hang );
    const [sdt, setSoDienThoai] = useState(hoaDonTuBang.hoaDon.sdt);
    const [ngay_tao, setNgayTao] = useState(hoaDonTuBang.hoaDon.ngay_tao);
    const [nguoi_lap_phieu, setNguoiLapPhieu] = useState(hoaDonTuBang.hoaDon.nguoi_lap_phieu);
    const [tong_tien, setTongTien] = useState(hoaDonTuBang.hoaDon.tong_tien);
    const [disabledInput, setDisabledInput] = useState(false);
  
    useEffect(async () => {
      try {
        setMaHoaDon(hoaDonTuBang.hoaDon.id_hoa_don);
        setKhachHang(hoaDonTuBang.hoaDon.khach_hang);
        setSoDienThoai(hoaDonTuBang.hoaDon.sdt);
        setNgayTao(hoaDonTuBang.hoaDon.ngay_tao);
        setNguoiLapPhieu(hoaDonTuBang.hoaDon.nguoi_lap_phieu);
        setTongTien(hoaDonTuBang.hoaDon.tong_tien);
        if (hoaDonTuBang.typeAction === "xem_chi_tiet") {
          setDisabledInput(true);
        } else {
          setDisabledInput(false);
        }
      } catch (error) {}
    }, [hoaDonTuBang]);
   
    async function TaoHoaDon() {
      let newHoaDon = {
        id_hoa_don,
        khach_hang,
        sdt,
        ngay_tao,
        nguoi_lap_phieu,
        tong_tien,
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
          id_hoa_don === "" ||
          khach_hang === "" ||
          sdt === "" ||
          ngay_tao === "" ||
          nguoi_lap_phieu === "" ||
          tong_tien === "" 
        ) {
          newHoaDon = null;
        }
  
        hoaDonTuBang.parentCallback(newHoaDon);
        setMaHoaDon("");
        setKhachHang("");
        setSoDienThoai("");
        setNgayTao("");
        setNgayTao("");
        setTongTien("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <label htmlFor="id_hoa_don" style={{ fontWeight: "bold" }}>
         Mã hóa đơn:
        </label>
        <input
          value={id_hoa_don}
          onChange={(e) => {
            setMaHoaDon(e.target.value);
          }}
          type="text"
          disabled={disabledInput}
          className="form-control my-1"
          placeholder="Nhập hóa đơn"
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
          placeholder="Nhập số điện thoại"
        />
        <label htmlFor="khach_hang" style={{ fontWeight: "bold" }}>
          Khách hàng:
        </label>
        <input
          value={khach_hang}
          onChange={(e) => {
            setKhachHang(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Nhập khách hàng"
        />
        <label htmlFor="ngay_tao" style={{ fontWeight: "bold" }}>
          Ngày tạo:
        </label>
        <input
          value={ngay_tao}
          onChange={(e) => {
            setNgayTao(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Nhập ngày tạo"
        />
                <label htmlFor="nguoi_lap_phieu" style={{ fontWeight: "bold" }}>
          Người lập phiếu:
        </label>
        <input
          value={nguoi_lap_phieu}
          onChange={(e) => {
            setNguoiLapPhieu(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Nhập người lập phiếu"
        />
                <label htmlFor="tong_tien" style={{ fontWeight: "bold" }}>
         Tổng tiền:
        </label>
        <input
          value={tong_tien}
          onChange={(e) => {
            setTongTien(e.target.value);
          }}
          disabled={disabledInput}
          type="text"
          className="form-control my-1"
          placeholder="Nhập tổng tiền"
        />
      </div>
    );
  }
  
  