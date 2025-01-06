// import React from "react";
import { Routes, Route} from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext"; // Import your useAuth hook
import ProtectedRoute from "../ProtectedRoutes";
import Login from "../Components/Login";

// Admin Components
import AdminDashboard from "../Components/Admin/dashboard/AdminDashboard";
import Employee from "../Components/Admin/Employee/Employee";
import Holidays from "../Components/Admin/Holidays/Holidays";
import Leaves from "../Components/Admin/Leaves/Leaves";
import Attendance from "../Components/Admin/Attendance/Attendance";
import Timesheet from "../Components/Timesheet/Timesheet";
// import Activities from "../Components/Activities/Activities";
import Reimbursement from "../Components/Admin/payslip/employeeReimbursement/Reimbursement";
import EmployeeExpenses from "../Components/Admin/payslip/expenses/EmployeeExpences"
import PayslipOverview from "../Components/Admin/payslip/overviewOfPayslip/PayslipOverview";
import PaySlipDocs from "../Components/Admin/payslip/salary/PaySlipDocs";
import EmployeeTable from "../Components/Admin/payslip/salary/index";
import Policies from "../Components/Admin/Policies/Policies";
import ResignationAdminPanel from "../Components/Admin/Resignation-admin/ResignationAdminPanel";
import Termination from "../Components/Admin/Termination/Termination";
import TicketView from "../Components/TicketView/index";
import Tickets from "../Components/ticket/index";
import AdminActivities from "../Components/Admin/Activities/Activities"
import Admincalander from "../Components/Admin/Calender/Calender"
import AdminAssets from "../Components/Admin/Assest-admin/Asset-admin"
import AdminOnsite from "../Components/Admin/OnsiteAdminPanel/Onsite"
// User Components
import UserDashboard from "../Components/User/dashboard/DashboardView";
import UserLeaves from "../Components/User/Employee Tracking/Leaves/Leaves";
import UserAttendance from "../Components/User/Employee Tracking/Attendance/Attendance";
import UserHolidays from "../Components/User/Employee Tracking/Holidays/Holidays";
import SalaryRecord from "../Components/User/salary/SalaryRecord";
import UserPolicies from "../Components/User/Policies/Policies"
import EmployeeSalarySlip from "../Components/User/salary/EmployeeSalarySlip";
import ReimbursementOfEmployee from "../Components/User/expense/ReimbursementOfEmployee";
import Resignation from "../Components/User/Resignation/Resignation";
import Assest from "../Components/Admin/Assest-admin/Asset-admin";
import KnowledgeBase from "../Components/Admin/KnowledgeBase-admin/KnowledgeBaseAdmin";
import UserKnowledgebase from "../Components/User/KnowledgeBase/KnowledgeBase";
import CourseList from "../Components/User/courses/courseList/CourseList";
import UserActivities from "../Components/User/Employee Tracking/Activities/Activities"
import UserCalandar from "../Components/User/Calender/Calender"
import UserAssets from "../Components/User/Assets-emp/Asset-emp"
import UserOnsite from "../Components/User/Onsite/Onsite"
// import TakeQuiz from "../Components/User/courses/quizList/QuizComponent"
import QuizComponent from "../Components/User/courses/quizList/QuizComponent";

import UltimateUserProfile from "../Components/User/Profile-emp/Profile"
const AllRoutes = () => {
  const { authState } = useAuth(); // Get authState from context
  const { isAuth, role } = authState;
console.log(role)
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {role === "ADMIN" && (
        <>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UltimateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/holidays"
            element={
              <ProtectedRoute>
                <Holidays />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <ProtectedRoute>
                <Leaves />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timesheet"
            element={
              <ProtectedRoute>
                <Timesheet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <AdminActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reimbursement"
            element={
              <ProtectedRoute>
                <Reimbursement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <EmployeeTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeeExpences"
            element={
              <ProtectedRoute>
                <EmployeeExpenses />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/payslipOverview"
            element={
              <ProtectedRoute>
                <PayslipOverview />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/payroll/:id"
            element={
              <ProtectedRoute>
                <PaySlipDocs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <ProtectedRoute>
                <Policies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resignation"
            element={
              <ProtectedRoute>
                <ResignationAdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/termination"
            element={
              <ProtectedRoute>
                <Termination />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket/:id"
            element={
              <ProtectedRoute>
                <TicketView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <ProtectedRoute>
                <Policies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <Assest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledgeBase"
            element={
              <ProtectedRoute>
                <KnowledgeBase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Admincalander />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onsite"
            element={
              <ProtectedRoute>
                <AdminOnsite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <AdminAssets />
              </ProtectedRoute>
            }
          />
        </>
      )}
      {(role === "EMPLOYEE" || role==="MANAGER") && (
        <>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <UserAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <ProtectedRoute>
                <UserLeaves />
              </ProtectedRoute>
            }
          />
          <Route
            path="/holidays"
            element={
              <ProtectedRoute>
                <UserHolidays />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <SalaryRecord />
              </ProtectedRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UltimateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll/:id"
            element={
              <ProtectedRoute>
                <EmployeeSalarySlip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reimbursement"
            element={
              <ProtectedRoute>
                <ReimbursementOfEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket/:id"
            element={
              <ProtectedRoute>
                <TicketView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timesheet"
            element={
              <ProtectedRoute>
                <Timesheet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <UserActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <ProtectedRoute>
                <UserPolicies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resignation"
            element={
              <ProtectedRoute>
                <Resignation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledgeBase"
            element={
              <ProtectedRoute>
                <UserKnowledgebase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/takeQuiz"
            element={
              <ProtectedRoute>
                <QuizComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <UserCalandar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onsite"
            element={
              <ProtectedRoute>
                <UserOnsite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <UserAssets />
              </ProtectedRoute>
            }
          />
        </>
      )}
      {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
    </Routes>
  );
};

export default AllRoutes;
