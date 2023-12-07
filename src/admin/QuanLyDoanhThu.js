import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line } from "@ant-design/charts";
const { TabPane } = Tabs;
export default function QuanLyDoanhThu() {
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