import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Link } from "react-router-dom"; // Import Link for navigation
// Initialize AOS
AOS.init();

const BlogGrid = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 Luxury Interior Design Trends to Elevate Your Space",
      category: "Interior",
      image: "/src/assets/interior/luxuryGreen.jpg",
      link: "/blogFour",
    },
    {
      id: 2,
      title: "Timeless Color Palettes for Luxurious Interiors",
      category: "Interior",
      image: "/src/assets/interior/luxuryHome.jpg",
      link: "/blogFive",
    },
    {
      id: 3,
      title: "Expert Tips for Styling a High-End Living Room",
      category: "Interior",
      image: "/src/assets/interior/luxuryLiving.jpg",
      link: "/blogSix",
    },
  ];

  return (
    <section className="main-container">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-md shadow-sm bg-white hover:shadow-lg transition duration-300"
              data-aos="flip-left" // Add flip animation
              data-aos-duration="1000" // Duration for each animation
              data-aos-delay={`${index * 100}`} // Staggered delay for each item
            >
              <div
                className="w-full h-64"
                style={{
                  backgroundImage: `url('${post.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded-sm">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2 hover:text-gray-700 transition duration-300">
                  {post.title}
                </h3>
                <Link to={post.link} className="button-86 mt-6 text-xl">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
