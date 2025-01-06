import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen, menuItems }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { logout } = useAuth(); // Corrected logout usage

  // Handle submenu toggle
  const handleSubmenuClick = (id) => {
    setActiveSubmenu((prev) => (prev === id ? null : id)); // Toggle the active submenu
  };

  const handleLogout = () => {
    logout(); // Corrected the logout function call
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-black text-white h-screen transition-all duration-300 ease-in-out overflow-y-auto`}
    >
      {/* Sidebar Header */}
      <div
        className={`p-4 flex items-center transition-all duration-300 ease-in-out ${
          sidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        <img
          src="logo/placeholder.png"
          alt="logo"
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "h-10" : "w-10"
          }`}
        />
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li key={item.id} className="relative">
            <NavLink
              to={item.route || "#"}
              className={`flex items-center p-4 hover:text-yellow-600 transition-all duration-300 ease-in-out ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
              onClick={() => {
                if (item.submenu && item.submenu.length > 0) {
                  handleSubmenuClick(item.id); // Toggle submenu if it exists
                }
                if (item.action) {
                  handleLogout(); // Call logout if the action is "logout"
                }
              }}
            >
              <span className="text-xl">{item.icon && <item.icon />}</span>
              {sidebarOpen && (
                <span className="ml-4 transition-opacity duration-300 ease-in-out">
                  {item.title}
                </span>
              )}
              {item.submenu && item.submenu.length > 0 && sidebarOpen && (
                <span className="ml-auto">
                  {activeSubmenu === item.id ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </NavLink>

            {/* Render Submenu if active */}
            {item.submenu &&
              item.submenu.length > 0 &&
              activeSubmenu === item.id &&
              sidebarOpen && (
                <ul className="pl-8 mt-2 space-y-2 transition-all duration-300 ease-in-out">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.title}>
                      <NavLink
                        to={subItem.route}
                        className="block py-2 hover:text-yellow-400"
                      >
                        {subItem.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
