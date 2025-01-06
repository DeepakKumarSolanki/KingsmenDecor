import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCrossCircled } from "react-icons/rx";
import emailjs from "emailjs-com";

const PopUpForm = ({ value }) => {
  const [fullName, setFullName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(value);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusMessageColor, setStatusMessageColor] = useState("");

  // Form Validation
  const validateForm = () => {
    let validationErrors = {};
    if (!fullName) validationErrors.fullName = "Full Name is required";
    if (!mobileNo || !/^\d{10}$/.test(mobileNo))
      validationErrors.mobileNo = "Please enter a valid mobile number";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "Please enter a valid email address";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", {
        fullName,
        mobileNo,
        email,
      });
  
      // Prepare template parameters
      
      const templateParams = {
        name: fullName,
        email: email,
        contact: mobileNo,
        message: "Form submission from popup",
      };

      // Send the email using EmailJS
      emailjs
        .send("service_m4yjyl9", "template_5alz4xy", templateParams, "M5o-kNv5SzysU5w7X")
        .then(
          (response) => {
            console.log("Success:", response);
            setStatusMessage("Message sent successfully!");
            setStatusMessageColor("green");
            setShowPopup(false); // Close the popup after submission
          },
          (error) => {
            console.error("Error:", error);
            setStatusMessage(`Failed to send message. Error: ${error.text || error.message}`);
            setStatusMessageColor("red");
          }
        );
    }
  };

  return (
    showPopup && (
      <motion.div
        className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg flex max-w-3xl w-full relative"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <span className="text-2xl">
              <RxCrossCircled />
            </span>
          </button>

          {/* Left Section (Offers Details) */}
          <div
            className="text-white p-6 rounded-l-lg w-1/2"
            style={{
              backgroundImage: 'url("./PopUpImage.jpg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Right Section (Form) */}
          <div className="p-6 w-1/2">
            <h3 className="text-xl font-semibold mb-6">Connect with us</h3>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile No */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile No.
                </label>
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-sm">{errors.mobileNo}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-yellow-900 text-white rounded-lg font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit
              </button>
              {/* Status Message */}
              {statusMessage && (
                <p className="mt-4 text-sm" style={{ color: statusMessageColor }}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default PopUpForm;

