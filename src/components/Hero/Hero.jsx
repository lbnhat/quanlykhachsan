import { Button, DatePicker, Form, Select, Col, Row } from "antd";
import qs from "query-string";
import { province } from "../../constant/province";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import LocalStorage from "../../constant/localStorage";
import moment from "moment";
const { Option, OptGroup } = Select;

const Hero = () => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    loai_phong: "all",
    hang_phong: "all",
  });
  //const provinceData = province;
  const history = useHistory();
  const onFinish = async (values) => {
    console.log("values");
    console.log(values);
    const rangeValue = values["date"];
    const _val = {
      ...values,
      date: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    const startDate = new Date(_val.date[0]);
    const endDate = new Date(_val.date[1]);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const _filters = {
      checkin_date: _val.date[0],
      checkout_date: _val.date[1],
      hang_phong: _val.hang_phong,
      loai_phong: _val.loai_phong,
      so_ngay: daysDifference,
    };
    localStorage.setItem(LocalStorage.filters, JSON.stringify(_filters));
    localStorage.setItem(LocalStorage.checkout, JSON.stringify([]));
    history.push(`/hotel/search/?${qs.stringify(_filters)}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
    console.log(errorInfo);
    toast.error("Vui lòng nhập thông tin");
  };

  const disabledDate = (current) => {
    // Ngăn chọn ngày quá khứ
    return current && current < moment().startOf("day");
  };
  return (
    <div>
      <>
        <div className="w-3/4 flex py-14 mx-auto items-center justify-center">
          <div className="text-6xl font-bold text-white flex-col text-center">
            <span className="hero-title block my-3">Book ngay</span>
            <span className="block">1 chỗ ở nào!</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Form
            form={form}
            name="basic"
            className={styles.form}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* <Form.Item
            className="mr-1"
            name="province_id"
            label="Thành phố"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Chọn tỉnh" style={{ width: "180px" }}>
              {provinceData.map((province) => (
                <Option value={province.id} key={province.id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
            <Form.Item
              className="mr-1"
              rules={[
                {
                  required: true,
                },
              ]}
              name="date"
              label="Ngày đến/ Ngày đi"
            >
              <DatePicker.RangePicker
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                placeholder={["Chọn ngày", "Chọn ngày"]}
              />
            </Form.Item>
            <Form.Item
              className="mr-1"
              rules={[
                {
                  required: true,
                },
              ]}
              name="hang_phong"
              label="Hạng phòng"
              defaultValue="all"
            >
              <Select placeholder="Hạng phòng" style={{ width: "180px" }}>
                <OptGroup label="Hạng phòng">
                  <Select.Option value="VIP">Phòng Vip</Select.Option>
                  <Select.Option value="Thường">Phòng Thường</Select.Option>
                  <Select.Option value="all">Tất cả</Select.Option>
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item
              className="mr-1"
              rules={[
                {
                  required: true,
                },
              ]}
              name="loai_phong"
              label="Loại phòng"
              defaultValue="all"
            >
              <Select placeholder="Loại phòng" style={{ width: "180px" }}>
                <OptGroup label="Loại phòng">
                  <Select.Option value="Đơn">Đơn</Select.Option>
                  <Select.Option value="Đôi">Đôi</Select.Option>
                  <Select.Option value="all">Tất cả</Select.Option>
                </OptGroup>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              className="btnSearch mt-8 h-10"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Form>
        </div>
      </>
      <HotelFooter />
    </div>
  );
};

export default Hero;

export function HotelFooter() {
  const contactInfoStyle = {
    color: "white",
    fontWeight: "bold",
  };
  const contactInfoItemStyle = {
    color: "white",
  };

  return (
    <div
      style={{ marginTop: "23%", backgroundColor: "rgb(102 99 99 / 0%)", padding: "20px" }}
    >
      <Row gutter={16} justify="space-around">
        <Col span={8}>
          <div>
            <h3 style={contactInfoStyle}>BẠN CẦN GIÚP ĐỠ?</h3>
            <p style={contactInfoItemStyle}>Quản lý các đặt phòng</p>
            <p style={contactInfoItemStyle}>Hỗ trợ</p>
          </div>
          <div>
            <h3 style={contactInfoStyle}>Bạn muốn đặt chỗ?</h3>
            <p style={contactInfoStyle}>1900 1833</p>
          </div>
        </Col>

        <Col span={8}>
          <div>
            <h3 style={contactInfoStyle}>ĐIỀU KHOẢN & QUY ĐỊNH</h3>
            <ul style={contactInfoItemStyle}>
              <li>Điều khoản chung</li>
              <li>Quy định chung</li>
              <li>Quy định về thanh toán</li>
              <li>Quy định về xác nhận thông tin đặt phòng</li>
              <li>Chính sách giải quyết tranh chấp</li>
              <li>Chính sách quyền riêng tư</li>
            </ul>
          </div>
        </Col>

        <Col span={8}>
          <div>
            <h3 style={contactInfoStyle}>LIÊN HỆ</h3>
            <p style={contactInfoItemStyle}>
              Trụ sở: Số nhà 25, Tổ dân phố 21, Phường Him Lam, Thành phố Điện
              Biên Phủ, Tỉnh Điện Biên, Việt Nam
            </p>
            <p style={contactInfoItemStyle}>Email: info@muongthanh.vn</p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "20px", borderTop: "2px solid white" }}></div>
    </div>
  );
}

const footerStyle = {
  backgroundColor: "#f0f0f0",
  padding: "20px",
  textAlign: "center",
  bottom: 0,
  // position: 'absolute',
};

// const footerStyle = {
//   backgroundColor: '#f0f0f0',
//   padding: '20px',
//   textAlign: 'center',
//   position: 'absolute',
//   bottom: 0,
//   width: '100%',
// };
