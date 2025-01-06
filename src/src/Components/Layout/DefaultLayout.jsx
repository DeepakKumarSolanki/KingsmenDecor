import React, { useState, useContext } from "react";
import Header from "../Header/Index";
import Sidebar from "../Sidebar/Index";
import { AuthContext } from "../Context/AuthContext";  // Make sure the import path is correct
import { useMenuItems } from "../MenuItems";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { menuItemsAdmin,menuItemsUser } = useMenuItems();
  // Get user role from context
  const { authState } = useContext(AuthContext); 
  console.log(authState.role) // Using AuthContext here
  const menuItems = authState.role === "ADMIN" ? menuItemsAdmin : menuItemsUser;
console.log(menuItems)
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems} 
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <main>
            <div className="mx-auto p-4 md:p-6 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
