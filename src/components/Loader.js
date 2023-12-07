import React from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  
  return (
    <div className="">
      <div className="sweet-loading">
        <RingLoader color={'#000'} loading={loading} className="" css='' size={80} />
      </div>
    </div>
  );
}

export default Loader;
