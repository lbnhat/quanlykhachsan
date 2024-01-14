import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { province } from "../../constant/province";
import styles from "./style.module.scss";
import LocalStorage from "../../constant/localStorage";
import moment from 'moment';
const { Option, OptGroup } = Select;

export default function Filter({ filters, action }) {
  const _filters = {
    ...filters,
  };

  console.log(filters)
  const initialValues = {
    // Gán giá trị mặc định cho các trường trong form
    date: [moment(filters.checkin_date), moment(filters.checkout_date)],
    //date: ["",""],
    hang_phong: filters.hang_phong, // hoặc 'Thường' tùy thuộc vào giá trị bạn muốn
    loai_phong: filters.loai_phong, // hoặc 'Đôi' tùy thuộc vào giá trị bạn muốn
  };
  const history = useHistory();
  const onFinish = async (values) => {
    const rangeValue = values["date"];
    const _val = {
      ...values,
      date: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    const _filters = {
      checkin_date: _val.date[0],
      checkout_date: _val.date[1],
      // province_id: _val.province_id,
      hang_phong: _val.hang_phong,
      loai_phong: _val.loai_phong,
    };
    localStorage.setItem(LocalStorage.filters, JSON.stringify(_filters));
    //history.push(`/hotel/search/?${qs.stringify(_filters)}`);
    action(_filters);
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Vui lòng nhập thông tin");
  };

  return (
    <div className={styles.filterWrapper}>
      <div className="py-3 flex items-center justify-between text-lg">
        <span className="text-xl">Tìm kiếm theo </span>
      </div>

      <Row>
        <Col span={24} className="m-auto items-center flex flex-col">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={initialValues}
          >
            {/* <Form.Item name="province_id" label="Thành phố">
              <Select placeholder="Chọn tỉnh" style={{ width: "100%" }}>
                {province.map((province) => (
                  <Option value={province.id} key={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item name="date" label="Ngày đến/ Ngày đi">
              <DatePicker.RangePicker disabled format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="hang_phong" label="Hạng phòng">
              <Select placeholder="Hạng phòng">
                <OptGroup label="Hạng phòng">
                  <Select.Option value="VIP">Phòng Vip</Select.Option>
                  <Select.Option value="Thường">Phòng Thường</Select.Option>
                  <Select.Option value="all">Tất cả</Select.Option>
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item name="loai_phong" label="Loại phòng">
              <Select placeholder="Loại phòng">
                <OptGroup label="Loại phòng">
                  <Select.Option value="Đơn">Đơn</Select.Option>
                  <Select.Option value="Đôi">Đôi</Select.Option>
                  <Select.Option value="all">Tất cả</Select.Option>
                </OptGroup>
              </Select>
            </Form.Item>

            <Button type="primary" className="my-8 h-10" htmlType="submit">
              Áp dụng
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
