import React from "react";
import Logo from "../assets/images/Logo.png";
const NavigationDashboard = () => {
  return (
    <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        </a>
      </div>
    </nav>
  );
};

export default NavigationDashboard;
