import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  DatePicker,
  InputNumber,
  Button,
  message,
  Row,
  Col,
  Radio,
  Space,
  Table,
  Image,
} from "antd";
import "antd/dist/antd.css";
import Loader from "react-spinners/RingLoader";
import locale from "antd/lib/date-picker/locale/vi_VN";
import Room from "../components/Room2";

const { RangePicker } = DatePicker;
export default function QuanLyDatPhong() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [trangthai, setTrangThai] = useState("cho_xac_nhan");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Date Strings:", dateStrings);
    setSelectedDate(dates);
  };

  const handleNumberOfRoomsChange = (value) => {
     console.log("Number of Rooms:", value);
    setNumberOfRooms(value);
  };

  const handleBookRoom = () => {
    if (selectedDate && numberOfRooms > 0) {
      // Gửi thông tin đặt phòng đi hoặc xử lý theo logic của bạn
      message.success("Đặt phòng thành công!");
    } else {
      message.error("Vui lòng chọn ngày và số lượng phòng.");
    }
  };

  useEffect(async () => {
    try {
      setLoading(true);
      // const data = (
      //   await axios.post("https://hotelwebsite-backend.herokuapp.com/api/v1/getallrooms", {})
      // ).data.result;
      let data = [
        {
          ma_dat_phong: "001",
          thong_tin_khach_hang: {
            ten_khach_hang: "Lê Bá Nhật",
            sdt: "0968991331",
          },
          thong_tin_phong: {
            ma_phong: "A1",
            tang: "1",
            loai_phong: "Đơn",
            hang_phong: "VIP",
            gia: "100.000vnđ",
            tong_gia: "300.000vnđ",
          },
          thong_tin_dat_phong:{
            ngay_den:"09/12/2023",
            ngay_di:"12/12/2023",
            thoi_gian:3
          }
        },
      ];
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const onChange = (e) => {
    //console.log(`radio checked:${e.target.value}`);
    setTrangThai(e.target.value);
  };

  const columns = (e) => [
    {
      title: "Mã đặt phòng",
      dataIndex: "ma_dat_phong",
      key: "ma_dat_phong",
    },
    {
      title: "Thông tin khách hàng",
      dataIndex: "thong_tin_khach_hang",
      key: "thong_tin_khach_hang",
      render: (thong_tin_khach_hang) => (
        <div>
          <p>Tên: {thong_tin_khach_hang.ten_khach_hang}</p>
          <p>Điện thoại: {thong_tin_khach_hang.sdt}</p>
        </div>
      ),
    },
    {
      title: "Phòng",
      dataIndex: "thong_tin_phong",
      key: "thong_tin_phong",
      render: (thong_tin_phong) => (
        <div>
          <p>Mã phòng: {thong_tin_phong.ma_phong}</p>
          <p>Tầng : {thong_tin_phong.tang} - {thong_tin_phong.loai_phong} - {thong_tin_phong.hang_phong}</p>
          {/* <p>Loại phòng : {thong_tin_phong.loai_phong}</p> */}
          {/* <p>Hạng phòng : {thong_tin_phong.hang_phong}</p> */}
          <p>Giá : {thong_tin_phong.gia}</p>
          <p>Tổng giá : {thong_tin_phong.tong_gia}</p>
        </div>
      ),
    },
    {
      title: "Thông tin đặt phòng",
      dataIndex: "thong_tin_dat_phong",
      key: "thong_tin_dat_phong",
      render: (thong_tin_dat_phong) => (
        <div>
          <p>Ngày đến : {thong_tin_dat_phong.ngay_den}</p>
          <p>Ngày đi : {thong_tin_dat_phong.ngay_di}</p>
          <p>Thòi gian : {thong_tin_dat_phong.thoi_gian}</p>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {e === "cho_xac_nhan" && (
            <>
              <Space size="middle">
                <Button type="primary">Xác nhận đặt phòng</Button>
              </Space>
              <Space size="middle">
                <Button
                  type=""
                  style={{
                    background: "#d9d9d9",
                    borderColor: "#d9d9d9",
                    color: "rgba(0, 0, 0, 0.45)",
                  }}
                >
                  Hủy đặt phòng
                </Button>
              </Space>
            </>
          )}
          {e === "da_xac_nhan" && (
            <>
              <Space size="middle">
                <Button
                  type="primary"
                  style={{
                    background: "#4CAF50",
                    borderColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Xác nhận thanh toán
                </Button>
              </Space>
              <Space size="middle">
                <Button
                  type=""
                  style={{
                    background: "#d9d9d9",
                    borderColor: "#d9d9d9",
                    color: "rgba(0, 0, 0, 0.45)",
                  }}
                >
                  Hủy đặt phòng
                </Button>
              </Space>
            </>
          )}
          {/* Add more conditions as needed */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Row justify="left" align="middle" style={{ minHeight: "0" }}>
        <Col span={12}>
          <Row gutter={24}>
            <Col span={12}>
              <Radio.Group onChange={onChange} defaultValue="cho_xac_nhan">
                <Radio.Button value="cho_xac_nhan">Chờ xác nhận</Radio.Button>
                <Radio.Button value="da_xac_nhan">
                  Xác nhận thanh toán
                </Radio.Button>
                {/* <Radio.Button value="c">Đặt phòng</Radio.Button> */}
              </Radio.Group>
            </Col>
            <Col span={6}>
              <RangePicker locale={locale} onChange={handleDateChange} />
            </Col>
            <Col span={1}>
              <Button type="primary" onClick={handleBookRoom}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
          <br /> {/* Thêm dòng này để tạo khoảng cách */}
        </Col>
      </Row>

      {loading ? (
        <h1 className="text-center my-60">
          <Loader />
        </h1>
      ) : (
        <div className={"col-md-9 my-2"}>
          {/* <Room rooms={rooms} fromdate={fromdate} todate={todate} /> */}
          <Table dataSource={rooms} columns={columns(trangthai)} rowKey="id" />
        </div>
      )}
    </div>
  );
}
