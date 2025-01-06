import React from "react";
import { motion } from "framer-motion";

const VeneerFinishes = () => {
  return (
    <section className="main-container top-spacing bottom-spacing overflow-hidden">
      <motion.div
        className="flex items-center justify-center flex-col gap-3"
        initial={{ opacity: 1, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
          Enhancing Your Luxury Space Using Veneer Finishes
        </h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 mb-12  text-center"
        >
          Veneer finishes are known to add a timeless touch of elegance and
          sophistication to any luxury home interior. Regardless of whether
          you're creating a modern, classic, or eclectic space, the veneer you
          choose is crucial in setting the tone. Here are six premium veneer
          finishes that elevate your home décor with their distinct beauty,
          warmth, and luxury.
        </motion.p>
      </motion.div>
      <div className="space-y-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center"
        >
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <img
            loading="lazy"
              src="/src/assets/tv1.jpg"
              className="rounded-lg shadow-lg w-full h-[24rem] object-cover"
              alt=""
            />
          </div>
          <motion.div
            className="flex flex-col  md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[#104438]">
            White Oak Veneer
            </h3>
            <p className="text-gray-700">
              White Oak veneer is valued for its fine, almost raw beauty. It
              gives an understated elegance through a rich golden hue, and
              straight tight grains characterize it. Being versatile enough to
              complement numerous design schemes ranging from contemporary to
              traditional in design, White Oak suits well all spaces. Its
              neutral, soft tone makes the creation of airy, open space a
              no-brainer. White Oak veneers are suitable for high-end cabinetry,
              wall panels, and flooring, giving a luxurious yet grounded feel to
              your home. The natural beauty of White Oak creates a sense of
              sophistication without overwhelming the space, offering a
              timeless, versatile option for luxury interiors.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VeneerFinishes;
