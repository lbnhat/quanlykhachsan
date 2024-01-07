import React, { useEffect, useState } from "react";
import {  Card, Col, Row } from "antd";
import ReactApexChart from "react-apexcharts";
export default function QuanLyDoanhThu() {

  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 141, 68, 47],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Biểu đồ doanh thu",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tổng doanh thu" bordered={false}>
            100.000vnd
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Đặt phòng" bordered={false}>
            70.000vnd
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dịch vụ" bordered={false}>
            30.000vnd
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
        <Col span={1}></Col>
        <Col span={22}>
          {/* <Line data={data} options={options} /> */}
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </div>
        </Col>
        <Col span={1}></Col>
      </Row>
    </div>
  );
}
