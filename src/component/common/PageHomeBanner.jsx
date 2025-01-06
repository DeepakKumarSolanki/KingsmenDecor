import React from "react";
import { motion } from "framer-motion";

const PageHomeBanner = ({
  title = "Default Title",
  subtitle = "Default Subtitle",
  buttonText = "Click Me",
  backgroundImage = "",
  onButtonClick,
}) => {
  return (
    <div className=" relative">
      {/* Background Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "500px",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      ></motion.div>
    </div>
  );
};

export default PageHomeBanner;
