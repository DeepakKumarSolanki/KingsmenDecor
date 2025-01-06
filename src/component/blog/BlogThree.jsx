import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import { Link } from "react-router-dom";

const BlogThree = () => {
  const sections = [
    {
      title: "Plush Seating for Unmatched Comfort",
      content: `Seating is the heart of any luxurious balcony. Opt for furniture that combines elegance and durability, such as weatherproof lounge chairs, sectional sofas with plush cushions, or recliners. Materials like rattan, teak, or aluminum paired with premium upholstery in neutral tones or bold jewel shades add a sophisticated touch. For larger balconies, daybeds or swinging chairs elevate the comfort level.`,
      products: [
        "Weatherproof Lounge Chairs: Stylish and durable for outdoor use.",
        "Premium Upholstery Cushions: Available in UV-resistant, waterproof fabrics.",
      ],
    },
    {
      title: "Statement Lighting to Create Ambiance",
      content: `Lighting is key to setting up a balcony and creating ambiance. For more sophisticated, high-end settings, consider outdoor chandeliers, pendant lights, or recessed LED fixtures. For a soft, romantic glow, use LED string lights or lanterns. In the case of sustainability, consider using solar-powered lights.`,
      products: [
        "Outdoor Chandeliers: Add luxury and elegance to your balcony.",
        "Solar-Powered Lights: Sustainable lighting solutions.",
      ],
    },
    {
      title: "Lush Greenery for a Natural Touch",
      content: `Incorporating greenery brings life and vibrancy to your balcony. Create a vertical garden with exotic plants like orchids, ferns, or succulents. For a minimalist yet dramatic look, tall potted plants such as fiddle-leaf figs or bamboo add height and depth. Choose statement planters in materials like concrete, gold, or marble to complement your overall decor.`,
      products: [
        "Exotic Plants: Enhance your balcony with vibrant greenery.",
        "Statement Planters: Choose from materials like concrete, gold, or marble.",
      ],
    },
    {
      title: "Designer Flooring for Visual Appeal",
      content: `Flooring forms an integral part of the high-end decor. Opt for wooden decking for a warm, natural look, Italian marble tiles for a luxurious aesthetic, or textured patterned tiles for visual interest. Outdoor rugs with beautiful prints add character and charm to the space.`,
      products: [
        "Wooden Decking: Warm and timeless outdoor flooring.",
        "Outdoor Rugs: Add style and comfort to your balcony flooring.",
      ],
    },
    {
      title: "Elegant Decor Accents for a Sophisticated Touch",
      content: `Elegant decor accents bring sophistication to any balcony. Consider decorative sculptures, elegant side tables, or statement vases for the perfect touch. Add luxury with throw pillows made of silk, cashmere blankets, or upscale outdoor curtains. Metallic accents such as gold or bronze bring glamour to neutral or pastel decor themes.`,
      products: [
        "Decorative Sculptures: Add an artistic element to your space.",
        "Cashmere Blankets: Luxury comfort for outdoor lounging.",
      ],
    },
    {
      title: "Functional Dining Spaces",
      content: `Turn your balcony into a chic dining nook by adding a marble-topped bistro set or a compact dining table. Use high-end dinnerware, crystal glassware, and candles to elevate the dining experience. Add overhead lighting or string lights for a welcoming ambiance for evening meals or gatherings.`,
      products: [
        "Marble-Topped Bistro Set: Sophisticated and stylish outdoor dining.",
        "Crystal Glassware: Elevate your dining experience with luxury.",
      ],
    },
    {
      title: "Water and Fire Features for Drama",
      content: `Luxury balconies often feature water or fire elements to enhance their visual and sensory appeal. A small fountain or a cascading water wall adds serenity, while a tabletop fire pit or an ethanol fireplace provides warmth and drama. These features create an intimate and relaxing environment, perfect for unwinding.`,
      products: [
        "Tabletop Fire Pit: A cozy and dramatic addition.",
        "Cascading Water Wall: Create a peaceful, serene ambiance.",
      ],
    },
    {
      title: "Smart Technology for a Modern Touch",
      content: `Modern luxury incorporates technology to enhance convenience and comfort. Install smart blinds or curtains for effortless light control. Weatherproof smart speakers bring music to your outdoor retreat. Features like heated seating or portable heaters ensure year-round use.`,
      products: [
        "Smart Blinds: Control natural light with ease.",
        "Weatherproof Smart Speakers: Enjoy music outdoors in any weather.",
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
          backgroundImage="/src/assets/Balcony.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/BalconyPhone.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <article className="main-container top-spacing bottom-spacing">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="text-gray-500 hover:text-[#104438]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="text-gray-500 hover:text-[#104438]">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>Luxury Balcony Design</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Transform Your Balcony: Luxury Decor Ideas for an Elegant Outdoor
              Retreat
            </h1>
            <p className="text-gray-700 mb-6">
              Creating a luxurious balcony is an opportunity to blend style,
              comfort, and functionality into an outdoor space that reflects
              modern elegance. Balconies have become focal points for enhancing
              lifestyle and creating a personal retreat. From plush seating to
              smart technology, here's how you can transform your balcony into
              an opulent retreat.
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
                Transforming your balcony into a luxurious outdoor retreat will
                combine the best of design, functionality, and market
                sensibility. Focus on premium seating, artistic lighting, lush
                greenery, and modern technology to create a balcony that is
                elegant and adds value to your home. You can enjoy quiet
                evenings alone, host friends, or simply enjoy the view from a
                well-designed balcony as a sanctuary of luxury and relaxation.
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
              <img loading="lazy" src="/src/assets/Cards/Blogcard6.jpg" alt="" />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogThree;
