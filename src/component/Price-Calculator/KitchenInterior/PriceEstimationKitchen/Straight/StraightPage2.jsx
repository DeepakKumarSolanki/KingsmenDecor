import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import Straightshape from "../../../../../../src/assets/Images/staright.jpg";

function StraightPage2() {
  const [cornerSize, setCornerSize] = useState("");

  let NavigateToStraightPackage=useNavigate()

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

  const formFieldVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const layouts = [
    { id: "straight-shaped", name: "Straight-shaped", img: Straightshape },
  ];

  // The "Next" button is enabled if a size is selected
  const isNextButtonEnabled = !!cornerSize;

  return (
    <div className="p-6 md:p-16 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-center text-2xl font-bold text-gray-800 mb-4"
        >
          Select the Size of your Layout 
        </motion.h1>

        {/* Image Display */}
        {layouts.map((layout) => (
          <motion.div
            key={layout.id}
            variants={itemVariants}
            className="flex flex-col items-center p-2 cursor-pointer transition"
          >
            <img
              src={layout.img}
              alt={layout.name}
              className="w-80 h-42 object-contain mb-3"
            />
            <span className="text-gray-800 font-bold">{layout.name}</span>
          </motion.div>
        ))}

        {/* Form Fields */}
        <div className="flex flex-col">
          <motion.div
            variants={formFieldVariants}
            className="mb-4"
            initial="hidden"
            animate="visible"
          >
            <TextField
              fullWidth
              select
              label="Straight Size (ft.)"
              variant="outlined"
              value={cornerSize}
              onChange={(e) => setCornerSize(e.target.value)}
            >
              {[...Array(10).keys()].map((value) => (
                <MenuItem key={value + 3} value={value + 3}>
                  {value + 3}
                </MenuItem>
              ))}
            </TextField>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          variants={containerVariants}
          className="flex justify-between items-center mt-6"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className="text-red-600 font-semibold"

            onClick={()=>{
              NavigateToStraightPackage("/kitcheninterior/layout")
            }}
          >
            Back
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={
              isNextButtonEnabled
                ? { scale: 1.08, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }
                : {}
            }
            disabled={!isNextButtonEnabled}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
              isNextButtonEnabled
                ? "bg-green-500 hover:bg-yellow-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}

            onClick={()=>{
              NavigateToStraightPackage("/kitcheninterior/layout/straight-size/package")
            }}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default StraightPage2;
