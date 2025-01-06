import React from "react";

const AdvantageDesign = () => {
  const advantage_array = [
    {
      id: "01.",
      title: "Guiding You Towards Excellence: Your Initial Consultation Awaits",
      des: "We begin with a detailed consultation on your vision, preferences, and lifestyle. Our team will listen to your needs and goals in regards to your ideas, your preferred style, and what problems you encounter in your life. This makes sure we clearly know what is being required to achieve what is desired.",
    },
    {
      id: "02.",
      title: "Innovative Design, Meticulous Planning",
      des: "On the basis of consultation, we evolve a tailored design concept. Our designers create detailed layouts, color schemes, and material selections which can be in line with your style and needs. We present these concepts to you for feedback, making any necessary revisions to perfect the design.",
    },
    {
      id: "03.",
      title: "Precision in Motion: Delivering with Excellence",
      des: "Once the design is approved, our skilled craftsmen and project managers take over the execution phase. We oversee all aspects of the project, from sourcing materials to managing installations. Our team ensures that everything is executed with the highest quality and attention to detail, bringing your vision to life.",
    },
    {
      id: "04.",
      title: "Timeless Craftsmanship: Flawless Delivery and Luxurious Aftercare",
      des: "The last process is a complete delivery and installation of your new interiors. We do a walk-through with you to ensure everything meets our high standards and your expectations. Our aftercare services include maintenance tips and adjustments, ensuring that your space remains beautiful and functional for the next years.",
    },
  ];

  return (
    <section
      className="bg-cover bg-center bg-no-repeat bottom-spacing"
      style={{ backgroundImage: "url('/public/bg1-process.png')" }}
    >
      <div className="main-container top-spacing bottom-spacing">
        <div className="flex flex-col gap-2 items-center justify-center bottom-spacing">
          <h3 className="text-[#9f9e9e]">[ INTERIOR DESIGN ]</h3>
          <h1 className="lg:text-5xl text-[1.75rem] text-[#104438]">
          Our Working Process
          </h1>
          <p className="text-xl text-black">.................</p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 place-items-center">
          {/* First div showing array elements 1 and 2 */}
          <div className="flex flex-col gap-4 lg:pl-36">
            <div className="flex flex-col lg:items-end lg:text-right gap-3  items-center justify-center">
              <div className="flex lg:flex-col flex-row gap-1">
                <h2 className="text-[#9f9e9e] text-lg ">
                  {advantage_array[0].id}
                </h2>
                <h3 className="font-bold text-[#104438]">
                  {advantage_array[0].title}
                </h3>
              </div>
              <p className="text-lg font-thin text-[#9f9e9e]">
                {advantage_array[0].des}
              </p>
            </div>
            <div className="flex flex-col lg:items-end lg:text-right gap-3  items-center justify-center">
              <div className="flex lg:flex-col flex-row gap-1">
                <h2 className="text-[#9f9e9e] text-lg ">
                  {advantage_array[1].id}
                </h2>
                <h3 className="font-bold text-[#104438]">
                  {advantage_array[1].title}
                </h3>
              </div>
              <p className="text-lg font-thin text-[#9f9e9e]">
                {advantage_array[1].des}
              </p>
            </div>
          </div>

          {/* Middle div showing the image */}
          <div className="flex justify-center items-center">
            <img
            loading="lazy"
              src="/src/assets/image1-process.png"
              alt="Process Image"
              className="w-auto h-full"
            />
          </div>

          {/* Third div showing array elements 3 and 4 */}
          <div className="flex flex-col gap-4 lg:pr-36">
            <div className="flex flex-col lg:items-start gap-4">
              <div className="flex lg:flex-col flex-row gap-2">
                <h2 className="text-[#9f9e9e] text-lg">
                  {advantage_array[2].id}
                </h2>
                <h3 className="font-bold text-[#104438]">
                  {advantage_array[2].title}
                </h3>
              </div>
              <p className="text-lg font-thin text-[#9f9e9e]">
                {advantage_array[2].des}
              </p>
            </div>
            <div className="flex flex-col lg:items-start items-center justify-center gap-4">
              <div className="flex lg:flex-col flex-row gap-2">
                <h2 className="text-[#9f9e9e] text-lg">
                  {advantage_array[3].id}
                </h2>
                <h3 className="font-bold text-[#104438]">
                  {advantage_array[3].title}
                </h3>
              </div>
              <p className="text-lg font-thin text-[#383636]">
                {advantage_array[3].des}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageDesign;
