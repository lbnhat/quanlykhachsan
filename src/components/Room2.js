import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { Space, Table,Button, Image, Modal } from "antd";

function Room({ rooms, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(rooms)
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
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (avatars) => (
        <div>
          {/* {avatars.map((avatar, index) => ( */}
            <Image key={0} width={50} src={avatars[0]} />
          {/* ))} */}
        </div>
      ),
    },
    {
        title: '',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => handleBooking(record)}>Đặt Ngay</Button>
          </Space>
        ),
      },
  ];
  const handleBooking = (record) => {
    // Perform the action you want when the button is clicked
    console.log('Booking button clicked for record:', record);
    setIsModalVisible(true)
    // You can open a modal, navigate to a new page, etc.
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <h2>Danh sách phòng</h2>
      <div>
        <Table dataSource={rooms} columns={columns} rowKey="id" />
        <Modal
          title="Chi tiết đặt phòng"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DatPhong />
        </Modal>
      </div>
    </div>
  );
}

export default Room;

export function DatPhong() {
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: null,
    adults: 1,
    children: 0,
    bookingDate: null,
    guestName: "",
    guestEmail: "",
    specialRequests: "",
  });

  const onFinish = (values) => {
    // Gửi dữ liệu đặt phòng đến server hoặc xử lý theo nhu cầu của bạn
    console.log("Received values:", values);
  };

  const handleInputChange = (name, value) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Hiển thị thông tin chi tiết ở đây */}
      <p>Ngày nhận phòng: 09/12/2023</p>
      <p>Ngày trả phòng:  12/12/2023</p>
      <p>Người lớn: 1</p>
      <p>Trẻ em: 1</p>
      <p>Họ và tên: Lê Bá Nhật</p>
      <p>Số điện thoại: 012345678</p>
      <p>Email: nhat@gmail.com</p>
      <p>Yêu cầu đặc biệt: Xe máy</p>
    </div>
  );
}