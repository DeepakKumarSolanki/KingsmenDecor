import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FaPlus } from "react-icons/fa";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import axios from "axios"; // Ensure axios is installed via `npm install axios`
import { Select, InputLabel, FormControl } from "@mui/material";

function Attendance() {
  // Add Manual Attendance start here

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    firstPunchIn: null, // New field for first punch-in time
  });
  
  const [errors, setErrors] = useState({});
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear errors for the field
  };
  
  const validate = () => {
    const validationErrors = {};
    if (!formData.employeeName)
      validationErrors.employeeName = "Employee Name is required.";
    if (!formData.employeeID)
      validationErrors.employeeID = "Employee ID is required.";
    if (!formData.firstPunchIn)
      validationErrors.firstPunchIn = "First Punch In time is required.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;
  
    // Format the firstPunchIn to ISO string
    const formattedFirstPunchIn = formData.firstPunchIn
      ? new Date(formData.firstPunchIn).toISOString() // Convert to ISO string
      : null;
  
    // Prepare the data object to only include the required fields
    const dataToSend = {
      firstPunchIn: formattedFirstPunchIn,
      employeeName: formData.employeeName,
      employeeId: formData.employeeID,
    };
  
    const Add_Manual_Attendance = `http://localhost:8080/attendanceCalculator`;
  
    try {
      console.log(dataToSend); // Log the formatted data before sending
      const response = await axios.post(Add_Manual_Attendance, dataToSend);
      alert("Attendance submitted successfully!");
      setFormData({
        employeeName: "",
        employeeID: "",
        firstPunchIn: null, // Reset firstPunchIn after submit
      });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };
  
  

  // Add Manual Attendance end here

  // State for attendance data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [formValues, setFormValues] = useState({ month: "", year: "" });

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];

  // Fetch all attendance data

  const All_Employee_Attendance_Data = `http://localhost:8080/getAttendanceForMonth`;

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${All_Employee_Attendance_Data}`);
      const result = await response.json();
      console.log("Hello");
      console.log(result);

      if (response.ok) {
        // setData(result || []);
        // setFilteredData(result || []);
        console.log(data);
      } else {
        console.error(result.message || "Failed to fetch data");
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Filter data whenever form values change
  useEffect(() => {
    const { month, year } = formValues;

    const filtered = data.filter((row) => {
      const matchesMonth = month ? row.month === month : true;
      const matchesYear = year ? row.year === year : true;
      return matchesMonth && matchesYear;
    });

    setFilteredData(filtered);
  }, [formValues, data]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="p-4 bg-transparent min-h-screen">
      <div className="mb-6 flex justify-between items-center max-md:flex-col">
        <div>
          <h6 className="text-2xl font-semibold text-[#b17f27]">Attendance</h6>
          <div className="text-sm text-[#b17f27]">Dashboard / Attendance</div>
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
          add Attendance
        </Button>
      </div>

      {/* add manual attendance */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Add Manual Attendance</DialogTitle>
  <DialogContent>
    {/* Employee Name Input */}
    <TextField
      label="Employee Name"
      fullWidth
      margin="normal"
      value={formData.employeeName}
      onChange={(e) => handleChange("employeeName", e.target.value)}
      error={!!errors.employeeName}
      helperText={errors.employeeName}
    />

    {/* Employee ID Input */}
    <TextField
      label="Employee ID"
      fullWidth
      margin="normal"
      value={formData.employeeID}
      onChange={(e) => handleChange("employeeID", e.target.value)}
      error={!!errors.employeeID}
      helperText={errors.employeeID}
    />

    {/* First Punch In Input */}
    <TextField
      label="First Punch In"
      type="datetime-local"
      fullWidth
      margin="normal"
      value={formData.firstPunchIn || ""}
      onChange={(e) => handleChange("firstPunchIn", e.target.value)}
      error={!!errors.firstPunchIn}
      helperText={errors.firstPunchIn}
      InputLabelProps={{
        shrink: true, // Forces the label to stay at the top
      }}
    />
  </DialogContent>

  {/* Dialog Actions: Cancel and Submit */}
  <DialogActions>
    <Button onClick={handleClose} color="error">
      Cancel
    </Button>
    <Button onClick={handleSubmit} variant="contained" color="success">
      Submit
    </Button>
  </DialogActions>
</Dialog>

      {/* add manual attendance */}

      {/* Search Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          marginTop: "20px",
          width: "100%",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <TextField
          select
          label="Select Month"
          name="month"
          variant="outlined"
          size="small"
          value={formValues.month}
          onChange={handleInputChange}
          sx={{ width: "300px", bgcolor: "whitesmoke", borderRadius: "8px" }}
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Year"
          name="year"
          variant="outlined"
          size="small"
          value={formValues.year}
          onChange={handleInputChange}
          sx={{ width: "300px", bgcolor: "whitesmoke", borderRadius: "8px" }}
        >
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={() => console.log("Search triggered")}
          sx={{
            height: "40px",
            minWidth: "120px",
            borderRadius: "20px",
            textTransform: "capitalize",
            backgroundColor: "#b17f27",
            "&:hover": {
              backgroundColor: "#8f6720",
            },
          }}
        >
          SEARCH
        </Button>
      </Box>

      {/* Attendance Table */}
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  {daysInMonth.map((day) => (
                    <TableCell key={day} align="center">
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.employeeId}</TableCell>
                      {row.attendance.map((status, idx) => (
                        <TableCell
                          key={idx}
                          align="center"
                          sx={{
                            color: status === "Present" ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {status === "Present" ? (
                            <CheckIcon style={{ color: "green" }} />
                          ) : (
                            <CloseIcon style={{ color: "red" }} />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Attendance;
