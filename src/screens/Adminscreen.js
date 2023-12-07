import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import Homescreen from "./Homescreen";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    console.log(admin);
    if (!admin) {
      window.location.href = "/home";
      return;
    }
  }, []);

  return (
    <div className="ml-3 mr-3 mt-3 bs">
      <h1 className="text-3xl text-center">Quản lý khách sạn</h1>
      <Tabs defaultActiveKey="1">

      <TabPane tab="Quản lý nhân viên" key="1">
          <QuanLyNhanVien />
        </TabPane>
        <TabPane tab="Quản lý khách hàng" key="2">
          <KhachHang />
        </TabPane>
    
        <TabPane tab="Quản lý phòng" key="3">
          <QuanLyPhong />
        </TabPane>
        <TabPane tab="Quản lý dịch vụ" key="4">
          <QuanLyDichVu />
        </TabPane>
        <TabPane tab="Quản lý đặt phòng" key="5">
          <QuanLyDatPhong />
        </TabPane>
     
        {/* <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane> */}
        <TabPane tab="Quản lý hóa đơn" key="6">
          <QuanLyHoaDon />
        </TabPane>
        <TabPane tab="Quản lý doanh thu" key="7">
          <QuanLyDoanhThu />
        </TabPane>
        <TabPane tab="Quản lý tài khoản" key="8">
          <QuanLyTaiKhoan />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function QuanLyDatPhong() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);

  // useEffect(async () => {
  //   const admin = localStorage.getItem("admin");
  //   if (!admin) {
  //     window.location = "https://hotelwebsite-backend.herokuapp.com/home";
  //     return;
  //   }
  //   try {
  //     const data = await (
  //       await axios.post(
  //         "https://hotelwebsite-backend.herokuapp.com/api/v1/allbookings"
  //       )
  //     ).data;

  //     setbookings(data);
  //     setloading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setloading(false);
  //     seterror(error);
  //   }
  // }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        {loading && <Loader />}
        <Homescreen />
      </div>
    </div>
  );
}

