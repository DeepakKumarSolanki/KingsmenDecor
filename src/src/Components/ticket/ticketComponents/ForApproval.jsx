import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Menu,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTicketForm from "./EditTicketModel";  // Correct component import
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
const TicketsForApproval = ({ tickets }) => {
  const [ticketData, setTicketData] = useState(tickets);
  const [anchorEl, setAnchorEl] = useState(null);  // State to manage the menu anchor
  const [selectedTicket, setSelectedTicket] = useState(null);  // To store selected ticket for actions
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();
  const { authState } = useAuth()
  // Effect to update ticketData when tickets prop changes
  useEffect(() => {
    setTicketData(tickets);
  }, [tickets]);

  // Helper function to update a single ticket's state (including all fields)
  const updateTicketState = async (updatedTicket) => {

    try {
      // Send PUT request to update the ticket on the backend
      const response = await axios.put(
        ` http://localhost:8080/editTicket`, updatedTicket // Replace with your actual API URL
      );

      // Update the local state if the request is successful
      setTicketData((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ticketId === updatedTicket.ticketId ? { ...ticket, ...updatedTicket } : ticket
        )
      );

      console.log('Ticket updated successfully', response.data);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handlePriorityChange = (ticketId, newPriority) => {
    if (authState.role === "ADMIN" || authState.role === "MANAGER") {
      const updatedTicket = { priority: newPriority, ticketId };
      const ticketToUpdate = ticketData.find(ticket => ticket.ticketId === ticketId);
      if (ticketToUpdate) {
        updateTicketState({ ...ticketToUpdate, ...updatedTicket });
      }
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    if (authState.role === "ADMIN" || authState.role === "MANAGER") {
      const updatedTicket = { status: newStatus, ticketId };
      const ticketToUpdate = ticketData.find(ticket => ticket.ticketId === ticketId);
      if (ticketToUpdate) {
        updateTicketState({ ...ticketToUpdate, ...updatedTicket });
      }
    }

  };
  const handleRowClick = (id, ticket) => {
    console.log(ticket)
    localStorage.setItem('selectedTicket', JSON.stringify(ticket));
    navigate(`/ticket/${id}`);
  };

  const handleClickMenu = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket); // Set selected ticket for Edit/Delete actions
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (ticketId) => {
    // console.log(typeof(ticketId))
    try {
      // Send DELETE request to the backend to delete the ticket
      const response = await axios.delete(
        ` http://localhost:8080/deleteTicket?ticketId=${ticketId}`  // Replace with your actual API URL
      );

      // If successful, filter the ticket out of the local state
      setTicketData((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );

      console.log('Ticket deleted successfully', response.data);  // Optional: Log the response or show a success message
      handleCloseMenu();  // Close the menu after the deletion
    } catch (error) {
      console.error('Error deleting ticket:', error);
      // Optional: Handle errors, such as showing an error message to the user
    }
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);  // Open the modal for editing
  };

  const handleCloseEditModal = () => {
    setSelectedTicket(null);  // Clear selected ticket on modal close
    setOpenEditModal(false);  // Close the edit modal
    handleCloseMenu();  // Close the menu as well when modal is closed
  };

  // Helper function to determine priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "red";
      case "MEDIUM":
        return "orange";
      case "LOW":
        return "green";
      default:
        return "black";
    }
  };

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "blue";
      case "OPEN":
        return "yellow";
      case "PENDING":
        return "orange";
      case "CLOSED":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            {(authState.role === "ADMIN" || authState.role==="MANAGER") && <>
              {/* <TableCell>Approved By</TableCell> */}
              <TableCell>Actions</TableCell>
            </>}
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketData.map((ticket) => (
            <TableRow key={ticket.ticketId}>
              <TableCell onClick={() => handleRowClick(ticket.ticketId, ticket)}>{ticket.ticketId}</TableCell>
              <TableCell onClick={() => handleRowClick(ticket.ticketId, ticket)}>{ticket.ticketId}</TableCell>
              <TableCell>{ticket.ticketTitle}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ margin: 2 }} src={ticket.staff || "/default-avatar.jpg"} />
                  {/* {authState.role==="ADMIN"?(<Typography>{`${ticket.employeeName}`}</Typography>):(<Typography>{`${authState.userDetails.firstName}${" "}${authState.userDetails.lastName}`}</Typography>)} */}
                  <Typography>{`${ticket.employeeName}`}</Typography>
                </div>
              </TableCell>
              <TableCell>{ticket.createdAt}</TableCell>
              <TableCell>
                <FormControl size="small" fullWidth>
                  {(authState.role==="ADMIN" || authState.role==="MANAGER") ? (
                    <Select
                      value={ticket.priority}
                      onChange={(e) => handlePriorityChange(ticket.ticketId, e.target.value)}
                      style={{ color: getPriorityColor(ticket.priority) }}
                    >
                      <MenuItem value="HIGH" style={{ color: "red" }}>High</MenuItem>
                      <MenuItem value="MEDIUM" style={{ color: "orange" }}>Medium</MenuItem>
                      <MenuItem value="LOW" style={{ color: "green" }}>Low</MenuItem>
                    </Select>
                  ) : (
                    <span style={{ color: getPriorityColor(ticket.priority) }}>
                      {ticket.priority}
                    </span>
                  )}
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl size="small" fullWidth>
                  {(authState.role==="ADMIN"||authState.role==="MANAGER")?(<Select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.ticketId, e.target.value)}
                    style={{ color: getStatusColor(ticket.status) }}
                  >
                    <MenuItem value="NEW" style={{ color: "blue" }}>New</MenuItem>
                    <MenuItem value="OPEN" style={{ color: "yellow" }}>Open</MenuItem>
                    <MenuItem value="PENDING" style={{ color: "orange" }}>Pending</MenuItem>
                    <MenuItem value="CLOSED" style={{ color: "green" }}>Closed</MenuItem>
                  </Select>)
                  :
                  (
                    <span style={{ color: getStatusColor(ticket.status) }}>
                      {ticket.status}
                    </span>
                  )
                  }
                  
                </FormControl>
              </TableCell>
              {(authState.role === "ADMIN"||authState.role==="MANAGER") && (
                <>
                  {/* <TableCell>{ticket.updatedBy}</TableCell> */}
                  <TableCell>
                    <IconButton onClick={(e) => handleClickMenu(e, ticket)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                      <MenuItem onClick={handleOpenEditModal}>
                        <EditIcon /> Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(ticket.ticketId)}>
                        <DeleteIcon /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </>
              )}

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Ticket Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-ticket-modal"
        aria-describedby="edit-ticket-description"
      >
        <Box
          className="flex justify-center items-center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Ensures full viewport height for vertical centering
          }}
        >
          <EditTicketForm
            ticket={selectedTicket}  // Pass the selectedTicket to the modal
            onClose={handleCloseEditModal}
            onSave={updateTicketState} // Pass updateTicketState to handle saving
          />
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default TicketsForApproval;
