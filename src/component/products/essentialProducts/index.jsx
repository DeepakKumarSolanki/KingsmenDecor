import React, { useState } from "react";
import PageHomeBanner from "../../common/PageHomeBanner";
import ListingEssential from "./ListingEssential";
import GridEssential from "./GridEssential";
import LineEssential from "./LineEssential";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { BsList } from "react-icons/bs";

const EssentialProducts = () => {
  const [activeButton, setActiveButton] = useState("GRID"); // Default to GRID view

  return (
    <section>
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/UltraPremium.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Essential.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      <div className="main-container top-spacing bottom-spacing text-center">
        <div className="">
          <h1 className="text-3xl font-bold mb-5 text-[#104438]">
            PREMIUM PRODUCTS : Elevated Interiors
          </h1>
          <p className="text-gray-700 mb-10">
            Experience refined elegance with high-end materials, bespoke
            designs, and luxurious finishes for sophisticated and unique
            interiors.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            className={`p-3 rounded ${
              activeButton === "GRID" ? "text-[#104438]" : "text-black"
            }`}
            onClick={() => setActiveButton("GRID")}
          >
            <BsFillGridFill size={24} />
          </button>
          <button
            className={`p-3 rounded ${
              activeButton === "LISTING" ? "text-[#104438]" : "text-black"
            }`}
            onClick={() => setActiveButton("LISTING")}
          >
            <FaList size={24} />
          </button>
          <button
            className={`p-3 rounded ${
              activeButton === "LINE" ? "text-[#104438]" : "text-black"
            }`}
            onClick={() => setActiveButton("LINE")}
          >
            <BsList size={24} />
          </button>
        </div>

        <div className="mt-8">
          {activeButton === "GRID" && <GridEssential />}
          {activeButton === "LISTING" && <ListingEssential />}
          {activeButton === "LINE" && <LineEssential />}
        </div>
      </div>
    </section>
  );
};

export default EssentialProducts;
