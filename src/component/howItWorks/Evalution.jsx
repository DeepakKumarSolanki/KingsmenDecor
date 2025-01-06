import React, { useState } from "react";
import { motion } from "framer-motion";


import QuotePopUp from "./QuotePopUp";
const HomeProcess = () => {
  const steps = [
    {
      title: "Meet your designer",
      steps: [
        {
          title: "It all begins with a form",
          description:
            "Let’s get to know you! The more we learn about your style and preferences, the better we can craft a luxurious interior tailored to your needs.",
          button: "Fill Your Form",
        },
        {
          title: "Get free consultation",
          description:
            "Connect with your designer to discuss personalized concepts, designs, and quotes for your dream luxury space.",
        },
      ],
      img: "/src/assets/meetDesigner.jpg",
    },
    {
      title: "Book Kingsmen",
      steps: [
        {
          title: "Secure Timeless Luxury for Your Home Elevate your living spaces with Kingsmen Decor",
          description:
            "From the finest luxury finishes to bespoke designs, we craft interiors that embody elegance and exclusivity. Secure your dream project with a booking.",
          milestone: true,
        },
        {
          title: "Finalise your home design",
          description:
            "Book Kingsmen and bring timeless luxury to your home with bespoke designs and premium finishes that exude sophistication and elegance.",
        },
      ],
      img: "/src/assets/bookingDone.jpg",
    },
    {
      title: "Execution Begin",
      steps: [
        {
          title: "Your project takes shape",
          description:
            "Our skilled team starts the transformation process with precision and care, ensuring each detail is executed flawlessly.",
          milestone: true,
        },
        // {
        //   title: "Finalise your home design",
        //   description:
        //     "It’s time to dive into the nitty-gritties & pick your favorite materials, finishes, etc. Interim payments will be requested based on project scope, value, and timelines during the booking and design phase.",
        // },
      ],
      img: "/src/assets/plan.jpg",
    },
    {
      title: "Installation & Finishing Touches",
      steps: [
        {
          title: "Luxury meets perfection",
          description:
            "As your project nears completion, we ensure everything aligns with the vision, leaving no detail overlooked.",
          milestone: true,
        },
        // {
        //   title: "Finalise your home design",
        //   description:
        //     "It’s time to dive into the nitty-gritties & pick your favorite materials, finishes, etc. Interim payments will be requested based on project scope, value, and timelines during the booking and design phase.",
        // },
      ],
      img: "/src/assets/PolisherNew.jpg",
    },
    {
      title: "Move In",
      steps: [
        {
          title: "",
          description:
            "Your dream home, ready for you With the final payment and meticulous quality checks, it’s time to step into your elegantly designed luxury space by Kingsmen Decor.",
          milestone: true,
        },
        // {
        //   title: "Work commences",
        //   description:
        //     "Civil work begins on site. Keep a tab on your project status on 'My Account'.",
        // },
      ],
      img: "/src/assets/moveIn.jpg",
    },
  ];
  let [isPopUpOpen, setIsPopUpOpen] = useState(false);
  let handlePopUpToggle = () => {
    // console.log("Hii");
    setIsPopUpOpen(!isPopUpOpen);
    console.log(isPopUpOpen);
  };
  return (
    <section className="main-container top-spacing bottom-spacing">
      <div className="flex flex-col gap-6">
      {steps.map((section, index) => (
        <motion.div
          key={index}
          className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          data-aos="fade-up"
        >
          {/* Video */}
          <div className="lg:w-[30rem] w-full">
            <motion.img
              src={section.img}
              loading="lazy"
              // className="rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            ></motion.img>
          </div>
          {/* Text */}
          <div className="lg:w-1/2 w-full space-y-6">
            <motion.h2
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              data-aos="fade-up"
            >
              {section.title}
            </motion.h2>
            {section.steps.map((step, stepIndex) => (
              <motion.div
                key={stepIndex}
                className="space-y-2"
                data-aos="flip-left"
                data-aos-delay={`${stepIndex * 100}`}
              >
                <h3 className="text-lg font-semibold text-[#104438]">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {step.milestone && (
                  <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                    Milestone
                  </span>
                )}
                {step.button && (
                  <button
                    className="mt-2 px-4 py-2 text-white font-medium rounded shadow bg-[#104438] transition"
                    onClick={handlePopUpToggle}
                  >
                    {step.button}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
      {isPopUpOpen && <QuotePopUp value={isPopUpOpen} />}
    </div>
    </section>
  );
};
export default HomeProcess;
