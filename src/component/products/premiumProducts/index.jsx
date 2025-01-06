import React, { useState } from "react";
import PageHomeBanner from "../../common/PageHomeBanner";

import GridPremium from "./GridPremium";
import ListingPremium from "./ListingPremium";
import LinePremium from "./LinePremium";
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
          backgroundImage="/src/assets/premiumProducts.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Premium.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <div className="main-container top-spacing bottom-spacing text-center">
        <h1 className="text-3xl uppercase font-bold mb-5 text-[#104438]">
          Unlock Elite Standards of Excellence
        </h1>
        <p className="text-gray-700 mb-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          similique recusandae pariatur tempora voluptates illum error dicta eum
          quasi quas quod, accusamus ex, velit quisquam incidunt quia quam illo.
          Voluptate?
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
            <BsList className="text-3xl font-extralight text-[#104438]" />
          </button>
        </div>
        <div className="mt-8">
          {activeButton === "GRID" && <GridPremium />}
          {activeButton === "LISTING" && <ListingPremium />}
          {activeButton === "LINE" && <LinePremium />}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProducts;
