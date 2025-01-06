// import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Components/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();
  const { isAuth } = authState;

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./Components/Context/AuthContext";

// const ProtectedRoute = ({ role }) => {
//   const { authState } = useAuth();

//   if (!authState.isAuth) {
//     return <Navigate to="/login" replace />;
//   }

//   if (authState.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   // return <Outlet />;
// };

// export default ProtectedRoute;
