import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdvertisemnetBanner = () => {
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
    navigate("/allProjects");
  };

  return (
    <section className="top-spacing bottom-spacing">
      {/* Desktop Banner */}
      {!isMobile && (
        <div
          className="bg-cover bg-center bg-no-repeat bottom-spacing top-spacing"
          style={{ backgroundImage: "url('/src/assets/bannerDesktop.jpg')" }}
        >
          <div className="py-10 flex items-center justify-center flex-col gap-8">
            <h1 className="text-3xl font-semibold">
              Your dream home is just a click away
            </h1>
            <div>
              <button
                onClick={handleViewProjects}
                className="bg-[#104438] px-8 py-4 rounded-md text-white hover:bg-white hover:text-[#104438] transition"
              >
                VIEW PROJECTS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Banner */}
      {isMobile && (
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bottom-spacing top-spacing py-12"
          style={{ backgroundImage: "url('/src/assets/phoneBanner.jpg')" }}
        >
          <div className=" flex items-center justify-center flex-col gap-8">
            <h1 className="text-xl font-semibold">
              Your dream home is just a click away
            </h1>
            <div className="mb-10">
              <button
                onClick={handleViewProjects}
                className="bg-[#104438] px-8 py-4 rounded-md text-white hover:bg-white hover:text-[#104438] transition"
              >
                VIEW PROJECTS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdvertisemnetBanner;
