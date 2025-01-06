import React, { useState,useEffect } from "react";
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

import { FormControl, InputLabel } from '@mui/material';








function ManagerApprovedLeaves() {


 const leaveTypes = ["CASUAL", "SICK", "PAID"];



 //! Display card fetch api start  here
 
 const [cardLeavesData, setCardLeavesData] = useState([]);


 
   const All_Leaves_Data_Cards = `https://2a5dd0fa-85f7-41cb-a73f-4a1e9034617b.mock.pstmn.io/getallcardleaves`


 useEffect(() => {
   // Fetch data using Axios
   axios
     .get(All_Leaves_Data_Cards) // Replace with your API endpoint
     .then((response) => {
       setCardLeavesData(response.data); // Store the response data in cardLeavesData state
       console.log(cardLeavesData)
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
    const { employeeId, leaveType, leaveStatus, fromDate, toDate, searchText } = filters;
  
    const filtered = rows.filter((row) => {
      // Generic keyword search
      const matchesSearchText = searchText
        ? Object.values(row)
            .some((value) =>
              value &&
              value
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
        : true;
  
      // Filter by Employee ID
      const matchesEmployeeId = employeeId
        ? row.employee.id.toString().toLowerCase().includes(employeeId.toLowerCase())
        : true;
  
      // Filter by Leave Type
      const matchesLeaveType = leaveType ? row.leaveType === leaveType : true;
  
      // Filter by Leave Status
      const matchesLeaveStatus = leaveStatus ? row.status === leaveStatus : true;
  
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





  return (
    <>
       <div Name="p-4">
    
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
    backgroundColor: '#A76E24', // Set the background color to #A76E24
    color: 'white', // Set the text color to white for better contrast
    '&:hover': {
      backgroundColor: '#8c5a1e', // Darken the color on hover (you can adjust this shade if needed)
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
     <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 3, borderRadius: 2 }}>
  <TableContainer sx={{ maxHeight: 440, borderRadius: 2, overflow: "auto" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#3f51b5', color: 'white', '& th': { fontWeight: 'bold' } }}>
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
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {/* <Avatar src={row.employee.avatar || 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'} alt={row.employee.employeeName} sx={{ mr: 2 }} /> */}
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {row.employeeName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {row.role} 
                      </Typography>
                     
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{row.employeeId
                }</TableCell>
                <TableCell>{row.leaveType
                }</TableCell>
                <TableCell>{row.fromDate}</TableCell>
                <TableCell>{row.toDate}</TableCell>
               
                <TableCell>{row.reason}</TableCell>
                <TableCell>
                <FormControl size="small" sx={{ minWidth: 150 }}>
  <Select
    value={row.leaveStatus || 'PENDING'} // Fallback value
    onChange={(e) => handleStatusChange(row.leaveId, e.target.value)} // Correct handler
    label="Status"
    sx={{
      backgroundColor: getStatusColor(row.leaveStatus || 'PENDING'),
      color: 'white',
      borderRadius: 1.5,
      paddingRight: '3rem',
      '& .MuiSelect-icon': {
        color: 'white',
        transition: 'transform 0.3s ease',
      },
      '&:hover': {
        backgroundColor: getStatusColor(row.leaveStatus || 'PENDING', true),
        '& .MuiSelect-icon': {
          transform: 'rotate(180deg)',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
        borderWidth: 1.5,
        borderTop: 'none',
      },
      '&:focus': {
        backgroundColor: getStatusColor(row.leaveStatus || 'PENDING', true),
        borderColor: '#3f51b5',
        boxShadow: '0 0 5px rgba(63, 81, 181, 0.7)',
      },
      '&:active': {
        transform: 'scale(1.05)',
        backgroundColor: getStatusColor(row.leaveStatus || 'PENDING', true),
      },
      transition: 'background-color 0.3s, transform 0.2s ease, box-shadow 0.3s',
    }}
  >
    {['PENDING', 'APPROVED', 'NOT APPROVED'].map((status) => (
      <MenuItem
        key={status}
        value={status}
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'black',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: getStatusColor(status, true),
            color: 'white',
          },
        }}
      >
        {status}
      </MenuItem>
    ))}
  </Select>
</FormControl>;


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
    </>
  )
}

export default ManagerApprovedLeaves
