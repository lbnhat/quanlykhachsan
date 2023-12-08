import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "react-spinners/RingLoader";
import Error from "../components/Error";
import swal from "sweetalert2";
import { Tag, Divider } from "antd";
import { Button } from "antd";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-2 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <h1 className="uppercase font-bold">My Profile : <span className="font-semibold">{user}</span></h1>
          <h1 className="uppercase font-bold">Admin : <span className="font-semibold">{admin}</span></h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      setLoading(true);
      const userid = localStorage.getItem("userid");
      const data = await (
        await axios.post("https://hotelwebsite-backend.herokuapp.com/api/v1/getbookingbyuserid", {
          userid: userid,
        })
      ).data;
      setbookings(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);

      const result = await (
        await axios.post("https://hotelwebsite-backend.herokuapp.com/api/v1/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      console.log(result);
      setLoading(false);
      swal
        .fire("Congrats", "Your booking has beeen cancelled", "success")
        .then((result) => {
          window.location.reload();
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs border-4 border-black">
                  <h1 className="font-bold border-black border-2 p-2 rounded-lg">
                    {booking.room}
                  </h1>
                  <h1>
                    <span className="font-bold">BookingId : </span>{" "}
                    {booking._id}
                  </h1>
                  <h1>
                    <span className="font-bold">CheckIn : </span>
                    {booking.fromdate}
                  </h1>
                  <h1>
                    <span className="font-bold">CheckOut : </span>
                    {booking.todate}
                  </h1>
                  <h1>
                    <span className="font-bold">Amount : </span>
                    {booking.totalamount}
                  </h1>
                  <h1>
                    <span className="font-bold">Status : </span>
                    {booking.status === "booked" ? (
                      <Tag color="green">Confirmed</Tag>
                    ) : (
                      <Tag color="orange">Cancelled</Tag>
                    )}
                  </h1>

                  <div className="text-right">
                    <button
                      onClick={() => cancelBooking(booking._id, booking.roomid)}
                    >
                      {booking.status === "cancelled" ? (
                        <Button type="primary" >
                          
                        </Button>
                      ) : (
                        <Button type="primary" danger>Cancel Booking</Button>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
