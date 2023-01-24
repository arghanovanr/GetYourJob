import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const JobCard = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const {
    dataJob,
    setDatajob,
    fetchStatus,
    setFetchStatus,
    filterStateJobType,
    setFilterStateJobType,
    filterStateCity,
    setFilterStateCity,
    search,
  } = state;

  const {
    handleSearchInput,
    handleSearchSubmit,
    handleChangeFilter,
    handleFilterSubmit,
  } = handleFunction;

  useEffect(() => {
    let removeDuplicateJobType = (param) => {
      let tmp = [];

      for (let i of param) {
        if (tmp.indexOf(i.job_type) === -1) {
          tmp.push(i.job_type);
        }
      }

      return tmp;
    };
    let insertFilterStateJobType = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ job_type: res.job_type });
      });
      return tmp;
    };
    let removeDuplicateCity = (param) => {
      let tmp = [];

      for (let i of param) {
        if (tmp.indexOf(i.company_city) === -1) {
          tmp.push(i.company_city);
        }
      }

      return tmp;
    };
    let insertFilterStateCity = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ company_city: res.company_city });
      });
      return tmp;
    };

    if (fetchStatus) {
      axios
        .get("https://dev-example.sanbercloud.com/api/job-vacancy")
        .then((res) => {
          setDatajob(res.data.data);
          let data = res.data.data;
          let temp1 = insertFilterStateJobType(data);
          let temp2 = removeDuplicateJobType(temp1);
          setFilterStateJobType(temp2);
          temp1 = insertFilterStateCity(data);
          temp2 = removeDuplicateCity(temp1);
          setFilterStateCity(temp2);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <section className="bg-white dark:bg-[#272043] bg-[#272043] p-16">
      {/* Search Data */}
      <form onSubmit={handleSearchSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onChange={handleSearchInput}
            value={search}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Job location, position..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-[#ff641a] hover:bg-[#d7180e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#ff641a] dark:hover:bg-[#d7180e] dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter DAta */}
      <form className=" text-left" onSubmit={handleFilterSubmit}>
        <div>
          <label
            htmlFor="job_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Type
          </label>
          <select
            name="job_type"
            id="Job_type"
            onChange={handleChangeFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Job Type">Job Type...</option>
            {filterStateJobType !== null && (
              <>
                {filterStateJobType.map((res) => {
                  return (
                    <>
                      <option defaultValue={`${res}`}>{res}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="job_type"
            className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <select
            name="company_city"
            id="company_city"
            onChange={handleChangeFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Job Type">Job City...</option>
            {filterStateCity !== null && (
              <>
                {filterStateCity.map((res) => {
                  return (
                    <>
                      <option defaultValue={`${res}`}>{res}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-20 p-3 mt-5 text-white bg-[#ff641a] hover:bg-[#d7180e] rounded-lg "
        >
          Filter
        </button>
      </form>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="grid gap-8 mb-6 lg:mb-16 sm:grid-cols-2">
          {dataJob !== null &&
            dataJob.map((res) => {
              return (
                <Link
                  to={`/JobVacancy/${res.id}`}
                  key={res.id}
                  className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                    src={res.company_image_url}
                    alt=""
                  />
                  <div className="flex flex-col justify-between text-left p-4 leading-normal">
                    <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                      {res.title + " (" + res.job_tenure + ")"}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {res.company_name}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {res.company_city + "," + res.job_type}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default JobCard;
