import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutCompany = () => {
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate("/teams");
  };

  return (
    <section className="main-container top-spacing ">
      <div className="grid-lines grid-lines-vertical">
        <span className="g-line-vertical line-left color-line-default" />
        <span className="g-line-vertical line-center color-line-default" />
        <span className="g-line-vertical line-right color-line-default" />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 space-x-2">
        {/* Left Side Animation */}
        <motion.div
          className="flex flex-row gap-4"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <div className="bg-gray-200 h-30 w-[0.15rem] lg:flex hidden"></div>
          <div className="about-img-1 flex items-center justify-center">
            <img src="/src/assets/image2-home1.png" className="" alt="about"  loading="lazy"/>
          </div>
        </motion.div>

        {/* Right Side Animation */}
        <motion.article
          className="flex flex-row gap-10 pl-6"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <div className="bg-gray-200 h-30 w-[0.15rem] lg:flex hidden"></div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4 lg:w-[550px] w-full">
              <div className="">
                <span className="text-gray-400 capitalize">
                  [ about company ]
                </span>
                <h2 className="text-4xl font-semibold text-[#104438]">
                  Transforming Homes, Defining Elegance
                </h2>
              </div>
              <p className="text-lg font-thin text-slate-400">
                At Kingsmen Decors, we craft timeless interiors blending style,
                functionality, and sophistication, delivering bespoke furniture,
                lighting, and decor accents that reflect your personality while
                ensuring modern elegance and comfort. With a dedication to
                luxury and meticulous craftsmanship, we transform spaces into
                havens of refined beauty and exclusivity. Every detail, from
                opulent finishes to statement pieces, is thoughtfully curated to
                create interiors that exude grandeur and unparalleled
                sophistication
              </p>
              <div className="ot-button">
                <button
                  onClick={handleViewProjects}
                  className="octf-btn octf-btn-dark"
                >
                 About Us
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default AboutCompany;
