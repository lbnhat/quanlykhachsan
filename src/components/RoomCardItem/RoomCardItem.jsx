import { Button, Tag, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { typeOfRoom } from "../../constant/common";
import { formatMoney } from "../../utils/helper";
import LocalStorage from "../../constant/localStorage";
const RoomCardItem = ({ room, actionChon }) => {
  const onOk = (value) => {
    const checkout = JSON.parse(localStorage.getItem(LocalStorage.checkout));
    let _checkout = [];
    if (checkout != null) {
      _checkout = [...checkout];
    }
    _checkout.push(value);
    localStorage.setItem(LocalStorage.checkout, JSON.stringify(_checkout));
    actionChon([..._checkout]);
  };
  return (
    <div className="w-full bg-white rounded-lg cursor-default hover:shadow-md p-4 mb-4">
      <div className="flex justify-between ">
        <div className="h-40 w-56 mr-4 ">
          <img
            className="rounded mr-4 inline-block"
            src={room.hinh_anh}
            alt={room.roomName}
          />
        </div>
        <div className="flex items-center flex-1 justify-between">
          <div className="flex-col  w-3/4">
            <Typography.Text className="block py-2 font-bold">
              Phòng : {room.so_phong} - Tầng: {room.so_tang}
            </Typography.Text>
            {/* <Typography.Text>{room.roomName}</Typography.Text> */}
            <Tag color={typeOfRoom[room.hang_phong].color}>
              {typeOfRoom[room.hang_phong].label}
            </Tag>
            <Typography.Text className="block py-2 ">
              Loại phòng: {room.loai_phong}
            </Typography.Text>
            <Typography.Text className="pb-4">
              {room.mo_ta}
            </Typography.Text>
          </div>
          <div className="flex justify-end">
            <div className="flex-col items-center ">
              <span className="block text-right line-through">
                {formatMoney(room.gia_phong*110/100)} vnđ
              </span>
              <span className="block text-right font-bold text-2xl py-1 text-red-400">
                {formatMoney(room.gia_phong)} vnđ
              </span>
              {room.trang_thai?(
                <Button type="primary"
                style={{
                  background: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "white",
                }} onClick={() => onOk(room)} disabled>
                  Đang chọn
                </Button>
              ) : (
                <Button type="primary" onClick={() => onOk(room)}>
                  Chọn phòng
                </Button>
              )}
              {/* <Link to={`/booking/${room.id}`} className="text-right block">
                <Button type="primary">Chọn phòng</Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCardItem;
