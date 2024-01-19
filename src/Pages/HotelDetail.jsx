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
import { Link } from "react-router-dom";
const HotelDetail = () => {
  const [roomFiltered, setRoomFiltered] = useState();
  const { id } = useParams();
  const filters = JSON.parse(localStorage.getItem(LocalStorage.filters));
  const dispatch = useDispatch();
  const { ...searchRoom } = filters;
  const [data_chon, setDataChon] = useState([]);
  const [tong_gia, setTongGia] = useState(
    data_chon.reduce((sum, room) => sum + Number(room.gia_phong), 0)
  );
  const soNgay = filters.so_ngay;
  const params = {
    ...searchRoom,
    hotel_id: id,
  };
  useEffect(() => {
    const _getRoom = async () => {
      const _data = await dispatch(searchRoomById({ params }));
      const res = unwrapResult(_data);

      const checkout = JSON.parse(localStorage.getItem(LocalStorage.checkout));
      let _checkout = [];
      if (checkout != null) {
        _checkout = [...checkout];
      }
      const combinedData = res.data.map((item) => {
        const foundItem = _checkout.find(
          (room) => room.id_phong === item.id_phong
        );
        return {
          ...item,
          trang_thai: foundItem ? true : false,
        };
      });
      setRoomFiltered(combinedData);
      setDataChon(_checkout);
      setTongGia(
        _checkout.reduce((sum, room) => sum + Number(room.gia_phong)*soNgay, 0)
      );
    };
    _getRoom();
  }, []);
  const actionChon = (value) => {
    // Implement your logic to delete the item at the specified index
    const combinedData = roomFiltered.map((item) => {
      const foundItem = value.find((room) => room.id_phong === item.id_phong);
      return {
        ...item,
        trang_thai: foundItem ? true : false,
      };
    });
    setRoomFiltered(combinedData);
    setDataChon(value);
    setTongGia(value.reduce((sum, room) => sum + Number(room.gia_phong)*soNgay, 0));
  };
  const onDelete = (index) => {
    // Implement your logic to delete the item at the specified index
    const newData = [...data_chon];
    newData.splice(index, 1);
    setDataChon(newData);
    setTongGia(newData.reduce((sum, room) => sum + Number(room.gia_phong)*soNgay, 0));
    localStorage.setItem(LocalStorage.checkout, JSON.stringify(newData));
    const combinedData = roomFiltered.map((item) => {
      const foundItem = newData.find((room) => room.id_phong === item.id_phong);
      return {
        ...item,
        trang_thai: foundItem ? true : false,
      };
    });
    setRoomFiltered(combinedData);
  };

  const actionFilter = (value) => {
    const params = {
      ...value,
    };
    const _getRoom = async () => {
      const _data = await dispatch(searchRoomById({ params }));
      const res = unwrapResult(_data);
      let data = [...(res.data || [])];
      const checkout = JSON.parse(localStorage.getItem(LocalStorage.checkout));
      let _checkout = [];
      if (checkout != null) {
        _checkout = [...checkout];
      }
      const combinedData = data.map((item) => {
        const foundItem = _checkout.find(
          (room) => room.id_phong === item.id_phong
        );
        return {
          ...item,
          trang_thai: foundItem ? true : false,
        };
      });
      setRoomFiltered(combinedData);
    };
    _getRoom();
  };
  return (
    <HomeLayout>
      <Content className="max-w-6xl h-screen mx-auto mt-5">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>Danh sách các phòng</Typography.Title>
            {roomFiltered?.[0] &&
              roomFiltered.map((room) => (
                <RoomCardItem
                  key={room.id_phong}
                  room={room}
                  actionChon={actionChon}
                />
              ))}
          </Col>
          <Col span={6}>
            <Filter action={actionFilter} filters={filters} />
            <div className={styles.filterWrapper} style={{ marginTop: "10px" }}>
              <div className="py-3 flex items-center justify-between text-lg">
                <span className="text-xl">Danh sách chọn </span>
              </div>
              <br></br>
              {data_chon ? (
                <List
                  itemLayout="horizontal"
                  dataSource={data_chon}
                  actions={[
                    <Button
                      onClick={() => onDelete()}
                      key="list-loadmore-delete"
                    >
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
                        // title={item.title}
                        title={
                          <div>
                            Phòng : {item.so_phong} - Tầng: {item.so_tang}
                          </div>
                        }
                        description={<b>{formatMoney(item.gia_phong*soNgay)} vnđ/{soNgay}ngày</b>}
                      />
                      <div>
                        <Button size="small" onClick={() => onDelete(index)}>
                          Xóa
                        </Button>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <br></br>
              )}

              <div>-------------------------------------</div>
              <div>
                <b>Tổng tiền: {formatMoney(tong_gia)} vnđ</b>
              </div>
              {/* <Button type="primary" className="my-8 h-10" htmlType="submit">
                Đi đến đặt phòng
              </Button> */}
              <Link to={`/booking`}>
                <Button type="primary" className="my-8 h-10" htmlType="submit">
                  Đi đến đặt phòng
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Content>
    </HomeLayout>
  );
};

export default HotelDetail;
