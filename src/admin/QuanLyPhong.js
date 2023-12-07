import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;

export default function QuanLyPhong() {
    const [rooms, setRooms] = useState([]);
    const [duplicaterooms, setduplicaterooms] = useState();
    const [isAddRom, setAddRoom] = useState(false);
    const handleAddRoom = (e) => setAddRoom(e);
    // useEffect(async () => {
    //   setLoading(true);
    //   const fetchRooms = async () => {
    //     const data = await getRooms();
    //     setRooms(data);
    //   };
  
    //   fetchRooms();
    //   // try {
    //   // //   setRooms(data);
    //   // //   setduplicaterooms(data);
    //   // //   setLoading(false);
    //   // // } catch (error) {
    //   // //   setError(true);
    //   // //   console.log(error);
    //   // //   setLoading(false);
    //   // }
    // }, []);
    useEffect(() => {
      const fetchRooms = async () => {
        const data = await getRooms();
        setRooms(data);
        setduplicaterooms(data);
      };
  
      fetchRooms();
    }, []);
    console.log(rooms);
    const columns = [
      {
        title: "Số Phòng",
        dataIndex: "so_phong",
        key: "so_phong",
      },
      {
        title: "Số tầng",
        dataIndex: "so_tang",
        key: "so_tang",
      },
      {
        title: "Loại Phòng",
        dataIndex: "loai_phong",
        key: "loai_phong",
      },
      {
        title: "Hạng Phòng",
        dataIndex: "hang_phong",
        key: "hang_phong",
      },
      {
        title: "Trạng Thái",
        dataIndex: "trang_thai",
        key: "trang_thai",
      },
      {
        title: "Giá Phòng",
        dataIndex: "gia_phong",
        key: "gia_phong",
      },
      {
        title: "",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary">Xem chi tiết</Button>
            <Button type="primary">Chỉnh sữa</Button>
          </Space>
        ),
      },
    ];
  
    function callbackFunction(childData) {
      if (childData != null) {
        childData.trang_thai = "Trống";
        duplicaterooms.unshift(childData);
        const copiedArray = [...duplicaterooms];
        setRooms(copiedArray);
      }
    }
  
    return (
      <div>
        {/* {!isAddRom && (
          <Button type="primary" onClick={handleAddRoom}>
            Thêm phòng
          </Button>
        )} */}
        {/* <Addroom/> */}
  
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-5">
            {!isAddRom && (
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => {
                  handleAddRoom(true);
                }}
              >
                Thêm phòng
              </Button>
            )}
            {isAddRom && (
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => {
                  handleAddRoom(false);
                }}
              >
                Tắt
              </Button>
            )}
          </div>
        </div>
        {isAddRom && <ThemPhong parentCallback={callbackFunction} />}
        <div>-------------------------</div>
        <h2>Danh sách phòng</h2>
        <div>
          <Table dataSource={rooms} columns={columns} rowKey="id" />
        </div>
      </div>
    );
  }
  export function ThemPhong(props) {
    const [so_phong, setSoPhong] = useState("");
    const [loai_phong, setLoaiPhong] = useState();
    const [so_tang, setSoTang] = useState();
    const [hang_phong, setHangPhong] = useState();
    const [trang_thai, setTrangThai] = useState();
    const [gia_phong, setGiaPhong] = useState();
    const [imageurl1, setimageurl1] = useState();
    const [imageurl2, setimageurl2] = useState();
    const [imageurl3, setimageurl3] = useState();
  
    async function ThemPhong() {
      let newroom = {
        so_phong,
        so_tang,
        loai_phong,
        hang_phong,
        trang_thai,
        gia_phong,
        hinh_anh: [imageurl1, imageurl2, imageurl3],
      };
  
      try {
        // const admin = localStorage.getItem('admin');
        // if (admin) {
        //   window.location.href = "/home";
        //   return;
        // }
        // const result = await (
        //   await axios.post(
        //     "https://hotelwebsite-backend.herokuapp.com/api/v1/addroom",
        //     newroom
        //   )
        // ).data;
        if (
          so_phong === "" ||
          so_tang === "" ||
          loai_phong === "" ||
          hang_phong === "" ||
          gia_phong === ""
        ) {
          newroom = null;
        }
  
        props.parentCallback(newroom);
        setSoPhong("");
        setSoTang("");
        setLoaiPhong("");
        setHangPhong("");
        setTrangThai("");
        setGiaPhong("");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="row">
        <div className="col-md-5">
          <input
            value={so_phong}
            onChange={(e) => {
              setSoPhong(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Số phòng"
          />
                 <input
            value={so_tang}
            onChange={(e) => {
              setSoTang(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Số tầng"
          />
          <input
            value={loai_phong}
            onChange={(e) => {
              setLoaiPhong(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Loại phòng"
          />
          <input
            value={hang_phong}
            onChange={(e) => {
              setHangPhong(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Hạng phòng"
          />
          <input
            value={gia_phong}
            onChange={(e) => {
              setGiaPhong(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Giá phòng"
          />
        </div>
        <div className="col-md-5">
          <input
            value={imageurl1}
            onChange={(e) => {
              setimageurl1(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Thêm link hình ảnh 1"
          />
          <input
            value={imageurl2}
            onChange={(e) => {
              setimageurl2(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Thêm link hình ảnh 2"
          />
          <input
            value={imageurl3}
            onChange={(e) => {
              setimageurl3(e.target.value);
            }}
            type="text"
            className="form-control my-1"
            placeholder="Thêm link hình ảnh 3"
          />
          <button
            className="btn btn-primary"
            onClick={ThemPhong}
            style={{ float: "right" }}
          >
            Thêm phòng
          </button>
        </div>
      </div>
    );
  }
  