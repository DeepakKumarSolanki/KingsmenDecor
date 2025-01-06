import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CourseList = () => {
  // State for the selected department and course name
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchCourseName, setSearchCourseName] = useState("");

  // Sample courses data
  const courses = [
    {
      title: "Understanding React Js",
      tag: "React js",
      department: "IT",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "237",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJMmAPj2OsSjbyCiOHKfxSRDppBmOGf-j3Q&s0x200",
      link: "https://youtu.be/ZaC6oCIpjR0?si=ImsBK0rR0WrL87wS",
    },

    {
      title: "Understanding Next js",
      tag: "Next js",
      department: "IT",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "237",
      image:
        "https://flatirons.com/static/0a79ca63e3ace4bfd802a70a2d7427ae/537f5/What-is-Drupal-An-Overview-in-2025.webp",
      link: "https://youtu.be/wm5gMKuwSYk?si=z5HdyJV_-_yi5HMt",
    },
    {
      title: "Java Programming",
      tag: "Java",
      department: "IT",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "237",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcj5c9GrUXQuaMQ7iOzivcWdOCdCWObB1PA&s",
      link: "https://youtu.be/32DLasxoOiM?si=Sq1b8efZ0SdK-exN",
    },
    {
      title: "Spring Boot",
      tag: "Spring Boot",
      department: "IT",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "237",
      image: "https://miro.medium.com/v2/resize:fit:900/1*o5FmjKTPdJTbhGE2MIjo6w.jpeg",
      link: "https://youtu.be/32DLasxoOiM?si=Sq1b8efZ0SdK-exN",
    },
    {
      title: "Digital Marketing",
      tag: "Marketing",
      department: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 5 hours",
      students: "432",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp1ooc1JWwML9Gup0Po4dTsxM375q-wqwsw&s",
      link: "https://www.youtube.com/watch?v=Uvmdnprpzn4&list=PLNfnAKZ4Zsar5c7_A_TR0kAC4SzB3li-t",
    },
    {
      title: "Fundamental Marketing",
      tag: "Marketing",
      department: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 5 hours",
      students: "432",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp1ooc1JWwML9Gup0Po4dTsxM375q-wqwsw&s",
      link: "https://www.youtube.com/watch?v=qwnw1qfPU4Y&list=PLNfnAKZ4ZsaoIFGUO3GWTHEI73SQV56rB",
    },
    {
      title: "SEO Course",
      tag: "Marketing",
      department: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 5 hours",
      students: "432",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp1ooc1JWwML9Gup0Po4dTsxM375q-wqwsw&s",
      link: "https://www.youtube.com/watch?v=83RXYrqRLeM&list=PLNfnAKZ4Zsar3Jwb59D0dJeQ-RnsaqpoT&pp=iAQB",
    },
    {
      title: "Sales Strategy ",
      tag: "Sales",
      department: "Sales",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "318",
      image: "https://www.smartpush.ai/wp-content/uploads/2022/06/Add-a-heading-7.png",
      link: "https://youtu.be/SalesVideoLink1",
    },
    {
      title: "Others",
      tag: "Others",
      department: "Others",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      time: "about 4 hours",
      students: "220",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mt49mZZKl_fdLOFeCUkwOAp7umh1zt666g&s",
      link: "https://youtu.be/HrVideoLink1",
    },
  ];

  // Function to filter courses based on department and course name
  const filteredCourses = courses.filter((course) => {
    const matchesDepartment = selectedDepartment
      ? course.department === selectedDepartment
      : true;
    const matchesCourseName = searchCourseName
      ? course.title.toLowerCase().includes(searchCourseName.toLowerCase())
      : true;
    return matchesDepartment && matchesCourseName;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="font-semibold text-2xl">Courses</h1>
          <h2 className="text-md">
            Dashboard / <span className="text-gray-600">Course</span>
          </h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex md:items-end md:justify-end items-center justify-center">
        {/* Search Course Input Field */}
       <div className="flex items-end justify-end lg:w-2/3 w-full md:flex-row flex-col gap-4 pb-4">
       <input
          type="text"
          placeholder="Search Course"
          className="w-full sm:w-1/3 py-2 px-3 border rounded-md text-md"
          value={searchCourseName}
          onChange={(e) => setSearchCourseName(e.target.value)}
        />

        {/* Department Select Dropdown */}
        <FormControl className="w-full sm:w-1/3" size="small" variant="outlined">
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            label="Department"
          >
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <button
          className="font-medium  py-2 px-4 sm:px-6 bg-[#b17f27] text-white rounded-md flex justify-center items-center gap-2 h-[40px] text-sm lg:text-lg hover:bg-[#a56f23] transition-all duration-200 w-full sm:w-1/3"
          onClick={() => {}}
        >
          Search
        </button>
       </div>
      </div>

      {/* Courses Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
        {filteredCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            tag={course.tag}
            description={course.description}
            time={course.time}
            students={course.students}
            image={course.image}
            link={course.link}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;