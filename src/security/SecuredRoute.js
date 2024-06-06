import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userActions } from "../_store/_slices/user-slice";
function SecuredRoute(props) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  if (token) {
    return <>{props.children}</>;
  }
  if (token) {
    return <>{props.children}</>;
  } else {
    dispatch(userActions.openLogin());
    return <Navigate to="/" />;
  }
}

export default SecuredRoute;
