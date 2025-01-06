import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

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

const sizeOptions = {
  "2 BHK": ["Small (Below 800 sq ft)", "Large (Above 800 sq ft)"],
  "3 BHK": ["Small (Below 1200 sq ft)", "Large (Above 1200 sq ft)"],
  "4 BHK": ["Small (Below 1800 sq ft)", "Large (Above 1800 sq ft)"],
};

const BHKSelector = () => {
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);


  let NavigateToSecondPage=useNavigate()

  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    setSelectedSize(null); // Reset size when switching BHK
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
          Select Your BHK Type
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

        {/* BHK Options */}
        <motion.div variants={containerVariants} className="space-y-4">
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"].map((bhk, index) => (
            <React.Fragment key={index}>
              <motion.div
                variants={itemVariants}
                className={`w-full rounded-lg p-4 border cursor-pointer ${
                  selectedBHK === bhk
                    ? "bg-green-100 border-green-400 scale-105"
                    : "bg-gray-50 border-gray-200 hover:shadow-lg hover:scale-105"
                }`}
                onClick={() => handleBHKChange(bhk)}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                  rotateX: 5,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {bhk}
              </motion.div>

              {/* Size Options for the Selected BHK */}
              {selectedBHK === bhk && sizeOptions[selectedBHK] && (
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 mt-2 ml-4 sm:ml-6"
                >
                  {sizeOptions[bhk].map((size, i) => (
                    <motion.label
                      key={i}
                      className="flex items-center space-x-3 cursor-pointer text-gray-700 bg-gray-100 p-2 sm:p-3 rounded-lg shadow-sm hover:bg-green-100"
                      whileHover={{ scale: 1.03 }}
                    >
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                        className="h-4 w-4 text-green-500"
                      />
                      <span>{size}</span>
                    </motion.label>
                  ))}
                </motion.div>
              )}
            </React.Fragment>
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
            className="text-red-500 font-semibold"
            onClick={()=>{
              NavigateToSecondPage("/homeinterior")
            }}
          >
            Back
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={
              selectedBHK &&
              (sizeOptions[selectedBHK] ? selectedSize : true) && {
                scale: 1.08,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                rotateX: 5,
                rotateY: 5,
              }
            }
            disabled={
              !selectedBHK || (sizeOptions[selectedBHK] && !selectedSize)
            }
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-white transition ${
              selectedBHK &&
              (sizeOptions[selectedBHK] ? selectedSize : true)
                ? "bg-green-500 hover:bg-yellow-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}

            onClick={()=>{
              NavigateToSecondPage("/homeinterior/bhk/rooms-design")
            }}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BHKSelector;
