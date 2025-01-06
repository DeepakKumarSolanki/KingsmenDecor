import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { HiHomeModern } from "react-icons/hi2";
import { IoShieldCheckmark } from "react-icons/io5";
import { RiCustomSize } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import PopUpForm from "../../PopUpForm/PopUpForm";

const HomeInterior = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const NavigateToFirstPage = useNavigate();

  const homes = [
    {
      title: "1 BHK",
      desc: "Compact Living: Ideally suited for singles or couples. It provides a cozy and effective living space with all necessities",
      image: "/home/lxbed1.jpg",
    },
    {
      title: "2 BHK",
      desc: "Comfortable Space: Ideal for small families or working professionals, that offers additional space for a home office or guest accommodation.",
      image: "./home/lxbed2.jpg",
    },
    {
      title: "3 BHK",
      desc: "Comfort: Perfect for bigger families since there are huge living spaces with different rooms available, bathrooms, and dining place.",
      image: "./home/lxbed3.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  return (
    <section className="">
      <div className="main-container">
        {/* Steps Section */}
        <aside className="top-spacing bottom-spacing flex flex-col gap-6">
          <motion.div
            className="flex items-center justify-center flex-col gap-3"
            initial={{ opacity: 1, y: -50 }} // Starting position (off-screen from top)
            whileInView={{ opacity: 1, y: 0 }} // End position (bring to normal position)
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
          >
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
              Get your estimate in 4 simple steps
            </h1>
            <p className="lg:text-xl lg:w-[52rem] w-full text-sm lg:pl-16 lg:text-balance font-thin text-slate-400 text-center">
              Be it end-to-end interiors, renovation or modular solutions, we
              have it all for your home or office. With a wide range of
              furniture & decor, we have your back from start to finish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "Choose your BHK type",
                desc: "The type of house helps us understand the configuration of your home.",
                icon: <HiHomeModern className="text-red-500" />,
              },
              {
                step: "Select the size of your house",
                desc: "This will help us give you a more accurate estimate for your interiors.",
                icon: <RiCustomSize className="text-yellow-700" />,
              },
              {
                step: "Pick the rooms to be designed",
                desc: "This helps us understand the scope of work for your home interiors.",
                icon: <IoShieldCheckmark className="text-green-500" />,
              },
              {
                step: "Pick a package as per your preference",
                desc: "This helps us fine-tune the calculation based on the products.",
                icon: <GiReceiveMoney className="text-orange-500" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 border rounded-lg shadow-lg bg-gray-50 hover:bg-white transition-all duration-300 cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                }}
                data-aos="flip-left"
                data-aos-delay={`${index * 100}`}
                onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
              >
                <div className="text-3xl lg:text-5xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold">{item.step}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </aside>

        {/* Estimates Section */}
        <div className="top-spacing bottom-spacing">
          <div className="flex flex-wrap gap-8 items-center justify-between w-full">
            {/* <h2 className="text-3xl font-bold" data-aos="fade-right">
                Estimates for any home
              </h2> */}
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438]">
              Estimates for any home
            </h1>
            <div className="ot-button">
              <button
                onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                className="octf-btn octf-btn-dark"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 top-spacing">
            {homes.map((home, index) => (
              <div
                key={index}
                className="border rounded shadow-lg bg-white"
                data-aos="flip-left"
                data-aos-delay={`${index * 100}`}
                onClick={handlePopUpToggle}
              >
                <motion.div
                  className="h-60 sm:h-80 object-cover rounded-t"
                  style={{
                    backgroundImage: `url(${home.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  whileHover={{
                    scale: 1.01,
                    rotateY: 5,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{home.title}</h4>
                  <p className="text-base text-gray-600">{home.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default HomeInterior;
