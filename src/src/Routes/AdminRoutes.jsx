// // import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../ProtectedRoutes";
// import DefaultLayout from "../Components/Layout/DefaultLayout";
// import AdminDashboard from "../Components/Admin/dashboard/AdminDashboard";
// import Employee from "../components/Admin/employee/Employee";
// import Holidays from "../components/Admin/holidays/Holidays";
// import Leaves from "../components/Admin/leaves/Leaves";
// import Attendance from "../components/Admin/attendance/Attendance";
// import Timesheet from "../Components/Timesheet/Timesheet";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route element={<ProtectedRoute role="admin" />}>
//         <Route element={<DefaultLayout isAdmin={true} />}>
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/employees" element={<Employee />} />
//           <Route path="/holidays" element={<Holidays />} />
//           <Route path="/leaves" element={<Leaves />} />
//           <Route path="/attendance" element={<Attendance />} />
//           <Route path="/timesheet" element={<Timesheet />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;
import { Routes, Route,Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes";
import DefaultLayout from "../Components/Layout/DefaultLayout";
import AdminDashboard from "../Components/Admin/dashboard/AdminDashboard";
import Employee from "../components/Admin/employee/Employee";
import Holidays from "../components/Admin/holidays/Holidays";
import Leaves from "../components/Admin/leaves/Leaves";
import Attendance from "../components/Admin/attendance/Attendance";
import Timesheet from "../Components/Timesheet/Timesheet";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Ensure Protected Route wraps all routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<DefaultLayout isAdmin={true} />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employee />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timesheet" element={<Timesheet />} />
        </Route>
      </Route>
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="admin-dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
