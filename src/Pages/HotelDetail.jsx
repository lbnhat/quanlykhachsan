import { unwrapResult } from "@reduxjs/toolkit";
import { Typography, Row, Col, Avatar, List, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import RoomCardItem from "../components/RoomCardItem/RoomCardItem";
import LocalStorage from "../constant/localStorage";
import HomeLayout from "../core/layout/HomeLayout";
import { searchRoomById } from "../slices/room.slice";
import Filter from "../components/Filter/Filter";
import styles from "../components/Filter/style.module.scss";
import { formatMoney } from "../utils/helper";
const HotelDetail = () => {
  const [roomFiltered, setRoomFiltered] = useState();
  const { id } = useParams();
  const filters = JSON.parse(localStorage.getItem(LocalStorage.filters));
  const dispatch = useDispatch();
  const { province_id, ...searchRoom } = filters;
  const [data_chon, setDataChon] = useState([
    {
      title: "Phòng số 1 - Tầng 1",
      price: 10000,
    },
    {
      title: "Phòng số 3 - Tầng 2",
      price: 20000,
    },
    {
      title: "Phòng số 4 - Tầng 1",
      price: 30000,
    },
    {
      title: "Phòng số 5 - Tầng 1",
      price: 40000,
    },
  ]);
  const [tong_gia, setTongGia] = useState(
    data_chon.reduce((sum, room) => sum + room.price, 0)
  );
  const params = {
    ...searchRoom,
    hotel_id: id,
  };
  useEffect(() => {
    const _getRoom = async () => {
      const _data = await dispatch(searchRoomById({ params }));
      const res = unwrapResult(_data);

      setRoomFiltered(res.data);
    };
    _getRoom();
  }, []);
  // const data_chon = [
  //   {
  //     title: "Phòng số 1 - Tầng 1",
  //     price: 10000,
  //   },
  //   {
  //     title: "Phòng số 3 - Tầng 2",
  //     price: 20000,
  //   },
  //   {
  //     title: "Phòng số 4 - Tầng 1",
  //     price: 30000,
  //   },
  //   {
  //     title: "Phòng số 5 - Tầng 1",
  //     price: 40000,
  //   },
  // ];
  const onDelete = (index) => {
    // Implement your logic to delete the item at the specified index
    const newData = [...data_chon];
    newData.splice(index, 1);
    setDataChon(newData);
    setTongGia(newData.reduce((sum, room) => sum + room.price, 0));
  };
  return (
    <HomeLayout>
      <Content className="max-w-6xl h-screen mx-auto mt-5">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>Danh sách các phòng</Typography.Title>
            {roomFiltered?.[0] &&
              roomFiltered.map((room) => (
                <RoomCardItem key={room.id} room={room} />
              ))}
          </Col>
          <Col span={6}>
            <Filter />
            <div className={styles.filterWrapper} style={{ marginTop: "10px" }}>
              <div className="py-3 flex items-center justify-between text-lg">
                <span className="text-xl">Danh sách chọn </span>
              </div>
              <br></br>
              <List
                itemLayout="horizontal"
                dataSource={data_chon}
                actions={[
                  <Button onClick={() => onDelete()} key="list-loadmore-delete">
                    Xóa
                  </Button>,
                ]}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://bizweb.dktcdn.net/100/153/764/products/giuong-ngu-hien-dai-72t.jpg?v=1691638130990`}
                        />
                      }
                      title={item.title}
                      description={<b>{formatMoney(item.price)} vnđ</b>}
                    />
                    <div>
                      <Button size="small" onClick={() => onDelete(index)}>
                        Xóa
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
              <div>-------------------------------------</div>
              <div>
                <b>Tổng tiền: {formatMoney(tong_gia)} vnđ</b>
              </div>
              <Button type="primary" className="my-8 h-10" htmlType="submit">
                Đi đến đặt phòng
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </HomeLayout>
  );
};

export default HotelDetail;
