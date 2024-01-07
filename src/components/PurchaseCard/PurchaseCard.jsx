import { Col, Row, Typography } from "antd";
import { formatDate, formatMoney } from "../../utils/helper";

const PurchaseCard = ({ purchase }) => {
  const checkin = formatDate(purchase.checkinDate).slice(-2);
  const checkout = formatDate(purchase.checkoutDate).slice(-2);
  const price = (checkout - checkin) * purchase.room.price;
  return (
    <>
      <Row gutter={[24, 24]} className="px-5 py-10 rounded bg-gray-100 mt-4">
        <Col sm={4}>
          <Typography.Text>{purchase.hotel.hotelName}</Typography.Text>
        </Col>
        <Col sm={6}>
          <Typography.Text>{purchase.hotel.hotelAddress}</Typography.Text>
        </Col>
        <Col sm={6}>
          <Typography.Text>{purchase.room.roomName}</Typography.Text>
        </Col>
        <Col sm={5}>
          <Typography.Text>
            {formatDate(purchase.checkinDate)} /
            {formatDate(purchase.checkoutDate)}
          </Typography.Text>
        </Col>

        <Col sm={3}>
          <Typography.Text>{formatMoney(price)}</Typography.Text>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseCard;
