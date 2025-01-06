import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AvatarMale from "../../../assets/admin/Avatar Male.jpg";
import AvatarFemale from "../../../assets/admin/Avtar Female.jpg";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";



const Employee = () => {


  const [alertOpen, setAlertOpen] = useState(false); // Success alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // State for Snackbar message
  const [alertSeverity, setAlertSeverity] = useState("success"); // State for Snackbar severity (success or error)
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  // ! Add Employee Data Start Here
  const [managers, setManagers] = useState([]);
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 18)); // Subtract 18 years
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "", // Personal Email
    officialEmail: "", // Official Email
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    officialNumber: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContact: "",
    joiningDate: null,
    aadharCardNumber: "",
    panCardNumber: "",
    dob: null,
    fatherName: "",
    fatherContactNumber: "",
    motherName: "",
    motherNumber: "",
    permanentAddress: "",
    localAddress: "",
    bloodGroup: "",
    department: "",
    role: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    gender: "", // Add gender field
    experience: "",
    managerName: "", // Changed field name // Add manager field
    managerId: "", // Add managerId field
  });

  const [errors, setErrors] = useState({});

  // Dropdown options

  const departments = ["SALES", "MARKETING", "TECH "];
  const roles = ["ADMIN", "EMPLOYEE", "MANAGER"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form values
    setFormValues({ ...formValues, [name]: value });

    // Validate the specific field on change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error, // Update the specific field's error
    }));

    if (name === "managerId") {
      const selectedManager = managers.find(
        (manager) => manager.employeeId === value
      );
      if (selectedManager) {
        setFormValues((prevValues) => ({
          ...prevValues,
          managerName: `${selectedManager.firstName} ${selectedManager.lastName}`,
        }));
      }
    }
  };

  const handleDateChange = (key, date) => {
    setFormValues({ ...formValues, [key]: date });
    const error = validateField(key, date);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: error,
    }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "employeeId":
        if (!value) return "Employee ID is required.";
        break;
      case "firstName":
      case "lastName":
        if (!value)
          return `${field === "firstName" ? "First" : "Last"} Name is required.`;
        if (!/^[A-Za-z\s]+$/.test(value))
          return `${field === "firstName" ? "First" : "Last"} Name must contain only letters.`;
        break;

      case "email":
        if (!value) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address.";
        break;
      case "officialEmail":
        if (!value) return "Official Email is required.";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Invalid official email address.";
        break;
      case "userName":
        if (!value) return "Username is required.";
        break;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (!value) return "Confirm Password is required.";
        if (value !== formValues.password) return "Passwords do not match.";
        break;
      case "phoneNumber":
        if (!value) return "Phone Number is required.";
        if (!/^\d{10}$/.test(value))
          return "Invalid Phone Number. It must be 10 digits.";
        break;
      case "officialNumber":
        if (!value) return "Official Number is required.";
        if (!/^\d{10}$/.test(value))
          return "Invalid Official Number. It must be 10 digits.";
        break;
      case "emergencyContact":
        if (!value) return "Emergency Contact Number is required.";
        if (!/^\d{10}$/.test(value))
          return "Invalid Emergency Contact Number. It must be 10 digits.";
        break;
      case "fatherContactNumber":
        if (!value) return "Father's Contact Number is required.";
        if (!/^\d{10}$/.test(value))
          return "Invalid Father's Contact Number. It must be 10 digits.";
        break;
      case "motherNumber":
        if (!value) return "Mother's Contact Number is required.";
        if (!/^\d{10}$/.test(value))
          return "Invalid Mother's Contact Number. It must be 10 digits.";
        break;
      case "emergencyContactName":
        if (!value) return "Emergency Contact Name is required.";
        if (!/^\d{10}$/.test(value))
          return "Emergency Contact Name must be a valid 10-digit number.";
        break;
      case "emergencyContactRelation":
        if (!value) return "Emergency Contact Relation is required.";
        break;
      case "joiningDate":
      case "dob":
        if (!value) return "Date of Birth is required.";
        const selectedDate = new Date(value);

        // Check if the selected date is in the future
        if (selectedDate > today)
          return "Date of Birth cannot be a future date.";

        // Check if the selected date is at least 18 years ago
        if (selectedDate > minDate) return "You must be at least 18 years old.";

        break;

      case "aadharCardNumber":
        if (!value) return "Aadhar Card Number is required.";
        if (!/^\d{12}$/.test(value))
          return "Invalid Aadhar Card Number. It must be 12 digits.";
        break;
      case "panCardNumber":
        if (!value) return "PAN Card Number is required.";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
          return "Invalid PAN Card Number.";
        break;
      case "fatherName":
        if (!value) return "Father's Name is required.";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Father's Name must contain only letters.";
        break;
      case "motherName":
        if (!value) return "Mother's Name is required.";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Mother's Name must contain only letters.";
        break;
      case "permanentAddress":
        if (!value) return "Permanent Address is required.";
        break;
      case "localAddress":
        if (!value) return "Local Address is required.";
        break;
      case "bloodGroup":
        if (!value) return "Blood Group is required.";
        if (!["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(value))
          return "Invalid Blood Group.";
        break;
      case "department":
        if (!value) return "Department is required.";
        break;
      case "role":
        if (!value) return "Role is required.";
        break;
      case "bankName":
        if (!value) return "Bank Name is required.";
        break;
      case "branchName":
        if (!value) return "Branch Name is required.";
        break;
      case "accountNumber":
        if (!value) return "Account Number is required.";
        if (!/^\d{9,18}$/.test(value))
          return "Invalid Account Number. It must be between 9 and 18 digits.";
        break;
      case "ifscCode":
        if (!value) return "IFSC Code is required.";
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) return "Invalid IFSC Code.";
        break;
      case "gender":
        if (!value) return "Gender is required.";
        break;
      case "experience":
        if (!value) return "Experience is required.";
        if (!/^\d+$/.test(value)) return "Experience must be a valid number.";
        break;
        case "managerName":
          if (!value) return "Manager name is required.";
          break;

      case "managerId":
        if (!value) return "Manager ID is required.";
        break;
      case "permanentAddress": // Validation for permanent address
        if (!value) return "Permanent Address is required.";
        break;

      default:
        if (!value) return "This field is required.";
        break;
    }
    return "";
  };

  const handleSubmit = async () => {
    // const isValid = addEmployeeValidateForm();
    // if (!isValid) return;

    // Format the dates to 'yyyy-MM-dd' format before sending
    const formattedFormValues = { ...formValues };

    if (formValues.joiningDate) {
      const date = new Date(formValues.joiningDate);
      formattedFormValues.joiningDate = date.toLocaleDateString("en-CA");
    }

    if (formValues.dob) {
      const date = new Date(formValues.dob);
      formattedFormValues.dob = date.toLocaleDateString("en-CA");
    }

    const add_Employee_Data = `http://localhost:8080/addEmployee`;
    console.log("add Employee Data", formattedFormValues);
    try {
      const response = await fetch(add_Employee_Data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedFormValues),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form Submitted Successfully:", data);

        // Reset form values
        setFormValues({
          employeeId: "",
          firstName: "",
          lastName: "",
          email: "",
          officialEmail: "", // Reset official email as well
          userName: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",

          officialNumber: "",
          emergencyContactName: "",
          emergencyContactRelation: "",
          emergencyContact: "",
          joiningDate: null,
          aadharCardNumber: "",
          panCardNumber: "",
          dob: null,
          fatherName: "",
          fatherContactNumber: "",
          motherName: "",
          motherNumber: "",
          permanentAddress: "",
          localAddress: "",
          bloodGroup: "",
          department: "",
          role: "",
          bankName: "",
          branchName: "",
          accountNumber: "",
          ifscCode: "",
          experience: "",
          managerName: "", // New manager field
          managerId: "", // New managerId field
        });
        setErrors({});
        setAlertMessage("Add Employee successfully!");
        setAlertSeverity("success");
        setAlertOpen(true); // Show success alert
        setOpen(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        setAlertMessage(error.message || "Failed to apply for leave.");
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const addEmployeeValidateForm = () => {
    const newErrors = {};

    Object.entries(formValues).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ! Add Employee Data Start Here

  // ! Search Employee Logic start here

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [employees, setEmployees] = useState([]);
  const All_Employee_Data =
    "http://localhost:8080/fetchAllEmployees"; // Replace with your API URL

  // Fetch all employee data
  const fetchEmployees = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(All_Employee_Data);
      console.log(response);
      console.log("API Response:", response.data.data);

      // Validate response

      const validData = response.data.data.filter(
        (employee) => employee.employeeId || employee.name || employee.role
      );

      setEmployees(validData);
      console.log(validData);
      setFilteredEmployees(validData);
      console.log(filteredEmployees);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search/filter logic
  const handleSearch = () => {
    const filtered = employees.filter((employee) => {
      const id = employee.employeeId || ""; // Ensure using correct property
      const name = employee.name || "";
      const role = employee.role || "";

      const matchesId = searchId === "" || id.toString().includes(searchId);
      const matchesName =
        searchName === "" ||
        name.toLowerCase().includes(searchName.toLowerCase());
      const matchesDesignation = designation === "" || role === designation;

      return matchesId && matchesName && matchesDesignation;
    });
    setFilteredEmployees(filtered);
    console.log("Filtered Employees:", filtered);
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Search Employee Logic End here

  // ! Function to handle opening the edit dialog=============================================
  const [editFormErrors, setEditFormErrors] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormValues, setEditFormValues] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "", // Personal Email
    officialEmail: "", // Official Email
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    officialNumber: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContact: "",
    joiningDate: null,
    aadharCardNumber: "",
    panCardNumber: "",
    dob: null,
    fatherName: "",
    fatherContactNumber: "",
    motherName: "",
    motherNumber: "",
    permanentAddress: "",
    localAddress: "",
    bloodGroup: "",
    department: "",
    role: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    gender: "", // Add gender field validation all thing
    experience: "",
    managerName: "", // Updated field name // New manager field
    managerId: "", // New managerId field
  });

  // Handle opening the form for editing
  const handleEditOpen = (employee) => {
    if (!employee) {
      console.error("Invalid employee data");
      return;
    }

    // Set form values with the passed employee data
    setEditFormValues({
      ...employee,
      joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : null,
      dob: employee.dob ? new Date(employee.dob) : null,
    });

    // Open the edit form
    setIsEditOpen(true);
  };

  // Handle closing the form
  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditFormErrors({});
  };

  // Handle form field changes
  const handleEditChange = (key, value) => {
    console.log(key, value); // Add console log for debugging
    setEditFormValues((prevValues) => ({ ...prevValues, [key]: value }));

    if (key === "managerId") {
      // Automatically populate the managerName when managerId is changed
      const selectedManager = managers.find(
        (manager) => manager.employeeId === value
      );
      if (selectedManager) {
        setEditFormValues((prevValues) => ({
          ...prevValues,
          managerName: `${selectedManager.firstName} ${selectedManager.lastName}`, // Update managerName
        }));
      } else {
        // Clear managerName if managerId does not match
        setEditFormValues((prevValues) => ({ ...prevValues, managerName: "" }));
      }
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!editFormValues.firstName.trim()) {
      errors.firstName = "First name is required.";
    } else if (!/^[a-zA-Z]+$/.test(editFormValues.firstName)) {
      errors.firstName = "First name must contain only alphabetic characters.";
    }

    if (!editFormValues.lastName.trim()) {
      errors.lastName = "Last name is required.";
    } else if (!/^[a-zA-Z]+$/.test(editFormValues.lastName)) {
      errors.lastName = "Last name must contain only alphabetic characters.";
    }

    // Email validation
    if (!editFormValues.email.trim()) {
      errors.email = "Personal email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormValues.email)) {
      errors.email = "Enter a valid email.";
    }

    // Official Email validation
    if (!editFormValues.officialEmail.trim()) {
      errors.officialEmail = "Official email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormValues.officialEmail)
    ) {
      errors.officialEmail = "Enter a valid official email.";
    }

    // Username validation
    if (!editFormValues.userName.trim()) {
      errors.userName = "Username is required.";
    }

    // Phone number validation
    // Phone number validation
    if (!editFormValues.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(editFormValues.phoneNumber)) {
      errors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    // Emergency contact validation
    if (!editFormValues.emergencyContactName.trim()) {
      errors.emergencyContactName = "Emergency contact name is required.";
    }

    if (!editFormValues.emergencyContactRelation.trim()) {
      errors.emergencyContactRelation =
        "Emergency contact relation is required.";
    }

    if (!editFormValues.emergencyContact) {
      errors.emergencyContact = "Emergency contact number is required.";
    } else if (!/^\d{10}$/.test(editFormValues.emergencyContact)) {
      errors.emergencyContact = "Emergency contact must be exactly 10 digits.";
    }

    // Date validation
    if (!editFormValues.dob) {
      errors.dob = "Date of birth is required.";
    } else if (editFormValues.dob > new Date()) {
      errors.dob = "Date of birth cannot be in the future.";
    }

    if (!editFormValues.joiningDate) {
      errors.joiningDate = "Joining date is required.";
    }

    // Aadhar card number validation
    if (
      editFormValues.aadharCardNumber &&
      !/^\d{12}$/.test(editFormValues.aadharCardNumber)
    ) {
      errors.aadharCardNumber = "Aadhar card number must be exactly 12 digits.";
    }

    // PAN card validation
    if (
      editFormValues.panCardNumber &&
      !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(editFormValues.panCardNumber)
    ) {
      errors.panCardNumber =
        "Enter a valid PAN card number (e.g., ABCDE1234F).";
    }

    // Password validation
    if (editFormValues.password) {
      // Check if the password is at least 8 characters long
      if (editFormValues.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
      }

      // Check if password and confirmPassword match
      if (editFormValues.password !== editFormValues.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
    }

    // Confirm Password validation
    if (!editFormValues.confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    }

    // Gender validation
    if (!editFormValues.gender.trim()) {
      errors.gender = "Gender is required.";
    }

    // Blood group validation
    if (!editFormValues.bloodGroup.trim()) {
      errors.bloodGroup = "Blood group is required.";
    }

    // Department validation
    if (!editFormValues.department.trim()) {
      errors.department = "Department is required.";
    }

    // Role validation
    if (!editFormValues.role.trim()) {
      errors.role = "Role is required.";
    }

    // Father Name validation
    if (!editFormValues.fatherName.trim()) {
      errors.fatherName = "Father's name is required.";
    }

    // Father contact number validation
    if (!editFormValues.fatherContactNumber) {
      errors.fatherContactNumber = "Father's contact number is required.";
    } else if (!/^\d{10}$/.test(editFormValues.fatherContactNumber)) {
      errors.fatherContactNumber =
        "Father's contact number must be exactly 10 digits.";
    }

    // Mother Name validation
    if (!editFormValues.motherName.trim()) {
      errors.motherName = "Mother's name is required.";
    }

    // Mother contact number validation
    if (!editFormValues.motherNumber) {
      errors.motherNumber = "Mother's contact number is required.";
    } else if (!/^\d{10}$/.test(editFormValues.motherNumber)) {
      errors.motherNumber =
        "Mother's contact number must be exactly 10 digits.";
    }

    // Bank name validation
    if (!editFormValues.bankName.trim()) {
      errors.bankName = "Bank name is required.";
    }

    // Branch name validation
    if (!editFormValues.branchName.trim()) {
      errors.branchName = "Branch name is required.";
    }

    // Account number validation
    if (!editFormValues.accountNumber) {
      errors.accountNumber = "Account number is required.";
    } else if (!/^\d{9,18}$/.test(editFormValues.accountNumber)) {
      errors.accountNumber = "Account number must be between 9 and 18 digits.";
    }

    // IFSC code validation
    if (!editFormValues.ifscCode.trim()) {
      errors.ifscCode = "IFSC code is required.";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(editFormValues.ifscCode)) {
      errors.ifscCode = "IFSC code must be in the correct format.";
    }

    if (!editFormValues.experience) {
      errors.experience = "Experience is required.";
    } else if (
      !/^\d+$/.test(editFormValues.experience) ||
      parseInt(editFormValues.experience, 10) < 0
    ) {
      errors.experience = "Experience must be a positive number.";
    }
    // Manager validation
    // Manager Name validation
    if (!editFormValues.managerName.trim()) {
      errors.managerName = "Manager name is required.";
    }

    // Manager ID validation (you may want to add custom validation for this field as needed)
    if (!editFormValues.managerId.trim()) {
      errors.managerId = "Manager ID is required.";
    }

    // Add validation for permanentAddress
    if (!editFormValues.permanentAddress.trim()) {
      errors.permanentAddress = "Permanent address is required.";
    }

    return errors;
  };

  const Update_Employee_Data =
    "http://localhost:8080/editEmployee";

  // Submit form handler
  const handleEditSubmit = async () => {
    setIsSubmitting(true);
    const errors = validateForm();
    setEditFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Prepare data for submission
    const formattedFormValues = { ...editFormValues };

    if (formattedFormValues.joiningDate) {
      const date = new Date(formattedFormValues.joiningDate);
      formattedFormValues.joiningDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    }

    if (formattedFormValues.dob) {
      const date = new Date(formattedFormValues.dob);
      formattedFormValues.dob = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    }

    // Submit data to the backend
    await updateEmployeeDataOnBackend(formattedFormValues);

    setIsSubmitting(false);
    handleEditClose();
  };

  // Function to handle update backend request
  const updateEmployeeDataOnBackend = async (employeeData) => {
    try {
      const response = await fetch(Update_Employee_Data, {
        method: "PUT", // Change to PUT request for update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee data");
      }

      console.log("Employee data updated successfully");
      // Handle success (e.g., show a success message)
      setAlertMessage("Update Employee Data successfully!");
      setAlertSeverity("success");
      setAlertOpen(true); // Show success alert
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee data:", error);
      // Handle error (e.g., show an error message)
      setAlertMessage(error || "Failed to Update Employee Data.");
      setAlertSeverity("error");
    }
  };

  //! Edit Employee Logic End  here ===============================================
  //! Fetch All  Manager Data Logic Start  here ===============================================

  const fetchAllManagers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/getManager",
        {
          method: "GET", // Use 'GET' for retrieving data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch manager data");
      }

      const data = await response.json(); // Parse the response body to JSON

      console.log("Fetched manager data:", data); // Log or handle the fetched manager data

      // Return the manager data stored inside the `data` field
      return data.data; // Accessing the `data` field from the response
    } catch (error) {
      console.error("Error fetching manager data:", error);
      return []; // Return an empty array or handle error appropriately
    }
  };

  useEffect(() => {
    const loadManagers = async () => {
      const managerData = await fetchAllManagers();
      setManagers(managerData); // Store fetched manager data in state
      console.log("managaer", managerData);
    };

    loadManagers(); // Call the function to fetch manager data
  }, []); // Empty dependency array to run only once when the component mounts

  //! Edit All  Manager Data Logic End  here ===============================================

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        {/* Button to Open Dialog */}
        <div className="rounded-md flex flex-wrap justify-between px-5 py-8 mb-6 border-solid">
          <h6 className="text-2xl font-semibold text-[#b17f27] flex-1 text-center sm:text-left">
            Employee
            <div className="text-[14px]">
              <p>Dashboard / Employee</p>
            </div>
          </h6>
          <button
            className="
      font-medium 
      py-2 px-4 sm:px-6 
      bg-[#b17f27] 
      text-white 
      rounded-full 
      flex 
      justify-center 
      items-center 
      gap-2 
      h-[40px] 
      text-sm sm:text-base 
      hover:bg-[#a56f23] 
      transition-all 
      duration-200 
      w-full sm:w-auto
      sm:flex-wrap
      sm:ml-auto
      mt-4 sm:mt-0  /* Adds margin-top on small screens */
    "
            onClick={handleOpen}
          >
            <FaPlus className="text-sm sm:text-base" />
            <span className="sm:inline">Add Employee</span>
          </button>
        </div>

        {/* Dialog start here  add Employee */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 gap-6">
              {/* Official Details Section */}

              <div>
                <h3 className="text-lg font-semibold mb-2">Official Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Employee ID"
                    name="employeeId"
                    value={formValues.employeeId}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.employeeId}
                    helperText={errors.employeeId}
                  />
                  <TextField
                    label="Username"
                    name="userName"
                    value={formValues.userName}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.userName}
                    helperText={errors.userName}
                  />
                  <TextField
                    label="Personal Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <TextField
                    label="Official Email"
                    name="officialEmail"
                    value={formValues.officialEmail}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.officialEmail}
                    helperText={errors.officialEmail}
                  />

                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    value={formValues.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          position="end"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />

                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} // Toggle between text and password type
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          position="end"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      ),
                    }}
                  />

                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                  <TextField
                    label="Official Number"
                    name="officialNumber"
                    value={formValues.officialNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.officialNumber}
                    helperText={errors.officialNumber}
                  />
                  <DatePicker
                    label="Joining Date"
                    value={formValues.joiningDate}
                    onChange={(date) => handleDateChange("joiningDate", date)}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  <TextField
                    label="Experience (in years)"
                    name="experience"
                    value={formValues.experience}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.experience}
                    helperText={errors.experience}
                  />
                  {/* Manager ID Dropdown */}
                  <FormControl fullWidth error={!!errors.managerId}>
                    <InputLabel>Manager</InputLabel>
                    <Select
                      label="Manager"
                      name="managerId"
                      value={formValues.managerId}
                      onChange={handleChange}
                      required
                    >
                      {managers.map((manager) => (
                        <MenuItem
                          key={manager.employeeId}
                          value={manager.employeeId}
                        >
                          {manager.employeeId} {/* Display Manager Name */}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.managerId && (
                      <FormHelperText>{errors.managerId}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Manager Name (Read-only TextField) */}
                  <TextField
                    label="Manager Name"
                    name="managerName"
                    value={formValues.managerName}
                    onChange={handleChange} // The field is still controlled, but the value is read-only
                    required
                    fullWidth
                    disabled // Disable the field to make it read-only
                  />

                  <TextField
                    label="Aadhar Card Number"
                    name="aadharCardNumber"
                    value={formValues.aadharCardNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.aadharCardNumber}
                    helperText={errors.aadharCardNumber}
                  />
                  <TextField
                    label="PAN Card Number"
                    name="panCardNumber"
                    value={formValues.panCardNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.panCardNumber}
                    helperText={errors.panCardNumber}
                  />
                </div>
              </div>

              {/* Bank Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Bank Name"
                    name="bankName"
                    value={formValues.bankName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.bankName}
                    helperText={errors.bankName}
                  />
                  <TextField
                    label="Branch Name"
                    name="branchName"
                    value={formValues.branchName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.branchName}
                    helperText={errors.branchName}
                  />
                  <TextField
                    label="Account Number"
                    name="accountNumber"
                    value={formValues.accountNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber}
                  />
                  <TextField
                    label="IFSC Code"
                    name="ifscCode"
                    value={formValues.ifscCode}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.ifscCode}
                    helperText={errors.ifscCode}
                  />
                </div>
              </div>

              {/* Personal Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={formValues.dob}
                      onChange={(date) => handleDateChange("dob", date)}
                      inputFormat="yyyy-MM-dd"
                      minDate={minDate} // Disable dates that are less than 18 years ago
                      maxDate={new Date()} // Disable dates after today
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                  <FormControl fullWidth error={!!errors.gender} required>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={formValues.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select Gender</em>
                      </MenuItem>
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>{errors.gender}</FormHelperText>
                  </FormControl>

                  <TextField
                    label="Father's Name"
                    name="fatherName"
                    value={formValues.fatherName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.fatherName}
                    helperText={errors.fatherName}
                  />
                  <TextField
                    label="Father's  Number"
                    name="fatherContactNumber"
                    value={formValues.fatherContactNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.fatherContactNumber}
                    helperText={errors.fatherContactNumber}
                  />
                  <TextField
                    label="Mother's Name"
                    name="motherName"
                    value={formValues.motherName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.motherName}
                    helperText={errors.motherName}
                  />
                  <TextField
                    label="Mother's  Number"
                    name="motherNumber"
                    value={formValues.motherNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.motherNumber}
                    helperText={errors.motherNumber}
                  />
                  <TextField
                    label="Local Address"
                    name="localAddress"
                    value={formValues.localAddress}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.localAddress}
                    helperText={errors.localAddress}
                  />
                  <TextField
                    label="Permanent Address"
                    name="permanentAddress"
                    value={formValues.permanentAddress}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.permanentAddress}
                    helperText={errors.permanentAddress}
                  />
                  <TextField
                    label="Emergency Contact Name"
                    name="emergencyContactName"
                    value={formValues.emergencyContactName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.emergencyContactName}
                    helperText={errors.emergencyContactName}
                  />
                  <TextField
                    label="Emergency Contact Relation"
                    name="emergencyContactRelation"
                    value={formValues.emergencyContactRelation}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.emergencyContactRelation}
                    helperText={errors.emergencyContactRelation}
                  />
                  <TextField
                    label="Emergency Contact  Number"
                    name="emergencyContact"
                    value={formValues.emergencyContact}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.emergencyContact}
                    helperText={errors.emergencyContact}
                  />
                </div>
              </div>

              {/* Additional Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormControl fullWidth error={!!errors.bloodGroup} required>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      label="Blood Group"
                      name="bloodGroup"
                      value={formValues.bloodGroup}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select Blood Group</em>
                      </MenuItem>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (group) => (
                          <MenuItem key={group} value={group}>
                            {group}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>{errors.bloodGroup}</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth error={!!errors.department} required>
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      name="department"
                      value={formValues.department}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select Department</em>
                      </MenuItem>
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.department}</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth error={!!errors.role} required>
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      name="role"
                      value={formValues.role}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select Role</em>
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.role}</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="success" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Employee Search section  */}
        <Box sx={{ padding: 2 }}>
          {/* Search Section */}
          <Box className="py-2 px-0 rounded-md">
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={3}
              gap={2}
            >
              <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  variant="outlined"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="dark:bg-boxdark dark:text-white dark:border-gray-600"
                  InputProps={{
                    classes: {
                      notchedOutline: "dark:border-gray-600 border-gray-300",
                      input: "dark:text-white", // ensures the input text is white
                    },
                  }}
                  InputLabelProps={{
                    className: "dark:text-white", // ensures label text is white
                  }}
                  placeholder="Enter Employee ID" // Adding a placeholder to demonstrate
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}>
                <TextField
                  fullWidth
                  label="Employee Name"
                  variant="outlined"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="dark:bg-boxdark dark:text-white dark:border-gray-600"
                  InputProps={{
                    classes: {
                      notchedOutline: "dark:border-gray-600 border-gray-300",
                      input: "dark:text-white", // ensures the input text is white
                    },
                  }}
                  InputLabelProps={{
                    className: "dark:text-white", // ensures label text is white
                  }}
                  placeholder="Enter Employee Name" // Adding a placeholder to demonstrate
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}>
                <FormControl
                  fullWidth
                  className="dark:bg-boxdark dark:text-white"
                >
                  <InputLabel className="dark:text-white">
                    Designation
                  </InputLabel>
                  <Select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    label="Designation"
                    className="dark:bg-boxdark dark:text-white dark:border-gray-600"
                  >
                    <MenuItem value="">Select Designation</MenuItem>
                    <MenuItem value="Web Developer">Web Developer</MenuItem>
                    <MenuItem value="Android Developer">
                      Android Developer
                    </MenuItem>
                    <MenuItem value="Team Leader">Team Leader</MenuItem>
                    <MenuItem value="Web Designer">Web Designer</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  sx={{
                    height: "50px",
                    backgroundColor: "#b17f27",
                    "&:hover": {
                      backgroundColor: "#a57120",
                    },
                  }}
                  className="dark:bg-golden dark:hover:bg-golden"
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Loading Indicator */}
          {isLoading && (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Typography color="error" align="center" my={2}>
              {error}
            </Typography>
          )}

          {/* Employee Cards */}
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={3}
          >
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <Box
                  key={employee.employeeId}
                  sx={{
                    flex: "1 1 calc(30% - 16px)",
                    minWidth: "280px",
                    maxWidth: "400px", // Ensures cards don't stretch too wide
                    marginBottom: 3,
                  }}
                >
                  <Card
                    sx={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      border: "1px solid #E0E0E0", // Subtle border for separation
                      borderRadius: "8px",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                        borderColor: "#FFD39B", // Change border color on hover
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        height="140px"
                        sx={{ padding: "10px" }}
                      >
                        <Avatar
                          alt={`Avatar of ${employee.name}`}
                          src={
                            employee.gender === "MALE"
                              ? AvatarMale
                              : AvatarFemale
                          }
                          sx={{
                            width: 64,
                            height: 64,
                            border: "2px solid #A56F23",
                            backgroundColor: "#F5F5F5",
                          }}
                        />

                        <div
                          style={{
                            textAlign: "left",
                            flex: 1,
                            marginLeft: "16px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333" }}
                          >
                            {employee.firstName + " " + employee.lastName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ margin: "4px 0" }}
                          >
                            {employee.role}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            EMP-ID: {employee.employeeId}
                          </Typography>
                        </div>
                        <IconButton
                          onClick={() => handleEditOpen(employee)}
                          title={`Edit details for ${employee.name}`}
                          sx={{
                            backgroundColor: "#FFEFD5",
                            "&:hover": { backgroundColor: "#FFD39B" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <BorderColorIcon sx={{ color: "#A56F23" }} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))
            ) : (
              <Typography align="center" my={2}>
                No employees found.
              </Typography>
            )}
          </Box>
        </Box>
        {/* Employee Search section  */}

        {/* Edit Employee Start Here  */}
        <Dialog
          open={isEditOpen}
          onClose={handleEditClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 gap-6">
              {/* Official Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Official Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Existing fields for official details */}
                  <TextField
                    label="Employee ID"
                    name="employeeId"
                    value={editFormValues.employeeId}
                    onChange={(e) =>
                      handleEditChange("employeeId", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.employeeId}
                    helperText={editFormErrors.employeeId}
                    disabled
                  />
                  <TextField
                    label="Username"
                    name="userName"
                    value={editFormValues.userName}
                    onChange={(e) =>
                      handleEditChange("userName", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.userName}
                    helperText={editFormErrors.userName}
                  />
                  <TextField
                    label="Personal Email"
                    name="email"
                    value={editFormValues.email}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    required
                    fullWidth
                    error={!!editFormErrors.email}
                    helperText={editFormErrors.email}
                  />
                  <TextField
                    label="Official Email"
                    name="officialEmail"
                    value={editFormValues.officialEmail}
                    onChange={(e) =>
                      handleEditChange("officialEmail", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.officialEmail}
                    helperText={editFormErrors.officialEmail}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={editFormValues.password}
                    onChange={(e) =>
                      handleEditChange("password", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.password}
                    helperText={editFormErrors.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          position="end"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={editFormValues.confirmPassword}
                    onChange={(e) =>
                      handleEditChange("confirmPassword", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.confirmPassword}
                    helperText={editFormErrors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          position="end"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={editFormValues.phoneNumber}
                    onChange={(e) =>
                      handleEditChange("phoneNumber", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.phoneNumber}
                    helperText={editFormErrors.phoneNumber}
                  />
                  <TextField
                    label="Official Number"
                    name="officialNumber"
                    value={editFormValues.officialNumber}
                    onChange={(e) =>
                      handleEditChange("officialNumber", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.officialNumber}
                    helperText={editFormErrors.officialNumber}
                  />
                  <DatePicker
                    label="Joining Date"
                    value={editFormValues.joiningDate}
                    onChange={(date) => handleDateChange("joiningDate", date)}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  <TextField
                    label="Experience (in years)"
                    name="experience"
                    value={editFormValues.experience}
                    onChange={(e) =>
                      handleEditChange("experience", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.experience}
                    helperText={editFormErrors.experience}
                  />
                  <FormControl fullWidth error={!!editFormErrors.managerId}>
                    <InputLabel>Manager</InputLabel>
                    <Select
                      label="Manager"
                      name="managerId"
                      value={editFormValues.managerId}
                      onChange={(e) =>
                        handleEditChange("managerId", e.target.value)
                      }
                      required
                    >
                      {managers.map((manager) => (
                        <MenuItem
                          key={manager.employeeId}
                          value={manager.employeeId}
                        >
                          {manager.employeeId} {/* Display Manager Name */}
                        </MenuItem>
                      ))}
                    </Select>
                    {editFormErrors.managerId && (
                      <FormHelperText>
                        {editFormErrors.managerId}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {/* Manager Name (Read-only TextField) */}
                  {/* Manager Name (Read-only TextField) */}
                  <TextField
                    label="Manager Name"
                    name="managerName"
                    value={editFormValues.managerName}
                    onChange={(e) =>
                      handleEditChange("managerName", e.target.value)
                    } // Controlled, but read-only
                    required
                    fullWidth
                    disabled // Make it read-only
                    error={!!editFormErrors.manager}
                    helperText={editFormErrors.manager}
                  />
                  <TextField
                    label="Aadhar Card Number"
                    name="aadharCardNumber"
                    value={editFormValues.aadharCardNumber}
                    onChange={(e) =>
                      handleEditChange("aadharCardNumber", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.aadharCardNumber}
                    helperText={editFormErrors.aadharCardNumber}
                  />
                  <TextField
                    label="PAN Card Number"
                    name="panCardNumber"
                    value={editFormValues.panCardNumber}
                    onChange={(e) =>
                      handleEditChange("panCardNumber", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.panCardNumber}
                    helperText={editFormErrors.panCardNumber}
                  />
                </div>
              </div>

              {/* Bank Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Bank Name"
                    name="bankName"
                    value={editFormValues.bankName}
                    onChange={(e) =>
                      handleEditChange("bankName", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.bankName}
                    helperText={editFormErrors.bankName}
                  />
                  <TextField
                    label="Branch Name"
                    name="branchName"
                    value={editFormValues.branchName}
                    onChange={(e) =>
                      handleEditChange("branchName", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.branchName}
                    helperText={editFormErrors.branchName}
                  />
                  <TextField
                    label="Account Number"
                    name="accountNumber"
                    value={editFormValues.accountNumber}
                    onChange={(e) =>
                      handleEditChange("accountNumber", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.accountNumber}
                    helperText={editFormErrors.accountNumber}
                  />
                  <TextField
                    label="IFSC Code"
                    name="ifscCode"
                    value={editFormValues.ifscCode}
                    onChange={(e) =>
                      handleEditChange("ifscCode", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.ifscCode}
                    helperText={editFormErrors.ifscCode}
                  />
                </div>
              </div>

              {/* Personal Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={editFormValues.firstName}
                    onChange={(e) =>
                      handleEditChange("firstName", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.firstName}
                    helperText={editFormErrors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={editFormValues.lastName}
                    onChange={(e) =>
                      handleEditChange("lastName", e.target.value)
                    }
                    required
                    fullWidth
                    error={!!editFormErrors.lastName}
                    helperText={editFormErrors.lastName}
                  />
                  <TextField
                    label="Permanent Address"
                    name="permanentAddress"
                    value={editFormValues.permanentAddress}
                    onChange={(e) =>
                      handleEditChange("permanentAddress", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.permanentAddress}
                    helperText={editFormErrors.permanentAddress}
                  />
                  <TextField
                    label="Local Address"
                    name="localAddress"
                    value={editFormValues.localAddress}
                    onChange={(e) =>
                      handleEditChange("localAddress", e.target.value)
                    }
                    fullWidth
                    error={!!editFormErrors.localAddress}
                    helperText={editFormErrors.localAddress}
                  />
                  <DatePicker
                    label="Date of Birth"
                    value={editFormValues.dob}
                    onChange={(date) => handleDateChange("dob", date)}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  <FormControl
                    fullWidth
                    error={!!editFormErrors.gender}
                    required
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={editFormValues.gender}
                      onChange={(e) =>
                        handleEditChange("gender", e.target.value)
                      } // Updated
                    >
                      <MenuItem value="">
                        <em>Select Gender</em>
                      </MenuItem>
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                      <MenuItem value="OTHERS">Others</MenuItem>
                    </Select>
                    <FormHelperText>{editFormErrors.gender}</FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={!!editFormErrors.bloodGroup}
                    required
                  >
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      label="Blood Group"
                      name="bloodGroup"
                      value={editFormValues.bloodGroup}
                      onChange={(e) =>
                        handleEditChange("bloodGroup", e.target.value)
                      } // Updated
                    >
                      <MenuItem value="">
                        <em>Select Blood Group</em>
                      </MenuItem>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (group) => (
                          <MenuItem key={group} value={group}>
                            {group}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>{editFormErrors.bloodGroup}</FormHelperText>
                  </FormControl>
                </div>
              </div>

              {/* Department and Role Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Department & Role
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormControl fullWidth error={!!editFormErrors.department}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      name="department"
                      value={editFormValues.department}
                      onChange={(e) =>
                        handleEditChange("department", e.target.value)
                      }
                    >
                      {departments.map((department, index) => (
                        <MenuItem key={index} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                    {editFormErrors.department && (
                      <FormHelperText>
                        {editFormErrors.department}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth error={!!editFormErrors.role} required>
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      name="role"
                      value={editFormValues.role}
                      onChange={(e) => handleEditChange("role", e.target.value)} // Updated
                    >
                      <MenuItem value="">
                        <em>Select Role</em>
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{editFormErrors.role}</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Employee End  Here  */}

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
    </LocalizationProvider>
  );
};

export default Employee;
