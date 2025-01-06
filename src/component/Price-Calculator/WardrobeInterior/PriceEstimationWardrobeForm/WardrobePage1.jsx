import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const Wardrobepage1 = () => {
  const [selectedHeight, setSelectedHeight] = useState(null);

  let NavigateToWardrobeType=useNavigate()

  const handleHeightChange = (height) => {
    setSelectedHeight(height);
  };

  return (
    <div className="p-6 md:p-16 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white shadow-2xl rounded-lg p-4 md:p-8 max-w-md sm:max-w-lg md:max-w-xl w-full"
        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4 md:mb-6"
        >
          What is the height of your wardrobe?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-500 text-sm md:text-base mb-6 md:mb-8"
        >
          To know more about this,{" "}
          <a href="#" className="text-green-500 underline">
            Click here
          </a>
        </motion.p>

        {/* Height Options */}
        <motion.div variants={containerVariants} className="space-y-4">
          {["4 feet", "5 feet", "6 feet", "7 feet", "9 feet"].map((height, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`w-full rounded-lg p-4 border cursor-pointer ${
                selectedHeight === height
                  ? "bg-green-100 border-green-400 scale-105"
                  : "bg-gray-50 border-gray-200 hover:shadow-lg hover:scale-105"
              }`}
              onClick={() => handleHeightChange(height)}
              transition={{ duration: 0.3 }}
            >
              {height}
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={containerVariants}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className="text-red-600 font-semibold"

            onClick={()=>{
              NavigateToWardrobeType("/wardrobe")
            }}
          >
            Back
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={
              selectedHeight && {
                scale: 1.08,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                rotateX: 5,
                rotateY: 5,
              }
            }
            disabled={!selectedHeight}
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-white transition ${
              selectedHeight
                ? "bg-green-500 hover:bg-yellow-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}

            onClick={()=>{
              NavigateToWardrobeType("/wardrobe-height/wardrobe-type")
            }}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Wardrobepage1;
