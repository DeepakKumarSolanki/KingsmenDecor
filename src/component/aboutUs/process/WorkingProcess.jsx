import React, { useState } from "react";
import { IoBulbOutline } from "react-icons/io5";

const WorkingProcess = () => {
  const [activeTab, setActiveTab] = useState(0); // Track the active tab for updating paragraph text

  const tabs = [
    {
      icon: "A",
      title: "Consultation Initial",
      des: "We begin with a detailed consultation on your vision, preferences, and lifestyle. Our team will listen to your needs and goals in regards to your ideas, your preferred style, and what problems you encounter in your life. This makes sure we clearly know what is being required to achieve what is desired.",
    },
    {
      icon: "B",
      title: "Design Concept & Planning",
      des: "On the basis of consultation, we evolve a tailored design concept. Our designers create detailed layouts, color schemes, and material selections which can be in line with your style and needs. We present these concepts to you for feedback, making any necessary revisions to perfect the design.",
    },
    {
      icon: "C",
      title: "Execution & Implementation",
      des: "Once the design is approved, our skilled craftsmen and project managers take over the execution phase. We oversee all aspects of the project, from sourcing materials to managing installations. Our team ensures that everything is executed with the highest quality and attention to detail, bringing your vision to life.",
    },
    {
      icon: "D",
      title: "Final Delivery & Aftercare",
      des: "The last process is a complete delivery and installation of your new interiors. We do a walk-through with you to ensure everything meets our high standards and your expectations. Our aftercare services include maintenance tips and adjustments, ensuring that your space remains beautiful and functional for the next years.",
    },
  ];

  // Handle click on a bulb
  const handleClick = (index) => {
    if (activeTab === index) {
      setActiveTab(null); // If the clicked tab is already active, deactivate it
    } else {
      setActiveTab(index); // Set the clicked tab as active
    }
  };

  return (
    <section className="top-spacing bottom-spacing">
      <div
        className="bg-cover bg-center bg-no-repeat bottom-spacing top-spacing"
        style={{ backgroundImage: "url('./process/bg2-process2.jpg')" }}
      >
        <div className="main-container top-spacing bottom-spacing">
          <div className="flex flex-col gap-2 items-center justify-center bottom-spacing">
            <h3 className="text-[#9f9e9e]">[ WORKING STEPS ]</h3>
            <h1 className="lg:text-5xl text-2xl text-[#104438]">
              Our Working Process
            </h1>
            <p className="text-xl text-white">.................</p>
          </div>
          <article className="grid lg:grid-cols-4 grid-cols-1 gap-6 place-items-center">
            {tabs.map((tab, index) => (
              <div
                className="flex flex-col gap-4 items-center relative"
                key={index}
              >
                <h2
                  className="text-8xl absolute -top-28 right-6 md:text-8xl font-bold hidden lg:flex lg:items-center lg:justify-center tracking-widest uppercase w-full text-center transform text-transparent"
                  style={{
                    WebkitTextStroke: "1px white",
                    color: "transparent",
                  }}
                >
                  {index + 1}
                </h2>
                <div
                  onClick={() => handleClick(index)} // Trigger click event to update paragraph
                  className={`w-36 h-36 flex items-center  hover:bg-white justify-center rounded-full text-8xl font-bold tracking-widest text-transparent group-hover:text-black cursor-pointer ${
                    activeTab === index
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <IoBulbOutline
                    className={`text-5xl  ${
                      activeTab === index ? "text-black " : "text-gray-700"
                    } group-hover:text-black`}
                  />
                </div>
                <h2 className="text-xl pt-10 font-medium text-[#104438]">
                  {tab.title}
                </h2>
              </div>
            ))}
          </article>

          {/* Display the description of the active tab */}
          {activeTab !== null ? (
            <p className="text-slate-400 text-lg pt-8">{tabs[activeTab].des}</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
