import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Homescreen from "../screens/Homescreen";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;
export default function QuanLyDatPhong() {
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