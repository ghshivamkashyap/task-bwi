import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(
    "token - ",
    userToken,
    "ss - ",
    sessionStorage.getItem("userToken")
  );

  if (userToken || sessionStorage.getItem("userToken")) {
    return children;
  } else {
    toast.error("Please login first.");
    navigate("/");
    // return null;
  }
};

export default ProtectedRoute;
