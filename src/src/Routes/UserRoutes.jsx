// // import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../ProtectedRoutes";
// import DefaultLayout from "../Components/Layout/DefaultLayout";
// import EmployeeDashboard from "../Components/User/dashboard/EmployeeDashboard";
// // import Leaves from "../Components/User/Employee Tracking/Leaves";
// // import UserAttendance from "";
// // import UserHolidays from "../components/User/employeeTracking/holidays/Holidays";
// import Leaves from "../Components/User/Employee Tracking/Leaves/Leaves";
// import Attendance from "../Components/User/Employee Tracking/Attendance/Attendance";
// import Holidays from "../Components/User/Employee Tracking/Holidays/Holidays";

// const UserRoutes = () => {
//   return (
//     <Routes>
//       <Route element={<ProtectedRoute role="user" />}>
//         <Route element={<DefaultLayout isAdmin={false} />}>
//           <Route path="/user-dashboard" element={<EmployeeDashboard />} />
//           <Route path="/attendance" element={<Attendance />} />
//           <Route path="/leaves" element={<Leaves />} />
//           <Route path="/holidays" element={<Holidays />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default UserRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes";
import DefaultLayout from "../Components/Layout/DefaultLayout";
import EmployeeDashboard from "../Components/User/dashboard/EmployeeDashboard";
import Attendance from "../Components/User/Employee Tracking/Attendance/Attendance";
import Leaves from "../Components/User/Employee Tracking/Leaves/Leaves";
import Holidays from "../Components/User/Employee Tracking/Holidays/Holidays";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Ensure Protected Route wraps all routes */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route element={<DefaultLayout isAdmin={false} />}>
          <Route path="user-dashboard" element={<EmployeeDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="holidays" element={<Holidays />} />
        </Route>
      </Route>
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="user-dashboard" />} />
    </Routes>
  );
};

export default UserRoutes;
