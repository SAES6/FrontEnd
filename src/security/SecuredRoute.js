import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SecuredRoute(props) {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <>{props.children}</>;
  }
  if (token) {
    return <>{props.children}</>;
  }

  return <Navigate to="/" />;
}

export default SecuredRoute;
