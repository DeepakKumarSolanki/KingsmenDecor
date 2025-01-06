import  { useState, useEffect } from "react";
import { Dialog, TextField, Button, MenuItem } from "@mui/material";

const EditSalaryModal = ({ isModalOpen, setIsModalOpen, selectedEmployeeData, onUpdateSalary }) => {
  //console.log(selectedEmployeeData);
  //console.log(onUpdateSalary);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isModalOpen && selectedEmployeeData) {
      setFormData(selectedEmployeeData); // Pre-fill the form with selected employee's data
    }
  }, [isModalOpen, selectedEmployeeData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: parseFloat(value) || value };

      // Automatically update Gross Salary
      updatedForm.grossSalary =
        updatedForm.salary +
        (updatedForm.specialAllowance || 0) +
        (updatedForm.houseRentAllowance || 0) +
        (updatedForm.otherAllowance || 0);

      // Calculate Net Salary (Gross Salary - Deductions)
      updatedForm.netSalary =
        updatedForm.grossSalary -
        ((updatedForm.taxDeduction || 0) +
          (updatedForm.providentFund || 0) +
          (updatedForm.employeeStateInsurance || 0) +
          (updatedForm.employeeProvidentFund || 0));

      return updatedForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Employee Data:", formData);  // Log the updated data for debugging
    onUpdateSalary(formData);
    console.log(formData)
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="md">
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 flex justify-center items-center">
          Edit Employee Salary
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId || ""}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{ readOnly: true }}
            required
          />
          <TextField
            fullWidth
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName || ""}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{ readOnly: true }}
            required
          />

          <TextField
            fullWidth
            label="Select Department"
            name="department"
            select
            value={formData.department || ""}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            <MenuItem value="TECH">TECH</MenuItem>
            <MenuItem value="MARKETING">MARKETING</MenuItem>
            <MenuItem value="SALES">SALES</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Set Salary"
            type="number"
            name="salary"
            value={formData.salary || ""}
            onChange={handleInputChange}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            label="LOP"
            type="number"
            name="lop"
            value={formData.lop || ""}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "TDS (Tax Deduction)", name: "taxDeduction" },
              { label: "Special Allowance", name: "specialAllowance" },
              { label: "ESI", name: "employeeStateInsurance" },
              { label: "HRA", name: "houseRentAllowance" },
              { label: "PF (Provident Fund)", name: "providentFund" },
              { label: "EPF", name: "employeeProvidentFund" },
              { label: "Other Allowance", name: "otherAllowance" },
            ].map((field) => (
              <TextField
                fullWidth
                key={field.name}
                label={field.label}
                type="number"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            ))}
            <TextField
              fullWidth
              label="Gross Salary"
              value={formData.grossSalary || 0}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="contained" color="error" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditSalaryModal;

