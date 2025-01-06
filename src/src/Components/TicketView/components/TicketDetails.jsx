import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory
import { useAuth } from "../../Context/AuthContext";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({
    ticketId: "",
    employeeId: "",
    employeeName: "",
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  const { id } = useParams(); // Getting ticketId from URL params
  const navigate = useNavigate(); // Using useNavigate for navigation
const {authState}=useAuth()
  useEffect(() => {
    // Fetch all tickets from the API
    const fetchTicketsData = async () => {
      try {
        const response = await axios.get(" http://localhost:8080/findAllTicket");
        // console.log(typeof(id),response.data.data)
        if (response.status === 200) {
          // Filter the tickets to get the one with the matching ticketId
          const foundTicket = response.data.data.find(ticket => ticket.ticketId === Number(id));
          if (foundTicket) {
            setTicket(foundTicket); // Set the state with the selected ticket's data
          } else {
            alert("Ticket not found");
          }
        }
      } catch (error) {
        console.error("Error fetching tickets data:", error);
        alert("Failed to fetch tickets data.");
      }
    };

    fetchTicketsData();
  }, [id]); // Runs when the component mounts or the `id` changes
console.log(ticket)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Update the ticket using the PUT request to /editTicket API
      const response = await axios.put(" http://localhost:8080/editTicket", ticket);
      if (response.status === 200) {
        alert("Ticket details updated successfully!");
        navigate("/tickets"); // Redirect to the tickets listing page after success
      } else {
        alert("Failed to update ticket details.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("There was an error updating the ticket.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Ticket Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ticket ID */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Ticket ID</label>
          <input
            type="text"
            name="ticketId"
            value={ticket.ticketId}
            onChange={handleChange}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            readOnly
            value={ticket.employeeId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Employee Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={ticket.employeeName}
            readOnly
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={ticket.ticketTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          value={ticket.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={ticket.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="NEW">New</option>
            <option value="OPEN">Open</option>
            <option value="PENDING">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        {authState.role!=="EMPLOYEE" && <button
          className="px-6 py-2 mt-6 text-white bg-golden rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handleSave}
        >
          Save Ticket
        </button>}
        
      </div>
    </div>
  );
};

export default TicketDetails;
