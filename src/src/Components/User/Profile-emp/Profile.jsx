import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Avatar,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Card,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import image from "./images/images.png"; // Assume image is correctly imported
import axios from "axios";
import { useAuth } from "../../../Components/Context/AuthContext";

const UltimateUserProfile = () => {
  const { authState } = useAuth();
  const DEFAULT_EMPLOYEE_ID = authState.userDetails.employeeId;
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userData, setUserData] = useState([]);

  const handleEditClick = (card) => {
    setCurrentCard(card);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentCard("");
  };

  const renderEditForm = () => {
    if (!currentCard) return null;

    const cardData = userData[currentCard];
    if (Array.isArray(cardData)) {
      return cardData.map((item, index) => (
        <div key={index} className="mb-4">
          {Object.entries(item).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              name={key}
              defaultValue={value}
              fullWidth
              margin="dense"
              onChange={(e) => handleFieldChange(currentCard, index, key, e.target.value)}
            />
          ))}
        </div>
      ));
    } else {
      return Object.entries(cardData).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          name={key}
          defaultValue={value}
          fullWidth
          margin="dense"
          onChange={(e) => handleFieldChange(currentCard, key, e.target.value)}
        />
      ));
    }
  };

  const handleFieldChange = (card, index, key, value) => {
    setUserData((prev) => {
      const updatedCardData = [...prev[card]];
      updatedCardData[index] = {
        ...updatedCardData[index],
        [key]: value,
      };
      return {
        ...prev,
        [card]: updatedCardData,
      };
    });
  };

  const fetchAllDetailOfEmployee = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/fetchAllEmployees"
      );
      const employees = response.data.data;

      const selectedEmployee = employees.find(
        (emp) => emp.employeeId === DEFAULT_EMPLOYEE_ID
      );
      setSelectedEmployee(selectedEmployee);
      setUserData([selectedEmployee]);
    } catch (error) {
      console.error("Error fetching selectedEmployee data:", error);
    }
  };

  useEffect(() => {
    fetchAllDetailOfEmployee();
  }, []);

  return (
    <div>
      {userData.map((selectedEmployee) => {
        return (
          <Box
            sx={{ p: 4, maxWidth: 1600, mx: "auto", backgroundColor: "#ffffff" }}
            key={selectedEmployee.id}
          >
            {/* Profile Header */}
            <Paper
              sx={{
                display: "flex",
                p: 4,
                borderRadius: 3,
                boxShadow: 10,
                mb: 4,
                background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
              }}
            >
              <Avatar
                alt="User"
                src={image}
                sx={{ width: 120, height: 120, border: 5, borderColor: "black", mr: 3 }}
              />
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: "black", fontFamily: "Arial, sans-serif" }}
                >
                  {selectedEmployee.name}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: "black", fontFamily: "Arial, sans-serif" }}
                >
                  {selectedEmployee.userName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "black", opacity: 0.8, fontFamily: "Arial, sans-serif" }}
                >
                  {selectedEmployee.role}
                </Typography>
                <Typography variant="body1" sx={{ color: "black", opacity: 0.7 }}>
                  Employee ID: {selectedEmployee.employeeId}
                </Typography>
                <Typography variant="body1" sx={{ color: "black", opacity: 0.7 }}>
                  Contact: {selectedEmployee.officialNumber}
                </Typography>
                <Typography variant="body1" sx={{ color: "black", opacity: 0.7 }}>
                  Email: {selectedEmployee.officialEmail}
                </Typography>
                <Typography variant="body1" sx={{ color: "black", opacity: 0.7 }}>
                  Department: {selectedEmployee.department}
                </Typography>
                <Typography variant="body2" sx={{ color: "black", opacity: 0.7 }}>
                  Join Date: {selectedEmployee.joiningDate}
                </Typography>
              </Box>
            </Paper>

            {/* Cards Section */}
            <Grid container spacing={4}>
              {/* Personal Information */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: 10,
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: "#f9f9f9",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 24 },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#000000" }}
                    >
                      Personal Information
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => handleEditClick("personalInfo")}
                          color="primary"
                        >
                          <EditIcon sx={{ color: "#000000" }} />
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  </Box>
                  <Divider sx={{ my: 2, backgroundColor: "#000000" }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Father-Name: {selectedEmployee.fatherName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Father No.: {selectedEmployee.fatherContactNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Mother-Name: {selectedEmployee.motherName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Mother No.: {selectedEmployee.motherNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Aadhar No: {selectedEmployee.aadharCardNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Pan-Card No.: {selectedEmployee.panCardNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Date-of-birth: {selectedEmployee.dob}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Mobile: {selectedEmployee.phoneNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Email: {selectedEmployee.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Gender: {selectedEmployee.gender}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Blood-Group: {selectedEmployee.bloodGroup}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Permanent-Address: {selectedEmployee.permanentAddress}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Local-Address: {selectedEmployee.localAddress}
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              {/* Bank Information */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: 10,
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: "#f9f9f9",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 24 },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#000000" }}
                    >
                      Bank Information
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => handleEditClick("bankInfo")}
                          color="primary"
                        >
                          <EditIcon sx={{ color: "#000000" }} />
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  </Box>
                  <Divider sx={{ my: 2, backgroundColor: "#000000" }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Bank Name: {selectedEmployee.bankName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Branch Name: {selectedEmployee.branchName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Account No: {selectedEmployee.accountNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      IFSC: {selectedEmployee.ifscCode}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      PAN No: {selectedEmployee.panCardNumber}
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              {/* Leaves Balance */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: 10,
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: "#f9f9f9",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 24 },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#000000" }}
                    >
                      Leaves Balance
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => handleEditClick("leavesBalance")}
                          color="primary"
                        >
                          <EditIcon sx={{ color: "#000000" }} />
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  </Box>
                  <Divider sx={{ my: 2, backgroundColor: "#000000" }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Casual-Leaves: {selectedEmployee.casualLeaveBalance}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Sick-Leaves: {selectedEmployee.sickLeaveBalance}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Earned-Leaves: {selectedEmployee.paidLeaveBalance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            {/* Dialog for Editing */}
            <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
              <DialogTitle>Edit {currentCard}</DialogTitle>
              <DialogContent>{renderEditForm()}</DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                    // Add any save logic here
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>



               {/* Experience Information */}
        {/* <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Enquiry</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("experience")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box> */}
             
                {/* <Box key={selectedEmployee.id}>
                  <Typography variant="body2" sx={{ color: "white" }}>Experience: {selectedEmployee.experience}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Emergency Contact-Name: {selectedEmployee.emergencyContactName}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>emergency Contact-relation: {selectedEmployee.emergencyContactRelation}</Typography>
                  <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
                </Box>
             
            </Box>
          </Card>
        </Grid> */}
      

      {/* Dialog for Editing */}
      {/* <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit {currentCard}</DialogTitle>
        <DialogContent>
          {renderEditForm()}
        </DialogContent>
            
        <DialogActions>
        <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={handleDialogClose}
            >
              <b>Cancel</b>
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#b17f27",
                color: "#ffff",
              }}
              onClick={handleDialogClose}
            >
              <b>Edit</b>
            </Button>
          </div>
        </DialogActions>
      </Dialog> */}

      </Box>
        );
      })}
    </div>
  );
};

export default UltimateUserProfile;