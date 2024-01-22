import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal,Form, Row, Col, Input, Switch  } from "antd";
import { formatDate, formatMoney } from "../../utils/helper";
const { TabPane } = Tabs;

export default function QuanLyPhong() {
  const [rooms, setRooms] = useState([]);
  const [duplicaterooms, setduplicaterooms] = useState();
  const [isAddRom, setAddRoom] = useState(false);
  const handleAddRoom = (e) => setAddRoom(e);
  const [phong, setPhong] = useState();
  const [typeAction, setTypeAction] = useState();
  const [titleModal, setTitleModal] = useState();
  const [isModalClose, setIsModalClose] = useState(false);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  // useEffect(async () => {
  //   setLoading(true);
  //   const fetchRooms = async () => {
  //     const data = await getRooms();
  //     setRooms(data);
  //   };

  //   fetchRooms();
  //   // try {
  //   // //   setRooms(data);
  //   // //   setduplicaterooms(data);
  //   // //   setLoading(false);
  //   // // } catch (error) {
  //   // //   setError(true);
  //   // //   console.log(error);
  //   // //   setLoading(false);
  //   // }
  // }, []);
  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:8888/api/phong")
      ).data.data;
      setRooms(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);
  const columns = [
    {
      title: "Số Phòng",
      dataIndex: "so_phong",
      key: "so_phong",
    },
    {
      title: "Số tầng",
      dataIndex: "so_tang",
      key: "so_tang",
    },
    {
      title: "Loại Phòng",
      dataIndex: "loai_phong",
      key: "loai_phong",
    },
    {
      title: "Hạng Phòng",
      dataIndex: "hang_phong",
      key: "hang_phong",
    },
    {
      title: "Giá Phòng",
      dataIndex: "gia_phong",
      key: "gia_phong",
      render: (gia_phong) => (
        <div>
          <p> {formatMoney(gia_phong)}vnđ</p>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, phongTren1Dong) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal(phongTren1Dong, "xem_chi_tiet");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              showModal(phongTren1Dong, "chinh_sua");
            }}
          >
            Chỉnh sửa
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = (phong, action) => {
    if (action === "xem_chi_tiet") {
      setTitleModal("Xem chi tiết");
      setPhong(phong);
    } else if (action === "chinh_sua") {
      setTitleModal("Chỉnh sửa");
      setPhong(phong);
    } else if (action === "them_phong") {
      setTitleModal("Thêm phòng");
      setPhong({
        ma_phong: "",
        so_phong: "",
        so_tang: "",
        loai_phong: "",
        hang_phong: "",
        trang_thai: "",
        gia_phong: "",
        hinh_anh: "",
      });
    }
    setTypeAction(action);
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
    setPhong({
      ma_phong: "",
      so_phong: "",
      so_tang: "",
      loai_phong: "",
      hang_phong: "",
      trang_thai: "",
      gia_phong: "",
      hinh_anh: "",
    });
  };
  const handleCancel = () => {
    setIsModalClose(false);
    setPhong({
      ma_phong: "",
      so_phong: "",
      so_tang: "",
      loai_phong: "",
      hang_phong: "",
      trang_thai: "",
      gia_phong: "",
      hinh_anh: "",
    });
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách phòng</h2>
        <>
          <Button
            type="primary"
            onClick={() => {
              showModal(null, "them_phong");
            }}
          >
            Thêm phòng
          </Button>
          <Modal
            title={titleModal}
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Phong phong={phong} typeAction={typeAction} />
          </Modal>
        </>
        <div>-------------------------</div>
        <h2>Danh sách phòng</h2>
        <div>
          <Table dataSource={rooms} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function Phong(phongTuBang) {
  const [ma_phong, setMaPhong] = useState(phongTuBang.phong.ma_phong);
  const [so_phong, setSoPhong] = useState(phongTuBang.phong.so_phong);
  const [loai_phong, setLoaiPhong] = useState(phongTuBang.phong.loai_phong);
  const [so_tang, setSoTang] = useState(phongTuBang.phong.so_tang);
  const [hang_phong, setHangPhong] = useState(phongTuBang.phong.hang_phong);
  const [trang_thai, setTrangThai] = useState(phongTuBang.phong.trang_thai);
  const [gia_phong, setGiaPhong] = useState(phongTuBang.phong.gia_phong);
  const [hinh_anh, setHinhAnh] = useState(phongTuBang.phong.hinh_anh);
  const [disabledInput, setDisabledInput] = useState(false);

  useEffect(async () => {
    try {
      setMaPhong(phongTuBang.phong.ma_phong);
      setSoPhong(phongTuBang.phong.so_phong);
      setLoaiPhong(phongTuBang.phong.loai_phong);
      setSoTang(phongTuBang.phong.so_tang);
      setHangPhong(phongTuBang.phong.hang_phong);
      setTrangThai(phongTuBang.phong.trang_thai);
      setGiaPhong(phongTuBang.phong.gia_phong);
      setHinhAnh(phongTuBang.phong.hinh_anh);
      if (phongTuBang.typeAction === "xem_chi_tiet") {
        setDisabledInput(true);
      } else {
        setDisabledInput(false);
      }
    } catch (error) {}
  }, [phongTuBang]);

  async function ThemPhong() {
    let newPhong = {
      so_phong,
      so_tang,
      loai_phong,
      hang_phong,
      trang_thai,
      gia_phong,
      hinh_anh,
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
        so_phong === "" ||
        so_tang === "" ||
        loai_phong === "" ||
        hang_phong === "" ||
        gia_phong === ""
      ) {
        newPhong = null;
      }

      phongTuBang.parentCallback(newPhong);
      setSoPhong("");
      setSoTang("");
      setLoaiPhong("");
      setHangPhong("");
      setTrangThai("");
      setGiaPhong("");
      setHinhAnh("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Số phòng">
            <Input
              value={so_phong}
              onChange={(e) => setSoPhong(e.target.value)}
              disabled={disabledInput}
              placeholder="Số phòng"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Số tầng">
            <Input
              value={so_tang}
              onChange={(e) => setSoTang(e.target.value)}
              disabled={disabledInput}
              placeholder="Số tầng"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Loại phòng">
            <Input
              value={loai_phong}
              onChange={(e) => setLoaiPhong(e.target.value)}
              disabled={disabledInput}
              placeholder="Loại phòng"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Hạng phòng">
            <Input
              value={hang_phong}
              onChange={(e) => setHangPhong(e.target.value)}
              disabled={disabledInput}
              placeholder="Hạng phòng"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Giá phòng">
            <Input
              value={gia_phong}
              onChange={(e) => setGiaPhong(e.target.value)}
              disabled={disabledInput}
              placeholder="Giá phòng"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Hình ảnh">
            <Input
              value={hinh_anh}
              onChange={(e) => setHinhAnh(e.target.value)}
              disabled={disabledInput}
              placeholder="Thêm link hình ảnh"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Switch để bật/tắt disabledInput */}
      {/* <Row>
        <Col span={24}>
          <Form.Item label="Bật/Tắt chỉ đọc">
            <Switch checked={disabledInput} onChange={(checked) => setDisabledInput(checked)} />
          </Form.Item>
        </Col>
      </Row> */}
    </Form>
  );
}
