import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import { Link } from "react-router-dom";

const BlogTwo = () => {
  const sections = [
    {
      title: "Open-Concept Layouts for Effortless Elegance",
      content: `Luxury kitchens today are designed with open-concept layouts that flow seamlessly into dining and living areas. These layouts maximize space, enhance natural light, and create a social hub for gatherings. Oversized kitchen islands serve as a centerpiece, combining workspace, dining, and bar functionality. Custom seating adds a polished touch.`,
      products: [
        "Quartz-Topped Kitchen Islands: Durable and elegant surfaces.",
        "Designer Pendant Lights: Add sophistication while illuminating the space.",
      ],
    },
    {
      title: "Premium Materials That Exude Sophistication",
      content: `Materials define the essence of a luxury kitchen. Marble countertops, solid wood cabinetry, and backsplashes made from glass or metal tiles evoke sophistication. Sustainability is on the rise, with reclaimed wood and recycled glass gaining popularity. Neutral color schemes accented by bold hues focus attention on standout features.`,
      products: [
        "Italian Marble Countertops: A timeless addition to any kitchen.",
        "Custom Backsplash Tiles: Offer a unique and personalized touch.",
      ],
    },
    {
      title: "State-of-the-Art Appliances for Culinary Excellence",
      content: `Modern luxury kitchens are incomplete without cutting-edge appliances. Smart refrigerators, inbuilt coffee machines, and dual-fuel ranges redefine convenience and style. "Smart kitchens" with appliances that can be remotely controlled enhance efficiency and ease.`,
      products: [
        "Wine Refrigerators: Maintain ideal conditions for your collection.",
        "Smart Ovens: Perfect for multitasking in the kitchen.",
      ],
    },
    {
      title: "Lighting That Elevates the Ambiance",
      content: `Lighting transforms a kitchen from ordinary to extraordinary. Combining ambient, task, and accent lighting creates a versatile and inviting space. Popular options include pendant lights over islands, recessed ceiling lights, and under-cabinet LED strips. Chandeliers and statement lighting add drama and focus.`,
      products: [
        "Crystal Chandeliers: Add grandeur and sparkle.",
        "Under-Cabinet LED Strips: Provide subtle and efficient task lighting.",
      ],
    },
    {
      title: "Maximized Storage for Clutter-Free Elegance",
      content: `Clutter disrupts the elegance of a luxury kitchen. Innovative storage solutions like pull-out pantry shelves, custom cabinetry with built-in organizers, and hidden compartments ensure everything has its place. Walk-in pantries and deep drawers maintain smooth, clutter-free surfaces.`,
      products: [
        "Custom Drawer Organizers: Tailored to fit every utensil.",
        "Pull-Out Pantry Systems: Offer accessibility without compromising style.",
      ],
    },
    {
      title: "Personalized Touches for Uniqueness",
      content: `What sets a luxury kitchen apart is its ability to reflect the homeowner's personality. From bespoke cabinetry to artisanal decor, every detail feels curated. Add warmth with greenery, like a small herb garden, or incorporate handcrafted pottery for a unique touch.`,
      products: [
        "Handmade Ceramic Bowls: Perfect for display or serving.",
        "Countertop Herb Planters: Combine functionality with natural beauty.",
      ],
    },
    {
      title: "Timeless Elegance with Iconic Designs",
      content: `Luxury kitchens are defined by timeless elegance that transcends trends. From grand chandeliers to intricate moldings and bespoke cabinetry, these kitchens are designed to remain stunning for decades. Classic design elements ensure the space exudes charm and grandeur.`,
      products: [
        "Antique-Inspired Chandeliers: Elevate the room with classic beauty.",
        "Handcrafted Cabinetry: Add depth and refinement to the kitchen.",
      ],
    },
    {
      title: "Details That Redefine Luxury",
      content: `The true essence of a luxury kitchen lies in the details. Gold-accented faucets, custom-made hardware, plush bar stools, and velvet upholstery add layers of sophistication. Curated decor enhances the sense of exclusivity and refinement.`,
      products: [
        "Gold-Accented Faucets: A statement of indulgence.",
        "Velvet Bar Stools: Comfort and elegance combine.",
      ],
    },
  ];

  return (
    <section>
      
  <div className="hidden lg:block">
  <PageHomeBanner
        title=""
        subtitle=""
        buttonText=""
        backgroundImage="/src/assets/Kitchen.jpg"
        onButtonClick={() => alert("Button Clicked!")}
      />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/KitchenPhone.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>


      <article className="main-container top-spacing bottom-spacing">
        {/* <nav className="text-sm text-gray-500 mb-4">
          <span>Home</span> <span className="mx-2">/</span>
          <span>Blog</span> <span className="mx-2">/</span>
          <span>Luxury Kitchen Design</span>
        </nav> */}

        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="text-gray-500 hover:text-[#104438]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="text-gray-500 hover:text-[#104438]">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>Luxury Kitchen Design</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Luxury Kitchen Designs That Inspire Culinary Creativity
            </h1>
            <p className="text-gray-700 mb-6">
              The kitchen is the heart of the home, where functionality meets artistry. Luxury kitchen designs redefine the cooking experience, blending opulence with practicality. Explore how these designs inspire creativity and elevate sophistication.
            </p>
            <div className="bg-gray-100 p-6 rounded-md">
              <h3 className="text-lg font-semibold mb-4">In This Article</h3>
              <ul className="space-y-2 text-sm">
                {sections.map((section, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span>{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#104438]">
                    {section.title}
                  </h2>
                  <p className="text-gray-700">{section.content}</p>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Luxury Decor Products:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {section.products.map((product, idx) => (
                        <li key={idx} className="text-[#104438]">
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Conclusion</h2>
              <p className="text-gray-700">
                A luxury kitchen is more than a cooking space—it’s a blend of design, functionality, and personal expression. By focusing on timeless elegance and luxurious details, your dream kitchen becomes an extraordinary experience.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 lg:space-y-8 py-6">
            {/* <div className="bg-gray-100 p-6 text-center rounded-md">
              <h4 className="text-lg font-bold mb-2">Need help choosing the perfect palette?</h4>
              <p className="text-sm text-gray-600 mb-4">Our expert designers are here to assist!</p>
              <button className="px-6 py-3 bg-[#104438] text-white rounded-md">
                BOOK A CONSULTATION
              </button>
            </div> */}
            <div className="">
              <img loading="lazy" src="/src/assets/Cards/Blogcard5.jpg" alt="" />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogTwo;
