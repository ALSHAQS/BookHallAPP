import React, { useState, useEffect } from "react";
import axios from "axios";

function Location() {
  const [ip, setIp] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");

  const getGeoLocation = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_LOCATION_API_URL
      );

      setIp(response.data.ip);
      setCountry(response.data.country_name);
      setRegion(response.data.region);
    } catch (err) {
      setError("Unable to retrieve location data");
      console.error(err);
    }
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>User Location</h4>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
          <h6>IP Address: {ip}</h6>
          <h6>Country: {country}</h6>
          <h6>Region: {region}</h6>
        </>
      )}
    </div>
  );
}

export default Location;
