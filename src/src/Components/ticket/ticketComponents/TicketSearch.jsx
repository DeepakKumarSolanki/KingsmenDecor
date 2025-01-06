import { Button } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const TicketSearch = ({ onSearch, tickets }) => {
  const [filters, setFilters] = useState({
    employeeName: "",
    status: "",
    priority: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filteredTickets = tickets;

    // Filtering by employee name
    if (filters.employeeName) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.employeeName
          .toLowerCase()
          .includes(filters.employeeName.toLowerCase())
      );
    }

    // Filtering by status
    if (filters.status) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Filtering by priority
    if (filters.priority) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.priority.toLowerCase() === filters.priority.toLowerCase()
      );
    }

    // Filtering by from date
    if (filters.fromDate) {
      filteredTickets = filteredTickets.filter((ticket) =>
        new Date(ticket.date) >= new Date(filters.fromDate)
      );
    }

    // Filtering by to date
    if (filters.toDate) {
      filteredTickets = filteredTickets.filter((ticket) =>
        new Date(ticket.date) <= new Date(filters.toDate)
      );
    }

    // Pass the filtered tickets back to parent
    onSearch(filteredTickets);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* Employee Name */}
      <div className="form-group form-focus">
        <input
          type="text"
          name="employeeName"
          value={filters.employeeName}
          onChange={handleChange}
          placeholder="Employee Name"
          className="form-control floating border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        {/* <label className="focus-label text-gray-500">Employee Name</label> */}
      </div>

      {/* Status Dropdown */}
      <div className="form-group form-focus select-focus">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="select floating border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">-- Status --</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Returned">Returned</option>
        </select>
        {/* <label className="focus-label text-gray-500">Status</label> */}
      </div>

      {/* Priority Dropdown */}
      <div className="form-group form-focus select-focus">
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="select floating border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">-- Priority --</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
        </select>
        {/* <label className="focus-label text-gray-500">Priority</label> */}
      </div>

      {/* From Date */}
      <div className="form-group form-focus">
        <input
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          className="form-control floating border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        <label className="focus-label text-gray-500">From</label>
      </div>

      {/* To Date */}
      <div className="form-group form-focus">
        <input
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          className="form-control floating border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        <label className="focus-label text-gray-500">To</label>
      </div>

      {/* Search Button */}
      <div>
      

        <Button
          onClick={applyFilters}
          variant="contained"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{
              height: "40px",
              backgroundColor: "#b17f27",
              "&:hover": {
                backgroundColor: "#a57120",
              },
            }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default TicketSearch;
