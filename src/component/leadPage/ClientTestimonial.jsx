import React, { Fragment, useRef, useState } from "react";
import Slider from "react-slick";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ClientTestimonial = () => {
  const clientArray = [
    {
      img: "/src/assets/member4.jpg",
      name: "Ramesh Nair",
      designation: "Businessman",
      title: "Home Interiors",
      des: "Kingsmen Decors has completely transformed my home with their impeccable finishes. The attention to detail and the quality of materials used are unparalleled. Their team took the time to understand my preferences and delivered results that exceeded my expectations. My living space now exudes a luxurious charm that never fails to impress my guests!",
    },
    {
      img: "/src/assets/member5.jpg",
      name: "Priya Sharma",
      designation: "Homemaker",
      title: "Home Renovation",
      des: "Choosing Kingsmen Decors was the best decision I made for my interior renovation. From the consultation to the final touches, their professionalism and expertise were evident. The veneer and metallic finishes they suggested added a modern yet elegant vibe to my home. I couldn't be happier with the outcome—it truly feels like a work of art!",
    },
    {
      img: "/src/assets/member6.jpg",
      name: "Arvind Gupta",
      designation: "Doctor",
      title: "Home Interiors",
      des: "The team at Kingsmen Decors brought my vision to life with such finesse. Their membrane and glass finishes elevated the aesthetic of my kitchen and living area, making it look straight out of a luxury magazine. The craftsmanship and quality of their work are remarkable. I highly recommend them to anyone looking for premium home interiors!",
    },
  ];
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  const navigationRef = useRef(null);

  const handlePrev = () => {
    if (navigationRef.current) {
      navigationRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (navigationRef.current) {
      navigationRef.current.slickNext();
    }
  };

  return (
    <section className="">
      <div className="main-container lg:w-3/4 flex flex-col">
        <motion.div
          viewport={{ once: true }}
          initial={{ scale: 1, opacity: 0, y: -100 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          className="flex flex-col gap-3 pt-16"
        >
          <h1 className="text-sm capitalize font-semibold leading-7 tracking-widest text-center text-[#104438]">
            WHAT CLIENTS SAY
          </h1>
          <p className="text-center lg:text-5xl md:text-5xl text-3xl text-[#104438] font-bold">
            Testimonial
          </p>
        </motion.div>

        <div className="w-full overflow-hidden feature-slick-slider pt-6">
          <Slider ref={navigationRef} {...settings}>
            {clientArray.map((item, i) => (
              <div key={i} className="flex justify-center items-center gap-10">
                <aside className="grid grid-cols-6 gap-6 md:gap-10 w-full relative">
                  <div className="lg:col-span-2 col-span-6 design rounded-md flex flex-col gap-4 p-6">
                    <img
                      src={item.img}
                      className="rounded-md w-full h-[18rem] object-cover"
                      alt="client"
                      loading="lazy"
                    />
                    <div className="flex items-start flex-col gap-1">
                      <p className="text-md font-semibold">{item.name}</p>
                      <p className="text-xs text-[#104438]">{item.designation}</p>
                    </div>
                  </div>

                  <div className="design w-10 hidden md:block h-[0.20rem] lg:absolute top-44 2xl:left-[340px] lg:left-[260px]"></div>

                  <div className="lg:col-span-4 col-span-6 flex flex-col justify-between">
                    <div className="lg:flex justify-between hidden">
                      <img className="w-32" src="/comma.png" alt="comma" />
                      <div className="flex items-center justify-center  gap-4 pr-10">
                        <p
                          onClick={handlePrev}
                          className="relative group overflow-hidden font-medium design cursor-pointer h-8 w-8 flex items-center justify-center rounded-md"
                        >
                          <span className="text-[#104438] text-sm font-bold">
                            <IoIosArrowRoundBack className="text-3xl pl-2" />
                          </span>
                        </p>
                        <p
                          onClick={handleNext}
                          className="relative group overflow-hidden font-medium design cursor-pointer h-8 w-8 flex items-center justify-center rounded-md"
                        >
                          <span className="text-[#104438] text-sm font-bold">
                            <IoIosArrowRoundForward className="text-3xl pl-2" />
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="design rounded-md flex flex-col gap-4 lg:p-6 p-4">
                      <div className="flex md:justify-between flex-col">
                        <div className="flex flex-col gap-3">
                          <h1 className="text-lg font-semibold">{item.title}</h1>
                        </div>
                        <div className="rounded-md flex items-center">
                          <div className="flex gap-1 items-center p-2">
                            {[...Array(5)].map((_, index) => (
                              <Fragment key={index}>
                                <Star className="!text-base text-orange-500" />
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="border-t-2 py-4">{item.des}</div>
                    </div>
                  </div>
                </aside>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex items-center justify-center gap-4 mt-5 lg:hidden">
          <p onClick={handlePrev}>
            <span className="text-[#104438] text-sm font-bold">
              <MdKeyboardArrowLeft className="text-3xl" />
            </span>
          </p>
          {[...Array(Math.ceil(clientArray?.length / 1))].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                Math.floor(currentSlide / 1) === i
                  ? "bg-secondary"
                  : "bg-slate-400"
              }`}
            ></div>
          ))}
          <p onClick={handleNext}>
            <span className="text-[#104438] text-sm font-bold">
              <MdKeyboardArrowRight className="text-3xl" />
            </span>
          </p>
        </div>
      </div>
      <aside className="main-container top-spacing">
        <hr />
      </aside>
    </section>
  );
};

export default ClientTestimonial;
