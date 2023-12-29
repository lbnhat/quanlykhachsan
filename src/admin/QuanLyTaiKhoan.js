import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
const { TabPane } = Tabs;
export default function QuanLyTaiKhoan() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [taiKhoan, setTaiKhoan] = useState();
    const [typeAction, setTypeAction] = useState();
    const [titleModal, setTitleModal] = useState();
    const [isModalClose, setIsModalClose] = useState(false);

  
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
    const showModal = (taiKhoan, action) => {
      if (action === "xem_chi_tiet") {
        setTitleModal("Xem chi tiết");
        setTaiKhoan(taiKhoan);
      } else if (action === "chinh_sua") {
        setTitleModal("Chỉnh sửa");
        setTaiKhoan(taiKhoan);
      } else if (action === "them_tai_khoan") {
        setTitleModal("Thêm tài khoản");
        setTaiKhoan({
          ma_tai_khoan: "",
          ten_ten_tai_khoan: "",
          mat_khau: "",
          vai_tro: "",
        });
      }
      setTypeAction(action);
      setIsModalClose(true);
    };
    const handleOk = () => {
      setIsModalClose(false);
      setTaiKhoan({
        ma_tai_khoan: "",
        ten_ten_tai_khoan: "",
        mat_khau: "",
        vai_tro: "",
      });
    };
    const handleCancel = () => {
      setIsModalClose(false);
      setTaiKhoan({
        ma_tai_khoan: "",
        ten_ten_tai_khoan: "",
        mat_khau: "",
        vai_tro: "",
      });
    };
  
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
        render: (_, taiKhoanTren1Dong) => (
          <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal(taiKhoanTren1Dong, "xem_chi_tiet");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(taiKhoanTren1Dong, "chinh_sua");
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
          <h2>Danh sách tài khoản</h2>
          <>
          <Button
            type="primary"
            onClick={() => {
              showModal(null, "them_tai_khoan");
            }}
          >
            Thêm tài khoản
            </Button>
            <Modal
              title="titleModal"
              visible={isModalClose}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ThemTaiKhoan taiKhoan={taiKhoan} typeAction={typeAction} />
            </Modal>
          </>
          <div>
            <Table dataSource={users} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
  export function ThemTaiKhoan(taiKhoanTuBang) {
    const [ten_tai_khoan, setTenTaiKhoan] = useState(taiKhoanTuBang.taiKhoan.ten_tai_khoan);
    const [mat_khau, setMatKhau] = useState(taiKhoanTuBang.taiKhoan.mat_khau);
    const [vai_tro, setVaiTro] = useState(taiKhoanTuBang.taiKhoan.vai_tro);
    const [disabledInput, setDisabledInput] = useState(false);

    useEffect(async () => {
      try {

        setTenTaiKhoan(taiKhoanTuBang.taiKhoan.ten_tai_khoan);
        setMatKhau(taiKhoanTuBang.taiKhoan.mat_khau);
        setVaiTro(taiKhoanTuBang.taiKhoan.vai_tro);
        if (taiKhoanTuBang.typeAction === "xem_chi_tiet") {
          setDisabledInput(true);
        } else {
          setDisabledInput(false);
        }
      } catch (error) {}
    }, [taiKhoanTuBang]);
    async function ThemTaiKhoan() {
      let newTaiKhoan = {
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
          newTaiKhoan = null;
        }
  
        taiKhoanTuBang.parentCallback(newTaiKhoan);
        setTenTaiKhoan("");
        setMatKhau("");
        setVaiTro("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <label htmlFor="ten_tai_khoan" style={{ fontWeight: "bold" }}>
        Tên tài khoản:
      </label>
        <input
          value={ten_tai_khoan}
          onChange={(e) => {
            setTenTaiKhoan(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Tên tài khoản"
        />
          <label htmlFor="mat_khau" style={{ fontWeight: "bold" }}>
        Mật khẩu
      </label>
        <input
          value={mat_khau}
          onChange={(e) => {
            setMatKhau(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Mật khẩu"
        />
          <label htmlFor="vai_tro" style={{ fontWeight: "bold" }}>
        Vai trò:
      </label>
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