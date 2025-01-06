import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import emailjs from "emailjs-com";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls the popup visibility
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusMessageColor, setStatusMessageColor] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!fullName) validationErrors.fullName = "Full Name is required";
    if (!contact || !/^\d{10}$/.test(contact))
      validationErrors.contact = "Please enter a valid contact number";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "Please enter a valid email address";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const templateParams = {
        name: fullName,
        email: email,
        contact: contact,
        message: "Form submission from popup",
      };

      emailjs
        .send("service_m4yjyl9", "template_5alz4xy", templateParams, "M5o-kNv5SzysU5w7X")
        .then(
          (response) => {
            console.log("Success:", response);
            setStatusMessage("Message sent successfully!");
            setStatusMessageColor("green");
            setIsOpen(false); // Close the popup after submission
          },
          (error) => {
            console.error("Error:", error);
            setStatusMessage(`Failed to send message. Error: ${error.text || error.message}`);
            setStatusMessageColor("red");
          }
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          className="w-full max-w-lg bg-gray-800 text-white p-8 rounded shadow-lg relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            "--secondary-custom-variant": "#013220",
            "--secondary-dark": "#000000",
            background: "linear-gradient(100.23deg, var(--secondary-custom-variant), var(--secondary-dark))",
          }}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            onClick={closeModal}
          >
            <RxCross1 className="text-red-600 text-xl" />
          </button>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
            Designs for Every Budget
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-6">
            Get your dream home today. Let our experts help you.
          </motion.p>
          <motion.form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Email ID</label>
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Contact Number</label>
              <div className="flex items-center">
                <span className="bg-white text-gray-800 p-2 rounded-l">+91</span>
                <input
                  type="text"
                  placeholder="Contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-2 rounded-r bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" }}
            >
              <button
                type="submit"
                className="w-full py-2 bg-[#104438]/30 rounded text-white font-semibold transition-all duration-300"
              >
                GET FREE QUOTE
              </button>
            </motion.div>
          </motion.form>
          {statusMessage && (
            <p className={`mt-4 text-sm text-${statusMessageColor}`}>{statusMessage}</p>
          )}
          <motion.p variants={itemVariants} className="mt-4 text-sm">
            By submitting this form, you agree to the
            <a href="#" className="underline">
              <span> </span> privacy policy
            </a>
            &{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    )
  );
};

export default PopupForm;
