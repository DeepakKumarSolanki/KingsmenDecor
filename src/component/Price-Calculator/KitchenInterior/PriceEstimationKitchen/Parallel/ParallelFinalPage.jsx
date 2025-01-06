import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EstimateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    updatesOnWhatsApp: true,
  });

  const [errors, setErrors] = useState({});

  let Navigate=useNavigate()

  const validate = () => {
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      validationErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      validationErrors.phone = "Please enter a valid 10-digit phone number.";
    if (!formData.propertyName.trim())
      validationErrors.propertyName = "Property name is required.";
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Form submitted successfully!");
      // Submit form logic here
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="p-16 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white shadow-lg rounded-xl p-8 max-w-lg w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Get Your Estimate
        </motion.h2>

        {/* Form */}
        <motion.form
          variants={containerVariants}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring focus:ring-green-200 focus:border-green-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring focus:ring-green-200 focus:border-green-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <span className="flex items-center bg-gray-100 border border-gray-300 rounded-l-md px-3 text-gray-500">
                🇮🇳
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`flex-1 p-3 border-t border-b border-r ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-r-md focus:ring focus:ring-green-200 focus:border-green-500`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </motion.div>

          {/* Property Name Field */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="propertyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              placeholder="Enter your property name"
              value={formData.propertyName}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.propertyName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring focus:ring-green-200 focus:border-green-500`}
            />
            {errors.propertyName && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>
            )}
          </motion.div>

          {/* WhatsApp Updates */}
          <motion.div variants={itemVariants} className="flex items-center mt-2">
            <input
              type="checkbox"
              id="updatesOnWhatsApp"
              name="updatesOnWhatsApp"
              checked={formData.updatesOnWhatsApp}
              onChange={handleChange}
              className="h-4 w-4 text-green-500"
            />
            <label htmlFor="updatesOnWhatsApp" className="ml-2 text-sm text-gray-600">
              Send me updates on WhatsApp
            </label>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-gray-500 text-sm mt-4">
            <p>
              By submitting this form, you agree to the{" "}
              <a href="#" className="text-pink-500 underline">
                privacy policy
              </a>{" "}
              &{" "}
              <a href="#" className="text-pink-500 underline">
                terms and conditions
              </a>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={containerVariants}
            className="flex justify-between items-center mt-6"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="text-red-600 font-semibold"

              onClick={()=>{
                Navigate("/kitcheninterior/layout/parallel-size/package")
              }}
            >
              Back
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                rotateX: 0,
                rotateY: 5,
              }}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-green-500 hover:bg-yellow-700"
              type="submit"
            >
              Get My Estimate
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default EstimateForm;
