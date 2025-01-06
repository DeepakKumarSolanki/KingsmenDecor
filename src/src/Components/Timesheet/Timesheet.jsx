import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";

const columns = [
  { id: "employee", label: "Employee", minWidth: 200 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "projects", label: "Projects", minWidth: 200 },
  {
    id: "assignedHours",
    label: "Assigned Hours",
    minWidth: 150,
    align: "center",
  },
  { id: "hours", label: "Hours", minWidth: 100, align: "center" },
  { id: "description", label: "Description", minWidth: 300 },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

// Example rows
const rows = [
  {
    avatar: "/path/to/avatar1.jpg",
    employee: "Bernardo Galaviz (Web Developer)",
    date: "8 Mar 2019",
    projects: "Video Calling App",
    assignedHours: 20,
    hours: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    avatar: "/path/to/avatar2.jpg",
    employee: "Catherine Manseau (Android Developer)",
    date: "8 Mar 2019",
    projects: "Video Calling App",
    assignedHours: 20,
    hours: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    avatar: "/path/to/avatar3.jpg",
    employee: "Jeffery Lalor (Team Leader)",
    date: "8 Mar 2019",
    projects: "Warehouse Development",
    assignedHours: 20,
    hours: 9,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const Timesheet=()=> {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log("Edit row:", selectedRow);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete row:", selectedRow);
    handleMenuClose();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="rounded-md flex justify-between p-4 mb-6 border-solid flex-wrap gap-4">
        <h6 className="text-2xl font-semibold text-gray-700">
          Timesheet
          <div className="text-[14px]">
            <p>Dashboard / Timesheet</p>
          </div>
        </h6>
        
      </div>

      {/* Table Entries Section */}
      <Paper
  sx={{
    width: "100%",
    overflowX: "hidden",
    padding: { xs: 2, sm: 3, md: 4 },
    boxShadow: 3, // Adding a subtle shadow to Paper for better visual depth
    borderRadius: "8px",
  }}
>
  {/* Scrollable Table Container */}
  <TableContainer
    sx={{
      overflowX: "auto",
      borderRadius: "8px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
    }}
  >
    <Table stickyHeader aria-label="responsive table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{
                minWidth: column.minWidth,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: "bold", // Bold headers for better readability
                backgroundColor: "#b17f27", // Light background for headers
                whiteSpace: "nowrap",
                padding: { xs: "8px", sm: "12px" }, // More comfortable padding for small screens
                color:"#F9F9F9"

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
          .map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt={row.employee}
                    src={row.avatar}
                    sx={{
                      width: { xs: 40, sm: 56 },
                      height: { xs: 40, sm: 56 },
                      marginBottom: 1,
                      border: "2px solid #b17f27", // Add border to avatars for highlight
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <strong style={{ fontSize: "0.9rem" }}>{row.employee.split(" ")[0]}</strong>
                    <div style={{ fontSize: "0.8rem", color: "gray" }}>
                      {row.employee.split("(")[1]?.replace(")", "")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {row.date}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {row.projects}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "500", // Slightly bold to stand out
                }}
              >
                {row.assignedHours}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "500",
                  backgroundColor: "#f7f7f7", // Light background for hour columns
                }}
              >
                {row.hours}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  whiteSpace: "nowrap",
                  paddingRight: 2, // To add space on the right for better alignment
                }}
              >
                {row.description}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={(event) => handleMenuOpen(event, row)}
                  sx={{ color: "#3f51b5", "&:hover": { backgroundColor: "#f4f4f4" } }}
                >
                  <HiDotsVertical />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* Pagination */}
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    sx={{
      fontSize: { xs: "0.9rem", sm: "1rem" },
      backgroundColor: "#f4f6f8", // Subtle background color for pagination
      borderTop: "1px solid #ddd",
      padding: { xs: "8px", sm: "12px" },
    }}
  />
</Paper>


      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default Timesheet;
