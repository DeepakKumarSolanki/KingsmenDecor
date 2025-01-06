import React, { useState } from "react";
import PageHomeBanner from "../common/PageHomeBanner";

const AllProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const cards = [
    {
      image: "/src/assets/dining3.jpg",
      title: "Furnishings & Decor",
      subtitle: "DINING",
    },
    {
      image: "/src/assets/balcony2.jpg",
      title: "Furnishings & Decor",
      subtitle: "BALCONY",
    },
    {
      image: "/src/assets/bathroom2.jpg",
      title: "Surfaces & Flooring",
      subtitle: "BATHROOM",
    },
    {
      image: "/src/assets/balcony4.jpg",
      title: "Furnishings & Decor",
      subtitle: "BALCONY",
    },
    {
      image: "/src/assets/dining2.jpg",
      title: "Furnishings & Decor",
      subtitle: "DINING",
    },

    {
      image: "/src/assets/balcony3.jpg",
      title: "Furnishings & Decor",
      subtitle: "BALCONY",
    },

    {
      image: "/src/assets/bathroom6.jpg",
      title: "Surfaces & Flooring",
      subtitle: "BATHROOM",
    },
    {
      image: "/src/assets/office2.jpg",
      title: "Tech & Outdoors",
      subtitle: "OFFICE",
    },
    {
      image: "/src/assets/bathroom3.jpg",
      title: "Surfaces & Flooring",
      subtitle: "BATHROOM",
    },

    {
      image: "/src/assets/outdoor1.jpg",
      title: "Tech & Outdoors",
      subtitle: "OUTDOOR",
    },
    {
      image: "/src/assets/wardobe4.jpg",
      title: "Storage Solutions",
      subtitle: "WADROBE",
    },
    {
      image: "/src/assets/outdoor2.jpg",
      title: "Tech & Outdoors",
      subtitle: "OUTDOOR",
    },

    {
      image: "/src/assets/wadrobe3.jpg",
      title: "Storage Solutions",
      subtitle: "WADROBE",
    },
    { image: "/src/assets/sofa2.jpg", title: "Storage Solutions", subtitle: "SOFA" },
    { image: "/src/assets/sofa4.jpg", title: "Storage Solutions", subtitle: "SOFA" },
    {
      image: "/src/assets/bedroom11.jpg",
      title: "Storage Solutions",
      subtitle: "BEDROOM",
    },
    {
      image: "/src/assets/outdoor3.jpg",
      title: "Tech & Outdoors",
      subtitle: "OUTDOOR",
    },
    // {
    //   image: "/bedroom11.jpg",
    //   title: "Storage Solutions",
    //   subtitle: "BEDROOM",
    // },
    {
      image: "/src/assets/sofa9.jpg",
      title: "Storage Solutions",
      subtitle: "BEDROOM",
    },
  ];

  // Filter cards based on the selected category
  const filteredCards =
    selectedCategory === "ALL"
      ? cards
      : cards.filter((card) => card.title === selectedCategory);

  return (
    <section>
      <div className="hidden lg:block">
        <PageHomeBanner
          title="Portfolio Grid Masonry"
          subtitle="Home"
          buttonText=""
          backgroundImage="/src/assets/LuxuryLiving.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
      <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/blog6.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      <div className="main-container top-spacing bottom-spacing">
        <aside className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="text-[#104438] font-thin text-lg text-center uppercase">
              [ our portfolio ]
            </h3>
            <h1 className="text-[45px] w-full   lg:pl-20 text-center">
              Crafting Timeless Elegance in Every Detail
            </h1>
          </div>
          <div className="flex flex-wrap gap-6 justify-center pb-10">
            <button
              className={`button-style ${
                selectedCategory === "ALL" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("ALL")}
            >
              ALL
            </button>
            <button
              className={`button-style ${
                selectedCategory === "Furnishings & Decor" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Furnishings & Decor")}
            >
              Furnishings & Decor
            </button>
            <button
              className={`button-style ${
                selectedCategory === "Surfaces & Flooring" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Surfaces & Flooring")}
            >
              Surfaces & Flooring
            </button>
            <button
              className={`button-style ${
                selectedCategory === "Storage Solutions" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Storage Solutions")}
            >
              Storage Solutions
            </button>
            <button
              className={`button-style ${
                selectedCategory === "Tech & Outdoors" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Tech & Outdoors")}
            >
              Tech & Outdoors
            </button>
          </div>
        </aside>

        <aside>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCards.map((card, index) => (
              <div key={index} className="w-full">
                <figure className="snip1584">
                  <img
                    loading="lazy"
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto"
                  />
                  <figcaption>
                    <h3>{card.title}</h3>
                    <h5>{card.subtitle}</h5>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default AllProjects;
