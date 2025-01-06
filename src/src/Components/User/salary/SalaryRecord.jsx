import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

function SalaryRecord() {
  const [page, setPage] = useState(0);
  const [generateSalary, setGenerateSalary] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [payrollDetails, setPayrollDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

  // Fetch payroll details when the component mounts
  useEffect(() => {
    const fetchPayrollDetails = async () => {
      if (!authState.isAuth || !authState.userDetails) {
        return;
      }

      setLoading(true);
      const employeeId = authState.userDetails.employeeId; // Get employeeId from userDetails

      try {
        const response = await axios.get(
            `http://localhost:8080/getSalary?employeeId=${employeeId}`
        );
       // console.log("Fetched Payroll Data:", response.data);
        setPayrollDetails(response.data.data); // Set payroll details to state
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollDetails();
  }, [authState.isAuth, authState.userDetails]);



  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between pb-8">
        <div>
          <h1 className="font-semibold text-2xl">Employee Salary</h1>
          <h2 className="text-md">
            Dashboard / <span>Salary</span>
          </h2>
        </div>
      </div>

      {/* Display Payroll Details Table */}
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Payroll Id</TableCell>
                <TableCell>Gross Salary</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Payslip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollDetails ? (
                <TableRow key={payrollDetails.payrollId}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div>
                        <p>{payrollDetails.employeeName}</p>
                        <p className="text-gray-500 text-sm">{payrollDetails.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{payrollDetails.employeeId}</TableCell>
                  <TableCell>{payrollDetails.department}</TableCell>
                  <TableCell>{payrollDetails.payrollId}</TableCell>
                  <TableCell>{payrollDetails.grossSalary}</TableCell>
                  <TableCell>{payrollDetails.location}</TableCell>
                  <TableCell>
                    <Link
                       to={`/payroll/${payrollDetails.employeeId}`}
                       state={{ownSalarySlip: generateSalary}}
                      disabled={payrollDetails.payrollStatus !== "APPROVED"} // Disable button if status is not "APPROVED"
                      className={`${payrollDetails.payrollStatus === "APPROVED"
                          ? "bg-[#b17f27] text-white"
                          : "bg-gray-400 text-gray-200"
                        } py-2 px-4 rounded-md`}
                    >
                      Generate
                    </Link>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No Payroll Data Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination (Optional, for future use with multiple employees) */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={payrollDetails ? 1 : 0} // Update the count based on payrollDetails
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default SalaryRecord;
