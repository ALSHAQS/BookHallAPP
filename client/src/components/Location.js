import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


const User = () => {
  const [ip, setIp] = useState(null); //State to hold the IP address
  const [country, setCountry] = useState(null); //State to hold geolocation
  const [region, setRegion] = useState(null); // State to hold geolocation

async function getGeoLocationData()  {
  try {
   
    const response = await axios.get(process.env.REACT_APP_LOCATION_API_KEY)
    setIp(response.data.ip);//set ip address
    setCountry(response.data.location.country); // Set country
    setRegion(response.data.location.region); // Set region
  } catch (error) {
    console.error("Error fetching geolocation data:", error.message);
  }
};

  useEffect(() => {
    getGeoLocationData()
  },[])

  return (
    <div>
       <h3>IP Address: {ip}</h3>
       <h3>Country: {country}</h3>
       <h3>Region: {region}</h3>
    </div>
  );
};

export default User;
