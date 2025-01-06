import React, { useState } from "react";
import { Dialog, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";

const AddSalaryModal = ({ isModalOpen, setIsModalOpen, onAddEmployeeSalary }) => {

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    salary: "",
    taxDeduction: "",
    specialAllowance: "",
    employeeStateInsurance: "",
    houseRentAllowance: "",
    providentFund: "200", // Always set to 200
    grossSalary: "",
    employeeProvidentFund: "",
    otherAllowance: "",
    lop:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      providentFund: "200", // Ensure it's always 200
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/paysalary",
        dataToSubmit
      );
      // console.log("Response from server:", response.data);
      alert("Salary data added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Failed to add salary"}`);
      } else {
        console.error("Error occurred:", error.message);
        alert("An error occurred while submitting the salary data.");
      }
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 flex justify-center items-center">
          Add Employee Salary
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Employee Id"
            type="text"
            variant="outlined"
            required
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Employee Name"
            type="text"
            variant="outlined"
            required
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Select department"
            select
            variant="outlined"
            required
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          >
            <MenuItem value="TECH">TECH</MenuItem>
            <MenuItem value="MARKETING">MARKETING</MenuItem>
            <MenuItem value="SALES">SALES</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="CTC(per month)"
            type="number"
            variant="outlined"
            required
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
            <TextField
              fullWidth
              label="LOP"
              type="number"
              name="lop"
              value={formData.lop}
              onChange={handleInputChange}
            />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="TDS"
              type="number"
              name="taxDeduction"
              value={formData.taxDeduction}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="SA"
              type="number"
              name="specialAllowance"
              value={formData.specialAllowance}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="ESI"
              type="number"
              name="employeeStateInsurance"
              value={formData.employeeStateInsurance}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="HRA"
              type="number"
              name="houseRentAllowance"
              value={formData.houseRentAllowance}
              onChange={handleInputChange}
            />

            {/* Provident Fund Field (Read-Only) */}
            <TextField
              fullWidth
              label="PF (Provident Fund)"
              type="number"
              name="providentFund"
              value={formData.providentFund}
              InputProps={{ readOnly: true }}
              disabled
            />

            <TextField
              fullWidth
              label="Gross Salary"
              type="number"
              name="grossSalary"
              value={formData.grossSalary}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Other Allowance"
              type="number"
              name="otherAllowance"
              value={formData.otherAllowance}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Prof. Tax"
              type="number"
              name="employeeProvidentFund"
              value={formData.employeeProvidentFund}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="text-red-600 font-medium"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddSalaryModal;
