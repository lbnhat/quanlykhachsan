import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Form, Input, Row, Col} from "antd";
import { formatDate, formatMoney } from "../../utils/helper";
export default function QuanLyHoaDon(activeTabKey) {
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
    }, [activeTabKey]);

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
        dataIndex: "ngay_lap_phieu",
        key: "ngay_tao",
        render: (ngay_lap_phieu) => (
          <div>
            <p>
              {formatDate(ngay_lap_phieu)}
            </p>
            {/* <p>Thời gian : {
           // thong_tin_phong&&thong_tin_phong.thoi_gian
            Math.floor((thong_tin_phong&&thong_tin_phong?.[0].ngay_den.getTime()- thong_tin_phong&&thong_tin_phong?.[0].ngay_tra_phong..getTime())/ (1000 * 3600 * 24))
            }</p> */}
          </div>
        ),
      },
      {
        title: "Khách hàng",
        dataIndex: "ten_khach_hang",
        key: "khach_hang",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "Người lập phiếu",
        dataIndex: "ten_nhan_vien",
        key: "nguoi_lap_phieu",
      },
      {
        title: "Tổng tiền",
        dataIndex: "tong_tien",
        key: "tong_tien",
        render: (tong_tien) => (
          // const gia_phong = thong_tin_tong_tien&&thong_tin_tong_tien.gia_phong || 0;
          // const gia_dich_vu = thong_tin_tong_tien&&thong_tin_tong_tien.gia_dich_vu || 0;
          // const tong_tien = thong_tin_tong_tien&&thong_tin_tong_tien.tong_tien || 0;
          <div>
            {/* <p>Giá phòng: {gia_phong}</p>
            <p>Giá dịch vụ : {gia_dich_vu}</p> */}
            <p> {formatMoney(tong_tien)}vnđ</p>
          </div>
        ),
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
          {/* <Button
            type="primary"
            onClick={() => {
              showModal(hoadonTren1Dong, "chinh_sua");
            }}
          >
            Chỉnh sửa
          </Button> */}
        </Space>
        ),
      },
    ];

    return (
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách hóa đơn</h2>
          <>
            {/* <Button type="primary" onClick={showModal}>
              Tạo hóa đơn
              </Button> */}
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
    const [form] = Form.useForm();
   // const disabledInput = false;
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
      <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Mã hóa đơn" name="maHoaDon">
            <Input
              disabled={disabledInput}
              placeholder="Nhập mã hóa đơn"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Số điện thoại" name="soDienThoai">
            <Input
              disabled={disabledInput}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Khách hàng" name="khachHang">
            <Input
              disabled={disabledInput}
              placeholder="Nhập khách hàng"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Ngày tạo" name="ngayTao">
            <Input
              disabled={disabledInput}
              placeholder="Nhập ngày tạo"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Người lập phiếu" name="nguoiLapPhieu">
            <Input
              disabled={disabledInput}
              placeholder="Nhập người lập phiếu"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tổng tiền" name="tongTien">
            <Input
              disabled={disabledInput}
              placeholder="Nhập tổng tiền"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    );
  }
  
  