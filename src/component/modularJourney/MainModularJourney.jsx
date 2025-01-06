import { motion } from "framer-motion";
import AdvertisemnetBanner from "../leadPage/AdvertisemnetBanner";

import { SiCssdesignawards } from "react-icons/si";
import { SiMaterialformkdocs } from "react-icons/si";
import { BsAmd } from "react-icons/bs";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { GiChoice } from "react-icons/gi";
import { SiApachesolr } from "react-icons/si";
const ModularJourney = () => {
  const behindTheScenes = [
    {
      step: "Design Done Right",
      desc: "Innovative designs for maximum functionality and aesthetics.",
      icon: <SiCssdesignawards className="text-red-600" />,
    },
    {
      step: "Materials That Defy Time",
      desc: "Top-quality materials ensure lasting durability.",
      icon: <SiMaterialformkdocs className="text-yellow-700" />,
    },
    {
      step: "Innovative Manufacturing",
      desc: "Advanced processes for accuracy and consistency.",
      icon: <BsAmd className="text-green-500" />,
    },
    {
      step: "Quality Inspection",
      desc: "Intensive checks at every stage for top standards.",
      icon: <MdPlaylistAddCheckCircle className="text-orange-600" />,
    },
    {
      step: "Sustainable Choices",
      desc: "Eco-friendly practices for reduced environmental impact.",
      icon: <GiChoice className="text-blue-600" />,
    },
    {
      step: "Customised Solutions",
      desc: "Tailored designs and finishes for personalized spaces.",
      icon: <SiApachesolr className="text-pink-500" />,
    },
  ];
  const testimonials = [
    {
      name: "Priya R.",
      feedback:
        "The cabinets have completely transformed my kitchen! The durability and smooth soft-closing hinges are a game-changer.",
    },
    {
      name: "Rajesh K.",
      feedback:
        "Choosing Kingsmen Decors was the best decision for my home interiors. The cabinets truly stand the test of time!",
    },
    {
      name: "Anjali S.",
      feedback:
        "Thrilled with my new wardrobe! Sturdy and aesthetically pleasing. The design-to-installation process was seamless.",
    },
  ];

  return (
    <section>
      <div className="main-container top-spacing flex flex-col">
        <article className="">
          <h2
            className="lg:text-4xl text-xl font-semibold text-[#104438] text-center"
            data-aos="fade-up"
          >
            Behind the Scenes with Build™ Cabinets
          </h2>
          <div className="top-spacing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {behindTheScenes.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 border rounded shadow-lg bg-gray-50 text-center"
                  initial={{ opacity: 0, rotateX: 90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  whileHover={{
                    scale: 1.01,
                    rotateY: 5,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    duration: 0.8,
                  }}
                  data-aos="flip-up"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{item.step}</h4>
                  <p className="text-xl text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </article>
        <article className="top-spacing flex flex-col gap-5">
          <motion.div
            className="flex items-center justify-center flex-col gap-2"
            initial={{ opacity: 1, y: -50 }} // Starting position (off-screen from top)
            whileInView={{ opacity: 1, y: 0 }} // End position (bring to normal position)
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
          >
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
              What Our Customers Say
            </h1>
            <p className="lg:text-xl lg:w-[52rem] w-full text-sm lg:pl-16 lg:text-balance font-thin text-slate-400 text-center">
              Hear it straight from our happy clients who trusted Kingsmen
              Decors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </article>
      </div>
      <AdvertisemnetBanner />
    </section>
  );
};

export default ModularJourney;
