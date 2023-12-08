import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Space, Table, Button, Modal, Card, Col, Row } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
import { getRooms } from "../services/api";
import { Line, Bar } from "react-chartjs-2";
export default function QuanLyDoanhThu() {
  const data = {
    labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    datasets: [
      {
        label: 'Doanh số bán hàng',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time', // Ensure the x-axis is treated as a time scale
          time: {
            unit: 'day', // You can adjust the time unit as needed (day, month, year, etc.)
            displayFormats: {
              day: 'YYYY-MM-DD', // Format for displaying days
            },
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
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
          {/* <Line data={data} options={options} /> */}
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}
