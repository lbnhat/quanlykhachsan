import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import {getNhanVien, getRooms } from "../services/api";
const { TabPane } = Tabs;
export default function QuanLyNhanVien() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [nhanVien, setNhanVien] = useState();
  const [typeAction, setTypeAction] = useState();
  const [titleModal, setTitleModal] = useState();
  const [isModalClose, setIsModalClose] = useState(false);
  const [duplicateNhanVien, setduplicateNhanVien] = useState();

  useEffect(async () => {
    try {

      const data = await (
        await axios.get(
          "http://localhost:8888/api/nhan-vien"
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
      //     ma_nhan_vien: "01",
      //     ten_nhan_vien: "Lê Bá Nhật",
      //     gioi_tinh:"Nam",
      //     so_cmnd:"84232839",
      //     sdt: "0789963234",
      //     chuc_vu: "Nhân viên",
      //     dia_chi: "46 xuân đán 1",
      //   },
      //   {
      //     ma_nhan_vien: "02",
      //     ten_nhan_vien: "Lê Bá Nhật",
      //     gioi_tinh:"Nam",
      //     so_cmnd:"84232839",
      //     sdt: "0789963234",
      //     chuc_vu: "Nhân viên",
      //     dia_chi: "46 xuân đán 1",
      //   },
      //   {
      //     ma_nhan_vien: "03",
      //     ten_nhan_vien: "Lê Bá Nhật",
      //     gioi_tinh:"Nam",
      //     so_cmnd:"84232839",
      //     sdt: "0789963234",
      //     chuc_vu: "Nhân viên",
      //     dia_chi: "46 xuân đán 1",
      //   },
      //   {
      //     ma_nhan_vien: "04",
      //     ten_nhan_vien: "Lê Bá Nhật",
      //     gioi_tinh:"Nam",
      //     so_cmnd:"84232839",
      //     sdt: "0789963234",
      //     chuc_vu: "Nhân viên",
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
  }, []);


  const showModal = (nhanVien, action) => {
    if (action === "xem_chi_tiet") {
      setTitleModal("Xem chi tiết");
      setNhanVien(nhanVien);
    } else if (action === "chinh_sua") {
      setTitleModal("Chỉnh sửa");
      setNhanVien(nhanVien);
    } else if (action === "them_nhan_vien") {
      setTitleModal("Thêm nhân viên");
      setNhanVien({
        id_nhan_vien: "",
        ten_nhan_vien: "",
        gioi_tinh:"",
        so_cmnd:"",
        sdt: "",
        chuc_vu: "",
        dia_chi: "",
      });
    }
    setTypeAction(action);
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
    setNhanVien({
      id_nhan_vien: "",
      ten_nhan_vien: "",
      gioi_tinh:"",
      so_cmnd:"",
      sdt: "",
      chuc_vu: "",
      dia_chi: "",
      ngay_vao_lam: "",
    });
  };
  const handleCancel = () => {
    setIsModalClose(false);
    setNhanVien({
      id_nhan_vien: "",
      ten_nhan_vien: "",
      gioi_tinh:"",
      so_cmnd:"",
      sdt: "",
      chuc_vu: "",
      dia_chi: "",
      ngay_vao_lam: "",
    });
  };

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "ten_nhan_vien",
      key: "ten_nhan_vien",
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
      title: "Ngày vào làm",
      dataIndex: "ngay_vao_lam",
      key: "ngay_vao_lam",
    },
    {
      title: "",
      key: "action",
      render: (_, nhanVienTren1Dong) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal(nhanVienTren1Dong, "xem_chi_tiet");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(nhanVienTren1Dong, "chinh_sua");
            }}
          >
            Chỉnh sữa
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(nhanVienTren1Dong, "xoa");
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
        <h2>Danh sách nhân viên</h2>
        <>
          <Button
            type="primary"
            onClick={() => {
              showModal(null, "them_nhan_vien");
            }}
          >
            Thêm nhân viên
          </Button>
          <Modal
            title={titleModal}
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <NhanVien nhanVien={nhanVien} typeAction={typeAction} />
          </Modal>
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function NhanVien(nhanVienTuBang) {
  const [id_nhan_vien, setMaNhanVien] = useState(nhanVienTuBang.nhanVien.id_nhan_vien);
  const [ten_nhan_vien, setTenNhanVien] = useState( nhanVienTuBang.nhanVien.ten_nhan_vien );
  const [gioi_tinh, setGioiTinh] = useState( nhanVienTuBang.nhanVien.gioi_tinh );
  const [so_cmnd, setSoChungMinhNhanDan] = useState( nhanVienTuBang.nhanVien.so_cmnd );
  const [sdt, setSoDienThoai] = useState(nhanVienTuBang.nhanVien.sdt);
  const [chuc_vu, setChucVu] = useState(nhanVienTuBang.nhanVien.chuc_vu);
  const [dia_chi, setDiaChi] = useState(nhanVienTuBang.nhanVien.dia_chi);
  const [disabledInput, setDisabledInput] = useState(false);

  useEffect(async () => {
    try {
      setMaNhanVien(nhanVienTuBang.nhanVien.id_nhan_vien);
      setTenNhanVien(nhanVienTuBang.nhanVien.ten_nhan_vien);
      setGioiTinh(nhanVienTuBang.nhanVien.gioi_tinh);
      setSoChungMinhNhanDan(nhanVienTuBang.nhanVien.so_cmnd);
      setSoDienThoai(nhanVienTuBang.nhanVien.sdt);
      setChucVu(nhanVienTuBang.nhanVien.chuc_vu);
      setDiaChi(nhanVienTuBang.nhanVien.dia_chi);
      if (nhanVienTuBang.typeAction === "xem_chi_tiet") {
        setDisabledInput(true);
      } else {
        setDisabledInput(false);
      }
    } catch (error) {}
  }, [nhanVienTuBang]);
 
  async function ThemNhanVien() {
    let newNhanVien = {
      ten_nhan_vien,
      gioi_tinh,
      so_cmnd,
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
        gioi_tinh === "" ||
        so_cmnd === "" ||
        sdt === "" ||
        chuc_vu === "" ||
        dia_chi === ""
      ) {
        newNhanVien = null;
      }

      nhanVienTuBang.parentCallback(newNhanVien);
      setTenNhanVien("");
      setGioiTinh("");
      setSoChungMinhNhanDan("");
      setSoDienThoai("");
      setChucVu("");
      setDiaChi("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <label htmlFor="ten_nhan_vien" style={{ fontWeight: "bold" }}>
        Tên nhân viên:
      </label>
      <input
        value={ten_nhan_vien}
        onChange={(e) => {
          setTenNhanVien(e.target.value);
        }}
        type="text"
        disabled={disabledInput}
        className="form-control my-1"
        placeholder="Nhập tên nhân viên"
        
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
        placeholder="Nhập số điện thoại"
      />
      <label htmlFor="chuc_vu" style={{ fontWeight: "bold" }}>
        Chức vụ:
      </label>
      <input
        value={chuc_vu}
        onChange={(e) => {
          setChucVu(e.target.value);
        }}
        disabled={disabledInput}
        type="text"
        className="form-control my-1"
        placeholder="Nhập chức vụ"
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
        placeholder="Nhập địa chỉ"
      />
    </div>
  );
}
