import React from "react";
import { motion } from "framer-motion";

const AcrylicFinishes = () => {
  return (
    <div className="main-container top-spacing bottom-spacing overflow-hidden">
      <motion.div
        className="flex items-center justify-center flex-col gap-3"
        initial={{ opacity: 1, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
          The Opulence of Acrylic Finishes: Elevating Spaces with Timeless
          Elegance
        </h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 mb-12  text-center"
        >
          Acrylic finishes in luxurious home decorations provide a fresh,
          contemporary look with an elegant glossy appearance like glass,
          enhancing any room. They are known for durability, versatility, and
          their upscale appearance, and that's why they're popular in high-end
          interiors. The application can be in furniture, wall treatments, or
          even in accents. With acrylic finishes, your place gets to have an
          aura of elegance, a dash of style, and a touch of classic elegance.
          Here are the most gorgeous acrylic finishes to look for in your home:
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
              src="/src/assets/AcrylicFinish.jpg"
              className="rounded-lg shadow-lg w-full h-[20rem] object-cover"
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
              Acrylic Finish
            </h3>
            <p className="text-gray-700">
              A high-gloss acrylic finish is the most luxurious option for a
              glass-like surface. This reflective finish really brings out the
              depth and vibrancy of colours and is perfect for modern,
              minimalist interiors. Often applied to cabinetry, furniture, and
              wall panels, a high-gloss acrylic finish gives a space an air of
              sleekness and sophistication while also making the spaces feel
              more expansive and airy.
            </p>
          </motion.div>
        </motion.div>

        {/* <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row-reverse items-center"
        >
          <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
            <img
              src="/finishes/MatteAcrylic.jpg"
              className="rounded-lg shadow-lg w-full h-[20rem] object-cover"
              alt="MatteAcrylic"
            />
          </div>
          <motion.div
            className="flex flex-col  md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[#104438]">
              Matte Acrylic Finish
            </h3>
            <p className="text-gray-700">
              A matte acrylic finish is very subtle and understated in elegance.
              It gives a soft, velvety appearance that is perfect for
              contemporary designs. This finish diffuses light gently to give a
              refined and sophisticated look without the high shine of gloss.
              This is perfect for creating a warm, serene atmosphere in luxury
              spaces where understated luxury is key. This is suitable for
              walls, furniture, and accessories.
            </p>
          </motion.div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default AcrylicFinishes;
