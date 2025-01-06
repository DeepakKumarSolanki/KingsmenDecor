import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What are the essential appliances for a modern kitchen?",
      answer: "Key appliances include a refrigerator, oven, microwave, dishwasher, and a range hood. For added convenience, consider investing in smart appliances like programmable coffee makers or voice-controlled devices.",
    },
    {
      question: "How can I design a kitchen layout for maximum efficiency?",
      answer: "Follow the kitchen work triangle rule, placing the sink, refrigerator, and stove in a triangular layout for easy access. Ensure there’s ample counter space near each zone and maintain clear pathways for movement.",
    },
    {
      question: "What materials are best for durable kitchen countertops?",
      answer: "Granite, quartz, and solid surface materials are excellent choices for durability and aesthetics. They are resistant to heat, scratches, and stains, making them ideal for busy kitchens.",
    },
    {
      question: "How can I add more storage to my kitchen?",
      answer: "Install custom cabinetry with pull-out shelves, add wall-mounted racks for pots and pans, and use vertical storage solutions like tall cabinets or pantry organizers. Utilize under-sink and above-refrigerator spaces effectively.",
    },
    {
      question: "What are the best lighting options for a kitchen?",
      answer: "Combine ambient lighting with task lighting under cabinets and accent lighting like pendant lights over the island. LED lighting is energy-efficient and provides excellent brightness for work areas.",
    },
    {
      question: "How can I incorporate a kitchen island effectively?",
      answer: "Choose a kitchen island that complements the size and layout of your space. Use it for additional storage, seating, and prep space. Add outlets for appliances and consider a multi-functional design with a sink or stovetop.",
    },
  ];

  return (
    <section className=" top-spacing bottom-spacing">
      <div className="flex flex-col gap-4 bg-[#F7F6F7] py-8">
        <div className="main-container mx-auto space-y-4">
          <h1 className="text-3xl font-semibold text-[#104438]">
            Kitchen Interior Design FAQs
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
