import { Col, Row, Typography } from "antd";
import { formatDate, formatMoney } from "../../utils/helper";

const PurchaseCard = ({ purchase }) => {
  const checkin = formatDate(purchase.checkinDate).slice(-2);
  const checkout = formatDate(purchase.checkoutDate).slice(-2);
  //const price = (checkout - checkin) * purchase.room.price;
  return (
    <>
      <Row gutter={[24, 24]} className="px-5 py-10 rounded bg-gray-100 mt-4">
        <Col sm={2}>
          <Typography.Text>{purchase.id_phieu_dat_phong}</Typography.Text>
        </Col>
        <Col sm={3}>
          <Typography.Text>{purchase.thong_tin_khach_hang.sdt}</Typography.Text>
        </Col>
        <Col sm={8}>
        {purchase.thong_tin_phong?.[0] &&
          purchase.thong_tin_phong.map((value) => (
          <Typography.Text>Phòng :{value.so_phong}- {value.ten_loai_phong} - {value.hang_phong} - {formatMoney(value.gia)}vnđ<br></br></Typography.Text>
          ))}
        </Col>
        <Col sm={5}>
          <Typography.Text>
            {formatDate(purchase.thong_tin_phong?.[0].ngay_den)}/ 
            {formatDate(purchase.thong_tin_phong?.[0].ngay_tra_phong)}
          </Typography.Text>
        </Col>
        <Col sm={3}>
          <Typography.Text>{formatMoney(purchase.trang_thai)}</Typography.Text>
        </Col>
        <Col sm={3}>
          <Typography.Text>{formatMoney(purchase.tong_tien)}</Typography.Text>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseCard;
