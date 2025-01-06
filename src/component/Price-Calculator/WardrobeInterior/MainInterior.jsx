import "aos/dist/aos.css";
import { motion } from "framer-motion";
import React from "react";

const MainInterior = () => {
  const cardData = [
    {
      title: "Swing Wardrobe",
      desc: "Built with hinged doors to offer more space for storage and visibility.",
      timeless:
        "Timeless Design: Comprises hinged doors that swing to the side, giving easy access.",
      classic:
        "Classic Beauty: Suitable for larger rooms, the perfect timelessness and sophisticated style.",
      versatile:
        "Versatile storage: Provides ample hanging space and shelves for organizing wardrobe essentials.",
      image: "./interior/wadrobe2.jpg",
    },
    {
      title: "Sliding Wardrobe",
      desc: "Modern designs with horizontally movable doors to save floor space.",
      timeless:
        "Space Saving: Comprises sliding doors opening it up perfectly for the small rooms with less space.",
      classic:
        "Modern Aesthetics: Sleek and modern design that blends in flawlessly with any room's décor.",
      versatile:
        "Flexible storage: It has adjustable shelves and hanging space, offering an organized and clutter-free closet.",
      image: "./interior/wadrobe1.jpg",
    },
  ];

  return (
    <section className="">
      <div className="main-container bottom-spacing">
        {/* Background Section */}


        <aside>
          <div className="flex flex-wrap gap-8 items-center justify-between w-full bottom-spacing">
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438]">
              Estimates for any Wardrobe
            </h1>
            {/* <div className="ot-button">
              <button
                onClick={() => NavigateToWardrobeHeight("/wardrobe-height")}
                className="octf-btn octf-btn-dark"
              >
                Get Started
              </button>
            </div> */}
          </div>
          <article className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {cardData.map((card, index) => (
              <motion.div
                className="flex items-center justify-center"
                key={index}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              >
                <div className="bg-white shadow-md rounded-lg w-full max-w-lg overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-[20rem] w-full object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-[#104438]">
                      {card.title}
                    </h3>
                    <p className="text-base font-normal text-gray-600 ">{card.desc}</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex">
                        <p className="text-base font-semibold">Timeless Design: <span className="text-base font-normal"> {card.timeless}</span></p>
                      </li>
                      <li className="flex">
                        <p className="text-base font-semibold">Classic Beauty: <span className="text-base font-normal"> {card.classic}</span></p>
                      </li>
                      <li className="flex">
                        <p className="text-base font-semibold">Versatile Storage: <span className="text-base font-normal"> {card.versatile}</span></p>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </article>
        </aside>
      </div>
    </section>
  );
};

export default MainInterior;
