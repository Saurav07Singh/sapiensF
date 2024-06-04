import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";
const Color = () => {
  const [selectedColor, setSelectedColor] = useState("");

  
  const { setisLoggedIn } = useAuth();
  
  useEffect(() => {
    const fetchColorPreference = async () => {
      try {
        const response = await axios.get(`https://sapiensapi.onrender.com/api/color`, {
          withCredentials: true,
        });

        const color = await response.data.color;
        setSelectedColor(color);
        document.documentElement.style.setProperty("--background-color", color);
      } catch (error) {
        console.error("Error fetching color preference", error.message);
      }
    };

    fetchColorPreference();
  }, []);
  const handleLogout = async () => {
    try {
      const resp = await axios.get(`https://sapiensapi.onrender.com/api/logout`, {
        withCredentials: true,
      });
      if ((resp.message = "success")) setisLoggedIn(false);
      // navigate("/")
      //console.log(resp.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleApply = async () => {
    document.documentElement.style.setProperty(
      "--background-color",
      selectedColor
    );
    try {
      const resp = await axios.put(
        `https://sapiensapi.onrender.com/api/color`,
        { selectedColor: selectedColor },
        { withCredentials: true }
      );
     // console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="color-picker-container">
      <div className="color-picker-header">
        <h1>Hello User</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
  <div className="color-picker-dropdown">
    <label htmlFor="colorSelect" className="color-label">Choose a color:</label>
    <select id="colorSelect" value={selectedColor} onChange={handleChange} className="color-select">
      <option value="">Select</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
      <option value="purple">Purple</option>
    </select>
    <button onClick={handleApply} className="apply-button">Apply</button>
  </div>
</div>
  );
};

export default Color;
