import React from "react";
import { Navbar } from "flowbite-react";
import Logo from "../assets/images/Logo.png";
const Footer = () => {
  return (
    <div>
      <footer className="p-4 bg-[#272043] md:p-8 lg:p-10 dark:bg-[#272043]">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="/"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Navbar.Brand>
              <img src={Logo} className="mr-3 h-10 sm:h-9" alt="Logo" />
            </Navbar.Brand>
          </a>
          <p className="my-6 text-white ">
            Job portal for job seekers to find their dream job .
          </p>
          <span className="text-sm text-white sm:text-center ">
            © 2023{" "}
            <a href="/" className="hover:underline">
              GetYourJob™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
