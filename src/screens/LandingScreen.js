import React from "react";
import hotel_mainpage from "../images/hotel_mainpage.png";
import { Button } from 'antd';

function LandingScreen() {
  return (
    <div
      style={{
        backgroundImage: `url(${hotel_mainpage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        width: "100%",
        height: "93vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="text-6xl flex-1 text-center text-white font-semibold pb-[47vh]"
    >
      Chào mừng bạn đến khách sạn Vinpearl Đà Nẵng
   
      <div className="pt-9">
      {/* <Button className={{
        width:"20px",
        height:"57px",
        fontSize:"15px"
      }}>Xem khách sạn</Button> */}
<a href="/home">
<button className="btn p-3 btn-primary bg-gray-700 text-6">Xem khách sạn</button>
</a>
      </div>
     
       
     
   
      {/* <div
        style={{
          left: "0",
          bottom: "0",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        className="text-xl text-black"
      >

      </div> */}
    </div>
  );
}

export default LandingScreen;
