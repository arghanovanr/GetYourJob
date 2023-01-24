import React from "react";
import images from "../assets/images/CTA.svg";
const CTA = () => {
  return (
    <div>
      <section className="bg-[#272043] dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full dark:hidden"
            src={images}
            alt="dashboard image"
          />
          <img
            className="w-full hidden dark:block"
            src={images}
            alt="dashboard image"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-[#ff641a] ">
              Find more than 10000+ job
            </h2>
            <p className="mb-6 font-light text-white md:text-lg ">
              GetYourJob helps you get the first job from around the world, we
              provide thousands of job vacancies waiting for you. Register and
              get your dream job
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
