import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMenu } from "react-icons/io5";


import Lightbox from "yet-another-react-lightbox";
import DownloadYet from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompanyDrawerOpen, setIsCompanyDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sliderRef = useRef(null);
  const [autoplay, setAutoplay] = useState(false);
  const [delay, setDelay] = useState(2000);
  const [create, setCreate] = useState(null);

  const menuItems = [
    { name: "HOME", link: "/", submenu: [] },
    {
      name: "ABOUT US",
      link: "",
      submenu: [
        { name: "OUR MANAGEMENT", link: "/management" },
        { name: "OUR TEAM", link: "/teams" },
        { name: "OUR PROCESS", link: "/process" },
      ],
    },
    {
      name: "FINISHES",
      link: "/finishes",
      submenu: [],
    },
    {
      name: "PRODUCTS",
      link: "",
      submenu: [
        {
          name: "ULTRA PREMIUM",
          link: "/essentialProducts",
        },
        {
          name: "ELITE",
          link: "/premiumProducts",
        },
        {
          name: "KINGSMEN SPECIAL",
          link: "/luxuryProducts",
        },
      ],
    },
    {
      name: "SERVICES",
      link: "/servicesPage",
      submenu: [],
    },
    {
      name: "MORE",
      link: "",
      submenu: [
        { name: "BLOG", link: "/blog" },
        { name: "HOW IT WORKS", link: "/howItWorks" },
        // { name: "CARRIER", link: "/carrier" },
      ],
    },

    { name: "CONTACT US", link: "/contactUs", submenu: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleClickProductCategory = (category) => {
    setActiveSubmenu((prevState) => (prevState === category ? null : category));
  };

  const imgArray = [
    { id: "1", name: "Sofa 1", src: "/src/assets/images/galleryOne.jpg" },
    { id: "9", name: "Bedroom 1", src: "/src/assets/images/galleryTwo.jpeg" },
    { id: "3", name: "Balcony 3", src: "/src/assets/images/galleryThree.jpg" },
    { id: "5", name: "Bedroom 2", src: "/src/assets/images/galleryFour.jpg" },
    { id: "6", name: "Balcony 4", src: "/src/assets/images/galleryFive.jpg" },
    { id: "2", name: "Sofa 2", src: "/src/assets/images/galleryEight.jpg" },
    { id: "8", name: "Kitchen 3", src: "/src/assets/images/gallerySeven.jpg" },
  ];

  const [openImage, setOpenImage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef(null);
  const zoomRef = useRef(null);
  const fullscreenRef = useRef(null);

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
    setOpenImage(true); // Open the lightbox when an image is clicked
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle the menu drawer for mobile/tablet
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Toggle company details drawer for large screens
  const toggleCompanyDrawer = () => {
    setIsCompanyDrawerOpen(!isCompanyDrawerOpen);
  };

  // Detect if the screen is mobile/tablet or not
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  console.log("menuitem", menuItems);
  return (
    <section className="">
      <header
        className={` fixed -top-3 left-0 w-full z-50 transition-colors duration-200 ${
          isSticky ? "bg-[#104438]" : "bg-transparent"
        }`}
      >
        <nav className="flex justify-between  items-center px-4 text-white">
          <div className="logo">
            <Link to="/">
              <img
                loading="lazy"
                src="/src/assets/newLogo.png"
                alt="logo"
                className="h-[7rem]"
              />
            </Link>
          </div>

          <ul className="nav-links hidden lg:flex justify-center items-center space-x-4">
            {menuItems?.map((item, index) => (
              <li key={index} className="nav-item relative">
                <a
                  href={item?.link}
                  className="nav-link text-white flex items-center"
                >
                  {item.name}
                  {item.submenu && item.submenu.length > 0 && (
                    <MdKeyboardArrowDown className="ml-1 text-xl" />
                  )}
                </a>
                {item.submenu && item.submenu.length > 0 && (
                  <ul className="submenu absolute top-full left-0 hidden bg-[#104438] !text-white rounded-md shadow-lg">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="submenu-item px-4 py-2">
                        <a
                          href={subItem.link}
                          className="block hover:text-[#0fbf9e] "
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Icon for Company Drawer */}
          <div className="icons flex items-center space-x-4 ml-auto">
            {/* For large screens */}
            {isMobile ? (
              <div
                className="icon lg:hidden flex cursor-pointer"
                onClick={toggleDrawer} // Trigger mobile drawer toggle
              >
                <IoMenu className="text-[1.75rem] text-white" />
              </div>
            ) : (
              <div
                className="icon hidden lg:block cursor-pointer"
                onClick={toggleCompanyDrawer} // Trigger large screen company drawer toggle
              >
                <IoMenu className="text-[1.75rem] text-white" />
              </div>
            )}
          </div>
        </nav>
      </header>

      <nav
        className={`header navbar md:flex justify-between items-center py-2 lg:hidden ${
          isSticky ? "sticky" : ""
        }`}
      >
        {" "}
        {/* Menu Items (Large Screens) */}
        <ul className="nav-links hidden lg:flex flex-row justify-center space-x-6">
          {" "}
          {/* Decreased space between items */}
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item relative">
              <Link to={item.link} className="nav-link">
                <div className="flex items-center">
                  {item.name}
                  {item.submenu.length > 0 && (
                    <span className="ml-2">
                      {activeSubmenu === item.name ? (
                        <IoIosArrowUp size={16} />
                      ) : (
                        <IoIosArrowDown size={16} />
                      )}
                    </span>
                  )}
                </div>
              </Link>
              {item.submenu.length > 0 && (
                <ul
                  className={`submenu absolute left-0 bg-white p-4 shadow-lg rounded-lg mt-2 text-sm ${
                    activeSubmenu === item.name ? "block" : "hidden"
                  }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="submenu-item relative"
                      onClick={() => {
                        if (subItem.submenu) {
                          handleClickProductCategory(subItem.name);
                        }
                      }}
                    >
                      <Link to={subItem?.link}>{subItem?.name}</Link>
                      {subItem.submenu && activeSubmenu === subItem.name && (
                        <ul className="submenu nested absolute left-48 top-0 bg-white shadow-lg p-4 rounded-lg mt-2">
                          {subItem?.submenu.map((subSubItem, subSubIndex) => (
                            <li key={subSubIndex} className="submenu-item">
                              <Link to={subSubItem?.link}>
                                {subSubItem?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile/Tablet Drawer for Menu Items */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            backgroundColor: "#fff",
            padding: "20px",
          },
        }}
      >
        <List>
          <div className="logo">
            <Link to="/">
              <img
                loading="lazy"
                src="/src/assets/newLogo.png"
                alt="logo"
                className="h-[5rem]"
              />
            </Link>
          </div>
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => {
                  if (item.link) {
                    // Navigate to the link if it exists
                    window.location.href = item.link;
                  } else if (item.submenu.length > 0) {
                    // Toggle submenu visibility
                    setActiveSubmenu((prev) =>
                      prev === item.name ? null : item.name
                    );
                  }
                }}
              >
                <ListItemText primary={item.name} />
                {item.submenu.length > 0 && (
                  <span>
                    {activeSubmenu === item.name ? (
                      <IoIosArrowUp size={16} />
                    ) : (
                      <IoIosArrowDown size={16} />
                    )}
                  </span>
                )}
              </ListItem>
              {item.submenu.length > 0 && activeSubmenu === item.name && (
                <List component="div" disablePadding>
                  {item.submenu.map((subItem, subIndex) => (
                    <ListItem button key={subIndex}>
                      <Link to={subItem.link} className="w-full">
                        <ListItemText primary={subItem.name} />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>

      {/* Company Details Drawer (For Large Screens) */}
      <Drawer
        anchor="right"
        open={isCompanyDrawerOpen}
        onClose={toggleCompanyDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "500px",
            backgroundColor: "#000000",
            padding: "20px",
          },
        }}
      >
        <article className="flex flex-col">
          <div className="flex items-center justify-center gap-[20rem]">
            <img
              loading="lazy"
              src="/src/assets/newLogo.png"
              alt="logo"
              className="h-[8em]"
            />
            <div
              onClick={toggleCompanyDrawer}
              className="text-white text-xl cursor-pointer"
            >
              <RxCross1 className="" />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-xl">OUR GALLERY</h3>
              <div className="main-container mx-auto flex flex-col items-center gap-6">
                <div className="grid grid-cols-2 gap-5">
                  {imgArray.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      <img
                        loading="lazy"
                        onClick={() => handleActiveIndex(index)}
                        src={item.src}
                        alt={item.name}
                        className="rounded-md object-cover cursor-pointer h-[8rem] w-full"
                      />
                    </div>
                  ))}
                  {/* Optionally add a "view all images" button here */}
                  <Lightbox
                    open={openImage}
                    close={() => setOpenImage(false)} // Close the lightbox
                    thumbnails={{ ref: thumbnailsRef }}
                    zoom={{ ref: zoomRef }}
                    slideshow={{ autoplay: false, delay: 2000 }}
                    slides={imgArray.map((curImage) => ({
                      src: curImage.src,
                      download: `${curImage.src}?DownloadYet`, // Add a download link
                    }))}
                    index={activeIndex} // Set the index for the active image
                    plugins={[
                      DownloadYet,
                      Thumbnails,
                      Slideshow,
                      Zoom,
                      Fullscreen,
                    ]} // Add required plugins
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-white font-semibold text-xl">CONTACTS</h5>
              <div className="flex gap-3 items-center text-gray-400">
                <p className="text-xl mb-2">
                  Kingsmen Realty | 7th floor, AWFIS Working Space | Kirloskar
                  Business Park | Hebbal Kempapura, Bengaluru, Karnataka 560024.
                </p>
              </div>
              <div className="flex gap-3 items-center text-gray-200">
                <MdOutlineMailOutline className="text-xl text-gray-400 " />
                <p className=" text-xl mb-2">kingsmendecor@gmail.com</p>
              </div>
              <div className="flex gap-3 items-center text-gray-200">
                <IoCallOutline className="text-xl text-gray-400 " />
                <p className=" text-xl">+91 7338639331</p>
              </div>
            </div>
             <div className="flex space-x-4">
                         <Link
                           to="https://www.facebook.com/kingsmendecors"
                           className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center border p-2"
                         >
                           <FaFacebookF />
                         </Link>
                         {/* <Link
                           to="https://www.linkedin.com/company/kingsmen-real-estate/about/"
                           className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
                         >
                           <FaLinkedinIn />
                         </Link> */}
                         <Link
                           to="https://www.instagram.com/kingsmendecors/profilecard/?igsh=MWZzNHN2a2lwdG5zMg%3D%3D"
                           className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
                         >
                           <LuInstagram />
                         </Link>
                         <Link
                           to="https://www.youtube.com/channel/UCArwHcthzSA_hANHiqoQz9g"
                           className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
                         >
                           <FaYoutube />
                         </Link>
                       </div>
          </div>
        </article>
      </Drawer>
    </section>
  );
};

export default Header;
