import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function SecuredRoute(props) {
  const token = useSelector((state) => state.user.token);

  if (token) {
    return <>{props.children}</>;
  }
  if (token) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/" />;
  }
}

export default SecuredRoute;
