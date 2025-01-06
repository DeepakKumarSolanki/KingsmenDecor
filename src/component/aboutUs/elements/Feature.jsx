import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const IconBox = () => {
  const cardData = [
    {
      bgImage: "/images/",
      icon: "/images/iconbox1.2.png",
      title: "Design & Planning",
      description:
        "Create your dream space with our expert design and planning services. We are the company where you'll work directly with experts to understand your vision and needs, designing solutions for a specific solution.",
      link: "servcies-detail-1.html",
    },
    {
      bgImage: "/images/bg-iconbox2.jpg",
      icon: "/images/iconbox2.png",
      title: "Custom Solutions",
      description:
        "Customize your space to represent your style with our custom bespoke solutions. From bespoke furniture to individualistic décor, we design and create bespoke items to give beauty and functionality to any space.",
      link: "servcies-detail-2.html",
    },
    {
      bgImage: "/images/bg-iconbox3.jpg",
      icon: "/images/iconbox3.png",
      title: "Furniture & Decor",
      description:
        "Discover our exclusive range of styles and colors for a modern look. Our collection includes a variety of styles and finishes for your home, with designs that enhance the elegance of your furniture.",
      link: "servcies-detail-3.html",
    },
  ];

  const FEATURE_ARRAY = [
    {
      img: "./images/home.png",
      title: "Multi Experience",
      des: "We offer a vast range of services, working upon different styles for both the commercial and residential properties giving it a modern look which looks elegant. It is the way you love the luxury and dream for your home to be.",
      icon: "./images/value.png",
      head: "Professionalism",
      subHead: "Certified high-class specialists",
    },
    {
      img: "./images/consumer-centric.png",
      title: "Customer Focus",
      des: "Customers prefer us because it is easier to communicate, and understand what is necessary at the end. And, according to their taste they need their homes to be with a modern tough.",
      icon: "./images/expertise.png",
      head: "Experience & Skills",
      subHead: "Certified high-class specialists",
    },
    {
      img: "./images/engineer.png",
      title: "Professionalism",
      des: "We develop a full cycle of project documentation: an outline sketch, a design project, working documentation and with final approval of the designs that is proved.",
      icon: "./images/target.png",
      head: "Customer Focus",
      subHead: "Certified high-class specialists",
    },
  ];

  return (
    <section className="main-container top-spacing flex flex-col gap-8 bottom-spacing">
      <h1 className="lg:text-4xl text-xl font-semibold text-[#104438]">
        Icon Boxes
      </h1>

      <article className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            style={{ backgroundImage: `url(${card.bgImage})` }}
            className="icon-box relative text-center flex flex-col items-center justify-center transition-all duration-300 ease-linear p-8 bg-cover bg-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Overlay for color change */}
            <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-[#104438] group-hover:bg-opacity-80 transition-all duration-300"></div>

            <div className="icon-main mb-4 relative z-10">
              <img
                src={card.icon}
                alt={card.title}
                className="h-20 w-20 mb-4"
              />
            </div>

            <div className="content-box relative z-10">
              <h5 className="text-xl font-semibold mb-3 text-[#104438] group-hover:text-white">
                <p>{card.title}</p>
              </h5>
              <p className="text-gray-600 group-hover:text-gray-300">
                {card.description}
              </p>
            </div>

            {/* <div className="link-box mt-4 relative z-10">
              <a
                href={card.link}
                className="btn-details text-gray-800 group-hover:text-white border-b-2 border-transparent group-hover:border-white transition-all"
              >
                READ MORE
              </a>
            </div> */}

            {/* Hover border effect */}
            <div className="absolute inset-0 border transform scale-0 group-hover:scale-100 transition-all duration-300 border-white"></div>
          </motion.div>
        ))}
      </article>

      {/* Animated Feature Boxes for Multi Experience, Customer Focus, and Professionalism */}
      <article className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {FEATURE_ARRAY.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }} // Start from below and invisible
            whileInView={{ opacity: 1, y: 0 }} // Animate every time it comes into view
            transition={{ duration: 0.4, delay: i * 0.2 }} // Stagger animation delay
          >
            <img src={item.img} alt={item.title} className="h-20 w-20" />
            <h3 className="text-xl font-semibold text-[#104438]">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.des}</p>
          </motion.div>
        ))}
      </article>

      {/* Icons Section with Motion for "Professionalism", "Customer Focus", and "Multi Experience" */}
      <article className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {FEATURE_ARRAY.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-row items-center justify-center gap-4 bg-[#104438] text-white py-6"
            initial={{ opacity: 0, x: -20 }} // Start from the left and invisible
            whileInView={{ opacity: 1, x: 0 }} // Animate every time it comes into view
            transition={{ duration: 0.4, delay: i * 0.3 }} // Stagger animation delay
          >
            <img src={item.icon} alt={item.title} className="h-14" />
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{item.head}</h3>
              <p className="text-slate-400 text-lg">{item.subHead}</p>
            </div>
          </motion.div>
        ))}
      </article>
    </section>
  );
};

export default IconBox;
