import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import React from "react";

import { Link } from "react-router-dom";
// Initialize AOS
AOS.init();
const BlogLayout = () => {
  const posts = [
    {
      id: 1,
      title: "Luxury Bedroom Design: Essentials for Opulent Comfort",
      image: "/src/assets/interior/bedroom.jpg",
      link: "/blogOne",
    },
    {
      id: 2,
      title: "Luxury Kitchen Designs That Inspire Culinary Creativity",
      image: "/src/assets/interior/kitchen.jpg",
      link: "/blogTwo",
    },
    {
      id: 3,
      title: "Transform Your Balcony: Luxury Decor Ideas for an Elegant Outdoor Retreat",
      image: "/src/assets/interior/balcony.jpg",
      link: "/blogThree",
    },
  ];

  return (
    <section className="main-container top-spacing bottom spacing">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-8  ">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div
            className=""
          >
          <img src="/src/assets/Cards/Blogcard.jpg" alt="" />
          </div>

        </aside>
        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 p-6 rounded-md shadow-md"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <Link
                  to={post.link}
                  className="button-86 mt-6 text-xl"
          
              >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};
export default BlogLayout;
