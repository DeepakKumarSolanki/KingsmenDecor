import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import { Link } from "react-router-dom";

const BlogFour = () => {
  const trends = [
    {
      title: "Opulent Materials and Finishes",
      content: `Luxury begins with the finest materials. Think marble flooring, onyx countertops, silk draperies, and plush velvet upholstery. High-gloss finishes, metallic accents, and detailing add depth and luxury to the space.`,
      tip: "Combine luxurious materials with soft lighting to amplify their beauty and create a warm and inviting atmosphere.",
    },
    {
      title: "Biophilic Grandeur",
      content: `Biophilic design goes luxurious by curating indoor gardens, grandiose living walls, and water features. Use elements such as exotic wood, polished stone, and bespoke planters to create a connection with nature yet maintain a refined aesthetic.`,
      tip: "Use oversized planters and cascading greenery to make a dramatic statement in larger spaces.",
    },
    {
      title: "Smart Living Elegance",
      content: `Integration of technology into luxurious interiors is now a trademark of contemporary luxury. Automated lighting, temperature control, and state-of-the-art home entertainment systems are tailored to blend with the decor.`,
      tip: "Opt for concealed smart systems to maintain a clean and uncluttered look.",
    },
    {
      title: "Maximalist Grandeur",
      content: `Maximalism is back and it's all about bold patterns, rich textures, and layered designs. Jewel-toned furniture, ornate chandeliers, and intricate wallpapers combine to create spaces that tell a story of extravagance and personality.`,
      tip: "Balance maximalism with neutral accents to prevent the design from feeling overwhelming.",
    },
    {
      title: "Multi-Functional Luxury",
      content: `With changing lifestyles, spaces now need to serve multiple purposes without compromising on style. From home offices with designer furniture to entertainment zones featuring custom bar setups, every area is meticulously designed to offer both functionality and luxury.`,
      tip: "Use modular furniture and elegant partitions to seamlessly switch between functions.",
    },
    {
      title: "Statement Lighting Masterpieces",
      content: `Lighting has transcended functionality to become an art form in luxury interiors. Oversized chandeliers, sculptural pendant lights, and bespoke-designed fixtures set the tone for sophistication and elegance.`,
      tip: "Install dimmers to adjust the ambiance and highlight statement pieces as needed.",
    },
    {
      title: "Gourmet Kitchens with a Touch of Glamour",
      content: `Luxury kitchens combine functionality with breathtaking aesthetics. Marble islands, gold or brass accents, custom cabinetry, and cutting-edge appliances create culinary spaces that are as inviting as they are impressive.`,
      tip: "Incorporate a hidden pantry or wine cellar to elevate the functionality and exclusivity of the space.",
    },
    {
      title: "Spa-Inspired Bathrooms",
      content: `Bathrooms are evolving into private retreats. Think freestanding tubs, floor-to-ceiling marble, mood lighting, and custom vanities. Heated floors and rain showers complete the spa-like experience.`,
      tip: "Add aromatic diffusers and plush towels for a five-star spa ambiance at home.",
    },
    {
      title: "Bespoke Furniture and Artisanal Details",
      content: `Customization is the ultimate luxury. Handcrafted furniture, one-of-a-kind art pieces, and artisanal decor create a space that is truly unique. Tailored designs ensure every piece reflects your personal taste.`,
      tip: "Collaborate with local artisans to incorporate unique cultural elements into your decor.",
    },
    {
      title: "Neutral Foundations with Vibrant Accents",
      content: `Neutral palettes remain timeless in luxury interiors, but the magic lies in accentuating them with bold hues. Emerald green armchairs, cobalt blue rugs, or ruby-red cushions add personality and vibrancy to the space.`,
      tip: "Rotate accent pieces seasonally to keep the space feeling fresh and dynamic.",
    },
  ];

  return (
    <section>
      
      <div className="hidden lg:block">
      <PageHomeBanner
        title=""
        subtitle=""
        buttonText=""
        backgroundImage="/src/assets/LuxuryGreen.jpg"
        onButtonClick={() => alert("Button Clicked!")}
      />  
    </div>

    {/* Mobile or tablet screen banner */}
    <div className="block lg:hidden">
      <PageHomeBanner
        title=""
        subtitle=""
        buttonText=""
        backgroundImage="/src/assets/blog1.jpg"
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
          <span>Top 10 Luxury Interior Design Trends</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Top 10 Luxury Interior Design Trends to Elevate Your Space
            </h1>
            <p className="text-gray-700 mb-6">
              Luxury interior design evolves with timeless elegance and modern
              innovation. It is not only aesthetic but also the space to exude
              opulence, sophistication, and comfort. These trends redefine the
              essence of luxury living, transforming homes into exquisite
              sanctuaries. Let’s delve into the top 10 luxury interior design
              trends to inspire your next transformation.
            </p>
            <div className="bg-gray-100 p-6 rounded-md">
              <h3 className="text-lg font-semibold mb-4">In This Article</h3>
              <ul className="space-y-2 text-sm">
                {trends.map((trend, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span>{trend.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-10">
              {trends.map((trend, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#104438]">
                    {trend.title}
                  </h2>
                  <p className="text-gray-700">{trend.content}</p>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Secret Tip:</h3>
                    <p className="text-[#104438]">{trend.tip}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Conclusion</h2>
              <p className="text-gray-700">
                Luxury interior design is about creating spaces that resonate
                with your lifestyle and aspirations. It's about the feeling of
                walking into a room and being enveloped in beauty, comfort, and
                sophistication. These trends aren't just design choices; they're
                about crafting an experience—a life lived in elegance and
                splendor.
              </p>
              <p className="text-gray-700">
                Transform your interiors into an oasis of luxury and allow every
                nook of your home to speak volumes of rich and elegant
                storytelling. It's time to begin living at a new level now!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 lg:space-y-8">
            {/* <div className="bg-gray-100 p-6 text-center rounded-md">
              <h4 className="text-lg font-bold mb-2">
                Your home needs a makeover?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Our designers can help!
              </p>
              <button className="px-6 py-3 bg-[#104438] text-white rounded-md">
                BOOK FREE CONSULTATION
              </button>
            </div> */}
            <div className="">
              <img loading="lazy" src="/src/assets/Cards/Blogcard1.jpg" alt="" />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogFour;
