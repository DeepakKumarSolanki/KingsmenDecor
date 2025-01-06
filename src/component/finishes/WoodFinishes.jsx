import React from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

const WoodFinishes = () => {
  const WoodFinishes_ARRAY = [
    {
      title: "Matte Chic",
      description:
        "A matte finish is understated sophistication, perfect for minimalist as well as Scandinavian-inspired environments. It retains the organic quality of the wood, giving the touch a soft, velvety feel that provides warmth.",
      image: "/src/assets/wood1.jpg",
    },
    {
      title: "Timeless Elegance Charm",
      description:
        "Distressed wood finishes create an aged, vintage look that adds character to rustic and traditional interiors. It showcases imperfections, thus accentuating the raw, authentic quality of the wood.",
      image: "/src/assets/wood2.jpg",
    },
    {
      title: "Exotic Veneers",
      description:
        "Exotic wood veneers such as ebony, walnut burl, and zebrawood add an exclusive feel to luxury interiors. These rare, intricately patterned veneers are perfect for bespoke furniture, wall panels, and cabinetry.",
      image: "/src/assets/wood3.jpg",
    },
    {
      title: "Stained Refinement",
      description:
        "Deep stains or rich tones bring out the unique hues within the wood. From rich espresso to deep mahogany, stained finishes add flexibility without any sacrifice of luxury.",
      image: "/src/assets/wood4.jpg",
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
              Exquisite Wood Finishes: The Pinnacle of Luxury in Interior Design
            </h1>
            <p className="lg:text-xl lg:w-[80rem] w-full text-sm lg:pl-16 lg:text-balance font-thin text-slate-400 text-center">
              Wood finishes are the epitome of luxury interiors, with an
              elegance that is timeless and sophistication that is unparalleled.
              They are more than just surface treatments; they transform the
              natural beauty of wood into a statement of refined taste and
              exquisite craftsmanship.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {WoodFinishes_ARRAY.map((service) => (
              <motion.div
                key={service.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-out hover:scale-[1.02] hover:translate-x-2 hover:shadow-xl"
                initial={{ opacity: 0, x: -100 }} // Starting position (off-screen from left)
                whileInView={{ opacity: 1, x: 0 }} // End position (bring to normal position)
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
              >
                <img
                loading="lazy"
                  className="rounded-t-lg h-[290px] lg:w-[310px] w-full object-cover cursor-pointer"
                  src={service.image}
                  alt={service.name}
                />
                <div className="p-5 flex flex-col items-center">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#104438]">
                    {service.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    {service.description}
                  </p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center h-8 w-8 justify-center text-sm font-medium text-center text-white bg-[#2b4741] rounded-full hover:bg-[#104438] focus:ring-4 focus:outline-none focus:ring-gray-300"
                  >
                    <IoIosArrowForward className="text-lg" />
                  </a> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WoodFinishes;
