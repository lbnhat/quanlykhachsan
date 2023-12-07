import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { Space, Table,Button, Image } from "antd";

function Room({ rooms, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <Button type="primary">Đặt Ngay</Button>
          </Space>
        ),
      },
  ];

  return (
    <div>
      <h2>Danh sách phòng</h2>
      <div>
        <Table dataSource={rooms} columns={columns} rowKey="id" />
      </div>
    </div>
  );
}

export default Room;
