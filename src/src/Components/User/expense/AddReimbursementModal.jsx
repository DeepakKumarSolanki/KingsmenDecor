import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const AddReimbursementModal = ({
  isEditing,
  formData,
  setFormData,
  handleCloseModal,
}) => {
  const [errors, setErrors] = useState({});
  const { authState } = useAuth();

  const openDriveLink = () => {
    window.open(
      "https://drive.google.com/drive/folders/1jM_z5KO-6sInJ2hQLzMElbKJP7rsjK9l?usp=sharing",
      "_blank"
    );
  };

  const projectOptions = [
    { name: "Shriram Smash Hit", distance: 20 },
    { name: "Vajram codename KGF", distance: 10 },
    { name: "Bhartiya Nikoo homes 6", distance: 9 },
    { name: "Godrej Yashwanthpur", distance: 9 },
    { name: "Provident Ecopolitin", distance: 21 },
    { name: "Vajram Newtown", distance: 10 },
    { name: "Ajmera Lakeside", distance: 13 },
    { name: "Lodha Mirabelle", distance: 7 },
    { name: "Concored Mayfair", distance: 7 },
    { name: "Concorde New", distance: 12 },
    { name: "Shriram codename Poem", distance: 12 },
    { name: "Shriram Solitaire", distance: 13 },
    { name: "Century Liva", distance: 15 },
    { name: "Century Built Rare", distance: 21 },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.purpose) newErrors.purpose = "Purpose is required.";

    if (formData.purpose === "Petrol") {
      if (!formData.projects || formData.projects.length === 0)
        newErrors.projects = "At least one project is required.";
      if (!formData.amount || formData.amount <= 0)
        newErrors.amount = "Amount is required.";
    }

    if (formData.purpose === "Cab") {
      if (!formData.amount || formData.amount <= 0)
        newErrors.amount = "Amount is required.";
    }

    if (formData.purpose === "Others") {
      if (!formData.amount || formData.amount <= 0)
        newErrors.amount = "Amount is required.";
      if (!formData.reason || formData.reason.trim() === "")
        newErrors.reason = "Reason is required.";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSubmit = {
      ...formData,
      employeeId: authState.userDetails.employeeId,
      employeeName: authState.userDetails.userName,
    };

    if (formData.purpose === "Petrol") {
      // Extract distances only
      const selectedProjectDistances = formData.projects.map((projectName) => {
        const project = projectOptions.find((p) => p.name === projectName);
        return project ? project.distance : 0;
      });
      dataToSubmit.projects = selectedProjectDistances;
    }
    console.log("Payload:", dataToSubmit);
    try {
      const response = await axios.post(
        "http://localhost:8080/reimbursement",
        dataToSubmit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);
      alert("Reimbursement added successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error occurred:", error.response || error.message);
     
    }
  };

  useEffect(() => {
    if (isEditing) {
      setFormData((prevData) => ({
        ...prevData,
        projects: prevData.projects || [],
      }));
    }
  }, [isEditing, setFormData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-3/4 md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">
            {isEditing ? "Edit Reimbursement" : "Add Reimbursement"}
          </h5>
          <button
            onClick={handleCloseModal}
            className="bg-red-500 text-white p-2 rounded-full"
          >
            <CgClose />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Employee ID"
              name="employeeId"
              value={authState.userDetails.employeeId}
              disabled
              fullWidth
            />
            <TextField
              label="Employee Name"
              name="employeeName"
              value={authState.userDetails.userName}
              disabled
              fullWidth
            />
            <TextField
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              error={!!errors.date}
              helperText={errors.date}
              required
              fullWidth
            />
            <FormControl required error={!!errors.purpose} fullWidth>
              <InputLabel>Purpose</InputLabel>
              <Select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                  Select Purpose
                </MenuItem>
                <MenuItem value="Petrol">Petrol Allowance</MenuItem>
                <MenuItem value="Cab">Cab Reimbursement</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {errors.purpose && (
                <span className="text-sm text-red-600">{errors.purpose}</span>
              )}
            </FormControl>

            {formData.purpose === "Petrol" && (
              <>
                <FormControl required error={!!errors.projects} fullWidth>
                  <InputLabel>Projects</InputLabel>
                  <Select
                    multiple
                    name="projects"
                    value={formData.projects}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projects: e.target.value,
                      })
                    }
                    input={<OutlinedInput label="Projects" />}
                    renderValue={(selected) => (
                      <div className="flex flex-wrap gap-1">
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {projectOptions.map((project) => (
                      <MenuItem key={project.name} value={project.name}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.projects && (
                    <span className="text-sm text-red-600">
                      {errors.projects}
                    </span>
                  )}
                </FormControl>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  fullWidth
                />
              </>
            )}

            {formData.purpose === "Cab" && (
              <>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  fullWidth
                />
                <TextField
                  type="file"
                  label="Upload Receipt"
                  name="receipt"
                  onClick={openDriveLink}
                  error={!!errors.receipt}
                  helperText={errors.receipt}
                  inputProps={{ accept: "application/pdf" }}
                />
              </>
            )}

            {formData.purpose === "Others" && (
              <>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  fullWidth
                />
                <TextField
                  label="Reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  error={!!errors.reason}
                  helperText={errors.reason}
                  fullWidth
                />
                <TextField
                  type="file"
                  label="Upload Receipt"
                  name="receipt"
                  onClick={openDriveLink}
                  error={!!errors.receipt}
                  helperText={errors.receipt}
                  inputProps={{ accept: "application/pdf" }}
                />
              </>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-[#b17f27] text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReimbursementModal;
