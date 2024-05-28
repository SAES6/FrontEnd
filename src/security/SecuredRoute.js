import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function SecuredRoute(props) {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <>{props.children}</>;
  }
  if (token) {
    return <>{props.children}</>;
  } else {
    toast.error("Vous n'êtes pas administrateur", {
      position: "top-center",
      style: {
        fontFamily: "Poppins, sans-serif",
        borderRadius: "15px",
        textAlign: "center",
      },
    });
    return <Navigate to="/" />;
  }
}

export default SecuredRoute;
