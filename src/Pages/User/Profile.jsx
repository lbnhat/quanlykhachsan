import { UserOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
  message
} from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../common/UploadImage";
import { rules } from "../../constant/rules";
import { updateMe } from "../../slices/auth.slice";
import { formatDate } from "../../utils/helper";
import User from "./User";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.profile);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const ngay_sinh = values["ngay_sinh"].format("YYYY-MM-DD");
    const _data = {
      ...values,
      ngay_sinh: ngay_sinh,
      image: banner.url || user.image,
      id: user.id,
    };
    setLoading(true);
    const res = await dispatch(updateMe(_data));
    unwrapResult(res);
    message.success("Cập nhật thành công");
    setLoading(false);
    try {
    } catch (error) {
      setLoading(false);
      setError(error.data.error)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <User>
      <div className="px-8 bg-white h-screen rounded">
        <Typography.Text className="inline-block font-bold text-3xl mt-6 mb-16">
          Chỉnh sửa trang cá nhân
        </Typography.Text>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col sm={18}>
              <Form.Item
                label="Tên đăng nhập"
                name="ten_dang_nhap"
                initialValue={user?.ten_dang_nhap}
                rules={rules.ten_dang_nhap}
              >
                <Input disabled />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col sm={12}>
                  <Form.Item
                    label="Họ và Tên"
                    name="name"
                    initialValue={user.name}
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được bỏ trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={12}>
                  <Form.Item
                    label="Tên"
                    name="lastName"
                    initialValue={user.lastName}
                    rules={rules.name}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              <Row gutter={[16, 16]}>
                <Col sm={12}>
                  <Form.Item
                    initialValue={user?.phoneNumber}
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được bỏ trống",
                      },
                    ]}
                    name="phone_number"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Row>
                    <Col sm={12}>
                      <Form.Item
                        label="Ngày sinh"
                        name="ngay_sinh"
                        initialValue={
                          user.ngay_sinh &&
                          moment(formatDate(user.ngay_sinh, "YYYY-MM-DD"))
                        }
                        format="YYYY-MM-DD"
                        rules={[
                          {
                            required: true,
                            message: "Trường này không được bỏ trống",
                          },
                        ]}
                      >
                        <DatePicker
                          defaultValue={
                            user.ngay_sinh &&
                            moment(formatDate(user?.ngay_sinh, "YYYY-MM-DD"))
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={12}>
                      <div className="flex items-center h-full justify-center">
                        {/* <Form.Item
                          label="Giới tính"
                          name="gender"
                          initialValue={user?.gender}
                        >
                          <Radio.Group value={true}>
                            <Radio value={true}>Nam</Radio>
                            <Radio value={false}>Nữ</Radio>
                          </Radio.Group>
                        </Form.Item> */}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Avatar
                className="ml-8 mt-6 border border-orange-400"
                src={user?.image}
                size={{ lg: 130, xl: 160, xxl: 180 }}
                icon={<UserOutlined />}
              />
              <Form.Item className="ml-16 mt-6">
                <UploadImage
                  onChange={setBanner}
                  setProgress={setProgress}
                  progress={progress}
                />
              </Form.Item>
            </Col>
          </Row>

          {loading ? (
            <div className="flex justify-center my-10">
              {/* <Spin
                        indicator={
                          <LoadingOutlined
                            style={{

                              fontSize: 24,
                            }}
                            spin
                          />
                        }
                      /> */}
              <Button type="primary" htmlType="submit" loading>
                Loading
              </Button>
            </div>
          ) : (
            <div className="flex justify-center my-10">
              <Form.Item validateStatus="error" help={error || null}>
                <Button type="primary" htmlType="submit">
                  Cập nhập thông tin
                </Button>
              </Form.Item>
            </div>
          )}
        </Form>
      </div>
    </User>
  );
};

export default Profile;
