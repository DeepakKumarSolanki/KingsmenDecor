import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";


const ServicesBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewProjects = () => {
    navigate("/servicesPage");
  };

  return (
    <section className="top-spacing">
      {/* Desktop Banner */}
      {!isMobile && (
        <div
          className="bg-cover bg-center bg-no-repeat bottom-spacing top-spacing py-10"
          style={{ backgroundImage: "url('/src/assets/HomesServices.jpg')" }}
        >
          <div className="pt-32 flex pl-7  items-start gap-8">
              <button
                onClick={handleViewProjects}
                className="px-6 py-2 flex flex-row gap-2 items-center justify-center rounded-md bg-white text-[#104438] transition"
              >
                VIEW SERVICES
                <IoMdArrowForward />
              </button>
          </div>
        </div>
      )}

      

      {/* Mobile Banner */}
      {isMobile && (
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bottom-spacing top-spacing py-12"
          style={{ backgroundImage: "url('/src/assets/homeMobile.jpg')" }}
        >
          <div className="py-72 flex  gap-8 relative">
            
          <button
                onClick={handleViewProjects}
                className="px-6 py-2  absolute  top-[10rem]  left-32 flex flex-row gap-2 items-center justify-center rounded-md bg-white text-[#104438] transition"
              >
                VIEW SERVICES
                <IoMdArrowForward />
              </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesBanner;
