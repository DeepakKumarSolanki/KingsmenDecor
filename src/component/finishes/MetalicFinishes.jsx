import React from "react";
import { motion } from "framer-motion";

const LuxuryMetallicFinishes = () => {
  return (
    <div className="main-container mx-auto px-4 py-16 overflow-hidden">
      <div className="grid lg:grid-cols-2 grid-cols-1 space-x-2">
        <motion.div
          className="flex flex-row gap-4"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <img
          loading="lazy"
            src="/src/assets/MetallicFinish.jpg"
            alt="Luxury Metallic Finish"
            className="rounded-lg shadow-lg w-full h-[20rem] object-cover"
          />
        </motion.div>
        <motion.article
          className="flex flex-row gap-10 pl-6"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4  w-full">
              <h2 className="text-4xl font-semibold text-[#104438]">
                The Luxury of Metallic Finishes
              </h2>
              <p className="text-xl text-justify  text-slate-900">
                Luxury home décor with metallic finishes doesn't just shine; it
                represents elegance, exclusivity, and timeless beauty. The
                metallic finish can be a subtle accent or a statement piece,
                adding sophistication to a space, transforming ordinary surfaces
                into extraordinary works of art. With the right metallic finish,
                your home will shine to reflect your unique style and discerning
                taste.
              </p>
              {/* <div className="ot-button">
                <button
                  onClick={handleViewProjects}
                  className="octf-btn octf-btn-dark"
                >
                  About Us
                </button>
              </div> */}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default LuxuryMetallicFinishes;
