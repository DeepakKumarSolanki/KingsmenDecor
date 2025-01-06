import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Box } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { GiTimeTrap } from "react-icons/gi";
import { LuTimerOff } from "react-icons/lu";

import { TablePagination } from '@mui/material';



function Attendance() {
  const [employeeId, setEmployeeId] = useState("EMP002");
  const [searchDate, setSearchDate] = useState(""); // Search date
  const [results, setResults] = useState({}); // Search results

  // ! Send data attendance d in back end  start here 


  const Send_Data_Punch_In_Punch_Out_Api = "http://localhost:8080/attendanceCalculator";


  // Utility: Format date and time
  const formatDateTime = (date) =>
    date.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // Utility: Calculate duration in minutes
  const calculateDurationInMinutes = (start, end) =>
    Math.floor(Math.abs(end - start) / (1000 * 60));

  // Utility: Format duration in HH:mm
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m`;
  };























  // ! States for attendance tracking
  const [records, setRecords] = useState([]); // Punch records
  const [currentPunchIn, setCurrentPunchIn] = useState(null); // Active Punch In time
  const [statusMessage, setStatusMessage] = useState(""); // Status messages
  const [currentDuration, setCurrentDuration] = useState(0); // Dynamic duration tracking
  const [totalWorkedMinutes, setTotalWorkedMinutes] = useState(0); // Total worked time
  const [totalBreakDuration, setTotalBreakDuration] = useState(0); // Total break time
  const [breakStart, setBreakStart] = useState(null); // Active break start time
  const [breakDuration, setBreakDuration] = useState(0); // Total break duration
  const [location, setLocation] = useState(null); // Location data

  // Load data from localStorage on component mount
  useEffect(() => {
    // Retrieve employee ID or set a default
    const savedEmployeeId = localStorage.getItem("employeeId") || "EMP002";
    setEmployeeId(savedEmployeeId);

    // Fetch data for the current employee
    const employeeData = JSON.parse(localStorage.getItem(savedEmployeeId)) || {};

    // Load the data if it exists
    setRecords(employeeData.punchRecords || []);
    setTotalWorkedMinutes(employeeData.totalWorkedMinutes || 0);

    if (employeeData.currentPunchIn) {
      setCurrentPunchIn(new Date(employeeData.currentPunchIn));
    }

    if (employeeData.breakStart) {
      setBreakStart(new Date(employeeData.breakStart));
    }

    setBreakDuration(employeeData.breakDuration || 0);
    setLocation(employeeData.location || "");
    setStatusMessage(employeeData.statusMessage || "");
  }, []);

  // Save data to localStorage whenever the relevant state changes
  useEffect(() => {
    // Prepare employee-specific data
    const employeeData = {
      punchRecords: records,
      totalWorkedMinutes: totalWorkedMinutes,
      currentPunchIn: currentPunchIn ? currentPunchIn.toISOString() : null,
      breakStart: breakStart ? breakStart.toISOString() : null,
      breakDuration: breakDuration,
      location: location || "",
      statusMessage: statusMessage,
    };

    // Save data under the employee ID key
    localStorage.setItem(employeeId, JSON.stringify(employeeData));

    // Save employee ID globally for persistence
    localStorage.setItem("employeeId", employeeId);
  }, [employeeId, records, totalWorkedMinutes, currentPunchIn, breakStart, breakDuration, location, statusMessage]);

  // Reset local storage data daily, keeping only employee ID
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastSavedDate = localStorage.getItem("lastSavedDate");

    if (lastSavedDate !== today) {
      // Remove all data except for employee ID
      const savedEmployeeId = localStorage.getItem("employeeId");
      localStorage.clear();
      if (savedEmployeeId) {
        localStorage.setItem("employeeId", savedEmployeeId);
      }
      localStorage.setItem("lastSavedDate", today);
    }
  }, []);






  // Handle Punch In
  // Handle Location Fetch
  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      setStatusMessage("Geolocation is not supported by your browser.");
      return null;
    }

    try {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const coords = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=fe61d07fa07c4dfc9070e3622f75dbe8`
              );
              if (!response.ok) {
                console.log(response)
                throw new Error("Failed to fetch location details.");
              }
              const data = await response.json();
              const locationName = data.results?.[0]?.formatted || "Unknown Location";
              resolve(`${coords} (${locationName})`);
            } catch (error) {
              console.error(error);
              resolve(coords); // Fallback to just coordinates if API fails
            }
          },
          (error) => {
            setStatusMessage("Failed to fetch location.");
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      setStatusMessage("Error fetching location details.");
      return null;
    }
  };

  // Handle Punch In
  const handlePunchIn = async () => {
    if (currentPunchIn) {
      setStatusMessage("You are already punched in. Please punch out first.");
      return;
    }

    const location = await fetchLocation();
    const now = new Date();
    setCurrentPunchIn(now);
    setLocation(location);
    setStatusMessage(`Punched in at ${formatDateTime(now)}. Location: ${location}`);
  };

  // Handle Punch Out
  const handlePunchOut = async () => {
    if (!currentPunchIn) {
      setStatusMessage("You need to punch in first.");
      return;
    }

    if (breakStart) {
      setStatusMessage("Please end your break before punching out.");
      return;
    }

    const location = await fetchLocation();
    const now = new Date();
    const durationInMinutes = calculateDurationInMinutes(currentPunchIn, now);
    const effectiveWorkMinutes = durationInMinutes - breakDuration;

    const newRecord = {
      punchIn: formatDateTime(currentPunchIn),
      punchOut: formatDateTime(now),
      duration: formatDuration(effectiveWorkMinutes),
      breakTime: formatDuration(breakDuration),
      location: location,
    };

    setRecords((prevRecords) => [...prevRecords, newRecord]);
    setTotalWorkedMinutes((prev) => prev + effectiveWorkMinutes);
    setTotalBreakDuration((prev) => prev + breakDuration);

    // Send data to backend
    sendPunchData(newRecord, effectiveWorkMinutes, breakDuration, location);

    // Reset punch-in and break tracking
    setCurrentPunchIn(null);
    setBreakDuration(0);
    setStatusMessage(`Punched out at ${formatDateTime(now)}. Location: ${location}`);
  };

  // Handle Break Toggle
  const handleBreakToggle = () => {
    const now = new Date();
    if (!breakStart) {
      if (!currentPunchIn) {
        setStatusMessage("You need to punch in to start a break.");
        return;
      }
      setBreakStart(now);
      setStatusMessage(`Break started at ${formatDateTime(now)}.`);
    } else {
      const breakTime = calculateDurationInMinutes(breakStart, now);
      setBreakDuration((prev) => prev + breakTime);
      setBreakStart(null);
      setStatusMessage(
        `Break ended at ${formatDateTime(now)}. Total break time: ${formatDuration(
          breakDuration + breakTime
        )}.`
      );
    }
  };

  // ! Function to send punch data to backend
  const sendPunchData = (newRecord, workMinutes, breakMinutes, location) => {
    const firstPunchIn = records[0]; // First punch-in
    const lastPunchOut = newRecord; // Last punch-out is the current record

    if (firstPunchIn && lastPunchOut) {
      if (!location) {
        setStatusMessage("Location data is not available.");
        return;
      }

      // Split and check the location format
      const locationParts = location.split(",");
      if (locationParts.length < 2) {
        setStatusMessage("Invalid location format.");
        return;
      }

      // Helper function to format a JavaScript Date object to the required format
      const formatToLocalDateTime = (date) => {
        if (!date) return null;
        const isoString = new Date(date).toISOString(); // Get ISO 8601 format (with milliseconds)
        return isoString.split('.')[0] + '.000000000'; // Append nanoseconds (always zero)
      };

      // Create the punchData object with location and formatted time
      const punchData = {
        employeeId: employeeId, // Employee ID
        firstPunchIn: formatToLocalDateTime(firstPunchIn.punchIn), // Format firstPunchIn
        lastPunchOut: formatToLocalDateTime(lastPunchOut.punchOut), // Format lastPunchOut
        location: lastPunchOut.location, // Send location as a string
        totalWorkTime: workMinutes, // Total work time for this session
        totalBreakTime: breakMinutes, // Total break time
      };

      console.log(punchData);

      // Send data to backend (replace with your actual API endpoint)
      fetch(Send_Data_Punch_In_Punch_Out_Api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(punchData),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatusMessage("Punch data sent successfully.");
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          setStatusMessage("Failed to send punch data.");
          console.error('Error sending data:', error);
        });
    }
  };



  // Update work time continuously
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentPunchIn) {
        const now = new Date();
        const durationInMinutes = calculateDurationInMinutes(currentPunchIn, now);
        setCurrentDuration(durationInMinutes);

        // Update the total worked minutes considering break duration
        const effectiveWorkMinutes = durationInMinutes - breakDuration;
        setTotalWorkedMinutes(effectiveWorkMinutes);

        // If a break is ongoing, update break duration
        if (breakStart) {
          const breakTime = calculateDurationInMinutes(breakStart, now);
          setBreakDuration(breakTime);
        }
      }
    }, 1000); // Update every 10 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [currentPunchIn, breakStart, breakDuration]);



  // ! Function to send punch data to backend


  // search data based  using data start here 







  // search data based  using data start here 


  // Define the columns structure
  const columns = [
    { id: 'employeeId', label: 'EMP ID', minWidth: 100 },
    { id: 'employeeName', label: 'EMP Name', minWidth: 150 },
    { id: 'date', label: 'Date', minWidth: 120 },
    { id: 'firstPunchIn', label: 'Punch In', minWidth: 120 },
    { id: 'lastPunchOut', label: 'Punch Out', minWidth: 120 },
    { id: 'totalWorkMinutes', label: 'WorkTime', minWidth: 100 },
    { id: 'totalBreakTime', label: 'BreakTime', minWidth: 100 },
  ];

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleSearch = async () => {
    // Ensure the employeeId and searchDate are provided
    if (!employeeId || !searchDate) {
      alert("Please provide both Employee ID and Date.");
      return;
    }

    console.log("Employee ID:", employeeId);
    console.log("Date:", searchDate);

    // API endpoint
    const GEt_Data_Employee_Punch_In_Punch_Out = "http://localhost:8080/getAttendenceOfSpecificDate";

    // Construct the URL with employeeId and searchDate as query parameters
    const url = `${GEt_Data_Employee_Punch_In_Punch_Out}?employeeId=${employeeId}&date=${searchDate}`;

    try {
      // Fetch data using GET method
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data.data);

        // Ensure the response data is handled correctly
        setResults(data.data || {}); // Wrap data in an array if it's a single object



        alert("Data retrieved successfully!");
      } else {
        console.error("Failed to retrieve data. Status:", response.status);
        alert("Failed to retrieve data.");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      alert("An error occurred while retrieving data.");
    }
  };





  console.log("Serach Result data ", results)

  // search data based  using data end here









  //  &   Table Data start Here here



  //  &   Table Data End  here















  return (
    <div className="p-0 py-2 min-h-screen bg-transparent">

      {/* Header Section */}

      <div className="flex flex-col md:flex-row justify-between items-center px-9 py-7 mb-6 border-solid dark:bg-gray-800 dark:text-white">
        <div className="text-center md:text-left">
          <h6 className="text-2xl font-semibold text-[#B17F27] dark:text-yellow-400">Attendance</h6>
          <div className="text-sm text-[#B17F27] dark:text-yellow-300">
            <p>Dashboard / Attendance</p>
          </div>
        </div>
      </div>




      <div className="p-3 space-y-6 dark:bg-boxdark dark:text-white">
        <div className="flex flex-wrap gap-6">
          {/* Attendance Tracker */}
          <div className="p-3 flex items-center flex-col gap-6 bg-gradient-to-r from-transparent to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 uppercase">Attendance Tracker</h1>
            <div className="w-[125px] h-[125px] bg-[#B17F27] rounded-full flex items-center flex-col gap-1 justify-center text-white font-semibold text-xl shadow-lg hover:shadow-xl transition-shadow">
              {currentPunchIn ? formatDuration(totalWorkedMinutes) : formatDuration(totalWorkedMinutes)}
              <div>
                {currentPunchIn ? <GiTimeTrap style={{ fontSize: "30px" }} /> : <LuTimerOff style={{ fontSize: "30px" }} />}
              </div>
            </div>
            <div className="mb-6 flex gap-4">
              <button
                className="px-3 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all dark:bg-green-700 dark:hover:bg-green-800"
                onClick={handlePunchIn}
              >
                Punch In
              </button>
              <button
                className="px-3 py-3 bg-[#B17F27] text-white rounded-lg shadow-md hover:bg-[#906c2e] transition-all dark:bg-[#8b5d2b] dark:hover:bg-[#70481f]"
                onClick={handleBreakToggle}
              >
                {breakStart ? "End Break" : "Start Break"}
              </button>
              <button
                className="px-1 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all dark:bg-red-700 dark:hover:bg-red-800"
                onClick={handlePunchOut}
              >
                Punch Out
              </button>
            </div>
            <div className="text-center">
              {location && <p className="text-sm text-gray-500 dark:text-gray-400">Current Location: {location}</p>}
            </div>
            <div className="flex gap-6 text-gray-800 dark:text-gray-200 font-semibold text-center">
              <p className="text-lg">Total Break Time : {formatDuration(breakDuration)}</p>
              <p className="text-lg">Total Worked Time: {formatDuration(totalWorkedMinutes)}</p>
            </div>
            {statusMessage && (
              <p className="text-gray-700 dark:text-gray-300 text-center mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-sm">
                {statusMessage}
              </p>
            )}
          </div>

          {/* Statistics */}
          <div className="flex-1 min-w-[280px] p-6 bg-transparent rounded-lg shadow-lg dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Statistics</h3>
            <div className="space-y-4 mt-6">
              {/* Statistic Item */}
              {[
                { label: "Today", value: "5/8 hrs" },
                { label: "This Week", value: "15.23/40 hrs" },
                { label: "This Month", value: "90/160 hrs" },
                { label: "This Year", value: "450/8736 hrs" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <p className="text-gray-600 dark:text-gray-300">{item.label}:</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Activity */}
          <div className="flex-1 min-w-[280px] py-6 px-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Today Activity</h3>
            <div className="overflow-x-auto mt-6">
              <table className="w-full bg-white dark:bg-gray-700 border-collapse shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                    <th className="px-6 py-3 text-left text-sm font-medium">No.</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Punch In</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Punch Out</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
                        {record.punchIn}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
                        {record.punchOut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Container>
          {/* Search Filters */}
          <div style={{ width: '100%', alignItems: "center", marginTop: "50px" }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                // Add responsive styles
                '@media (max-width: 600px)': {
                  flexDirection: 'column', // Stack items vertically
                  justifyContent: 'center', // Center items
                  alignItems: 'center',    // Align items centrally
                },
              }}
            >
              {/* Date Picker */}
              <TextField
                label="Date"
                type="date"
                value={searchDate}
                className="dark:bg-boxdark dark:text-white dark:border-gray-950 "
                onChange={(e) => setSearchDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                sx={{
                  flex: '1 1 200px', // Ensures the input takes available space but doesn't grow indefinitely
                  color: 'gray',
                  '& .MuiInputBase-root': {
                    borderRadius: 2, // Rounded corners
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                    borderColor: 'gray'
                  },
                  '& .MuiInputBase-input': {
                    color: 'gray', // Inherit text color from parent

                  },
                  '@media (max-width: 600px)': {
                    flex: '1 1 auto', // Adjust flex behavior for small screens
                  },
                }}
              />


              {/* Search Button */}
              <div>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{
                    flex: '0 0 150px',
                    borderRadius: 2,
                    padding: '10px 20px',
                    backgroundColor: '#B17F27',
                    '&:hover': {
                      backgroundColor: '#B17F27', // Darker green on hover
                    },
                    '@media (max-width: 600px)': {
                      width: '100%', // Full width on small screens
                    },
                  }}
                >
                  Search
                </Button>
              </div>
            </Box>

          </div>

          {/* Data Table */}
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: '#B17F27', color: 'white', fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results && results.attendanceId ? (
                    // If 'results' contains attendance data, render a single row
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={results.attendanceId}
                      sx={{
                        backgroundColor: 0 % 2 === 0 ? '#f9f9f9' : 'white', // For single row, no need to use index
                        '&:hover': { backgroundColor: 'transparent' },
                      }}
                    >
                      <TableCell>{results.employeeId}</TableCell>
                      <TableCell>{results.employeeName}</TableCell>
                      <TableCell>{results.date}</TableCell>
                      <TableCell>{results.firstPunchIn ? new Date(results.firstPunchIn).toLocaleTimeString() : 'N/A'}</TableCell>
                      <TableCell>{results.lastPunchOut ? new Date(results.lastPunchOut).toLocaleTimeString() : 'N/A'}</TableCell>
                      <TableCell>{results.totalWorkMinutes}</TableCell>
                      <TableCell>{results.totalBreakTime}</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                  


              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={results.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

        </Container>
      </div>
    </div>
  );
}

export default Attendance;
