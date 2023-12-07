import React, { useState } from "react";
import "../index.css";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room , fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs py-24">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className={"smallimg"} alt="hotel image" />
      </div>
      <div className="col-md-7 text-left">
        <h4 className="text-xl text-sky-800 font-semibold">{room.name}</h4>
        <b>
          <p className="py-1">Số lượng : {room.maxcount}</p>
          <p className="py-1">Phone Number : {room.phonenumber}</p>
          <p className="py-1">Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>

          {(fromdate && todate) && (
             <a href={`/book/${room._id}/${fromdate}/${todate}`}>
             <button className="btn btn-primary m-2">Book Now</button>
           </a>
          )}
          
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((imageurl) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={imageurl}
                    alt="First slide"
                  />
                  <p className="py-2">{room.description}</p>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary bg-gray-600" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
