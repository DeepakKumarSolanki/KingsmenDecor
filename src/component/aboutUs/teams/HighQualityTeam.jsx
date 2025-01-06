import React from "react";
import { motion } from "framer-motion";

const HighQualityTeam = () => {
  const data = [
    {
      number: "100+",
      des: "CURRENT CLIENT",
    },
    {
      number: "50+",
      des: "YEAR OF EXPERIENCE",
    },
    {
      number: "200+",
      des: "TEAM MEMBER",
    },
  ];
  const teamMembers = [
    {
      img: "/src/assets/PranavG.jpg",
      name: "Pranav G",
      designation: "HR Manager",
    },
    {
      img: "/src/assets/user.png",
      name: "Ashish",
      designation: "Business Head",
    },
    {
      img: "/src/assets/RiteshT.jpg",
      name: "Ritesh Thakur",
      designation: "Technical Manager",
    },
    {
      img: "/src/assets/ShadanS.jpg",
      name: "Shadan Shaikh",
      designation: "Digital Marketing Manager",
    },
    {
      img: "/src/assets/YogeshS.jpg",
      name: "Yogesh S",
      designation: "Senior Brand Strategist",
    },
  ];
  return (
    <section
      className="bg-[url('/bg_process_image.png')] bg-fixed bg-cover common-transition bottom-spacing"
      id="about"
    >
      {/* Heading Section */}
      <div className="main-container flex flex-col gap-3 py-16">
        <h1 className="text-sm font-semibold leading-7 tracking-widest text-center text-[#104438]">
          What Our Clients Say
        </h1>
        <p className="text-center lg:text-5xl md:text-5xl text-3xl text-[#104438] font-bold">
          Transforming Spaces, Elevating Lifestyles
        </p>
      </div>

      {/* Team Grid */}
      <aside className="main-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((team, index) => (
            <motion.div
              key={index}
              className="border rounded shadow-lg bg-white w-full"
              style={{
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
              whileHover={{
                scale: 1.01,
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.5 }}
              data-aos="flip-left"
              data-aos-delay={`${index * 100}`} // Stagger delay
            >
              {/* Image Container */}
              <div className="w-full lg:h-64 overflow-hidden">
                <img
                loading="lazy"
                  src={team.img}
                  alt="xk"
                  className="w-full h-full object-cover rounded-t"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg">{team.designation}</h4>
                <p className="text-xl text-gray-600">{team.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      <div className="flex flex-col pt-16 md:justify-center md:items-center text-center gap-5">
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-5">
          {data.map((items, i) => (
            <motion.div
              viewport={{ once: true }}
              initial={{ scale: 1, opacity: 0, y: 300 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 1 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              key={i}
              className="flex flex-col gap-5  p-4 rounded-lg items-center"
            >
              <h1 className="text-6xl font-thin text-[#104438]">
                [{items.number}]
              </h1>
              <p className="text-sm text-[#104438]">{items.des}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighQualityTeam;
