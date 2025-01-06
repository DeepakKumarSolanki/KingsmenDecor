import React from "react";
import { Dialog, Button } from "@mui/material";

function DeleteModal({ isModalOpen, setIsModalOpen, onDelete, employee }) {
  const handleClose = () => {
    setIsModalOpen(false); // Close modal on cancel
  };

  const handleConfirmDelete = () => {
    onDelete(); // Call the delete handler from the parent component
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <div className="p-4 md:p-6 flex flex-col gap-5">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex justify-center items-center">
          Delete Employee
        </h2>
        <h5>Are you sure you want to delete {employee?.name}?</h5>
        <div className="flex justify-between">
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            className="w-28"
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="default"
            className="w-28"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
