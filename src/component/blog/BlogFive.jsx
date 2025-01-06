import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import { Link } from "react-router-dom";

const BlogFive = () => {
  const colorPalettes = [
    {
      title: "Classic Neutrals",
      content: `Beige, ivory, taupe, and greige (gray-beige) are the essentials of luxurious interiors. They create a serene and sophisticated backdrop that supports any design element.`,
      whyTheyWork: [
        "Versatile and adaptable to various styles.",
        "Allow homeowners to incorporate bold accents or maintain a minimalist aesthetic."
      ],
      popularPairings: [
        "Beige walls with white trim and gold accents for a sophisticated look.",
        "Taupe walls with black furniture for contrast."
      ]
    },
    {
      title: "Monochromatic Elegance",
      content: `Monochromatic schemes make use of different shades of the same color to achieve depth and interest without overpowering the space. Grey, blue, or green shades do wonders.`,
      whyTheyWork: [
        "This combination is best suited for the modern luxury of a harmonious and coherent look.",
        "Reduce design complexity without losing any sophistication."
      ],
      popularPairings: [
        "Light grey walls with darker grey furnishings and silver decor.",
        "Navy blue walls with lighter blue furniture."
      ]
    },
    {
      title: "Black and White",
      content: `The black-and-white palette is a timeless choice that exudes sophistication. This high-contrast scheme creates drama and elegance in any room.`,
      whyTheyWork: [
        "The contrast adds visual interest, while the simplicity keeps it classic.",
        "Works well in both modern and traditional settings."
      ],
      popularPairings: [
        "Black furniture with white walls and metallic gold or silver accents.",
        "White marble flooring with black fixtures."
      ]
    },
    {
      title: "Earthy Tones",
      content: `Earthy tones such as terracotta, olive green, and burnt sienna add warmth and authenticity to interiors. These tones bring the indoors closer to nature, creating a soothing ambiance.`,
      whyTheyWork: [
        "The contrast adds visual interest, while the simplicity keeps it classic.",
        "Works well in both modern and traditional settings."
      ],
      popularPairings: [
        "Olive green walls with wooden furniture and terracotta accessories.",
        "Burnt sienna accents with cream or white backgrounds."
      ]
    },
    {
      title: "Jewel Tones for Luxury",
      content: `Rich, vibrant jewel tones such as emerald green, sapphire blue, and ruby red exude luxury and drama. It is one of the finest colors for dramatic statements in rooms.`,
      whyTheyWork: [
        "Bold yet sophisticated, offering a lavish aesthetic.",
        "Ideal for accent walls or statement furniture."
      ],
      popularPairings: [
        "Emerald green walls with gold decor and velvet furnishings.",
        "Ruby red chairs against a neutral beige background."
      ]
    },
    {
      title: "Pastel Perfection",
      content: `Soft pastels like blush pink, lavender, and mint green create a delicate and serene ambiance. These colors are perfect for bedrooms and relaxation spaces.`,
      whyTheyWork: [
        "Offer a fresh and airy feel while remaining chic and timeless.",
        "Complement neutral and metallic accents well."
      ],
      popularPairings: [
        "Blush pink walls paired with white furniture and rose gold accents.",
        "Mint green walls paired with natural wood and white decor."
      ]
    },
    {
      title: "Metallic Accents",
      content: `Metallics such as gold, silver, and bronze are not colors in and of themselves but add the most amazing depth to any color. These accents add glamour and warmth to interiors.`,
      whyTheyWork: [
        "Elevate the overall look, making even neutral spaces luxurious.",
        "Reflect light, adding brightness to darker rooms."
      ],
      popularPairings: [
        "Silver can be used as an accent with monochromatic color schemes.",
        "Gold can create a warm contrast with earth tones."
      ]
    },
    {
      title: "Rich Browns and Chocolate Tones",
      content: `Rich browns ranging from chocolate to walnut create a deep, cozy depth within the interior. Shades will pair nicely with study rooms, libraries, and areas to sit in the house.`,
      whyTheyWork: [
        "Develop warmth while showing classiness at the same time.",
        "Go amazingly well with other textures like natural ones, metals."
      ],
      popularPairings: [
        "Chocolate brown paint and walls with cream and brass details.",
        "Walnut cabinetry is accompanied by slate grey countertop."
      ]
    },
    {
      title: "Timeless Navy and White",
      content: `The navy-and-white is the most popular coastal-inspired palette, as it brings freshness and sophistication to any space.`,
      whyTheyWork: [
        "Navy gives a sense of depth, and white brings balance and brightness. Excellent for a crisp clean look."
      ],
      popularPairings: [
        "White trims with natural wood furniture, navy walls, and natural wood furniture.",
        "Navy furniture in a white wall background with accent stripes."
      ]
    },
    {
      title: "Warm Golds and Yellows",
      content: `Gold and yellow colors are great for warm yet rich interiors. These are one of the most commonly used colors in traditional Indian and Mediterranean-inspired designs.`,
      whyTheyWork: [
        "It helps infuse spaces with energy and warmth, giving the entire place a warm, cozy feel.",
        "Pair well with dark wood and earthy materials."
      ],
      popularPairings: [
        "Mustard yellow walls with dark wood furniture and brass decor.",
        "Gold accents on neutral or white walls for understated elegance."
      ]
    }
  ];
  return (
    <section className="">
     
  <div className="hidden lg:block">
  <PageHomeBanner
        title=""
        subtitle=""
        buttonText=""
        backgroundImage="/src/assets/RedSofaWhite.jpg"
        onButtonClick={() => alert("Button Clicked!")}
      />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/blog5.jpg"
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
          <span>Timeless Color Palettes for Luxurious Interiors</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Timeless Color Palettes for Luxurious Interiors
            </h1>
            <p className="text-gray-700 mb-6">
              Interior design trends always change, but there are color schemes that remain timeless. Timeless schemes suit any type of taste, integrating both traditional and modernistic taste. With the property price and market condition changing frequently, buyers and investors now have an interest in the interiors that can be appealing for a longer time. A well-designed house that is timelessly designed is also valuable in the market as it attracts discerning customers. Let’s explore some of the most timeless color palettes that exude luxury while guiding homeowners and designers in making the right choice.
            </p>
            <div className="space-y-10">
              {colorPalettes.map((palette, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#104438]">
                    {palette.title}
                  </h2>
                  <p className="text-gray-700">{palette.content}</p>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Why They Work:</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {palette.whyTheyWork.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Popular Pairings:</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {palette.popularPairings.map((pairing, idx) => (
                        <li key={idx}>{pairing}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Conclusion</h2>
              <p className="text-gray-700">
                Timeless color palettes are more than just a design choice; they are a long-term investment in the aesthetics and value of your property. From classic neutrals to rich jewel tones, these schemes cater to diverse tastes while ensuring your interiors remain stylish for years to come. As you explore these ideas, consider how they align with your personal style and the functionality of your space. Thoughtfully chosen colors can transform your home into a luxurious haven that's both beautiful and market-ready.
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
              <img loading="lazy" src="/src/assets/Cards/Blogcard2.jpg" alt="" />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogFive;
