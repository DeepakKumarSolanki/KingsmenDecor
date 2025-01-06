import React from "react";
import { FaPlus } from "react-icons/fa";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
// dialog box start decency

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// dialog box end decency

// Leave type dependency
import { Box, Card, CardContent, Typography } from "@mui/material";
import ManagerApprovedLeaves from "./Manager Approved Leaves/ManagerApprovedLeaves";

// Leave type dependency

function Leaves() {
  const [activeTab, setActiveTab] = useState("leaves");
  const [leaves, setLeaves] = useState({
    CasualLeaveBalance: 0,
    EmergencyLeaveBalance: 0,
    PaidLeaveBalance: 0,
    SickLeaveBalance: 0,
  });
  const [employeeId, setemployeeId] = useState("EMP002"); // Example employee ID

// Card Data Start Here 


const Leaves_Card_Data_Api =
"http://localhost:8080/employeePendingLeave";

// Function to fetch leave data from the API based on employeeId
const fetchLeaveDataFromAPI = async (employeeId) => {
try {
  // Send a GET request to the API with employeeId (if needed in the URL)
  const response = await fetch(
    `${Leaves_Card_Data_Api}?employeeId=${employeeId}`
  ); // Modify if API needs employeeId in query string
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json(); // Parse the JSON data from the response
  console.log(data);
  return data; // Return the fetched data
} catch (error) {
  console.error("Error fetching leave data:", error);
  return []; // Return empty array in case of error
}
};

// Function to load leave data based on employeeId
const loadLeaveData = async (id) => {
const data = await fetchLeaveDataFromAPI(id); // Fetch the leave data using employeeId
setLeaves(data.data); // Set the fetched data into state
console.log("Reaming Levas ==============",leaves)
};

// useEffect to load data whenever employeeId changes
useEffect(() => {
loadLeaveData(employeeId); // Fetch the leave data when the component mounts or employeeId changes
}, [employeeId]);

// Card Data end Here 
























  // States for displaying data


 

  // Leaves table dependency  start here

  const columns = [
    { id: "leaveType", label: "Leave Type", minWidth: 150 },
    { id: "fromDate", label: "From", minWidth: 100 },
    { id: "toDate", label: "To", minWidth: 100 },

    { id: "reason", label: "Reason", minWidth: 200 },
    { id: "leaveStatus", label: "Status", minWidth: 100 },
    { id: "approvedBy", label: "Approved By", minWidth: 150 },
  ];

  // Function to fetch leave data from backend

  // Employees Leaves Type Data  start here
  const All_Leaves_Api =
  "http://localhost:8080/getEmployeeLeaveRecord";

const fetchLeaveData = (employeeID) => {
  return fetch(`${All_Leaves_Api}?employeeId=${employeeID}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching leave data:", error);
      return [];
    });
};

const [rows, setRows] = useState([]);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const isMobile = useMediaQuery("(max-width:600px)");

// Fetch leave data when the component mounts
useEffect(() => {
  const employeeID = "EMP002"; // Replace with dynamic employee ID if needed
  fetchLeaveData(employeeID).then((data) => {
    console.log("Employee All Leaves Data", data);
    setRows(data.data); // Corrected here
  });
}, []);

// Log rows after state update (useEffect to watch changes)
useEffect(() => {
  console.log("Updated rows:", rows);
}, [rows]);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

  // Leaves table dependency end here

  // apply leaves start here

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    leaveType: "",
    fromDate: null,
    toDate: null,
    reason: "",
    approval: "",
  });

  const [errors, setErrors] = useState({});

  const leaveTypes = ["CASUAL", "SICK", "PAID"];
  const approvals = ["HR", "MANAGER"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to handle input changes and validate the form
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value); // Validate the field as it changes
  };

  // Function to validate each field on change
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const today = new Date();

    // Validate each field based on its name
    switch (field) {
      case "name":
        if (!value) {
          newErrors.name = "Employee name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = "Employee name must contain only letters.";
        } else {
          delete newErrors.name;
        }
        break;
      case "employeeId":
        if (!value) newErrors.employeeId = "Employee ID is required.";
        else delete newErrors.employeeId;
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
        if (!value) newErrors.leaveType = "Select a leave type.";
        else delete newErrors.leaveType;
        break;
      case "fromDate":
        const today = new Date();
        if (!value) {
          newErrors.fromDate = "From date is required.";
        } else if (new Date(value) < today) {
          newErrors.fromDate = "From date cannot be in the past.";
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
        } else if (new Date(value) < today) {
          newErrors.toDate = "To date cannot be in the past.";
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
        if (!value) newErrors.reason = "Reason is required.";
        else delete newErrors.reason;
        break;
      case "approval":
        if (!value) newErrors.approval = "Select an approver.";
        else delete newErrors.approval;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const newErrors = {};
    const today = new Date();

    if (!formData.name) {
      newErrors.name = "Employee name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Employee name must contain only letters.";
    }

    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.leaveType) newErrors.leaveType = "Select a leave type.";

    if (!formData.fromDate) {
      newErrors.fromDate = "From date is required.";
    } else if (new Date(formData.fromDate) < today) {
      newErrors.fromDate = "From date cannot be in the past.";
    } else if (
      formData.toDate &&
      new Date(formData.fromDate) > new Date(formData.toDate)
    ) {
      newErrors.fromDate = "From date cannot be later than To date.";
    }

    if (!formData.toDate) {
      newErrors.toDate = "To date is required.";
    } else if (new Date(formData.toDate) < today) {
      newErrors.toDate = "To date cannot be in the past.";
    } else if (
      formData.fromDate &&
      new Date(formData.toDate) < new Date(formData.fromDate)
    ) {
      newErrors.toDate = "To date cannot be earlier than From date.";
    }

    if (!formData.reason) newErrors.reason = "Reason is required.";
    if (!formData.approval) newErrors.approval = "Select an approver.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // API URL for applying leaves
  const Apply_leaves_Api =
    "http://localhost:8080/applyLeave";

  // Submit form data to the backend
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`${Apply_leaves_Api}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log(formData);
        console.log("Form Submitted Successfully:", result);

        // Reset form on success
        setFormData({
          name: "",
          employeeId: "",
          email: "",
          leaveType: "",
          fromDate: null,
          toDate: null,
          reason: "",
          approval: "",
        });

        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error.message);
        // Optionally, handle error (e.g., show error notification)
      }
    }
  };

  // Submit from data  apply Leaves data  back-end  start here

  // apply leaves End here

  const { CasualLeaveBalance = 0, EmergencyLeaveBalance = 0, PaidLeaveBalance = 0, SickLeaveBalance = 0 } = leaves || {};



  return (
    <div className="p-6 bg-transparent min-h-screen">
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

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for Leave</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Employee ID"
            fullWidth
            margin="normal"
            value={formData.employeeId}
            onChange={(e) => handleChange("employeeId", e.target.value)}
            error={!!errors.employeeId}
            helperText={errors.empemployeeId}
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
              minDate={new Date()} // Disable dates before today
              onChange={(date) => handleChange("fromDate", date)}
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
              minDate={new Date()} // Disable dates before today
              onChange={(date) => handleChange("toDate", date)}
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
            value={formData.approval}
            onChange={(e) => handleChange("approval", e.target.value)}
            error={!!errors.approval}
            helperText={errors.approval}
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

      {/* Leave Summary */}

      {/* type of Leaves  start here  */}

      {/* Leave type Start here  */}
      <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      gap={3} // Adjusted gap for better spacing
      marginTop={4}
      marginBottom={4}
    >
      {/* Sick Leave Card */}
      <Box
        flex="1 1 calc(25% - 16px)"
        minWidth="250px"
      >
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Sick Leave
            </Typography>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#B17F27",
                fontSize: "2rem",
              }}
            >
              {SickLeaveBalance}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Casual Leave Card */}
      <Box
        flex="1 1 calc(25% - 16px)"
        minWidth="250px"
      >
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Casual Leave
            </Typography>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#B17F27",
                fontSize: "2rem",
              }}
            >
              {CasualLeaveBalance}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Paid Leave Card */}
      <Box
        flex="1 1 calc(25% - 16px)"
        minWidth="250px"
      >
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Paid Leave
            </Typography>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#B17F27",
                fontSize: "2rem",
              }}
            >
              {PaidLeaveBalance}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Unpaid Leave Card */}
      <Box
        flex="1 1 calc(25% - 16px)"
        minWidth="250px"
      >
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Emergency Leave
            </Typography>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#B17F27",
                fontSize: "2rem",
              }}
            >
              {EmergencyLeaveBalance}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>

      {/* Leave type Start here  */}

      {/* Type Of  Leaves  end  */}
      {/* table data start here  */}
      {/* Switch Tab start here  */}
      <div className="flex space-x-4 border-b border-gray-300 mb-4">
        <button
          className={`py-2 px-4 font-semibold text-lg ${
            activeTab === "leaves"
              ? "text-golden border-b-2 border-golden"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("leaves")}
        >
          Leaves
        </button>

        {/* Conditionally render "Leaves for Approval" if the role is "manager" */}
        {"manager" === "manager" && (
          <button
            className={`py-2 px-4 font-semibold text-lg ${
              activeTab === "approval"
                ? "text-golden border-b-2 border-golden"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("approval")}
          >
            Leaves for Approval
          </button>
        )}
      </div>

      {/* Switch Tab start here  */}

      <div>
  {activeTab === "leaves" && (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: isMobile ? 2 : 3, // Adjust padding for mobile
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: 2, // Rounded corners
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
          overflowX: "auto", // Enable horizontal scrolling for smaller screens
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#B17F27", // Header background color
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{
                    minWidth: isMobile ? 100 : column.minWidth,
                    fontSize: isMobile ? "0.75rem" : "1rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    padding: "12px 16px",
                    backgroundColor: "#B17F27",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) && rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id || index} // Use a unique key if available
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id] || "N/A"; // Fallback for undefined values
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                          sx={{
                            fontSize: isMobile ? "0.7rem" : "0.9rem",
                            padding: "12px 16px",
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Array.isArray(rows) ? rows.length : 0} // Fallback for count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "#f9f9f9", // Pagination background
          color: "black",
          borderTop: "1px solid #ddd", // Separator from table
        }}
      />
    </Paper>
  )}
  {activeTab === "approval" && <ManagerApprovedLeaves />}
</div>


      {/* table End  here  */}
    </div>
  );
}

export default Leaves;
