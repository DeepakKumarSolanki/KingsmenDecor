import React, { useState } from "react";

const IOSSwitch = () => {
  // State to manage the checked status of the switch
  const [checked, setChecked] = useState(false);

  // Function to toggle the switch
  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative inline-block w-16 h-9 transition-all duration-300 ease-in-out ${
        checked ? "bg-green-500" : "bg-gray-300"
      } rounded-full cursor-pointer`}
    >
      {/* Track */}
      <div
        className={`absolute inset-0 w-full h-full rounded-full transition-all duration-300 ease-in-out ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>

      {/* Thumb */}
      <div
        className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full transition-all duration-300 ease-in-out ${
          checked ? "transform translate-x-7" : "transform translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default IOSSwitch;
