import { Col, Row, Typography, Button, message, Spin } from "antd";
import { formatDate, formatMoney } from "../../utils/helper";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
const PurchaseCard = ({ purchase, capNhat, isCapNhat }) => {
  const checkin = formatDate(purchase.checkinDate).slice(-2);
  const checkout = formatDate(purchase.checkoutDate).slice(-2);
  const [loading, setLoading] = useState(false);
  const trangThai =
    purchase.trang_thai === "Hủy" || purchase.trang_thai === "Đã thanh toán";
  console.log(trangThai);
  const capNhatPhieu = async (id_phieu_dat_phong, trangThai) => {
    try {
      setLoading(true);
      let req = {
        id_phieu_dat_phong: Number(id_phieu_dat_phong),
        trang_thai: trangThai,
      };
      const data = await (
        await axios.post(
          "http://localhost:8888/api/dat-phong/cap-nhat-trang-thai",
          req
        )
      ).data.data;
      setLoading(false);
    } catch (error) {
      console.log(error);
      //message.error("Lỗi xác nhận thành công phiếu "+id_phieu_dat_phong);
    }
  };
  const huyPhieu = async (e) => {
    console.log(e.id_phieu_dat_phong);
    try {
      await capNhatPhieu(e.id_phieu_dat_phong, "Hủy"); // Waits for the promise to resolve
      message.success("Hủy phiếu " + e.id_phieu_dat_phong);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật phiếu: ", error);
    }
    capNhat(!isCapNhat);
  };
  //const price = (checkout - checkin) * purchase.room.price;
  return (
    <>
      {loading ? (
        //<div className="centered-spin">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  color:"GrayText",
                  fontSize: 32,
                }}
                spin
              />
            }
          />
       // </div>
      ) : (
        <Row gutter={[24, 24]} className="px-5 py-10 rounded bg-gray-100 mt-4">
          <Col sm={2}>
            <Typography.Text>{purchase.id_phieu_dat_phong}</Typography.Text>
          </Col>
          <Col sm={2}>
            <Typography.Text>
              {purchase.thong_tin_khach_hang.sdt}
            </Typography.Text>
          </Col>
          <Col sm={6}>
            {purchase.thong_tin_phong?.[0] &&
              purchase.thong_tin_phong.map((value) => (
                <Typography.Text>
                  Phòng :{value.so_phong}- {value.ten_loai_phong} -{" "}
                  {value.hang_phong} - {formatMoney(value.gia)}vnđ<br></br>
                </Typography.Text>
              ))}
          </Col>
          <Col sm={4}>
            {purchase.thong_tin_dich_vu?.[0] &&
              purchase.thong_tin_dich_vu.map((value) => (
                <Typography.Text>
                  {value.ten_dich_vu}: x {value.so_luong} -{" "}
                  {formatMoney(value.gia_dich_vu)}vnđ<br></br>
                </Typography.Text>
              ))}
          </Col>
          <Col sm={3}>
            <Typography.Text>
              {formatDate(purchase.thong_tin_phong?.[0].ngay_den)}{" "}
            </Typography.Text>
            <Typography.Text>
              {" "}
              {formatDate(purchase.thong_tin_phong?.[0].ngay_tra_phong)}{" "}
            </Typography.Text>
          </Col>
          <Col sm={2}>
            <Typography.Text>
              {formatMoney(purchase.trang_thai)}
            </Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text>{formatMoney(purchase.tong_tien)}</Typography.Text>
          </Col>
          <Col sm={2}>
            {!trangThai ? (
              <Button
                type=""
                style={{
                  background: "#d9d9d9",
                  borderColor: "#d9d9d9",
                  color: "rgba(0, 0, 0, 0.45)",
                }}
                onClick={
                  () => huyPhieu(purchase)
                  // message.warning("Hủy thành công");
                }
              >
                Hủy
              </Button>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default PurchaseCard;
