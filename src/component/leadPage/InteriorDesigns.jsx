import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Custom Next Arrow component
const CustomNextArrow = ({ onClick }) => (
  <div
    className="custom-arrow custom-next"
    onClick={onClick}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
  >
    <i
      className="fa fa-chevron-right"
      style={{ fontSize: "24px", color: "white" }}
    ></i>
  </div>
);
// Custom Previous Arrow component
const CustomPrevArrow = ({ onClick }) => (
  <div
    className="custom-arrow custom-prev"
    onClick={onClick}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
  >
    <i
      className="fa fa-chevron-left"
      style={{ fontSize: "24px", color: "white" }}
    ></i>
  </div>
);

const InteriorDesigns = () => {
  const cards = [
    {
      image: "/src/assets/sofa2.jpg",
      title: "Living Room",
      subtitle: "INTERIOR",
    },
    {
      image: "/src/assets/lxBed5.jpg",
      title: "Master Bedroom",
      subtitle: "INTERIOR",
    },
    {
      image: "/src/assets/lxoutdoor2.jpg",
      title: "Balcony",
      subtitle: "OUTDOOR",
    },
    {
      image: "/src/assets/wadrobe3.jpg",
      title: "Wardborde",
      subtitle: "INTERIOR",
    },
    {
      image: "/src/assets/office2.jpg",
      title:"Home Interior",
      subtitle: "INTERIOR",
    },

    {
      image: "/src/assets/dining7.jpg",
      title: "Dining Room",
      subtitle: "INTERIOR",
    },
    {
      image: "/src/assets/outdoor1.jpg",
      title: "Balcony",
      subtitle: "OUTDOOR",
    },
 
    {
      image: "/src/assets/bathroom3.jpg",
      title: "Bathroom",
      subtitle: "INTERIOR",
    },
  
  ];

  const navigate = useNavigate();
  const handleViewProjects = () => {
    navigate("/allProjects"); // Navigate to the "/allProjects" route
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1000, 
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  

  return (
    <section className="main-container top-spacing bottom-spacing">
      <div className="flex flex-col gap-6">
        <div className="flex md:justify-between flex-col md:flex-row gap-4">
          <div className="flex flex-col lg:gap-6 gap-3">
            <h1 className="lg:text-4xl text-xl font-semibold text-[#104438]">
              Inspiration for home interior designs
            </h1>
            <p className="lg:text-xl lg:w-[52rem] w-full text-sm   lg:text-balance font-thin text-slate-400">
              Give your home a new look with these interior design ideas curated
              for you
            </p>
          </div>
          <div className="ot-button">
            <button onClick={handleViewProjects} className="octf-btn octf-btn-dark">
              View All
            </button>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {cards.map((card, index) => (
            <div key={index}>
              <figure className="snip1584">
                <img loading="lazy" src={card.image} alt={card.title} className="w-full" />
                <figcaption>
                  <h3>{card.title}</h3>
                  <h5>{card.subtitle}</h5>
                </figcaption>
               
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default InteriorDesigns;
