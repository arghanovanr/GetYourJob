import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
const JobVacancyDetail = () => {
  const { Id } = useParams();
  const [dataJob, setDatajob] = useState(null);

  useEffect(() => {
    if (Id !== undefined) {
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${Id}`)
        .then((res) => {
          console.log(res);
          setDatajob(res.data);
        });
    }
  }, []);

  if (dataJob === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#272043] p-16">
      <div className="flex flex-col  items-start bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover p-5 w-full rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-l-lg "
          src={dataJob.company_image_url}
        />
        <div className="flex flex-col justify-between text-left m-4 p-2 leading-normal w-full ">
          <h2 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-xl">
            {dataJob.title + " (" + dataJob.job_tenure + ")"}
          </h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataJob.company_name + " - " + dataJob.job_type}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataJob.company_city}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataJob.job_status == 1
              ? "Actively Recruiting"
              : "Stop Recruiting"}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Description
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataJob.job_description}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Qualification
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataJob.job_qualification}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Salary
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {"Rp." + dataJob.salary_min + " - Rp." + dataJob.salary_max}
          </p>
          <a href="/JobVacancy">
            <button className="w-20 p-2 text-white bg-[#ff641a] hover:bg-[#d7180e] rounded-lg ">
              Back
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobVacancyDetail;
