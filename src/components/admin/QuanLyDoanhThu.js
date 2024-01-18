import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select } from "antd";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { formatMoney } from "../../utils/helper";
export default function QuanLyDoanhThu() {
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [],
    },
  });
  const [loading, setloading] = useState(true);
  const [tongTien, setTongTien] = useState(0);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:8888/api/dat-phong/bao-cao")
      ).data.data;
      console.log(data);
      const dates = [];
      const amounts = [];

      data.bieu_do.forEach((item) => {
        dates.push(item.ngay);
        amounts.push(item.tong_tien);
      });
      const optionsThang = {
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: dates,
        },
        dataLabels: {
          enabled: false,
        },
      };
      const seriesThang = [
        {
          name: "Doanh thu",
          data: amounts,
        },
      ];
      console.log(data.tong_tien);
      setOptions(optionsThang);
      setSeries(seriesThang);
      setTongTien(data.tong_tien)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const callBaoCao = async (option) => {
    try {
      setloading(true);
      const data = await (
        await axios.get(
          "http://localhost:8888/api/dat-phong/bao-cao?option=" + option
        )
      ).data.data;
      const dates = [];
      const amounts = [];

      data.bieu_do.forEach((item) => {
        dates.push(item.ngay);
        amounts.push(item.tong_tien);
      });
      let optionsThang
      const seriesThang = [
        {
          name: "Doanh thu",
          data: amounts,
        },
      ];
      if (option === "ngay") {
         optionsThang = {
          chart: {
            id: "apexchart-example",
          },
          plotOptions :{
            bar: {
              horizontal: false,
              columnWidth: "5%", // đặt chiều rộng cột, bạn có thể thay đổi giá trị này để điều chỉnh kích thước của cột
            },
          },
          xaxis: {
            categories: dates,
          },
          dataLabels: {
            enabled: false,
          },
        };
      }else if (option === "thang"){
        optionsThang = {
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: dates,
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions :{
            bar: {
              horizontal: false,
              columnWidth: "40%", // đặt chiều rộng cột, bạn có thể thay đổi giá trị này để điều chỉnh kích thước của cột
            },
          },
        };
      }else{
        optionsThang = {
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: dates,
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions :{
            bar: {
              horizontal: false,
              columnWidth: "20%", // đặt chiều rộng cột, bạn có thể thay đổi giá trị này để điều chỉnh kích thước của cột
            },
          },
        };
      }
      console.log(data.tong_tien);
      setOptions(optionsThang);
      setSeries(seriesThang);
      setTongTien(data.tong_tien)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    callBaoCao(value);
  };
  return (
    <div>
      {/* <Row gutter={12}>
        <Col span={4}>
          <Card title="Tổng doanh thu" bordered={false}>
            100.000vnd
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Đặt phòng" bordered={false}>
            70.000vnd
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Dịch vụ" bordered={false}>
            30.000vnd
          </Card>
        </Col>
      </Row> */}
      <Select
        defaultValue="thang"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "ngay",
            label: "Hôm nay",
          },
          {
            value: "tuan",
            label: "Tuần này",
          },
          {
            value: "thang",
            label: "Tháng này",
          },
          {
            value: "nam",
            label: "Năm này",
          },
        ]}
      />
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          {" "}
          <Row gutter={16} justify="center">
            <Col span={8}>
              {/* <Card
                title="Tổng doanh thu"
                bordered={false}
                bodyStyle={{ padding: "25px" }}
              >
                100.000vnd
              </Card> */}
            </Col>
            <Col span={8}>
              {/* <Card
                title="Đặt phòng"
                bordered={false}
                bodyStyle={{ padding: "25px" }}
              >
                70.000vnd
              </Card> */}
              <Card
                title={"Tổng doanh thu: "+ formatMoney(tongTien) +" VNĐ"}
                bordered={false}
                bodyStyle={{ padding: "25px" }}
              >
              </Card>
            </Col>
            <Col span={8}>
              {/* <Card
                title="Dịch vụ"
                bordered={false}
                bodyStyle={{ padding: "25px" }}
              >
                30.000vnd
              </Card> */}
            </Col>
          </Row>
        </Col>
        <Col span={6}></Col>
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
            {/* <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            /> */}
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        </Col>
        <Col span={1}></Col>
      </Row>
    </div>
  );
}
