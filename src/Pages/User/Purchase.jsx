import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../../slices/booking.slice";
import User from "./User";
import PurchaseCard from "../../components/PurchaseCard/PurchaseCard";
const Purchase = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.profile);
  const [purchaseList, setPurchaseList] = useState([]);
  const [isCapNhat, setIsCapNhat] = useState(true);
  useEffect(() => {
    const _getPurchase = async () => {
      const params = {
        user_id: user.id,
        page: 1,
      };
      try {
        const data = await dispatch(getPurchase({ params }));
        const res = unwrapResult(data);
        setPurchaseList(res.data);

      } catch (error) {}
    };
    _getPurchase();
  }, [isCapNhat]);

  const capNhat=((e)=>{
    setIsCapNhat(e)
  });
  //console.log(purchaseList);
  return (
    <User>
      <div className="px-8 bg-white min-h-screen rounded py-12">
        <Typography.Title level={3} className="pt-5">
          Đơn đã đặt
        </Typography.Title>
        <Row gutter={[24, 24]} className="bg-orange-400 p-4">
          <Col sm={2}>
            <Typography.Text className="font-bold">Mã phiếu đặt</Typography.Text>
          </Col>
          <Col sm={2}>
            <Typography.Text className="font-bold">Số điện thoại</Typography.Text>
          </Col>
          <Col sm={6}>
            <Typography.Text className="font-bold">Thông tin phòng</Typography.Text>
          </Col>
          <Col sm={4}>
            <Typography.Text className="font-bold">Thông dịch vụ</Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">
              Ngày nhận/trả phòng
            </Typography.Text>
          </Col>
          <Col sm={3}>
            <Typography.Text className="font-bold">
              Trạng thái
            </Typography.Text>
          </Col>
          <Col sm={2}>
            <Typography.Text className="font-bold">Giá (VNĐ)</Typography.Text>
          </Col>
          <Col sm={2}>
            <Typography.Text className="font-bold"></Typography.Text>
          </Col>
        </Row>
        {purchaseList?.data?.[0] &&
          purchaseList.data.map((purchase) => (
            <PurchaseCard purchase={purchase} key={purchase.id_phieu_dat_phong} capNhat={(e)=>capNhat(e)} isCapNhat={isCapNhat} />
          ))}
      </div>
    </User>
  );
};

export default Purchase;
