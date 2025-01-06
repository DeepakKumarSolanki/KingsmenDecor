import { motion } from "framer-motion";
import React from "react";

const CountDown = () => {
  const data = [
    {
      icon: "", // Optional: Add icon if needed
      number: "550+",
      des: "Satisfied Clients",
    },
    {
      icon: "", // Optional: Add icon if needed
      number: "20+",
      des: "Years Of Experience",
    },
    {
      icon: "", // Optional: Add icon if needed
      number: "1000+",
      des: "Project Completed",
    },
    {
      icon: "", // Optional: Add icon if needed
      number: "20+",
      des: "Current Clients",
    },
  ];

  return (
    <section
      className="bg-[url('/src/assets/feature-bg.png')] bg-fixed bg-cover common-transition bottom-spacing"
      id="about"
    >
      {/* Heading Section */}
      <div className="main-container flex flex-col gap-3 pt-16">
        <h1 className="text-sm font-semibold leading-7 tracking-widest text-center !text-[#104438]">
          What Our Clients Say
        </h1>
        <p className="text-center lg:text-5xl md:text-5xl text-3xl text-[#104438] font-bold">
          Transforming Spaces, Elevating Lifestyles
        </p>
      </div>

      {/* Data Cards Section */}
      <div className="main-container bottom-spacing flex flex-col pt-16 md:justify-center md:items-center text-center gap-5">
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-5">
          {data.map((items, i) => (
            <motion.div
              viewport={{ once: true }}
              initial={{ scale: 1, opacity: 0, y: 300 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 1 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              key={i}
              className="flex flex-col gap-5 design p-4 rounded-lg items-center"
            >
              <h1 className="text-6xl font-bold !text-[#104438]">
                {items.number}
              </h1>
              <p className="text-lg !text-[#104438]">{items.des}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountDown;
