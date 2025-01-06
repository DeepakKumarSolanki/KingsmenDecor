import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import Event from '../../../assets/admin/event.gif'

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Activities = () => {
  const [alertOpen, setAlertOpen] = useState(false); // Success alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // State for Snackbar message
  const [alertSeverity, setAlertSeverity] = useState("success"); // State for Snackbar severity (success or error)
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "", // Changed from eventName to eventDescription
    eventDate: null,
  });
  const [errors, setErrors] = useState({
    eventTitle: "",
    eventDescription: "", // Changed from eventName to eventDescription
    eventDate: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.eventTitle) newErrors.eventTitle = "Event Title is required";
    if (!formData.eventDescription)
      newErrors.eventDescription = "Event Description is required"; // Validate eventDescription
    if (!formData.eventDate) newErrors.eventDate = "Event Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Add_Activities_Api = `http://localhost:8080/addEvent`;

  const handleSubmit = async () => {
    // Validate the form before submitting
    if (!validateForm()) return;

    // Format the eventDate to YYYY-MM-DD
    const formattedFormData = { ...formData };
    if (formData.eventDate) {
      const date = new Date(formData.eventDate);
      formattedFormData.eventDate = date.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    }

    try {
      // Log the formatted data to confirm its structure (simple log without prettifying)
      console.log("Formatted Form Data Submitted:", formattedFormData);

      // Send data as JSON to the API endpoint
      const response = await axios.post(Add_Activities_Api, formattedFormData, {
        headers: {
          "Content-Type": "application/json", // Ensures data is sent in JSON format
        },
      });

      // Handle the successful creation of the event
      console.log("Event created successfully:", response.data);
      setAlertMessage("Event created successfully!");
      setAlertSeverity("success");
      setAlertOpen(true); // Show success alert
      window.location.reload();

      // Close the dialog and reset the form
      handleClose();
      setFormData({
        eventTitle: "",
        eventDescription: "",
        eventDate: null,
      });
    } catch (error) {
      // Log any error that occurs during the request
      console.error("Error creating event:", error);
      setAlertMessage(error.message || "Failed to Event created.");
      setAlertSeverity("error");
    }
  };

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const Activity_Data_Api = `http://localhost:8080/getEvents`;

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch(Activity_Data_Api);
      const result = await response.json();

      if (response.ok) {
        console.log("Fetched activities:", result);
        setActivities(result.data);
      } else {
        console.error("Failed to fetch activities:", result.message);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h6 className="text-2xl font-semibold text-gray-700">Activities</h6>
          <div className="text-sm text-gray-500">Dashboard / Activities</div>
        </div>

        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={handleOpen}
          sx={{
            textTransform: "capitalize",
            borderRadius: "20px",
            height: "40px",
            backgroundColor: "#b17f27",
            color: "#fff",
            "&:hover": { backgroundColor: "#a76e24" },
          }}
        >
          Add Activities
        </Button>
      </div>

      {/* Dialog for Adding Activity */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            margin="normal"
            value={formData.eventTitle}
            onChange={(e) => handleChange("eventTitle", e.target.value)}
            error={!!errors.eventTitle}
            helperText={errors.eventTitle}
          />
          <TextField
            label="Event Description" // Updated label to reflect description
            fullWidth
            margin="normal"
            value={formData.eventDescription} // Changed from eventName to eventDescription
            onChange={(e) => handleChange("eventDescription", e.target.value)} // Changed eventName to eventDescription
            error={!!errors.eventDescription} // Updated error handling
            helperText={errors.eventDescription} // Updated helper text for description
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Event Date"
              value={formData.eventDate}
              onChange={(date) => handleChange("eventDate", date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.eventDate}
                  helperText={errors.eventDate}
                />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activities Section */}
      <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", p: 3 }}>
        {loading ? (
          <Typography variant="h6" textAlign="center">
            Loading activities...
          </Typography>
        ) : activities.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            No activities found.
          </Typography>
        ) : (
          <List
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
              maxWidth: 1800,
              margin: "0 auto",
            }}
          >
            {activities.map((activity, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  borderBottom: "1px solid #eee",
                  p: 2,
                  "&:hover": { backgroundColor: "#b17f27", cursor: "pointer" },
                  transition: "background-color 0.3s ease",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={activity.eventDescription} // Changed from eventName to eventDescription
                    src={
                      Event
                    }
                    sx={{ border: "2px solid #b17f27", boxShadow: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {activity.eventDescription}{" "}
                      {/* Changed from eventName to eventDescription */}
                      {" - "}
                      <span style={{ fontWeight: 400 }}>
                        {activity.eventName} {/* Added eventName here */}
                      </span>
                      <span style={{ fontWeight: 400 }}>
                        {" "}
                        - {activity.eventDetail}
                      </span>
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {activity.eventDate}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Success or Error Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000} // Automatically close after 5 seconds
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Display at the top-center
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity} // Dynamically set severity (success or error)
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Activities;
