import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Room from "../components/Room2";
import Loader from "react-spinners/RingLoader";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Form,
  Input,
  Card,
  Modal,
} from "antd";
import "antd/dist/antd.css";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(async () => {
    try {
      setLoading(true);
      // const data = (
      //   await axios.post("https://hotelwebsite-backend.herokuapp.com/api/v1/getallrooms", {})
      // ).data.result;
      let data = [
        {
          so_phong: "A101",
          so_tang: "1",
          loai_phong: "Đơn",
          hang_phong: "VIP",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
        {
          so_phong: "A102",
          so_tang: "2",
          loai_phong: "Đôi",
          hang_phong: "VIP",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
        {
          so_phong: "A103",
          so_tang: "3",
          loai_phong: "đơn",
          hang_phong: "Bình thường",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
        {
          so_phong: "A104",
          so_tang: "4",
          loai_phong: "Đôi",
          hang_phong: "Bình thường",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
        {
          so_phong: "A105",
          so_tang: "1",
          loai_phong: "Đơn",
          hang_phong: "VIP",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
        {
          so_phong: "A106",
          so_tang: "1",
          loai_phong: "Đôi",
          hang_phong: "VIP",
          trang_thai: "Trống",
          hinh_anh: [
            "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
            "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
          ],
          gia_phong: "1.000.000vnd",
        },
      ];
      setRooms(data);
      setduplicaterooms(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);
  const onFinish = (values) => {
    // Gửi dữ liệu đặt phòng đến server hoặc xử lý theo nhu cầu của bạn
    console.log("Received values:", values);
    setIsModalVisible(true);
  };

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
      // message.success("Đặt phòng thành công!");
    } else {
      // message.error("Vui lòng chọn ngày và số lượng phòng.");
    }
  };


  return (
    <div className="container">
      <Card
        title="Tìm phòng khách sạn"
        style={{ width: "100%", margin: "auto" }}
      >
        <Form
          onFinish={onFinish}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={5} />
            <Col span={3}>
              <Form.Item
                label="Ngày nhận phòng"
                name="checkInDate"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày nhận phòng!" },
                ]}
              >
                <DatePicker placeholder="Chọn ngày" />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                label="Ngày trả phòng"
                name="checkOutDate"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày trả phòng!" },
                ]}
              >
                <DatePicker placeholder="Chọn ngày" />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item
                label="Người lớn"
                name="adults"
                rules={[
                  { required: true, message: "Vui lòng nhập số người lớn!" },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item
                label="Trẻ em"
                name="children"
                rules={[
                  { required: true, message: "Vui lòng nhập số trẻ em!" },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item label="   ">
                <Button type="primary" htmlType="submit">
                  Tìm phòng
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Col span={7} />
        </Form>
      </Card>
      <div className={"relative row justify-content-center mt-5"}>
        {loading ? (
          <h1 className="text-center my-60">
            <Loader />
          </h1>
        ) : (
          //rooms.map((room) => {
          // return (
          <div className={"col-md-9 my-2"}>
            <Room rooms={rooms} fromdate={fromdate} todate={todate} />
          </div>
          // );
          // })
        )}
       
      </div>
    </div>
  );
}

export default Homescreen;


