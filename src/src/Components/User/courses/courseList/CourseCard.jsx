import React from "react";

const CourseCard = ({
  title,
  tag,
  description,
  author,
  time,
  students,
  image,
  link,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden mx-auto lg:max-w-md">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
          {tag}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Author & Info */}
        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={author.image}
              alt={author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-700 text-sm">{author.name}</span>
          </div>
          <div className="text-gray-600 text-sm">
            <div>⏳ {time}</div>
            <div>👥 {students}</div>
          </div>
        </div> */}

        {/* Start Button */}
        <button
          onClick={() => (window.location.href = link)}
          className="font-medium py-2 px-4 sm:px-6 bg-[#b17f27] text-white rounded-md flex justify-center items-center gap-2 h-[40px] text-sm lg:text-lg hover:bg-[#a56f23] transition-all duration-200 w-full sm:flex-wrap"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default CourseCard;