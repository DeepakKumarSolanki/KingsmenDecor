import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiDownload2Line } from "react-icons/ri";
import { TablePagination } from "@mui/material";


const Reimbursement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(0); // Update to handle page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add state for rows per page
  const [expenseData, setExpenseData] = useState({
    employeeId: "",
    employeeName: "",
    purpose: "",
    date: "",
    reimbursementStatus: "PENDING",
    amount: "",
    receipt: null,
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [searchPurpose, setSearchPurpose] = useState("");
  const [searchPaidBy, setSearchPaidBy] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/findReimbursementDetail`
        );
        const updatedData = response.data.data.map((item) => ({
          ...item,
        }));
        console.log(response.data.data)
        console.log(updatedData)

        setData(updatedData);
        setFilteredData(updatedData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const tempData = data.filter((item) => {
      const matchesEmployeeName = searchEmployeeName
        ? item.employeeName.toLowerCase().includes(searchEmployeeName.toLowerCase())
        : true;

      const matchesPurpose = searchPurpose
        ? item.purpose.toLowerCase().includes(searchPurpose.toLowerCase())
        : true;

      const matchesPaidBy = searchPaidBy
        ? item.paidBy.toLowerCase().includes(searchPaidBy.toLowerCase())
        : true;

      const matchesDateFrom = dateFrom
        ? new Date(item.date) >= new Date(dateFrom)
        : true;

      const matchesDateTo = dateTo
        ? new Date(item.date) <= new Date(dateTo)
        : true;

      return (
        matchesEmployeeName &&
        matchesPurpose &&
        matchesPaidBy &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    setFilteredData(tempData);
    setCurrentPage(1); // Reset to the first page after filtering
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleStatusChange = async (e, index) => {
    const updatedStatus = e.target.value;
    const updatedData = [...filteredData];
    updatedData[index].reimbursementStatus = updatedStatus;
    setFilteredData(updatedData);

    const reimbursementId = updatedData[index].reimbursementId;
    const employeeId = updatedData[index].employeeId;

    try {
      const response = await axios.put(
        "http://localhost:8080/changeReimbursementStatus",
        { reimbursementId, employeeId, reimbursementStatus: updatedStatus }
      );
      console.log(response.data.data)
      if (response.reimbursementStatus !== 200) {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setExpenseData(filteredData[index]);
    } else {
      setExpenseData({
        employeeId: "",
        employeeName: "",
        purpose: "",
        date: "",
        reimbursementStatus: "PENDING",
        amount: "",
        receipt: null,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const downloadCSV = () => {
    if (!filteredData.length) {
      alert("No data available to download.");
      return;
    }

    // Extract headers dynamically from the filtered data
    const headers = Object.keys(filteredData[0]);

    const rows = filteredData.map((item) =>
      headers.map((header) =>
        `"${item[header] !== undefined && item[header] !== null ? item[header] : ""}"`
      )
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const fileName = "reimbursement_data.csv";

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between items-center pb-8">
        <div className="mb-4 lg:mb-0 text-golden">
          <h1 className="font-semibold text-2xl">Employee Reimbursement</h1>
          <h2 className="text-md">
            Dashboard / <span className="text-golden">Reimbursement</span>
          </h2>
        </div>

        <button onClick={downloadCSV} className="px-4 py-2 bg-[#b17f27] text-white rounded-lg flex items-center space-x-2">
          <RiDownload2Line className="text-xl" />
          <span>CSV</span>
        </button>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <TextField
          label="Employee Name"
          variant="outlined"
          size="small"
          className="w-full text-white"
          value={searchEmployeeName}
          onChange={(e) => setSearchEmployeeName(e.target.value)}
        />

        <Select
          className="w-full text-white"
          size="small"
          displayEmpty
          value={searchPurpose}
          onChange={(e) => setSearchPurpose(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="">Purpose</MenuItem>
          <MenuItem value="Petrol Allowance">Petrol Allowance</MenuItem>
          <MenuItem value="Cab Reimbursement">Cab Reimbursement</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>

        <Select
          className="w-full text-white"
          size="small"
          displayEmpty
          value={searchPaidBy}
          onChange={(e) => setSearchPaidBy(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="">Paid By</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="Cheque">Cheque</MenuItem>
        </Select>

        <TextField
          label="Date From"
          type="date"
          variant="outlined"
          size="small"
          className="w-full text-white"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Date To"
          type="date"
          variant="outlined"
          size="small"
          className="w-full text-white"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <button
          onClick={handleSearch}
          className="bg-golden w-full py-2 rounded-md text-white font-semibold text-md"
        >
          Search
        </button>
      </div> */}


      {/* Table or Loading Indicator */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.employeeId}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <Select
                      value={row.reimbursementStatus}
                      onChange={(e) => handleStatusChange(e, index)}
                    >
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="APPROVED">APPROVED</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(index)}>
                      <BsEye className="text-2xl text-golden" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="flex justify-end mt-4">
      <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">Employee Data</h5>
              <div className="bg-red-600 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer">
                <CgClose onClick={handleCloseModal} />
              </div>
            </div>
            <div>
              <p>Employee ID: {expenseData.employeeId}</p>
              <p>Employee Name: {expenseData.employeeName}</p>
              <p>Purpose: {expenseData.purpose}</p>
              <p>Date: {expenseData.date}</p>
              <p>Amount: {expenseData.amount}</p>
              <p>Status: {expenseData.reimbursementStatus}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reimbursement;