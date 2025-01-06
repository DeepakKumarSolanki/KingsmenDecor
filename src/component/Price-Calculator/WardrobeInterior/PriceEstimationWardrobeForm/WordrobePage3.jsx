import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image1bhk from "../../../../../src/assets/Images/1bhk.jpg";
import image2bhk from "../../../../../src/assets/Images/2bhk.jpg";
import image3bhk from "../../../../../src/assets/Images/3bhk.png";

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

const PackageSelector = () => {
  const [selectedPackage, setSelectedPackage] = useState("");

  let NavigateToWardrobeAccessories=useNavigate()

  // Package Data
  const packages = [
    {
      id: "Premium",
      name: "Premium",
      price: "₹₹",
      description:
        "Looking for a seamless finish that sits well with every interior? This one's for you.",
        tag1:"Exclusive Choices: Choose from premium materials, finishes, and features according to your taste.",
        tag2:"Personalised Design: Choose from a variety of layouts and storage solutions for a truly customised wardrobe",
        tag3:"Unmatched Quality: Enjoy long-lasting durability and timeless elegance with our premium finishes.",
      image: image1bhk,
    
    },
    {
      id: "Elite",
      name: "Elite Special",
      price: "₹₹",
      description:
        "Get a magazine-like look that requires low maintenance.",
        tag1:"Cutting-Edge Options: Choose from advanced storage solutions and smart features for a modern wardrobe.",
        tag2:"Better Functionality: Customise your layout according to your requirement with versatile shelving and hanging arrangements.",
        tag3:"Premium Feel: Select a package that enhances your wardrobe's aesthetics as well as functionality.",
      image: image2bhk,
    
     
    },
    {
      id: "Kingsmen",
      name: "Kingsmen Special",
      price: "₹₹",
      description:
        "Adds a touch of luxury to your modular wardrobe.",
        tag1:"Best of the Best: Choose top-of-the-line materials and one-of-a-kind designs to give your wardrobe a luxurious look.",
        tag2:"Bespoke Service: Customised every detail right from design to accessories so that it is unique as well as tailored",
        tag3:"Unparalleled Craftsmanship: Choose a package that promises quality and service in excellence.",
      image: image3bhk,
    
     
    },
 
  ];

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white shadow-2xl rounded-lg p-6 md:p-8 max-w-4xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6"
        >
          Pick your package
        </motion.h2>

        {/* Package Options */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg) => (
            <motion.label
              key={pkg.id}
              variants={itemVariants}
              className={`block p-4 border rounded-lg shadow-md cursor-pointer transition-transform ${
                selectedPackage === pkg.id
                  ? "bg-green-100 border-green-400 scale-105"
                  : "bg-gray-50 border-gray-200 hover:shadow-lg hover:scale-105"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex flex-col items-center">
                <input
                  type="radio"
                  name="package"
                  value={pkg.id}
                  checked={selectedPackage === pkg.id}
                  onChange={() => setSelectedPackage(pkg.id)}
                  className="h-5 w-5 text-green-500 mb-3 hidden"
                />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {pkg.name} ({pkg.price})
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-3 text-center">
                  {pkg.description}
                </p>
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-40 md:h-48 object-cover rounded-lg mb-3"
                />
                {/* <ul className="text-gray-700 text-sm md:text-base space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul> */}

                <div className="p-4 text-left">
  <span className="block text-gray-900 font-semibold">{pkg.tag1}</span>
  <hr className="h-1"></hr>
  <span className="block text-gray-800 font-semibold">{pkg.tag2}</span>
  <hr className="h-1"></hr>
  <span className="block text-gray-800 font-semibold">{pkg.tag3}</span>
</div>

              </div>
            </motion.label>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={containerVariants}
          className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className="text-red-600 font-semibold"

            onClick={()=>{
              NavigateToWardrobeAccessories("/wardrobe-height/wardrobe-type")
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
              rotateY: 0,
            }}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
              selectedPackage
                ? "bg-green-500 hover:bg-yellow-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedPackage}

            onClick={()=>{
              NavigateToWardrobeAccessories("/wardrobe-height/wardrobe-type/material/accessories")
            }}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PackageSelector;
