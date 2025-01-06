import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How can I choose the right color scheme for my home interior?",
      answer: "Start by considering the mood you want to create in each room. Neutral tones provide a timeless look, while bold colors can add energy. Use color palettes that complement your furniture and decor to ensure harmony throughout your home.",
    },
    {
      question: "What are some tips for arranging furniture in a small space?",
      answer:
        "Choose multi-functional furniture like sofa beds or ottomans with storage. Arrange pieces to maximize floor space and avoid blocking pathways. Use mirrors and light colors to make the room feel more spacious.",
    },
    {
      question: "How can I incorporate natural elements into my home decor?",
      answer:
        "Use materials like wood, stone, and bamboo to add texture and warmth. Incorporate plants for greenery and choose fabrics like cotton or linen for a natural touch. Maximize natural light by using sheer curtains or blinds.",
    },
    {
      question: "What is the best way to mix modern and traditional design styles?",
      answer: "Combine sleek, modern furniture with classic decorative elements like vintage rugs or ornate mirrors. Balance clean lines with textured accents and use a cohesive color palette to unify the two styles.",
    },
    {
      question: "How can I make a statement with my home lighting?",
      answer: "Choose standout fixtures like chandeliers, pendant lights, or floor lamps. Layer lighting with ambient, task, and accent options to highlight specific areas. Use dimmers to create versatile lighting atmospheres.",
    },
    {
      question: "What are the essentials for a cozy bedroom design?",
      answer:
        "Invest in comfortable bedding, layer with throws and cushions, and choose soothing colors. Add soft lighting like bedside lamps and incorporate personal touches such as photos or artwork to make the space uniquely yours.",
    },
  ];

  return (
    <section className="bottom-spacing">
      <div className="flex flex-col gap-4 py-8 mb-10">
        <div className="main-container mx-auto space-y-4">
          <h1 className="text-3xl font-semibold text-[#104438]">
            Home Interior Design FAQs
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
