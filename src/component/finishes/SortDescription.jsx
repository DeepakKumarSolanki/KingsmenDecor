import React from "react";
import { useNavigate } from "react-router-dom";

const SortDescription = () => {
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate("/allProjects"); // Navigate to the "/allProjects" route
  };
  return (
    <section className="main-container top-spacing bottom-spacing">
      <div className="grid-lines grid-lines-vertical">
        <span className="g-line-vertical line-left color-line-default" />
        <span className="g-line-vertical line-center color-line-default" />
        <span className="g-line-vertical line-right color-line-default" />
      </div>
      <div className="flex flex-col gap-4  w-full text-justify">
        <div className="">
          <span className="text-gray-400 capitalize">[ initiation ]</span>
          <h2 className="lg:text-4xl text-[1.75rem] font-semibold text-[#104438]">
            Introduction to Home and Commercials Finishes
          </h2>
        </div>
        <p className="text-lg font-thin text-slate-800">
          Such luxurious interiors and decor represent refinement, as expressed
          in richness and luxury by the use of natural stones and rich hardwoods
          and sumptuous fabrics. It allows for intelligent technologies,
          including lighting, climate control, and automation to be easily
          incorporated into space in an elegant way. Each design is a
          masterpiece of creativity and craftsmanship, telling the personal
          story and aspiration through harmony between art and functionality.
          Flexible and inspiring, luxury interiors break boundaries of the
          mundane to fit all tastes and lifestyles.
        </p>
        <p className="text-lg font-thin text-slate-800">
          They are much more than mere spaces. Instead, they transform the
          ordinary into extraordinary, offering tranquillity, inspiration, and
          indulgence. These interiors do not merely house life; they make it
          richer as they build up time-worn sanctuaries of beauty and elegance.
        </p>
        <div className="ot-button">
          <button
            onClick={handleViewProjects}
            className="octf-btn octf-btn-dark"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default SortDescription;
