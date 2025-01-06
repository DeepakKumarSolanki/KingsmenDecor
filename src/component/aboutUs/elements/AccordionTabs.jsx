import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const AccordionTabs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("awards");

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const tabContent = {
    awards: [
      "Best Office Interior Design in New York, 2018",
      "CUBE project, Best Home Design List in Germany, 2015",
      "International Industrial Design Award, 2015",
    ],
    concept: [
      "Between tradition and innovation, Dutch Design Week, 2017",
      "Sustainable solutions in modern design",
    ],
    history: [
      "Founded in 2010 with a vision to transform spaces",
      "Successfully completed over 200+ projects globally",
    ],
  };

  return (
    <div className="main-container flex flex-col gap-4 bottom-spacing">
      <div>
        <h1 className="lg:text-4xl text-2xl font-semibold text-[#104438]">
          Accordions & Tabs
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {/* Accordion Section */}
        <div className="space-y-4">
          <div className="accordion-item">
            <button
              onClick={() => handleAccordionToggle(0)}
              className="w-full text-left p-4 flex justify-between"
            >
              <h2 className="text-xl">
                What is 3D designing and how does it work?
              </h2>
              <IoMdAdd />
            </button>
            {activeIndex === 0 && (
              <div className="p-4">
                3D design refers to the process of developing the
                three-dimensional digital presentation of objects, spaces, or
                concepts using special software. Unlike flat two-dimensional
                designs, 3D designs allow you to see the object or space from
                every angle and to be inside it, giving it a true and immersive
                look. Such design is highly applicable to interior design,
                architecture, gaming, animation, product designing, and
                engineering industries.
              </div>
            )}
            <div className="h-[0.01rem] w-full bg-[#104438]"></div>
          </div>
          <div className="accordion-item">
            <button
              onClick={() => handleAccordionToggle(1)}
              className="w-full text-left p-4 flex justify-between"
            >
              <h2 className="text-xl">How interior design is cost?</h2>
              <IoMdAdd />
            </button>
            {activeIndex === 1 && (
              <div className="p-4">
                Apartments and House- our studio develops its unique basic
                philosophy- lightning-fast individual development solutions
                employing unique styles for making each customer look amazingly
                beautiful in a stunning project.
              </div>
            )}
            <div className="h-[0.01rem] w-full bg-[#104438]"></div>
          </div>
          <div className="accordion-item">
            <button
              onClick={() => handleAccordionToggle(2)}
              className="w-full text-left p-4 flex justify-between"
            >
              <h2 className="text-xl">
                How much time I will spend on planning?
              </h2>
              <IoMdAdd />
            </button>
            {activeIndex === 2 && (
              <div className="p-2">
                The time required for planning depends on the complexity and
                scope of your project. For smaller projects, such as a single
                room or minor renovations, planning usually takes around 1–2
                weeks. This ranges from gathering ideas to creating a basic
                layout and selecting materials, colours, and furniture.
                Medium-sized projects, such as full home or office redesigns,
                typically require 3–6 weeks.
              </div>
            )}
            <div className="h-[0.01rem] w-full bg-[#104438]"></div>
          </div>
          <div className="accordion-item">
            <button
              onClick={() => handleAccordionToggle(3)}
              className="w-full text-left p-4 flex justify-between"
            >
              <h2 className="text-xl">Can I create custom design?</h2>
              <IoMdAdd />
            </button>
            {activeIndex === 3 && (
              <div className="p-2">
                Absolutely Yes! Custom designs for decors and interiors are
                possible. Be it a personalized wall art, unique luxury furniture
                pieces, customized lighting, or tailored upholstery, you can
                reflect your personal style and preferences in your living or
                workspace with the help of custom designs. It may involve
                professional designers or your creative expression; in any case,
                you will ensure every element matches your aesthetic vision and
                functional needs, thereby making it uniquely yours. Let me know
                if you'd like ideas or help on your custom interior design
                project
              </div>
            )}
            <div className="h-[0.01rem] w-full bg-[#104438]"></div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex space-x-4 w-full">
            <button
              onClick={() => setActiveTab("awards")}
              className={`pb-2 text-gray-500 border-b w-full text-xl ${
                activeTab === "awards"
                  ? "border-[#104438] text-[#104438]"
                  : "border-gray-300 hover:border-[#104438] hover:text-[#104438] "
              }`}
            >
              AWARDS
            </button>
            <button
              onClick={() => setActiveTab("concept")}
              className={`pb-2 text-gray-500 border-b w-full text-xl ${
                activeTab === "concept"
                  ? "border-[#104438] text-[#104438]"
                  : "border-gray-300 hover:border-[#104438] hover:text-[#104438]"
              }`}
            >
              CONCEPT
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-2 text-gray-500 border-b w-full text-xl ${
                activeTab === "history"
                  ? "border-[#104438] text-[#104438]"
                  : "border-gray-300 hover:border-[#104438] hover:text-[#104438]"
              }`}
            >
              HISTORY
            </button>
          </div>
          <p className="w-full pr-10 text-lg font-thin">
            We call our style ‘live minimalism’. Live minimalism is not about a
            'wrap' or visual look. It refers to inner feelings, to your true
            self. The place you are comfortable to live in.
          </p>
          <div className="mt-4">
            <ul className="list-disc pl-6">
              {tabContent[activeTab].map((item, index) => (
                <li className="py-2 text-lg font-thin" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionTabs;
