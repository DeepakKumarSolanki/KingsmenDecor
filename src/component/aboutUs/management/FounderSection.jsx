import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

const profiles = [
  {
    name: "Anees Antapur",
    title: "Meet Our Founder",
    img:"/src/assets/AneesAntapur.jpg",
    role: "Founder",
    links: {
      linkedin: "https://www.linkedin.com/in/anees-antapur/?original_referer=https%3A%2F%2Fkingsmenrealty.com%2F",
      whatsapp: "https://api.whatsapp.com/send/?phone=%2B971586485793&text&type=phone_number&app_absent=0",
      instagram: "https://www.instagram.com/kingsmen_realty/?igsh=MWt6b2dieHVqbnd0dw%3D%3D",
      email: "#",
    },
  },
  {
    name: "Ravi Kumar",
    title: "Meet Our Co-Founder",
    img:"/src/assets/raviIMage.jpeg",
    role: "Co-Founder",
    links: {
      linkedin: "#",
           whatsapp: "https://api.whatsapp.com/send/?phone=%2B971586485793&text&type=phone_number&app_absent=0",
      instagram: "https://www.instagram.com/kingsmen_realty/?igsh=MWt6b2dieHVqbnd0dw%3D%3D",
      email: "#",
    },
  },
  
];

const ProfileCard = ({ profile, reverse }) => {
  // Icon Mapping
  const linkIcons = {
    linkedin: <FaLinkedin className="text-xl text-blue-700" />,
    whatsapp: <FaWhatsapp className="text-xl text-green-600" />,
    instagram: <FaInstagram className="text-xl text-pink-600" />,
    email: <FaEnvelope className="text-xl text-red-500" />,
  };

  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="flex flex-col gap-8 mb-8">
      {/* Title Section */}
      <div className="w-full py-6 bg-[#104438] text-white text-start pl-9">
        <h3 className="text-xl font-semibold">{profile.title}</h3>
      </div>

      {/* Card Content */}
      <div
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center gap-10 px-4 py-8 border`}
      >
        {/* Profile Image with Animation */}
        <motion.div
          className="flex items-center justify-center w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <div className="h-[320px] w-[304px] rounded-md">
            <img loading="lazy" src={profile.img} alt="image" className="h-[320px] w-[290px] " />
          </div>
        </motion.div>

        {/* Profile Details with Animation */}
        <motion.div
          className="text-center md:text-left w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          {/* Name and Role */}
          <h3 className="text-2xl font-semibold text-[#104438]">
            {profile.name}
          </h3>
          <div className="flex flex-row items-center gap-2 mb-4">
            <p className="text-gray-500 text-lg font-medium">{profile.role}</p>
            <div className="border-t w-12 border-gray-400"></div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 space-y-2 text-[#104438]">
            {Object.entries(profile.links).map(([key, link]) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 font-medium"
              >
                {linkIcons[key]}
                <span>{key.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FounderSection = () => {
  return (
    <section className="px-4 md:px-16 py-8 bg-gray-50">
      <div className="main-container">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={profile.name}
            profile={profile}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default FounderSection;
