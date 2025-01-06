import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Dialog, MenuItem } from "@mui/material";
import axios from "axios";
import {useAuth} from "../../../Components/Context/AuthContext"
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

function Assest() {
  let [addAsset, setaddAsset] = useState(false);
  let [data, setData] = useState([]);


   const {authState}=useAuth()
    // Simulate getting logged-in user employeeId (for now hardcoded as "EMP001")

    console.log(authState)
    const EmployeeId = authState.userDetails.employeeId;
    const EmployeeName = authState.userDetails.userName;    ;
  
  
  // Search state
  const [searchCriteria, setSearchCriteria] = useState({
    employeeName: "",
    status: "",
    fromDate: "",
    toDate: ""
  });

  useEffect(() => {
    AssetData();
  }, []);
  
  const AssetData = async () => {
    try {
      let { data: { data } } = await axios.get("http://localhost:8080/findAllAsset");
      console.log("Assets retrieved:", data); // Verify the structure
      setData(data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("Error fetching assets:", error.message);
      }
    }
  };
  

  const [formData, setFormData] = useState({
    assetName: "",
    assetId: "",
    employeeName: "",
    employeeId: "",
    grantedDate: "",
    validUpto: "",
    assetValue: "",
    description: "",
    status: ""
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (event) => {
    let { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  console.log(formData);

  const handleAddAssetSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Log the data
    try {
      const response = await axios.post("http://localhost:8080/grantAsset", formData);
      console.log("Response from server:", response.data);
      setaddAsset(false);
      AssetData();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("Error adding termination:", error.message);
      }
    }
  };

  // Filtered data based on search criteria
  const filteredData = data.filter((employee) => {
    const matchesEmployeeName = employee.employeeName && employee.employeeName.toLowerCase().includes(searchCriteria.employeeName.toLowerCase());
    const matchesStatus = searchCriteria.status ? employee.status === searchCriteria.status : true;
    const matchesFromDate = searchCriteria.fromDate ? new Date(employee.grantedDate) >= new Date(searchCriteria.fromDate) : true;
    const matchesToDate = searchCriteria.toDate ? new Date(employee.grantedDate) <= new Date(searchCriteria.toDate) : true;
  
    return matchesEmployeeName && matchesStatus && matchesFromDate && matchesToDate;
  });
  

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Assets</h2>
        <Button
          variant="contained"
          color="error"
          sx={{
            bgcolor: "#b17f27",
            color: "#000000",
          }}
          onClick={() => {
            setaddAsset(true);
          }}
        >
          <b>Add Asset</b>
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <a href="#" className="hover:underline">
          Dashboard
        </a>
        /
        <span className="font-semibold text-gray-800">
          <a href="#" className="hover:underline">
            Assets
          </a>
        </span>
      </div>

      {/* Search Criteria */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <TextField
            fullWidth variant="outlined"
            label="Employee Name"
            size="small"
            name="employeeName"
            value={searchCriteria.employeeName}
            onChange={handleSearchChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Status"
            size="small"
            select
            name="status"
            value={searchCriteria.status}
            onChange={handleSearchChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="GRANTED">Granted</MenuItem>
            <MenuItem value="RETURNED">Returned</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="From Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="fromDate"
            value={searchCriteria.fromDate}
            onChange={handleSearchChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="To Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="toDate"
            value={searchCriteria.toDate}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#b17f27",
              color: "#000000",
            }}
          >
            <b>Search</b>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-2 sm:p-3">Asset Employee Name</th>
              <th className="p-2 sm:p-3">Asset Name</th>
              <th className="p-2 sm:p-3">Asset Id</th>
              {/* <th className="p-2 sm:p-3">Asset Employee Id</th> */}
              <th className="p-2 sm:p-3">Granted date</th>
              <th className="p-2 sm:p-3">Valid Upto</th>
              <th className="p-2 sm:p-3">Value</th>
              <th className="p-2 sm:p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr className="border-b hover:bg-gray-50" key={index}>
                <td className="p-2 sm:p-3">{employee.employeeName}</td>
                <td className="p-2 sm:p-3 font-bold">{employee.assetName}</td>
                <td className="p-2 sm:p-3">{employee.assetId}</td>
                {/* <td className="p-2 sm:p-3">{employee.employeeId}</td> */}
                <td className="p-2 sm:p-3">{employee.grantedDate}</td>
                <td className="p-2 sm:p-3">{employee.validUpto}</td>
                <td className="p-2 sm:p-3">{employee.assetValue}</td>
                <td className="p-2 sm:p-3">
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs sm:text-sm">
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Asset Dialog */}
      <Dialog
        open={addAsset}
        onClose={() => {
          setaddAsset(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Add Asset
          </h3>
          <form className="space-y-4" onSubmit={handleAddAssetSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Asset Name"
                variant="outlined"
                required
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Asset Id"
                variant="outlined"
                name="assetId"
                value={formData.assetId}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label=" Employee Name"
                variant="outlined"
                name="employeeName"
                value={EmployeeName}
                onChange={handleChange}
                readonly
              />
              <TextField
                fullWidth
                label="
                
                 Employee Id"
                variant="outlined"
                name="employeeId"
                value={EmployeeId}
                onChange={handleChange}
                readonly
              />
              <TextField
                fullWidth
                label="Granted Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                name="grantedDate"
                value={formData.grantedDate}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Valid Upto (In Months)"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                name="validUpto"
                value={formData.validUpto}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Value"
                type="number"
                variant="outlined"
                defaultValue="0"
                name="assetValue"
                value={formData.assetValue}
                onChange={handleChange}
              />
            </div>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              select
              label="Status"
              variant="outlined"
              defaultValue="Pending"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="GRANTED">Granted</MenuItem>
              <MenuItem value="RETURNED">Returned</MenuItem>
            </TextField>
            <div className="flex justify-end space-x-2">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#CD5C5C",
                }}
                onClick={() => setaddAsset(false)}
              >
                <b>Cancel</b>
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#b17f27",
                  color: "#000000",
                }}
                type="submit"
              >
                <b>Submit</b>
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Assest;