import { useState, useEffect } from "react";
import axios from "axios";
import TicketCount from "./ticketComponents/TicketCount";
import TicketSearch from "./ticketComponents/TicketSearch";
import TicketTable from "./ticketComponents/TicketsTable";
import AddTicketModal from "./ticketComponents/AddTiicketModal";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../Context/AuthContext";
import TicketsForApproval from "./ticketComponents/ForApproval";

const Tickets = () => {
  const [tickets, setTickets] = useState([]); 
  const [approvalData, setApprovalData] = useState([]); // New state for approval tickets
  const [activeTab, setActiveTab] = useState("tickets");
  const [filteredTickets, setFilteredTickets] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { authState } = useAuth();

  const {role,userDetails}=authState

  useEffect(() => {
    const fetchTickets = async () => {
      let url = "";

      if (authState.role === "ADMIN") {
        url = `http://localhost:8080/findAllTicket`;
      } else if (role === "EMPLOYEE") {
        url = `http://localhost:8080/getTicketByEmployeeId?employeeId=${userDetails.employeeId}`;
      } else if (role === "MANAGER") {
        url = `http://localhost:8080/getTicketByDepartment?department=${userDetails.department}`;
      }

      try {
        const response = await axios.get(url);
        console.log(response.data.data);

        // Set approval tickets for MANAGER
        const approvalTickets =
          authState.role === "MANAGER"
            ? response.data.data.filter(
                (ticket) =>
                  // ticket.department === authState.userDetails.department &&
                  ticket.employeeId !== authState.userDetails.employeeId &&
                  ticket.role !== "ADMIN"&&
                  ticket.managerName === authState.userDetails.userName
              )
            : [];
        setApprovalData(approvalTickets);
console.log(approvalTickets)
        // Filter tickets based on user role
        const filteredData =
          authState.role === "ADMIN"
            ? response.data.data // Admin sees all tickets
            : response.data.data.filter(
                (ticket) => ticket.employeeId === authState.userDetails.employeeId
              );
        setTickets(filteredData);
        setFilteredTickets(filteredData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [authState.role, authState.userDetails]); // Dependencies updated to avoid stale closures


  const handleSearch = (filtered) => {
    setFilteredTickets(filtered);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <div className="page-header mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Tickets</h3>
            <ul className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/admin-dashboard" className="hover:text-blue-600">
                  Dashboard
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-800">Tickets</li>
            </ul>
          </div>
          <div>
            <button
              className="font-medium py-2 px-4 sm:px-6 bg-[#b17f27] text-white rounded-full flex justify-center items-center gap-2 h-[40px] text-sm sm:text-base hover:bg-[#a56f23] transition-all duration-200 w-full sm:w-auto w-[175px] sm:flex-wrap"
              onClick={() => setIsModalOpen(true)} 
            >
              <AddIcon />
              <span>Add Ticket</span>
            </button>
          </div>
        </div>
      </div>
      {authState.role === "ADMIN" && (
        <div className="mb-6">
          <TicketCount tickets={tickets} />
        </div>
      )}
      <div className="mb-6">
        <TicketSearch tickets={tickets} onSearch={handleSearch} />
      </div>
      {authState.role === "MANAGER" ? (
        <>
          <div className="flex space-x-4 border-b border-gray-300 mb-4">
            <button
              className={`py-2 px-4 font-semibold text-lg ${
                activeTab === "tickets"
                  ? "text-golden border-b-2 border-golden"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tickets")}
            >
              Tickets
            </button>
            <button
              className={`py-2 px-4 font-semibold text-lg ${
                activeTab === "approval"
                  ? "text-golden border-b-2 border-golden"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("approval")}
            >
              Tickets For Approval
            </button>
          </div>
          <div>
            {activeTab === "tickets" && <TicketTable tickets={filteredTickets} />}
            {activeTab === "approval" && (
              <TicketsForApproval tickets={approvalData} />
            )}
          </div>
        </>
      ) : (
        <TicketTable tickets={filteredTickets} />
      )}
      <AddTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Tickets;
