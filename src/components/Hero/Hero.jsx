import { Button, DatePicker, Form, Select } from "antd";
import qs from "query-string";
import { province } from "../../constant/province";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
const { Option, OptGroup } = Select;

const Hero = () => {
  const provinceData = province;
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
      province_id: _val.province_id,
      type_room_id: _val.type_room_id,
      bed_quantity: _val.bed_quantity,
      page: 1,
    };
    history.push(`/hotel/1/?${qs.stringify(_filters)}`);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Vui lòng nhập thông tin");
  };
  return (
    <>
      <div className="w-3/4 flex py-14 mx-auto items-center justify-center">
        <div className="text-6xl font-bold text-white flex-col text-center">
          <span className="hero-title block my-3">Book ngay</span>
          <span className="block">1 chỗ ở nào!</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Form
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
            <DatePicker.RangePicker format="YYYY-MM-DD"  placeholder={["Chọn ngày", "Chọn ngày"]} />
          </Form.Item>
          <Form.Item
            className="mr-1"
            rules={[
              {
                required: true,
              },
            ]}
            name="type_room_id"
            label="Hạng phòng"
          >
            <Select placeholder="Hạng phòng" style={{ width: "180px" }}>
              <OptGroup label="Hạng phòng">
                <Select.Option value="1">Phòng Vip</Select.Option>
                <Select.Option value="2">Phòng thường</Select.Option>
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
            name="bed_quantity"
            label="Loại phòng"
          >
            <Select placeholder="Loại phòng" style={{ width: "180px" }}>
              <OptGroup label="Loại phòng">
                <Select.Option value="1">Đơn</Select.Option>
                <Select.Option value="2">Đôi</Select.Option>
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
  );
};

export default Hero;
