import {
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaEye, FaEdit } from "react-icons/fa";
import { TablePagination } from "@mui/material";
import axios from "axios";

const EmployeeExpenses = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [errors, setErrors] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseData, setExpenseData] = useState({
    expenseId: "",
    expenseName: "",
    reason: "",
    employeeName: "",
    employeeId: "",
    date: "",
    amount: "",
    paidBy: "",
    receipt: null,
  });

  const [data, setData] = useState([]);

  const fetchExpenses = async (query = {}) => {
    try {
      const response = await axios.get("http://localhost:8080/findAllExpense", {
        params: query,
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch all expenses on mount
  }, []);

  const handleOpenAddModal = (isEdit = false, expense = null) => {
    setIsEditing(isEdit);
    if (isEdit && expense) {
      setExpenseData(expense);
    } else {
      setExpenseData({
        expenseId: "",
        expenseName: "",
        reason: "",
        employeeName: "",
        employeeId: "",
        date: "",
        amount: "",
        paidBy: "",
        receipt: null,
      });
    }
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      expenseName: expenseData.expenseName,
      reason: expenseData.reason,
      employeeName: expenseData.employeeName,
      employeeId: expenseData.employeeId,
      date: expenseData.date,
      amount: expenseData.amount,
      receipt: expenseData.receipt,
    };

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:8080/editExpense/${expenseData.expenseId}`,
          payload
        );
        const updatedData = data.map((item) =>
          item.expenseId === expenseData.expenseId ? response.data.data : item
        );
        setData(updatedData);
      } else {
        response = await axios.post(
          "http://localhost:8080/addExpense",
          payload
        );
        setData([...data, response.data.data]);
      }
      handleCloseAddModal();
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };


  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 space-y-4 md:space-y-0">
        <div className="mb-4 lg:mb-0 text-golden">
          <h1 className="font-semibold text-2xl">Employee Expense</h1>
          <h2 className="text-md">
            Dashboard / <span className="text-golden">Expense</span>
          </h2>
        </div>
        <button
          onClick={() => handleOpenAddModal(false)}
          className="px-4 py-2 bg-[#b17f27] text-white rounded-lg flex items-center justify-center md:justify-start"
        >
          <BiPlus className="text-lg md:text-xl mr-2" />
          Add Expense
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expense Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index)=>(
              <TableRow key={index}>
                <TableCell>{row.expenseName}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.employeeName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleOpenAddModal(true, row)}
                    className="text-golden mr-4"
                  >
                    <FaEdit className="text-2xl" />
                  </button>
                  <button
                    onClick={() => handleViewExpense(row)}
                    className="text-golden"
                  >
                    <FaEye className="text-2xl" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} 
        component="div"
        count={data.length} 
        rowsPerPage={rowsPerPage}
        page={page} 
        onPageChange={handleChangePage} 
        onRowsPerPageChange={handleChangeRowsPerPage} 
      />

      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg w-[70%] md:w-3/4 lg:w-1/2 xl:w-1/3 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">
                {isEditing ? "Edit Expense" : "Add Expense"}
              </h5>
              <button
                onClick={handleCloseAddModal}
                className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center text-white"
              >
                <CgClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <TextField
                  label="Expense Name"
                  name="expenseName"
                  value={expenseData.expenseName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Reason"
                  name="reason"
                  value={expenseData.reason}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Employee Name"
                  name="employeeName"
                  value={expenseData.employeeName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Employee Id"
                  name="employeeId"
                  value={expenseData.employeeId}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  value={expenseData.date}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Amount"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-golden text-white rounded-md w-full md:w-auto"
                >
                  {isEditing ? "Save Changes" : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewModalOpen && selectedExpense && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg w-[70%] md:w-3/4 lg:w-1/2 xl:w-1/3 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">View Expense</h5>
              <button
                onClick={handleCloseViewModal}
                className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center text-white"
              >
                <CgClose />
              </button>
            </div>
            <div>
              <p><strong>Expense Name:</strong> {selectedExpense.expenseName}</p>
              <p><strong>Reason:</strong> {selectedExpense.reason}</p>
              <p><strong>Employee Id:</strong> {selectedExpense.employeeId}</p>
              <p><strong>Employee Name:</strong> {selectedExpense.employeeName}</p>
              <p><strong>Date:</strong> {selectedExpense.date}</p>
              <p><strong>Amount:</strong> {selectedExpense.amount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeExpenses;
