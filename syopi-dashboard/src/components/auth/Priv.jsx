import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./Context";

const PrivateRoutes = ({ allaccess, role, ...props }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    const type = user.user_metadata.acc_type;
    console.log(type);
    if (role == type || allaccess=='true') {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export default PrivateRoutes;
