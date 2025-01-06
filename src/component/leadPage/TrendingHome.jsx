import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const TrendingHome = () => {
  const [openImage, setOpenImage] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [currentImages, setCurrentImages] = useState([]);

  const handleViewProjects = () => {
    navigate("/allProjects");
  };

  const trendingArray = [
    {
      images: [
        { src: "/src/assets/trending1.jpg" },
        { src: "/src/assets/trending4.jpg" },
      ],
      title:
        "The heart of your home, the living room, is where you relax, entertain, and create lasting memories. To transform this space into a stylish sanctuary with plush furnishings, sophisticated lighting, and carefully curated decor.",
      client: "Where Comfort Meets Style",
      date: "Living Room",
    },
    {
      images: [
        { src: "/src/assets/lxislandkic1.jpg" },
        { src: "/src/assets/lxislandkit2.jpg" },
      ],
      title:
        "The kitchen is not just a place to cook; it's a hub of activity and social interaction. Kingsmen Decors creates kitchens that are both functional and beautiful, with innovative layouts, premium cabinetry, and cutting-edge appliances.",
      client: "The Heart of Your Home",
      date: "Kitchen",
    },
    {
      images: [
        { src: "/src/assets/trending6.jpg" },
        { src: "/src/assets/trending7.jpg" },
      ],
      title:
        "Whether you prefer a minimalist modern look or a more traditional aesthetic, our designs cater to your needs, turning your bathroom into a sanctuary for relaxation and rejuvenation.",
      client: "Luxury and Relaxation",
      date: "Bathroom",
    },
  ];

  const handleImageClick = (images, index) => {
    setLightboxImages(images);
    setActiveIndex(index);
    setOpenImage(true);
  };

  return (
    <section className="main-container top-spacing bottom-spacing">
      <div className="flex flex-col gap-6">
        <aside className="flex md:justify-between flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-3">
            <motion.h1
              className="lg:text-4xl text-xl font-semibold text-[#104438]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              Stay updated with trending home interior designs!
            </motion.h1>
            <motion.p
              className="lg:text-xl lg:w-[52rem] w-full text-sm lg:text-balance font-thin text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Find everything from design fixes to expert tips on Kingsmen
              magazine.
            </motion.p>
          </div>
          <motion.div
            className="ot-button"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              onClick={handleViewProjects}
              className="octf-btn octf-btn-dark"
            >
              View All
            </button>
          </motion.div>
        </aside>
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {trendingArray.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className="flex flex-col rounded-md overflow-hidden"
            >
              <div className="flex gap-2">
                {card.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative w-1/2 h-[196px] rounded-md overflow-hidden"
                  >
                    <img
                      src={image.src}
                      loading="lazy"
                      alt={`Image ${imgIndex + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    {/* Eye icon on hover */}
                    <div
                      className="eye-icon-container"
                      onClick={() => handleImageClick(card.images, imgIndex)}
                    >
                      <FaEye className="eye-icon" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="text-base text-justify">{card.title}</h3>
                <p className="text-lg text-gray-800 mt-2">
                  {card.client} ...{" "}
                  <span className="text-gray-400 text-lg font-bold">
                    {card.date}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={lightboxImages}
        index={activeIndex}
      />
    </section>
  );
};

export default TrendingHome;
