import React from "react";
import { useNavigate } from "react-router-dom";

const TeamDes = () => {
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
          <span className="text-gray-400 capitalize">[ about company ]</span>
          <h2 className="text-4xl font-semibold text-[#104438]">
            From Sketch to Life
          </h2>
        </div>
        <p className="text-lg font-thin text-slate-800">
          Kingsmen Decors delivers timeless interiors that blend the best of
          style, functionality, and sophistication. With bespoke furniture,
          lighting, and decor accents, our creations reflect your personality
          with modern elegance and comfort. Our designs are a perfect harmony of
          practicality and aesthetic appeal, creating spaces as livable as they
          are beautiful. Here's a promise of luxury dedication and impeccable
          craftsmanship that shapes spaces into havens of refined beauty and
          exclusivity. Each detail-from statement pieces to opulent finishes-is
          curated to convey greatness and sophistication beyond any else. With
          our commitment to excellence, every project stands a chance to become
          the actual masterpiece for your living space, elevated to heights of
          luxury beyond your wildest dreams.
        </p>
        <p className="text-lg font-thin text-slate-800">
          We pride ourselves on our ability to blend tradition with the latest
          technology, so the bespoke interiors we deliver to our clients stand
          the test of time. Whether you need to refresh a single room or are
          looking to undertake a major renovation, Kingsmen Decors offers a full
          array of services to meet your specific needs. We are looking to
          create beautiful, functional spaces that enrich your everyday life by
          providing you with a sanctuary in which to retreat and indulge in the
          luxury of your own home.
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

export default TeamDes;
