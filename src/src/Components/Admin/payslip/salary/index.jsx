import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  CircularProgress,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import AddSalaryModal from "./AddSalaryModal";
import EditSalaryModal from "./EditSalaryModal";
import axios from "axios";
import { RiDownload2Line } from "react-icons/ri";

const EmployeeTable = ({}) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0); // Default page is 0
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [generateSalary, setGenerateSalary] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/getEmployeesSalary`
        );
      console.log(response.data.data);
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


  const handleCloseMenu = () => {
    setOpenDropdowns({});
  };

  const handleCloseEditModal = () => {
    setSelectedEmployeeData(null); 
    setIsEditModalOpen(false); 
    handleCloseMenu(); 
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); 
    handleCloseMenu(); 
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); 
    handleCloseMenu(); 
  };

  const handleAddEmployeeSalary = async (newSalaryData) => {
    let allData = await axios.post(
      "http://localhost:8080/getEmployeesSalary"
    );
    console.log(allData);
    console.log("New Salary Data Added:", newSalaryData);
  };

  const handleUpdateSalary = async (updatedEmployeeData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/editEmployeeSalary`,
        updatedEmployeeData
      );
      console.log("Updated Employee Data:", response.data);

      // Update the state with the modified employee
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.employeeId === updatedEmployeeData.employeeId
            ? { ...emp, ...response.data }
            : emp
        )
      );
      setEmployees(employees);
      setIsEditModalOpen(false); 
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };



  const toggleDropdown = (employeeId) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (payrollId) => {
    try {
      // Make the DELETE request using payrollId
      const response = await axios.delete(
        `http://localhost:8080/deleteEmployeeSalary/${payrollId}`
      );

      console.log("Employee salary deleted:", response.data);

      // Update the state by filtering out the deleted employee's salary using payrollId
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.payrollId !== payrollId)
      );

      // Close the delete modal after deleting
      setDeleteModalOpen(false);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting employee salary:", error);
    }
  };

  const handleStatusChange = async (payrollId, newStatus) => {
    try {
      const updatedEmployee = employees.find(
        (employee) => employee.payrollId === payrollId
      );

      if (updatedEmployee) {
        console.log(updatedEmployee)
        const response = await axios.put(
          `http://localhost:8080/approvedSalarySlip`,
          { ...updatedEmployee,payrollStatus: newStatus }
        );

        console.log(response)

        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.payrollId === payrollId
              ? { ...emp, payrollStatus: newStatus }
              : emp
          )
        );
      }
    } catch (error) {
      console.error("Error updating employee payrollStatus:", error);
    }
  };

  const downloadCSV = () => {
    if (!employees.length) return; 
  
    const headers = Object.keys(employees[0]);
  
    const rows = employees.map(employee => 
      headers.map(header => {
        return `"${employee[header] !== undefined && employee[header] !== null ? employee[header] : ""}"`;
      })
    );
  
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")) 
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    const link = document.createElement("a");
    const fileName = "employee_salaries.csv"; 
  
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click(); 
    }
  };
  
  
  
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between items-center pb-8">
        <div className="mb-4 lg:mb-0 text-golden">
          <h1 className="font-semibold text-2xl">Employee Salary</h1>
          <h2 className="text-md">
            Dashboard / <span className="text-golden">Salary</span>
          </h2>
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#b17f27] text-white rounded-lg flex items-center space-x-2"
          >
            <BiPlus className="text-xl" />
            <span>Add Salary</span>
          </button>
          <button onClick={downloadCSV} className="px-4 py-2 bg-[#b17f27] text-white rounded-lg flex items-center space-x-2">
            <RiDownload2Line className="text-xl" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddSalaryModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={handleCloseAddModal}
        onAddEmployeeSalary={handleAddEmployeeSalary}
      />

      <EditSalaryModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={handleCloseEditModal}
        selectedEmployeeData={selectedEmployeeData}
        onUpdateSalary={handleUpdateSalary}
      />

      {deleteModalOpen && selectedEmployeeData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg lg:w-1/3 w-3/5">
            <h5 className="text-xl font-semibold">
              Are you sure you want to delete {selectedEmployeeData.employeeId}?
            </h5>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCloseDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedEmployeeData.payrollId)} // Pass the correct employeeId
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <TextField
          label="Employee Name"
          variant="outlined"
          size="small"
          className="w-full"
        />
        <Select
          className="w-full"
          size="small"
          displayEmpty
          defaultValue=""
          variant="outlined"
        >
          <MenuItem value="">Department</MenuItem>
          <MenuItem value="TECH">TECH</MenuItem>
          <MenuItem value="MARKETING">MARKETING</MenuItem>
          <MenuItem value="SALES">SALES</MenuItem>
        </Select>
        <Select
          className="w-full"
          size="small"
          displayEmpty
          defaultValue=""
          variant="outlined"
        >
          <MenuItem value="">Leave Status</MenuItem>
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="APPROVED">APPROVED</MenuItem>
          <MenuItem value="REJECTED">REJECTED</MenuItem>
        </Select>
        <TextField
          label="Salary From"
          variant="outlined"
          size="small"
          type="date"
          className="w-full"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Salary To"
          variant="outlined"
          size="small"
          type="date"
          className="w-full"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button className="bg-golden w-full py-2 rounded-md text-white font-semibold text-md">
          Search
        </button>
      </div>

      {/* Table or Loading Indicator */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Payroll ID</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Payslip</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div>
                            <img
                              src="./avatar-02.jpg"
                              className="h-10 w-10 rounded-full"
                              alt=""
                            />
                          </div>
                          <div>
                            <p>{employee.employeeId}</p>
                            <p className="text-gray-500 text-sm">
                              {employee.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell>{employee.payrollId}</TableCell>
                      <TableCell>{employee.employeeName}</TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={employee.payrollStatus} // Default to "Pending"
                            onChange={(e) =>
                              handleStatusChange(
                                employee.payrollId,
                                e.target.value
                              )
                            }
                            style={{
                              color:
                                employee.payrollStatus === "Approved"
                                  ? "green"
                                  : employee.payrollStatus === "Rejected"
                                    ? "red"
                                    : "blue", // Pending
                            }}
                            displayEmpty
                          >
                            <MenuItem value="PENDING" style={{ color: "blue" }}>
                              Pending
                            </MenuItem>
                            <MenuItem
                              value="APPROVED"
                              style={{ color: "green" }}
                            >
                              Approved
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>

                      <TableCell>{employee.salary}</TableCell>
                      <TableCell>
                        <Link
                           to={`/payroll/${employee.employeeId}`} // Updated path
                           state={{ employeeData: generateSalary }} // Pass data using `state`
                           className="bg-[#b17f27] text-white py-2 px-2 rounded-lg lg:text-md text-sm"
                        >
                          Generate
                        </Link>
                      </TableCell>
                      <TableCell>
                        <CiMenuKebab
                          className="text-lg cursor-pointer"
                          onClick={() => toggleDropdown(employee.employeeId)}
                        />
                        {openDropdowns[employee.employeeId] && (
                          <div
                            className="absolute bg-white shadow-md w-32 rounded-md -mt-6"
                            onClick={handleCloseMenu}
                          >
                            <MenuItem
                              onClick={() => {
                                setSelectedEmployeeData(employee);
                                setIsEditModalOpen(true);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setSelectedEmployeeData(employee);
                                setDeleteModalOpen(true);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
