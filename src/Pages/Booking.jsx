import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, DatePicker, Form, Input, Row, List, Avatar } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Filter from "../components/Filter/Filter";
import LocalStorage from "../constant/localStorage";
import { rules } from "../constant/rules";
import HomeLayout from "../core/layout/HomeLayout";
import { booking } from "../slices/booking.slice";
import styles from "../styles/pages/login.module.scss";
import { formatMoney } from "../utils/helper";

const Booking = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth.profile);
  //const user_id = user.id;
  const { checkin_date, checkout_date } = JSON.parse(
    localStorage.getItem(LocalStorage.filters)
  );
  const [data_chon, setDataChon] = useState(
    JSON.parse(localStorage.getItem(LocalStorage.checkout))
  );
  const [tong_gia, setTongGia] = useState();

  useEffect(() => {
    const _getRoom = async () => {
      const checkout = JSON.parse(localStorage.getItem(LocalStorage.checkout));
      let _checkout = [];
      if (checkout != null) {
        _checkout = [...checkout];
      }
      setTongGia(
        _checkout.reduce((sum, room) => sum + Number(room.gia_phong), 0)
      );
    };
    _getRoom();
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const birthday = values["birthday"];
    const _val = {
      ...values,
      birthday: birthday.format("YYYY-MM-DD"),
      checkinDate: checkin_date,
      checkoutDate: checkout_date,
      //user_id,
      room_id: Number(id),
    };
    try {
      const res = await dispatch(booking(_val));
      unwrapResult(res);
      history.push("/");
      toast.success("Bạn đã đặt vé thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDelete = (index) => {
    // Implement your logic to delete the item at the specified index
    const newData = [...data_chon];
    newData.splice(index, 1);
    setDataChon(newData);
    setTongGia(newData.reduce((sum, room) => sum + Number(room.gia_phong), 0));
    localStorage.setItem(LocalStorage.checkout, JSON.stringify(newData));
  };

  return (
    <HomeLayout>
      <Content className="max-w-6xl mx-auto mt-5">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <div className="bg-white">
              {/* <div className={`${styles.formRegisterMemberContainer} flex-col`}> */}
              <div className="mx-auto mt-5">
                <h1 className="text-3xl font-bold mt-12">
                  Hoàn tất thông tin để đặt phòng
                </h1>

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
                        description={<b>{formatMoney(item.gia_phong)} vnđ</b>}
                      />
                      <div>
                        <Button size="small" onClick={() => onDelete(index)}>
                          Xóa
                        </Button>
                      </div>
                    </List.Item>
                  )}
                />

                <div>
                  ---------------------------------------------------------------------------------------------------------------------------------------------------------
                </div>
                <div>
                  <b>Tổng tiền: {formatMoney(tong_gia)} vnđ</b>
                </div>
                <Form
                  className={styles.formRegisterMember}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item>
                    <div className={`${styles.formInputName} mt-3`}>
                      {/* <Form.Item
                        initialValue={id}
                        label="Phòng"
                        name="room_id"
                        rules={[
                          {
                            required: true,
                            message: "Trường này không được bỏ trống",
                          },
                        ]}
                        className="mr-4"
                      >
                        <Input disabled />
                      </Form.Item> */}
                      {/* <Form.Item
                        label="Năm sinh"
                        name="birthday"
                        className="mr-4"
                        rules={[
                          {
                            required: true,
                            message: "Trường này không được bỏ trống",
                          },
                        ]}
                      >
                        <DatePicker format="YYYY-MM-DD" />
                      </Form.Item> */}
                      <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={rules.name}
                        className="mr-6"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        rules={[
                          {
                            required: true,
                            message: "Trường này không được bỏ trống",
                          },
                        ]}
                        name="phonenumber"
                        className="mr-6"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className={`${styles.formInputName} mt-3`}>
                      <Form.Item
                        label="CCCD/CMND"
                        name="cccd"
                        rules={rules.name}
                        className="mr-6"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={rules.email}
                        validateStatus="error"
                        className="mr-6"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </Form.Item>

                  <div className="flex justify-center my-10">
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Xác nhận
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          {/* <Col span={6}>
            <Filter />
          </Col> */}
        </Row>
      </Content>
    </HomeLayout>
  );
};

export default Booking;
