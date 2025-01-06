import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { motion } from "framer-motion";

const textures = [
  {
    title: "Plaster and Stucco",
    description:
      "Timeless beauty with silky smooth or rustic worn look, perfect for traditional and Mediterranean styles.",
    imageUrl: "/src/assets/tf1.jpg",
  },
  {
    title: "Textured Wall Papers",
    description:
      "Rich textures in embossed, linen, or silk finishes, adding color and patterns with subtle sophistication.",
    imageUrl: "/src/assets/tf2.jpg",
  },
  {
    title: "Venetian Plaster",
    description:
      "Highly polished, marble-like finish offering luminous surface with depth of color and texture.",
    imageUrl: "/src/assets/tf3.jpg",
  },
  {
    title: "Wood Textures",
    description:
      "Natural beauty adding warmth and depth, from distressed-reclaimed to smoothly finished surfaces.",
    imageUrl: "/src/assets/tf4.jpg",
  },
  {
    title: "Concrete Finishes",
    description:
      "Strong, modern feel with industrial yet refined appeal, suitable for countertops, feature walls, or floors.",
    imageUrl: "/src/assets/tf5.jpg",
  },
  {
    title: "Fabric-Inspired Textures",
    description:
      "Wall treatments resembling textile looks like linen, velvet, or silk, adding softness and warmth.",
    imageUrl: "/src/assets/tf6.jpg",
  },
  {
    title: "Metallic Textures",
    description:
      "Rich accents like hammered gold and leaf, catching light in different ways for added elegance.",
    imageUrl: "/src/assets/tf7.jpg",
  },
];

const TextureCard = ({ title, description, imageUrl }) => (
  <div className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col h-full">
    <div className="relative h-52 overflow-hidden">
      <img loading="lazy" src={imageUrl} className="w-full h-full object-cover" alt={title} />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
    </div>
  </div>
);

export default function TextureFinish() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const maxIndex = textures.length - cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="main-container top-spacing bottom-spacing">
      <article className="flex flex-col gap-8">
        <motion.div
          className="flex items-center justify-center flex-col gap-3"
          initial={{ opacity: 1, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] text-center">
            Textured Finishes: The Luxury Touch
          </h1>
          <p className="lg:text-xl lg:w-[62rem] w-full text-sm lg:pl-16 lg:text-balance  font-thin text-slate-400 text-center">
            Textured finishes in luxury interiors are a matter of more than
            appearance; they engage the senses, providing a tactile experience
            that brings richness to the environment. Textured finishes are the
            epitome of sophistication, bringing depth and character to luxury
            interiors. They take a flat surface and transform it into a dynamic
            focal point, providing a tactile and visual experience that elevates
            any space.
          </p>
        </motion.div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
              }}
            >
              {textures.map((texture, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                >
                  <TextureCard {...texture} />
                </div>
              ))}
            </div>
          </div>
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <GrPrevious className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 ${
              currentIndex === maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <GrNext className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </article>
    </div>
  );
}
