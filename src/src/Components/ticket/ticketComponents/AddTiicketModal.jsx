import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";  // Import Axios
import { useAuth } from "../../Context/AuthContext";

const AddTicketForm = ({onClose}) => {
  const {authState}=useAuth()
  const [ticketTitle, setticketTitle] = useState("");
  const [priority, setPriority] = useState("LOW");
  const department = authState.role !== "ADMIN" ? authState.userDetails.department : null;

  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState(null);
  const [employeeId, setEmployeeId] = useState(""); // assuming this comes from elsewhere
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission status
  console.log(authState.userDetails.manager.userName)
  // This effect will trigger the POST request when isSubmitting changes
  useEffect(() => {
    const submitTicket = async () => {
      const now = new Date();

    // Get the year, month, day, hours, minutes, and seconds
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Format the date and time as "yyyy/MM/dd HH:mm:ss"
    const createdAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      if (isSubmitting) {
        const newTicket = {
          ticketTitle,
          department:authState.userDetails.department,
          role: authState.userDetails.role,
          priority,
          employeeName:`${authState.userDetails.firstName}${" "}${authState.userDetails.lastName}`,
          employeeId:authState.userDetails.employeeId,
          description,
          status: "NEW",
          createdAt,
          managerName:authState.userDetails.manager.userName
          // uploadedImages: uploadedImages ? Array.from(uploadedImages) : [], // Ensure the files are handled as an array
        };
          console.log(newTicket)
        try {
          // Make a POST request to your backend (replace the URL with your backend endpoint)
          const response = await axios.post(" http://localhost:8080/raisedTicket", newTicket, {
            headers: {
              "Content-Type": "application/json", // Set the correct content type for JSON data
            },
          });
          console.log("New Ticket Created: ", response.data);
          resetForm();
          onClose()
          window.location.reload();
        } catch (error) {
          console.error("Error creating ticket:", error);
        } finally {
          setIsSubmitting(false); // Reset submitting status
        }
        
      }
    };

    submitTicket();
  }, [isSubmitting, ticketTitle, priority, description, uploadedImages, employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  const resetForm = () => {
    setticketTitle("");
    setPriority("");
    setDescription("");
    setUploadedImages(null);
    setEmployeeId("");
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ticket Title */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Title
            </label>
            <input
              className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={ticketTitle}
              onChange={(e) => setticketTitle(e.target.value)}
              required
            />
          </div>
          {/* Department */}
          {(authState.role==="EMPLOYEE" || authState.role==="MANAGER") && (
            <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={department}
              disabled
              // onChange={(e) => setPriority(e.target.value)}
            />
          </div>
          )}
          {/* Description */}
          <div className="form-group sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Upload Images */}
          <div className="form-group sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <input
              className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setUploadedImages(e.target.files)}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const AddTicketModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 lg:p-8 relative shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-semibold">Add Ticket</h5>
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-500">
                <button
                  type="button"
                  className="text-white hover:text-gray-900 text-xl"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
              </div>
            </div>
            {/* Form */}
            <AddTicketForm onClose={onClose}/>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTicketModal;
