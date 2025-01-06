import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UpcomingIcon from "@mui/icons-material/Upcoming"; // Import a Material-UI icon for "upcoming"


const columns = [
  { id: "number", label: "No.", minWidth: 50 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "date", label: "Holiday Date", minWidth: 100 },
  { id: "day", label: "Day", minWidth: 100 },
  { id: "upcoming", label: "Upcoming", minWidth: 100, align: "center" }, // New Upcoming column
];

function createData(number, title, date, day,upcoming) {
  return { number, title, date, day,upcoming };
}

const rows = [
 // 2024 Holidays

 createData(1, "Labor Day", "2 Sep 2024", "Monday"),
 createData(2, "Veterans Day", "11 Nov 2024", "Monday"),
 createData(3, "Thanksgiving Day", "28 Nov 2024", "Thursday"),
 createData(4, "Christmas Day", "25 Dec 2024", "Wednesday"),

 // 2025 Holidays
 createData(5, "Republic Day", "26 Jan 2025", "Sunday"),
  createData(6, "Independence Day", "15 Aug 2025", "Friday"),
  createData(7, "Raksha Bandhan", "27 Aug 2025", "Wednesday"),
  createData(9, "Eid-e-Milad", "1 Oct 2025", "Wednesday"),
  createData(10, "Gandhi Jayanti", "2 Oct 2025", "Thursday"),
  createData(11, "Dussehra", "21 Oct 2025", "Tuesday"),
  createData(12, "Maha Navami", "22 Oct 2025", "Wednesday"),
  createData(13, "All Saints' Day", "1 Nov 2025", "Saturday"),
  createData(14, "Christmas Day", "25 Dec 2025", "Thursday"),
];

function Holidays() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Get the current date
  const currentDate = new Date();

  // Convert a holiday date string into a Date object
  const parseDate = (dateString) => {
    return new Date(Date.parse(dateString));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-center p-4 mb-6 border-solid">
      <div className="text-center md:text-left">
        <h6 className="text-2xl font-semibold text-gray-700">Holidays</h6>
        <div className="text-sm text-gray-500">
          <p>Dashboard / Holiday</p>
        </div>
      </div>
    </div>

    {/* Holiday Table Summary */}
    <Paper
  sx={{
    width: "100%",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
    borderRadius: 2,
  }}
>
  <TableContainer
    sx={{
      maxHeight: { xs: 300, sm: 440 },
      backgroundColor: "#b17f27", // Light background for the table
    }}
  >
    <Table stickyHeader aria-label="holiday table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{
                fontWeight: "bold",
                backgroundColor: "#b17f27", // Header background
                color: "#fff", // Header text color
                textTransform: "uppercase",
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const holidayDate = parseDate(row.date);
            const isPastHoliday = holidayDate < currentDate;
            const isUpcoming = holidayDate >= currentDate;

            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                sx={{
                  backgroundColor: isPastHoliday
                    ? "#f3f3f3" // Gray for past holidays
                    : isUpcoming
                    ? "#e8f5e9" // Light green for upcoming holidays
                    : "inherit",
                  color: isPastHoliday ? "#9e9e9e" : "inherit",
                  transition: "background-color 0.3s ease",
                }}
              >
                {columns.map((column) => {
                  let value = row[column.id];

                  // Add the upcoming symbol logic
                  if (column.id === "upcoming") {
                    value = isUpcoming ? (
                      <UpcomingIcon sx={{ color: "#b17f27" }} />
                    ) : null;
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        fontSize: "0.9rem", // Slightly smaller text
                        padding: "12px 16px",
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[5, 10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    sx={{
      "& .MuiTablePagination-toolbar": {
        padding: "8px 16px", // Add padding for cleaner spacing
      },
      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
        fontSize: "0.9rem", // Smaller, consistent font size
      },
    }}
  />
</Paper>
  </div>
  );
}

export default Holidays;
