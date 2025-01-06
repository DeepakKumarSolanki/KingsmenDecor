import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddReimbursementModal from "./AddReimbursementModal";
import { useAuth } from "../../Context/AuthContext";

const ReimbursementOfEmployee = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { authState } = useAuth();
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    purpose: "",
    date: "",
    projects: [],
    amount: "",
    reason: "",
    reimbursementStatus: "PENDING",
    receipt: null,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch reimbursements and display in the table
  const fetchReimbursements = async () => {
    if (!authState.isAuth || !authState.userDetails) return;

    const employeeId = authState.userDetails.employeeId;
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/getReimbursement/${employeeId}`
      );
      const reimbursements = response.data?.data || [];
      setData(reimbursements);  // Set the fetched data in state
    } catch (error) {
      console.error("Error fetching reimbursement data:", error);
      alert("Failed to fetch reimbursement data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the reimbursements when the component mounts
  useEffect(() => {
    fetchReimbursements();
  }, [authState.isAuth, authState.userDetails]); // Run when user authentication changes

  const handleOpenModal = (edit = false, index = null) => {
    setIsEditing(edit);
    setEditIndex(index);
    if (edit && index !== null) {
      setFormData(data[index]);
    } else {
      setFormData({
        employeeId: "",
        employeeName: "",
        purpose: "",
        date: "",
        projects: [],
        amount: "",
        reason: "",
        receipt: null,
        reimbursementStatus: "PENDING",
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (newData) => {
    try {
      // Make a POST request to add new reimbursement
      await axios.post(`http://localhost:8080/reimbursement`, newData);
      await fetchReimbursements(); // Refresh the data after submission
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
    handleCloseModal();
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 pb-8">
        <div>
          <h1 className="font-semibold text-2xl">Reimbursement</h1>
          <h2 className="text-md text-gray-600">
            Dashboard / <span className="text-gray-800">Reimbursement</span>
          </h2>
        </div>

        <button
          onClick={() => handleOpenModal(false)}
          className="w-full md:w-auto px-4 py-2 bg-[#b17f27] text-white rounded-lg flex items-center justify-center md:justify-start"
        >
          <BiPlus className="lg:text-xl text-sm mr-2" />
          Add Reimbursement
        </button>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.employeeId}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.amount || "N/A"}</TableCell>
                  <TableCell>{row.reason || "N/A"}</TableCell>
                  <TableCell>{row.reimbursementStatus}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit */}
      {modalOpen && (
        <AddReimbursementModal
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReimbursementOfEmployee;
