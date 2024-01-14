import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  List,
  Avatar,
  InputNumber,
} from "antd";
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
import { booking, getDichVu } from "../slices/booking.slice";
import styles from "../styles/pages/login.module.scss";
import { formatMoney } from "../utils/helper";

const Booking = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth.profile);
  const [dichVu, setDichVu] = useState([]);
  const user_id = user.id;
  const { checkin_date, checkout_date } = JSON.parse(
    localStorage.getItem(LocalStorage.filters)
  );
  const [data_chon, setDataChon] = useState(
    JSON.parse(localStorage.getItem(LocalStorage.checkout))
  );
  const [tong_gia, setTongGia] = useState();
  const [dataDichVu, setDataDichVu] = useState([]);
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
    const _getDichVu = async () => {
      try {
        const _data = await dispatch(getDichVu());
        const res = unwrapResult(_data);
        setDichVu(res.data.data);
      } catch (error) {}
    };
    _getDichVu();
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    //const birthday = values["birthday"];
    const _val = {
      ...values,
      // birthday: birthday.format("YYYY-MM-DD"),
      checkinDate: checkin_date,
      checkoutDate: checkout_date,
      danh_sach_phong: data_chon,
      tong_tien: tong_gia,
      user_id,
      danh_sach_dich_vu:dichVu,
      //room_id: Number(id),
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
  const handleInputChange = (id, inputName, value ) => {
    setDichVu((prevDichVu) =>
      prevDichVu.map((item) =>
        item.id_dich_vu === id ? { ...item, [inputName]: value } : item
      )
    );

  };

  const handleBlur = (id, inputName, value) => {
    setTongGia(data_chon.reduce((sum, room) => sum + Number(room.gia_phong), 0));
    let gia_cuoi =data_chon.reduce((sum, room) => sum + Number(room.gia_phong), 0)
    gia_cuoi=gia_cuoi+dichVu.reduce((sum, room) => sum + Number(room.gia_dich_vu)*Number(room.so_luong), 0)
    setTongGia(gia_cuoi);
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
                  Thông tin đặt phòng:
                </h1>
                <br />
                <div>
                  <div>
                    <strong>Ngày đến:</strong> {checkin_date}
                  </div>
                  <div>
                    <strong>Ngày trả phòng:</strong> {checkout_date}
                  </div>
                </div>
                <br />
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
                  <div>
                    <strong>Dịch vụ:</strong>
                  </div>
                  <List
                    itemLayout="horizontal"
                    dataSource={dichVu}
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
                          title={
                            <div>
                              <strong>{item.ten_dich_vu}</strong>
                            </div>
                          }
                          description={
                            <b>{formatMoney(item.gia_dich_vu)} vnđ</b>
                          }
                        />
                        <div>
                          <InputNumber
                            placeholder="Số lượng"
                            variant="borderless"
                            value={item.so_luong || 0} 
                            onChange={(value) => handleInputChange(item.id_dich_vu, 'so_luong', value)}
                            style={{
                              width: 200,
                            }}
                            onBlur={(e) =>
                              handleBlur(item.id_dich_vu, 'input1', e.target.value, item.gia_dich_vu)
                            }
                          />
                        </div>
                      </List.Item>
                    )}
                  />
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
                  {user_id === 0 ? (
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
                          name="ten_khach_hang"
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
                          name="sdt"
                          className="mr-6"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className={`${styles.formInputName} mt-3`}>
                        <Form.Item
                          label="CCCD/CMND"
                          name="cmnd"
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
                  ) : null}

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
