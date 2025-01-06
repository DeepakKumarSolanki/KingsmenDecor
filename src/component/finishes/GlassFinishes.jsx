import React from "react";

const GlassFinishes = () => {
  return (
    <div className="bg-gray-100 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 text-center">
          The Opulence of Glass Finishes: Where Elegance Meets Transparency
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Glass finishes epitomize sophistication and modern luxury, blending the elegant with transparency. Whether through crystal-clear clarity or frosted elegance, these finishes brighten up spaces with light, openness, and timeless beauty, raising any interior's game with their refined, seamless charm.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Clear Glass Finish */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
            loading="lazy"
              src="https://via.placeholder.com/400"
              alt="Clear Glass Finish"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Clear Glass Finish</h2>
              <p className="text-gray-600 mb-4">
                Clear glass is one of the most common glass types used in luxury interior houses. It is transparent, allowing free flow of light, and creates a feeling of openness and space. It is commonly used for windows, glass doors, partitions, and furniture like a coffee table or shelving unit. Clear glass reflects the natural light and enhances the airiness of the room, suitable for modern and minimalistic interior designs. It can also be paired with other materials like wood, metal, or stone to create elegant contrasts.
              </p>
            </div>
          </div>

          {/* Frosted Glass Finish */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400"
              alt="Frosted Glass Finish"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frosted Glass Finish</h2>
              <p className="text-gray-600 mb-4">
                Frosted glass is textured and opaque, which allows it to diffuse light while keeping the outside world at bay. This makes it suitable for use in bathroom windows, shower enclosures, and room dividers in luxury homes. It can add a soft, diffused glow that creates a sense of tranquillity and refinement to an interior. Frosted glass is perfect for maintaining privacy without sacrificing style and can be applied to modern, classic, or even transitional designs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassFinishes;
