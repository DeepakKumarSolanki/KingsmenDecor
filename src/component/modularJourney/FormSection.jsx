import React from "react";
import { motion } from "framer-motion";

function FormSection(){
    return (
<div className=" bg-gray-100 relative top-spacing bottom-spacing " >
      {/* Background Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url('./Images/Blog_Banner_1247x500_Sample.jpg')`,
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          height: "500px",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          initial={{ y: -100, opacity: 0, rotateX: -20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mt-40 text-black"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ scale: 0.8, rotateY: -15 }}
            animate={{ scale: 1, rotateY: 0 }}
            whileHover={{ scale: 1.1, rotateY: 10 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            Your Journey is special for us.
          </motion.h1>
          <motion.h3
            className="text-xl sm:text-2xl text-black font-bold mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
           Your dream home is just a click away
          </motion.h3>
          <motion.button
            className="font-bold mt-8 bg-red-400 h-16 w-60 rounded-2xl hover:bg-red-600"
            whileHover={{
              scale: 1.2,
              boxShadow: "0px 5px 5px rgba(150, 0, 0, 0.5)",
              rotateX: 15,
            }}
          >
            Get Started with the best
          </motion.button>
        </motion.div>
      </motion.div>
   </div>
    )
}
 export default FormSection;