import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question:
        "What should I consider when choosing furniture for my living room?",
      answer:
        "Consider the size of your space, your style preferences, and the functionality of each piece. Look for furniture that complements the overall design theme and provides ample comfort for daily use.",
    },
    {
      question: "How can I maximize storage in my kitchen?",
      answer:
        "Opt for smart storage solutions like pull-out shelves, deep drawers, and vertical cabinets. Incorporate multi-functional islands and utilize overhead space with open shelves to keep your kitchen organized and clutter-free.",
    },
    {
      question: "What are the latest trends in bathroom design?",
      answer:
        "Current trends include minimalist designs with clean lines, the use of natural materials like wood and stone, and smart technology features such as heated floors and automated shower controls. Integrating greenery and using neutral colour palettes are also popular choices.",
    },
    {
      question: "How can I make my living room more inviting?",
      answer:
        "Enhance your living room with cozy elements such as plush sofas, soft textiles, and warm lighting. Incorporate personal touches like artwork, cushions, and rugs to create a welcoming atmosphere that reflects your personality.",
    },
    {
      question: "What types of lighting are best for the kitchen?",
      answer:
        "Combine ambient lighting (overhead fixtures), task lighting (under-cabinet lights), and accent lighting (pendant lights over the island or breakfast bar) to provide a well-lit and functional kitchen. Consider energy-efficient LED options for a modern touch.",
    },
    {
      question: "How can I incorporate sustainability into my bathroom design?",
      answer:
        "Choose eco-friendly materials like bamboo, reclaimed wood, and low-VOC paints. Opt for water-saving fixtures such as low-flow toilets and showerheads. Incorporate natural light and ventilation to reduce the need for artificial lighting and improve air quality.",
    },
  ];

  const questionToAsk = [
    {
      question: "What is the estimated price of a 3BHK residence?",
      answer:
        "The price of a 3BHK residence can vary widely depending on factors like location, size, amenities, and the quality of construction. In metropolitan cities like Mumbai, Bangalore, or Delhi, the price can range anywhere from INR 50 Lakhs to INR 3 Crores or more. In suburban or rural areas, it could be lower. Luxury residences with premium amenities and location can cost significantly more.",
    },
    {
      question: "What is the most exemplary material choice for a kitchen?",
      answer:
        "For a kitchen, the most exemplary material choices are granite and quartz for countertops due to their durability, resistance to stains, and ease of maintenance. Stainless steel is often used for sinks and appliances due to its durability and modern look. For cabinetry, wood or engineered wood (plywood) is popular for its aesthetic appeal and strength, while laminate finishes offer a wide range of styles and colors. Ceramic or porcelain tiles are great for flooring as they are easy to clean and maintain.",
    },
    {
      question: "Which material offers superior qualities: plywood or MDF?",
      answer:
        "Both plywood and MDF (Medium Density Fibreboard) are commonly used in interior furniture and cabinetry, but they have different advantages:\n\nPlywood is stronger, more durable, and resistant to moisture, making it ideal for furniture exposed to weight or humid conditions. It has a layered structure that provides strength and resilience.\nMDF, on the other hand, is smoother and denser, making it better for projects requiring fine finishes like paint. However, it is less durable than plywood and more susceptible to moisture damage.\n\nConclusion: For strength and long-term durability, plywood is superior, but for detailed work requiring smoothness and fine finishes, MDF might be the better option.",
    },
    {
      question: "What is the best approach to selecting optimal colours for interior spaces?",
      answer:
        "The best approach to selecting colours for interior spaces involves considering:\n\nThe purpose of the room: Use calming colors like soft blues and greens for bedrooms or energizing tones like orange and yellow for workspaces.\nLighting: Natural light can make colours look different depending on the time of day. Test paint samples in the room's lighting before deciding.\nPersonal style and mood: Choose colours that resonate with your personal preferences and the mood you want to set. Lighter tones generally make rooms feel larger, while darker tones add warmth and intimacy.\nComplementary colours: Choose a primary colour and use complementary or contrasting colours for accents to create harmony.\nTrends vs timelessness: Consider timeless shades or neutral tones that will remain appealing over time, especially in large investments like furniture and wall colors.",
    },
    {
      question: "What is the most effective way to select the perfect finishes for interior spaces?",
      answer:
        "To select the perfect finishes for interior spaces, consider the following approach:\n\nMaterial and Functionality: Choose finishes based on how the space will be used. High-traffic areas like kitchens and hallways require durable finishes, such as matte or satin for walls, while polished finishes might work better in lower-traffic spaces like bedrooms.\nAesthetic Harmony: Ensure the finishes complement the overall design theme of your home (modern, rustic, industrial, etc.). Choose finishes that match or enhance the chosen colour palette and style.\nQuality and Durability: Opt for finishes that balance aesthetics with practicality. High-gloss finishes are beautiful but can show fingerprints, while matte finishes are more subtle and durable.\nMaintenance Requirements: Select finishes that align with your time and effort for upkeep. For example, high-gloss or semi-gloss finishes may require frequent cleaning, while satin or matte finishes are more forgiving.\nTextures: Adding textures to finishes, such as wood paneling, stone cladding, or patterned tiles, can elevate the design while making it unique and inviting.",
    },
  ];

  return (
    <section className="top-spacing bottom-spacing">
      <div className="flex flex-col gap-4 bg-[#F7F6F7] py-8">
      <div className="main-container mx-auto space-y-4">
      <h1 className="text-3xl font-semibold text-[#104438]">FAQs About Home Interior Design</h1>
      {faqItems.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded-lg shadow-sm">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full py-4 px-6 text-left text-lg font-medium text-gray-700 focus:outline-none rounded-t-lg"
          >
            {item.question}
            <span
              className={`transform transition-transform ${activeIndex === index ? "rotate-45" : ""}`}
            >
              <IoAdd className="text-xl" />
            </span>
          </button>
          {activeIndex === index && (
            <div className="p-6 text-gray-600 rounded-b-lg">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>

        {/* New Section for Questions to be Asked */}
        <div className="main-container mx-auto space-y-4 mt-8">
          <h2 className="text-3xl font-semibold text-[#104438]">
            Questions to Be Asked About Home Interior Design
          </h2>
          {questionToAsk.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg shadow-sm">
              <button
                onClick={() => toggleAccordion(index + faqItems.length)}
                className="flex justify-between w-full py-4 px-6 text-left text-lg font-medium text-gray-700 focus:outline-none rounded-t-lg"
              >
                {item.question}
                <span
                  className={`transform transition-transform ${
                    activeIndex === index + faqItems.length ? "rotate-45" : ""
                  }`}
                >
                  <IoAdd className="text-xl" />
                </span>
              </button>
              {activeIndex === index + faqItems.length && (
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
