import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What are the best materials for a durable wardrobe?",
      answer: "Choose materials like plywood with laminate, MDF with veneers, or solid wood for durability and style. These materials are sturdy and can be customized to match your interior theme.",
    },
    {
      question: "How can I maximize storage space in a wardrobe?",
      answer: "Incorporate adjustable shelves, hanging rods at different heights, and pull-out drawers. Use storage accessories like dividers, baskets, and hooks to organize items efficiently.",
    },
    {
      question: "What are the latest trends in wardrobe design?",
      answer: "Sliding doors with mirrored panels, integrated lighting, and modular compartments are popular. Customizable walk-in wardrobes and the use of sustainable materials are also trending.",
    },
    {
      question: "How can I keep my wardrobe organized?",
      answer: "Sort items by category, season, or frequency of use. Use labeled boxes or bins for smaller items and regularly declutter to maintain an organized space.",
    },
    {
      question: "What type of wardrobe works best for small bedrooms?",
      answer: "Opt for sliding door wardrobes or corner wardrobes to save space. Mirrored doors can make the room appear larger, and built-in wardrobes can maximize available space efficiently.",
    },
    {
      question: "How can I incorporate lighting into my wardrobe design?",
      answer: "Add LED strip lights or motion-sensor lights inside the wardrobe for better visibility. Use warm lighting to create a luxurious feel and ensure even illumination throughout.",
    },
  ];

  return (
    <section className="top-spacing bottom-spacing">
      <div className="flex flex-col gap-4 bg-[#F7F6F7] py-8">
        <div className="main-container mx-auto space-y-4">
          <h1 className="text-3xl font-semibold text-[#104438]">
            Wardrobe Interior Design FAQs
          </h1>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full py-4 px-6 text-left text-lg font-medium text-gray-700 focus:outline-none rounded-t-lg"
              >
                {item.question}
                <span
                  className={`transform transition-transform ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  <IoAdd className="text-xl" />
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-6 text-gray-600 rounded-b-lg">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
