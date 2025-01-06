import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Services = () => {
  const SERVICES_ARRAY = [
    {
      id: "1",
      name: "Customized Interior Design",
      img: "/src/assets/lxBed4.jpg",
      des: "We create exquisite interior designs, transforming living rooms, bathrooms, and bedrooms into luxurious and elegant spaces.",
    },
    {
      id: "2",
      name: "Flooring and Wall Finishes",
      img: "/src/assets/flooringWall.jpg",
      des: "We provide premium furniture pieces, transforming your living space with luxury and elegance.",
    },
    {
      id: "3",
      name: "Decorative Elements",
      img: "/src/assets/lxdecoelem1.jpg",
      des: "We provide luxury with stylish wall art, mirrors, sculptures, and vases, enhancing every room with elegance and charm.",
    },
    {
      id: "4",
      name: "Outdoor and Balcony Decor",
      img: "/src/assets/lxoutdoor4.jpg",
      des: "Extend your living space outdoors with our Luxury and sophisticated furniture and decor.",
    },
  ];

  return (
    <section className="bg-white top-spacing bottom-spacing">
      <div className="main-container ">
        <div className="flex flex-col gap-6">
          <motion.div
            className="flex items-center justify-center flex-col gap-3"
            initial={{ opacity: 1, y: -50 }} // Starting position (off-screen from top)
            whileInView={{ opacity: 1, y: 0 }} // End position (bring to normal position)
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
          >
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
              Curating Elegance: The Art of Luxurious Interiors
            </h1>
            <p className="lg:text-xl lg:w-[52rem] w-full text-sm lg:pl-16 lg:text-balance font-thin text-slate-400 text-center">
              Elevate your home into a sanctuary of luxury, where sumptuous
              finishes, lavish textures, and exquisite designs converge to
              create an ambiance of unparalleled grandeur and sophistication.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {SERVICES_ARRAY.map((service) => (
              <motion.div
                key={service.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-out hover:scale-[1.02] hover:translate-x-2 hover:shadow-xl"
                initial={{ opacity: 0, x: -100 }} // Starting position (off-screen from left)
                whileInView={{ opacity: 1, x: 0 }} // End position (bring to normal position)
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
              >
                <img
                  className="rounded-t-lg h-[270px] lg:w-[310px] w-full object-cover cursor-pointer"
                  loading="lazy"
                  src={service.img}
                  alt={service.name}
                />
                <div className="p-5 flex flex-col items-center">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#104438]">
                    {service.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    {service.des}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center h-8 w-8 justify-center text-sm font-medium text-center text-white bg-[#2b4741] rounded-full hover:bg-[#104438] focus:ring-4 focus:outline-none focus:ring-gray-300"
                  >
                    <IoIosArrowForward className="text-lg" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