export function QuanLyPhong() {
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

export function KhachHang() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      // const data = await (
      //   await axios.post(
      //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
      //   )
      // ).data;
      let data = [
        {
          ten_khach_hang: "Lê Bá Nhật",
          sdt: "0789963234",
          email: "lebanhat@gmail.com",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_khach_hang: "Lê Bá Nhật",
          sdt: "0789963234",
          email: "lebanhat@gmail.com",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_khach_hang: "Lê Bá Nhật",
          sdt: "0789963234",
          email: "lebanhat@gmail.com",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_khach_hang: "Lê Bá Nhật",
          sdt: "0789963234",
          email: "lebanhat@gmail.com",
          dia_chi: "46 xuân đán 1",
        },
      ];

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const [isModalClose, setIsModalClose] = useState(false);
  const showModal = () => {
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
  };
  const handleCancel = () => {
    setIsModalClose(false);
  };
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "ten_khach_hang",
      key: "ten_khach_hang",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Chỉnh sữa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách khách hàng</h2>
        <>
          <Button type="primary" onClick={showModal}>
            Thêm khách hàng
          </Button>
          <Modal
            title="Thêm khách hàng"
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ThemKhachHang />
          </Modal>
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function QuanLyDichVu() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const [isModalClose, setIsModalClose] = useState(false);
  const showModal = () => {
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
  };
  const handleCancel = () => {
    setIsModalClose(false);
  };

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      // const data = await (
      //   await axios.post(
      //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
      //   )
      // ).data;
      let data = [
        {
          ten_dich_vu: "xe máy",
          so_luong: "1",
          gia_dich_vu: "100k",
        },
        {
          ten_dich_vu: "Giặt ủi",
          so_luong: "1",
          gia_dich_vu: "100k",
        },
        {
          ten_dich_vu: "ăn uống",
          so_luong: "1",
          gia_dich_vu: "100k",
        },
      ];

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const columns = [
    {
      title: "Tên Dịch vụ",
      dataIndex: "ten_dich_vu",
      key: "ten_dich_vu",
    },
    {
      title: "Số Lượng",
      dataIndex: "so_luong",
      key: "so_luong",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "gia_dich_vu",
      key: "gia_dich_vu",
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

  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách dịch vụ</h2>
        <>
          <Button type="primary" onClick={showModal}>
            Thêm dịch vụ
          </Button>
          <Modal
            title="Thêm dịch vụ"
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ThemDichVu />
          </Modal>
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function QuanLyNhanVien() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      // const data = await (
      //   await axios.post(
      //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
      //   )
      // ).data;
      let data = [
        {
          ten_nhan_vien: "Lê Bá Nhật",
          sdt: "0789963234",
          chuc_vu: "Nhân viên",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_nhan_vien: "Lê Bá Nhật",
          sdt: "0789963234",
          chuc_vu: "Nhân viên",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_nhan_vien: "Lê Bá Nhật",
          sdt: "0789963234",
          chuc_vu: "Nhân viên",
          dia_chi: "46 xuân đán 1",
        },
        {
          ten_nhan_vien: "Lê Bá Nhật",
          sdt: "0789963234",
          chuc_vu: "Nhân viên",
          dia_chi: "46 xuân đán 1",
        },
      ];

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);
  const [isModalClose, setIsModalClose] = useState(false);
  const showModal = () => {
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
  };
  const handleCancel = () => {
    setIsModalClose(false);
  };

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "ten_nhan_vien",
      key: "ten_nhan_vien",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Chức vụ",
      dataIndex: "chuc_vu",
      key: "chuc_vu",
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
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

  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách nhân viên</h2>
        <>
          <Button type="primary" onClick={showModal}>
            Thêm nhân viên
          </Button>
          <Modal
            title="Thêm nhân viên"
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ThemNhanVien />
          </Modal>
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function QuanLyTaiKhoan() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const [isModalClose, setIsModalClose] = useState(false);
  const showModal = () => {
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
  };
  const handleCancel = () => {
    setIsModalClose(false);
  };

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      // const data = await (
      //   await axios.post(
      //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
      //   )
      // ).data;
      let data = [
        {
          ten_tai_khoan: "Adminlebanhat1",
          mat_khau: "123123123",
          vai_tro: "Admink",
        },
        {
          ten_tai_khoan: "Nhanvienlebanhat1",
          mat_khau: "123123123",
          vai_tro: "Nhân viên",
        },
        {
          ten_tai_khoan: "Khachhanglebanhat1",
          mat_khau: "123123123",
          vai_tro: "Khách hàng",
        },
      ];

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "ten_tai_khoan",
      key: "ten_tai_khoan",
    },
    {
      title: "Mật khẩu",
      dataIndex: "mat_khau",
      key: "mat_khau",
    },
    {
      title: "Vai trò",
      dataIndex: "vai_tro",
      key: "vai_tro",
    },

    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Chỉnh sữa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách tài khoản</h2>
        <>
          <Button type="primary" onClick={showModal}>
            Thêm tài khoản
          </Button>
          <Modal
            title="Thêm tài khoản"
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ThemTaiKhoan />
          </Modal>
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
export function ThemTaiKhoan(props) {
  const [ten_tai_khoan, setTenTaiKhoan] = useState("");
  const [mat_khau, setMatKhau] = useState();
  const [vai_tro, setVaiTro] = useState();

  async function ThemTaiKhoan() {
    let newroom = {
      ten_tai_khoan,
      mat_khau,
      vai_tro,
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
      if (ten_tai_khoan === "" || mat_khau === "" || vai_tro === "") {
        newroom = null;
      }

      props.parentCallback(newroom);
      setTenTaiKhoan("");
      setMatKhau("");
      setVaiTro("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <input
        value={ten_tai_khoan}
        onChange={(e) => {
          setTenTaiKhoan(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Tên tài khoản"
      />
      <input
        value={mat_khau}
        onChange={(e) => {
          setMatKhau(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Mật khẩu"
      />
      <input
        value={vai_tro}
        onChange={(e) => {
          setVaiTro(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Vai trò"
      />
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

export function ThemKhachHang(props) {
  const [ten_khach_hang, setTenKhachHang] = useState("");
  const [sdt, setSoDienThoai] = useState();
  const [email, setEmail] = useState();
  const [dia_chi, setDiaChi] = useState();

  async function ThemKhachHang() {
    let newroom = {
      ten_khach_hang,
      sdt,
      email,
      dia_chi,
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
        ten_khach_hang === "" ||
        sdt === "" ||
        email === "" ||
        dia_chi === ""
      ) {
        newroom = null;
      }

      props.parentCallback(newroom);
      setTenKhachHang("");
      setSoDienThoai("");
      setEmail("");
      setDiaChi("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <input
        value={ten_khach_hang}
        onChange={(e) => {
          setTenKhachHang(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Tên khách hàng"
      />
      <input
        value={sdt}
        onChange={(e) => {
          setSoDienThoai(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Số điện thoại"
      />
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Email"
      />
      <input
        value={dia_chi}
        onChange={(e) => {
          setDiaChi(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Địa chỉ"
      />
    </div>
  );
}
export function ThemDichVu(props) {
  const [ten_dich_vu, setTenDichVu] = useState("");
  const [so_luong, setSoLuong] = useState();
  const [gia_dich_vu, setGiaDichVu] = useState();

  async function ThemDichvu() {
    let newroom = {
      ten_dich_vu,
      so_luong,
      gia_dich_vu,
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
      if (ten_dich_vu === "" || so_luong === "" || gia_dich_vu === "") {
        newroom = null;
      }

      props.parentCallback(newroom);
      setTenDichVu("");
      setSoLuong("");
      setGiaDichVu("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <input
        value={ten_dich_vu}
        onChange={(e) => {
          setTenDichVu(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Tên dịch vụ"
      />
      <input
        value={so_luong}
        onChange={(e) => {
          setSoLuong(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Số lượng"
      />
      <input
        value={gia_dich_vu}
        onChange={(e) => {
          setGiaDichVu(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Giá dịch vụ"
      />
    </div>
  );
}
export function ThemNhanVien(props) {
  const [ten_nhan_vien, setTenNhanVien] = useState("");
  const [sdt, setSoDienThoai] = useState();
  const [chuc_vu, setChucVu] = useState();
  const [dia_chi, setDiaChi] = useState();

  async function ThemNhanVien() {
    let newroom = {
      ten_nhan_vien,
      sdt,
      chuc_vu,
      dia_chi,
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
        ten_nhan_vien === "" ||
        sdt === "" ||
        chuc_vu === "" ||
        dia_chi === ""
      ) {
        newroom = null;
      }

      props.parentCallback(newroom);
      setTenNhanVien("");
      setSoDienThoai("");
      setChucVu("");
      setDiaChi("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <input
        value={ten_nhan_vien}
        onChange={(e) => {
          setTenNhanVien(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Tên nhân viên"
      />
      <input
        value={sdt}
        onChange={(e) => {
          setSoDienThoai(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Số điện thoại"
      />
      <input
        value={chuc_vu}
        onChange={(e) => {
          setChucVu(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Chức vụ"
      />
      <input
        value={dia_chi}
        onChange={(e) => {
          setDiaChi(e.target.value);
        }}
        type="text"
        className="form-control my-1"
        placeholder="Địa chỉ"
      />
    </div>
  );
}

export function QuanLyDoanhThu() {
  const data = [
    { year: "thang 1", value: 300.0 },
    { year: "thang 2", value: 400.0 },
    { year: "thang 3", value: 500.0 },
    { year: "thang 4", value: 500.0 },
    { year: "thang 5", value: 900.0 },
    { year: "thang 6", value: 600.0 },
    { year: "thang 7", value: 700.0 },
    { year: "thang 8", value: 900.0 },
    { year: "thang 9", value: 1300.0 },
  ];

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  let chart;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };

  // Get chart base64 string
  const toDataURL = () => {
    console.log(chart?.toDataURL());
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tổng doanh thu" bordered={false}>
            100.000
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Đặt phòng" bordered={false}>
            70.000
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dịch vụ" bordered={false}>
            30.000
          </Card>
        </Col>
      </Row>
      {/* <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        Export Image
      </button>
      <button type="button" onClick={toDataURL}>
        Get base64
      </button> */}

      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}

export function QuanLyHoaDon() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      // const data = await (
      //   await axios.post(
      //     "https://hotelwebsite-backend.herokuapp.com/api/v1/getallusers"
      //   )
      // ).data;
      let data = [
        {
          ma_hoa_don: "001",
          khach_hang: "Lê Bá Nhật0",
          sdt: "0789963234",
          ngay_tao: "12/02/2023",
          nguoi_lap: "Nhật2",
          tong_tien: 10000,
        },
        {
          ma_hoa_don: "002",
          khach_hang: "Lê Bá Nhật1",
          sdt: "0789963234",
          ngay_tao: "12/02/2023",
          nguoi_lap: "Nhật2",
          tong_tien: 10000,
        },
        {
          ma_hoa_don: "003",
          khach_hang: "Lê Bá Nhật2",
          sdt: "0789963234",
          ngay_tao: "12/02/2023",
          nguoi_lap: "Nhật2",
          tong_tien: 20000,
        },
        {
          ma_hoa_don: "004",
          khach_hang: "Lê Bá Nhật3",
          sdt: "0789963234",
          ngay_tao: "12/02/2023",
          nguoi_lap: "Nhật2",
          tong_tien: 10000,
        },
      ];

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "ma_hoa_don",
      key: "ma_hoa_don",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },
    {
      title: "Khách hàng",
      dataIndex: "khach_hang",
      key: "khach_hang",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Người lập",
      dataIndex: "nguoi_lap",
      key: "nguoi_lap",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tong_tien",
      key: "tong_tien",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Xem chi tiết</Button>
        </Space>
      ),
    },
  ];
  const [isModalClose, setIsModalClose] = useState(false);
  const showModal = () => {
    setIsModalClose(true);
  };
  const handleOk = () => {
    setIsModalClose(false);
  };
  const handleCancel = () => {
    setIsModalClose(false);
  };
  return (
    <div className="row">
      <div className="col-md-10">
        <h2>Danh sách hóa đơn</h2>
        <>
          <Button type="primary" onClick={showModal}>
            Tạo hóa đơn
          </Button>
          {/* <Modal
            title="Tạo hóa đơn"
            visible={isModalClose}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ThemNhanVien />
          </Modal> */}
        </>
        <div>
          <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
}
