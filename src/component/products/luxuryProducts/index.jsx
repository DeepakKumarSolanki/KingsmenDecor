import React, { useState } from "react";
import PageHomeBanner from "../../common/PageHomeBanner";
import ListingLuxury from "./ListingLuxury";
import GridLuxury from "./GridLuxury";
import LineLuxury from "./LineLuxury";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { BsList } from "react-icons/bs";

const LuxuryProducts = () => {
  const [activeButton, setActiveButton] = useState("GRID"); // Default to GRID view

  return (
    <section>
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/KingsmenSpecial.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Luxury.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <div className="main-container top-spacing bottom-spacing text-center">
        <h1 className="text-3xl font-bold mb-5 text-[#104438] uppercase">
          Kingsmen Special Luxury: Unmatched Opulence
        </h1>
        <p className="text-gray-700 mb-10">
          Indulge in ultimate sophistication with exquisite craftsmanship,
          exclusive materials, and tailor-made designs that redefine the luxury
          life. Every detail was curated so that the product exudes elegance and
          timelessness, to create a place that beams exclusivity and grandeur.
        </p>
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
          {activeButton === "GRID" && <GridLuxury />}
          {activeButton === "LISTING" && <ListingLuxury />}
          {activeButton === "LINE" && <LineLuxury />}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProducts;
