import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FaPlus } from "react-icons/fa";

import axios from "axios";

// After Dialog box Search and display leaves dependency here

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Box,
  Typography,
  Select,
} from "@mui/material";

import { FormControl, InputLabel } from "@mui/material";
import AvatarMale from "../../../assets/admin/Avatar Male.jpg";
import AvatarFemale from "../../../assets/admin/Avtar Female.jpg";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// After Dialog box Search and display leaves dependency here

function Leaves() {
  // ! Apply Leaves From start  Here
  const [alertOpen, setAlertOpen] = useState(false); // Success alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // State for Snackbar message
  const [alertSeverity, setAlertSeverity] = useState("success"); // State for Snackbar severity (success or error)
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    email: "",
    leaveType: "",
    fromDate: null,
    toDate: null,
    reason: "",
    approvedBy: "",
  });

  const [errors, setErrors] = useState({});

  const leaveTypes = ["CASUAL", "SICK", "PAID"];
  const approvals = ["HR", "Manager", "Team Leader"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleChange = (field, value) => {
    // Update formData and clear the error for the specific field
    setFormData({ ...formData, [field]: value });

    // Clear error for the current field
    setErrors({ ...errors, [field]: "" });

    // Validate the entire form as the field changes
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    // Real-time validation based on the field
    switch (field) {
      case "employeeName":
        if (!value || typeof value !== "string" || value.trim() === "") {
          newErrors.employeeName =
            "Employee name is required and must be a valid string.";
        } else {
          delete newErrors.employeeName;
        }
        break;

      case "employeeId":
        if (!value) {
          newErrors.employeeId = "Employee ID is required.";
        } else {
          delete newErrors.employeeId;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Enter a valid email address.";
        } else {
          delete newErrors.email;
        }
        break;

      case "leaveType":
        if (!value) {
          newErrors.leaveType = "Select a leave type.";
        } else {
          delete newErrors.leaveType;
        }
        break;

      // Validate 'fromDate' and 'toDate'
      case "fromDate":
        const today = new Date(); // Define today's date once here
        if (!value) {
          newErrors.fromDate = "From date is required.";
        } else if (
          formData.toDate &&
          new Date(value) > new Date(formData.toDate)
        ) {
          newErrors.fromDate = "From date cannot be later than To date.";
        } else {
          delete newErrors.fromDate;
        }
        break;

      case "toDate":
        if (!value) {
          newErrors.toDate = "To date is required.";
        } else if (
          formData.fromDate &&
          new Date(value) < new Date(formData.fromDate)
        ) {
          newErrors.toDate = "To date cannot be earlier than From date.";
        } else {
          delete newErrors.toDate;
        }
        break;

      case "reason":
        if (!value) {
          newErrors.reason = "Reason is required.";
        } else {
          delete newErrors.reason;
        }
        break;

      case "approvedBy":
        if (!value) {
          newErrors.approvedBy = "Select an approver.";
        } else {
          delete newErrors.approvedBy;
        }
        break;

      default:
        break;
    }

    // Update errors state
    setErrors(newErrors);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeName)
      newErrors.employeeName = "Employee name is required.";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.leaveType) newErrors.leaveType = "Select a leave type.";
    if (!formData.fromDate) newErrors.fromDate = "From date is required.";
    if (!formData.toDate) newErrors.toDate = "To date is required.";
    if (
      formData.fromDate &&
      formData.toDate &&
      formData.toDate < formData.fromDate
    )
      newErrors.toDate = "To date cannot be earlier than From date.";
    if (!formData.reason) newErrors.reason = "Reason is required.";
    if (!formData.approvedBy) newErrors.approvedBy = "Select an approver.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };

  // Submit form data
  const Apply_leaves_Api =
    "http://localhost:8080/applyLeave";

  const handleSubmit = async () => {
    if (validateForm()) {
      // Format the date fields
      const formattedFormData = { ...formData };

      // Format 'fromDate' and 'toDate' if they exist
      if (formData.fromDate) {
        const date = new Date(formData.fromDate);
        formattedFormData.fromDate = date.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
        console.log("Formatted From Date:", formattedFormData.fromDate); // Log formatted date
      }

      if (formData.toDate) {
        const date = new Date(formData.toDate);
        formattedFormData.toDate = date.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
        console.log("Formatted To Date:", formattedFormData.toDate); // Log formatted date
      }

      console.log("Formatted Form Data:", formattedFormData); // Log the entire form data

      try {
        const response = await fetch(Apply_leaves_Api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedFormData),
        });

        // Check if the response is not OK (status is not 2xx)
        if (!response.ok) {
          // Capture response error message (if any)
          const responseBody = await response.json();
          console.error("Error response from server:", responseBody); // Log the detailed error response

          // Throw an error with the status and message from the server
          throw new Error(
            `Error: ${response.status} - ${responseBody.message || "No message provided"}`
          );
        }

        // If request is successful, log the result
        const result = await response.json();
        console.log("Form Submitted Successfully:", result);

        // Reset form on success
        setFormData({
          employeeName: "",
          employeeId: "",
          email: "",
          leaveType: "",
          fromDate: null,
          toDate: null,
          reason: "",
          approvedBy: "",
        });
        setAlertMessage("Leave Apply successfully!");
        setAlertSeverity("success");
        setAlertOpen(true); // Show success alert
        handleClose(); // Close the form after submission
      } catch (error) {
        console.error("Error submitting form:", error.message); // Log the error message
        // Display error alert with backend error message
        setAlertMessage(error.message || "Failed to apply for leave.");
        setAlertSeverity("error");
        setAlertOpen(true); // Show error alert
      }
    }
  };

  // Submit from data  apply Leaves data  back-end  start here

  //! apply leaves End here

  //! Display card fetch api start  here

  const [cardLeavesData, setCardLeavesData] = useState([]);

  const All_Leaves_Data_Cards = `http://localhost:8080/findAbsentEmployees`;

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(All_Leaves_Data_Cards) // Replace with your API endpoint
      .then((response) => {
        console.log(response);
        // setCardLeavesData(response.data); // Store the response data in cardLeavesData state
        // console.log(cardLeavesData)
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, []);

  //! Display card fetch api end   here

  //! Filtering leaves start here

  const leaveStatuses = ["PENDING", "APPROVED", "NOT APPROVED"];

  const [filters, setFilters] = useState({
    employeeId: "", // Updated from empId to employeeId
    leaveType: "",
    leaveStatus: "",
    fromDate: null,
    toDate: null,
    searchText: "", // New field for keyword-based search
  });

  const [rows, setRows] = useState([]); // Initialize as an empty array
  const [filteredRows, setFilteredRows] = useState([]); // Initialize as an empty array
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const All_Employee_Leaves_Data = `http://localhost:8080/findAllLeave`;
  useEffect(() => {
    axios
      .get(All_Employee_Leaves_Data) // Replace with your backend API endpoint
      .then((response) => {
        console.log(response.data.data);
        setRows(response.data.data || []);
        console.log(rows); // Ensure data is an array
        setFilteredRows(response.data.data || []);
        console.log(filteredRows); // Ensure filteredRows is an array
      })
      .catch((error) => console.error("Error fetching leave data:", error));
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
  const handleSearch = () => {
    console.log("Filters:", filters); // Debug filters
    const { employeeId, leaveType, leaveStatus, fromDate, toDate, searchText } =
      filters;

    const filtered = rows.filter((row) => {
      // Generic keyword search
      const matchesSearchText = searchText
        ? Object.values(row).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        : true;

      // Filter by Employee ID
      const matchesEmployeeId = employeeId
        ? row.employee.id
            .toString()
            .toLowerCase()
            .includes(employeeId.toLowerCase())
        : true;

      // Filter by Leave Type
      const matchesLeaveType = leaveType ? row.leaveType === leaveType : true;

      // Filter by Leave Status
      const matchesLeaveStatus = leaveStatus
        ? row.status === leaveStatus
        : true;

      // Filter by Date Range
      const matchesDateRange =
        (!fromDate || new Date(row.from) >= new Date(fromDate)) &&
        (!toDate || new Date(row.to) <= new Date(toDate));

      console.log({
        matchesSearchText,
        matchesEmployeeId,
        matchesLeaveType,
        matchesLeaveStatus,
        matchesDateRange,
      }); // Debug match results

      return (
        matchesSearchText &&
        matchesEmployeeId &&
        matchesLeaveType &&
        matchesLeaveStatus &&
        matchesDateRange
      );
    });

    console.log("Filtered Results:", filtered); // Debug final filtered results
    setFilteredRows(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to update leave status
  const handleStatusChange = (leaveId, newStatus) => {
    console.log(leaveId, newStatus);
    const updatedRows = rows.map((row) =>
      row.leaveId === leaveId ? { ...row, leaveStatus: newStatus } : row
    );
    setRows(updatedRows);
    setFilteredRows(updatedRows); // Make sure the filtered rows are updated

    // !  update Leaves  Status
    const Update_Leaves_Status_Api = `http://localhost:8080/leaveStatus`;

    // Send the updated status to the backend
    axios
      .put(`${Update_Leaves_Status_Api}`, {
        leaveId: leaveId,
        leaveStatus: newStatus,
      })
      .then((response) => {
        console.log("Leave status updated:", response.data);
        console.log("Send Data:", { leaveId, status: newStatus });
        setAlertMessage("Leave status updated successfully!");
        setAlertSeverity("success");
        setAlertOpen(true); // Show success alert
      })
      .catch((error) => {
        console.error("Error updating leave status:", error);
      });
  };

  const getStatusColor = (status, isHoverOrActive = false) => {
    const normalizedStatus = status.trim().toUpperCase(); // Normalize for consistency

    const baseColor = {
      APPROVED: "#4caf50", // Green
      "NOT APPROVED": "#f44336", // Red
      PENDING: "#ff9800", // Orange
    };

    const darkenColor = {
      APPROVED: "#388e3c",
      "NOT APPROVED": "#d32f2f",
      PENDING: "#f57c00",
    };

    return isHoverOrActive
      ? darkenColor[normalizedStatus] || "#000"
      : baseColor[normalizedStatus] || "#000";
  };

  //  add a function send the data back end

  // ! Display Apply Leaves Data And Also Update Leaves status  end  Here

  return (
    <div Name="p-4">
      {/* Leave Summary */}
      <div className="mb-6 flex justify-between items-center max-md:flex-col">
        <div>
          <h6 className="text-2xl font-semibold text-[#b17f27]">Leaves</h6>
          <div className="text-sm text-[#b17f27]">Dashboard / Leaves</div>
        </div>

        <Button
          className="max-md:mt-4 w-full sm:w-auto"
          variant="contained"
          startIcon={<FaPlus />}
          onClick={handleOpen}
          sx={{
            textTransform: "capitalize",
            borderRadius: "20px",
            height: "40px",
            backgroundColor: "#b17f27",
            color: "#fff", // Ensure the text is visible against the background
            "&:hover": {
              backgroundColor: "#a76e24", // Slightly darker shade for hover effect
            },
            "@media (max-width: 768px)": {
              marginTop: "16px", // Alternative if Tailwind isn't working in your setup
            },
          }}
        >
          Apply Leave
        </Button>
      </div>

      {/* & Apply Leaves  Dialog Box Start Here */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for Leave</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee ID"
            fullWidth
            margin="normal"
            value={formData.employeeId}
            onChange={(e) => handleChange("employeeId", e.target.value)}
            error={!!errors.employeeId}
            helperText={errors.employeeId}
          />
          <TextField
            label="Employee Name"
            fullWidth
            margin="normal"
            value={formData.employeeName}
            onChange={(e) => handleChange("employeeName", e.target.value)}
            error={!!errors.employeeName}
            helperText={errors.employeeName}
          />
          <TextField
            label="Employee Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            select
            label="Leave Type"
            fullWidth
            margin="normal"
            value={formData.leaveType}
            onChange={(e) => handleChange("leaveType", e.target.value)}
            error={!!errors.leaveType}
            helperText={errors.leaveType}
          >
            {leaveTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              value={formData.fromDate}
              onChange={(date) => handleChange("fromDate", date)}
              minDate={new Date()} // Disable dates before today
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.fromDate}
                  helperText={errors.fromDate}
                />
              )}
            />
            <DatePicker
              label="To Date"
              value={formData.toDate}
              onChange={(date) => handleChange("toDate", date)}
              minDate={new Date()} // Disable dates before today
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.toDate}
                  helperText={errors.toDate}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            label="Reason"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            error={!!errors.reason}
            helperText={errors.reason}
          />
          <TextField
            select
            label="Approval"
            fullWidth
            margin="normal"
            value={formData.approvedBy}
            onChange={(e) => handleChange("approvedBy", e.target.value)}
            error={!!errors.approvedBy}
            helperText={errors.approvedBy}
          >
            {approvals.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Alert */}
      {/* Success or Error Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000} // Automatically close after 5 seconds
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Display at the top-center
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity} // Dynamically set severity (success or error)
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* Apply Leaves  Dialog Box Start Here */}

      {/* //   display leaves dependency here */}
      <Box p={3}>
        {/* All type leaves  Card Section Start  here */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="space-between"
          mb={3}
        >
          {cardLeavesData.map((metric, index) => (
            <Box
              key={index}
              flex="1 1 calc(25% - 16px)" // Adjust for responsiveness
              p={3}
              borderRadius={2}
              bgcolor="#f5f5f5"
              textAlign="center"
              boxShadow={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Subtle zoom effect on hover
                  boxShadow: 6, // Increase shadow on hover
                },
              }}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontWeight: "bold" }}
              >
                {metric.label}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold", color: "#b17f27" }}
              >
                {metric.value}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* All Type  Card Section End   here */}
        {/* Filters Section  start here*/}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          {/* Employee ID Filter */}
          <TextField
            label="Employee ID"
            variant="outlined"
            size="small"
            value={filters.empId}
            onChange={(e) => handleFilterChange("empId", e.target.value)}
            sx={{ flex: "1 1 200px" }}
          />

          {/* Leave Type Filter */}
          <TextField
            select
            label="Leave Type"
            variant="outlined"
            size="small"
            value={filters.leaveType}
            onChange={(e) => handleFilterChange("leaveType", e.target.value)}
            sx={{ flex: "1 1 200px" }}
          >
            {leaveTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Leave Status Filter */}
          <TextField
            select
            label="Leave Status"
            variant="outlined"
            size="small"
            value={filters.leaveStatus}
            onChange={(e) => handleFilterChange("leaveStatus", e.target.value)}
            sx={{ flex: "1 1 200px" }}
          >
            {leaveStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {/* From Date Filter */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From"
              value={filters.fromDate}
              onChange={(date) => handleFilterChange("fromDate", date)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{ flex: "1 1 200px" }}
            />
          </LocalizationProvider>

          {/* To Date Filter */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To"
              value={filters.toDate}
              onChange={(date) => handleFilterChange("toDate", date)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{ flex: "1 1 200px" }}
            />
          </LocalizationProvider>

          {/* Search Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            sx={{
              flex: "1 1 200px",
              maxWidth: "150px",
              backgroundColor: "#A76E24", // Set the background color to #A76E24
              color: "white", // Set the text color to white for better contrast
              "&:hover": {
                backgroundColor: "#8c5a1e", // Darken the color on hover (you can adjust this shade if needed)
              },
            }}
          >
            Search
          </Button>
        </Box>
        {/* Filters Section  end here*/}
      </Box>
      {/* // After Dialog box Search and disply leaves dependency here */}
      {/* // Table data and  leaves Status start   here */}

      {/* Table Section */}
      {/* Table Section */}
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <TableContainer
          sx={{ maxHeight: 440, borderRadius: 2, overflow: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  "& th": { fontWeight: "bold" },
                }}
              >
                <TableCell>Employee</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>

                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredRows) &&
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow
                      key={row.leaveId}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {row.employeeName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.employeeId}</TableCell>
                      <TableCell>{row.leaveType}</TableCell>
                      <TableCell>{row.fromDate}</TableCell>
                      <TableCell>{row.toDate}</TableCell>

                      <TableCell>{row.reason}</TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                          <Select
                            value={row.leaveStatus || "PENDING"} // Fallback value
                            onChange={(e) =>
                              handleStatusChange(row.leaveId, e.target.value)
                            } // Correct handler
                            label="Status"
                            sx={{
                              backgroundColor: getStatusColor(
                                row.leaveStatus || "PENDING"
                              ),
                              color: "white",
                              borderRadius: 1.5,
                              paddingRight: "3rem",
                              "& .MuiSelect-icon": {
                                color: "white",
                                transition: "transform 0.3s ease",
                              },
                              "&:hover": {
                                backgroundColor: getStatusColor(
                                  row.leaveStatus || "PENDING",
                                  true
                                ),
                                "& .MuiSelect-icon": {
                                  transform: "rotate(180deg)",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: 1.5,
                                borderTop: "none",
                              },
                              "&:focus": {
                                backgroundColor: getStatusColor(
                                  row.leaveStatus || "PENDING",
                                  true
                                ),
                                borderColor: "#3f51b5",
                                boxShadow: "0 0 5px rgba(63, 81, 181, 0.7)",
                              },
                              "&:active": {
                                transform: "scale(1.05)",
                                backgroundColor: getStatusColor(
                                  row.leaveStatus || "PENDING",
                                  true
                                ),
                              },
                              transition:
                                "background-color 0.3s, transform 0.2s ease, box-shadow 0.3s",
                            }}
                          >
                            {["PENDING", "APPROVED", "NOT APPROVED"].map(
                              (status) => (
                                <MenuItem
                                  key={status}
                                  value={status}
                                  sx={{
                                    backgroundColor: getStatusColor(status),
                                    color: "black",
                                    fontWeight: "bold",
                                    "&:hover": {
                                      backgroundColor: getStatusColor(
                                        status,
                                        true
                                      ),
                                      color: "white",
                                    },
                                  }}
                                >
                                  {status}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // sx={{
          //   '.MuiTablePagination-select': { backgroundColor: '#3f51b5', color: 'white' },
          //   '.MuiTablePagination-actions': { color: '#3f51b5' },
          // }}
        />
      </Paper>

      {/* // Table data and  leaves Status End   here*/}
    </div>
  );
}

export default Leaves;
