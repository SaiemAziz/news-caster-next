
import React, { useState, useEffect } from "react";

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 22.4716,
    longitude: 91.7877
  });

  useEffect(() => {
    // handleLocationClick()
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="w-full">
      {location && (
        <iframe
          title="My Location"
          width="100%"
          height="400"
          frameborder="0"
          style={{ border: 9 }}
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCsGAlSaVe_lKlRuee28N8BNQCkjOLSn7c&center=${location.latitude},${location.longitude}&zoom=16`}
          allowfullscreen
        ></iframe>
      )}
      <div className="flex justify-center items-center relative -top-20">

        <div className="btn btn-info hover:scale-125 duration-150 ease-out" onClick={handleLocationClick}>Get Current Location</div>
      </div>
    </div>
  );
};

export default Map;



//AIzaSyCsGAlSaVe_lKlRuee28N8BNQCkjOLSn7c