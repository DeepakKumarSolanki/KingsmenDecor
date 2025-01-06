import React, { useReducer } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Initial state for rooms count
const initialState = {
  livingRoom: 1,
  kitchen: 1,
  bedroom: 1,
  bathroom: 1,
  dining: 1,
};

// Reducer function for increment/decrement logic
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, [action.room]: state[action.room] + 1 };
    case "DECREMENT":
      return {
        ...state,
        [action.room]: Math.max(state[action.room] - 1, 0), // Prevent going below 0
      };
    default:
      return state;
  }
};

// Animation variants
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

const RoomSelector = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let NavigateToThirdPage=useNavigate()

  const roomNames = [
    { key: "livingRoom", label: "Living Room" },
    { key: "kitchen", label: "Kitchen" },
    { key: "bedroom", label: "Bedroom" },
    { key: "bathroom", label: "Bathroom" },
    { key: "dining", label: "Dining" },
  ];

  return (
    <div className="p-6 sm:p-8 md:p-16 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white shadow-2xl rounded-lg p-4 md:p-8 max-w-sm sm:max-w-md md:max-w-xl w-full"
        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4 sm:mb-6"
        >
          Select the rooms you'd like us to design
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-500 text-sm sm:text-base mb-6 sm:mb-8"
        >
          To know more about this,{" "}
          <a href="#" className="text-green-500 underline">
            Click here
          </a>
        </motion.p>

        {/* Room Options */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {roomNames.map((room) => (
            <motion.div
              key={room.key}
              variants={itemVariants}
              className="flex items-center justify-between bg-gray-50 border rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              <span className="text-sm sm:text-base md:text-lg text-gray-700">
                {room.label}
              </span>
              <div className="flex items-center">
                <motion.button
                  onClick={() =>
                    dispatch({ type: "DECREMENT", room: room.key })
                  }
                  className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                  whileHover={{
                    scale: 1.1,
                    rotateX: 5,
                    rotateY: 5,
                  }}
                >
                  <AiOutlineMinus />
                </motion.button>
                <span className="mx-2 sm:mx-4 text-sm sm:text-lg font-semibold text-gray-700">
                  {state[room.key]}
                </span>
                <motion.button
                  onClick={() =>
                    dispatch({ type: "INCREMENT", room: room.key })
                  }
                  className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600"
                  whileHover={{
                    scale: 1.1,
                    rotateX: 5,
                    rotateY: 5,
                  }}
                >
                  <AiOutlinePlus />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={containerVariants}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className="text-red-500 font-semibold"
            onClick={()=>{
            NavigateToThirdPage("/homeinterior/bhk")
          }}
          >
            Back
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              rotateX: 5,
              rotateY: 5,
            }}
            className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-white bg-green-500 hover:bg-yellow-700"
          onClick={()=>{
            NavigateToThirdPage("/homeinterior/bhk/rooms-design/package")
          }}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RoomSelector;
