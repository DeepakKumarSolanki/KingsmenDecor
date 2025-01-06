import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
const EditTicketForm = ({ ticket, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ticketTitle: "",
    priority: "",
    status: "",
    ticketId: "",
    description: "",
    updatedBy: "admin",
    updatedAt: Date.now(),
  });
  const {authState}=useAuth()

  useEffect(() => {
    const now = new Date();

    // Get the year, month, day, hours, minutes, and seconds
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Format the date and time as "yyyy/MM/dd HH:mm:ss"
    const updatedAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    if (ticket) {
      setFormData({
        ticketTitle: ticket.ticketTitle || "",
        priority: ticket.priority || "",
        status: ticket.status || "",
        employeeName: authState.userDetails.firstName || "",
        employeeId: ticket.employeeId || "",
        ticketId: ticket.ticketId || "",
        description: ticket.description || "",
        updatedBy: authState.userDetails.firstName || "" ,
        updatedAt,
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (Object.values(formData).some((field) => field === "")) {
      alert("All fields are required!");
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Box className="flex justify-center items-center w-full h-full p-4">
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: 3, // Adds some shadow around the box
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="modal-header flex justify-between items-center mb-4">
          <h5 style={{ color: "golden" }}>Edit Ticket</h5>
        </div>
        <div className="modal-body space-y-4">
          <TextField
            fullWidth
            label="Ticket ID"
            name="ticketId"
            value={formData.ticketId}
            // onChange={handleChange}
            // required
            disabled
            sx={{
              marginBottom: "16px",
            }}
          />
          <TextField
            fullWidth
            label="Ticket Title"
            name="ticketTitle"
            value={formData.ticketTitle}
            onChange={handleChange}
            required
            sx={{
              marginBottom: "16px",
            }}
          />
          <TextField
            fullWidth
            label="Employee Id"
            name="employeeId"
            value={formData.employeeId}
            // onChange={handleChange}
            disabled
            // required
            sx={{
              marginBottom: "16px",
            }}
          />
          <TextField
            fullWidth
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName}
            // onChange={handleChange}
            // required
            disabled
            sx={{
              marginBottom: "16px",
            }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            sx={{
              marginBottom: "16px",
            }}
          />
          <FormControl fullWidth size="small" sx={{ marginBottom: "16px" }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <MenuItem value="HIGH" style={{ color: "red" }}>
                High
              </MenuItem>
              <MenuItem value="MEDIUM" style={{ color: "orange" }}>
                Medium
              </MenuItem>
              <MenuItem value="LOW" style={{ color: "green" }}>
                Low
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ marginBottom: "16px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="NEW" style={{ color: "blue" }}>
                New
              </MenuItem>
              <MenuItem value="OPEN" style={{ color: "blue" }}>
                Open
              </MenuItem>
              <MenuItem value="PENDING" style={{ color: "ORANGE" }}>
                Pending
              </MenuItem>
              <MenuItem value="CLOSED" style={{ color: "green" }}>
                Closed
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="modal-footer flex justify-end gap-4 mt-4">
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning" // Golden color
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default EditTicketForm;
