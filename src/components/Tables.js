import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const Tables = () => {
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
    handleDelete,
    handleEdit,
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
    <div className="relative overflow-x-auto w-100% m-10">
      {/* Search Data */}
      <form className="m-5" onSubmit={handleSearchSubmit}>
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
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter DAta */}
      <form className="m-5 text-left" onSubmit={handleFilterSubmit}>
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
          className="w-20 p-3 m-5 text-white bg-red-600 rounded-lg "
        >
          Filter
        </button>
      </form>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-solid border-2 border-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              No
            </th>
            <th scope="col" className="px-2 py-3">
              Title
            </th>
            <th scope="col" className="px-2 py-3">
              Description
            </th>
            <th scope="col" className="px-2 py-3">
              Qualification
            </th>
            <th scope="col" className="px-2 py-3">
              Type
            </th>
            <th scope="col" className="px-2 py-3">
              Tenure
            </th>
            <th scope="col" className="px-2 py-3">
              Status
            </th>
            <th scope="col" className="px-2 py-3">
              Company Name
            </th>
            <th scope="col" className="px-2 py-3">
              Company Image
            </th>
            <th scope="col" className="px-2 py-3">
              City
            </th>
            <th scope="col" className="px-2 py-3">
              Min Salary
            </th>
            <th scope="col" className="px-2 py-3">
              Max Salary
            </th>
            <th scope="col" className="px-2 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataJob !== null &&
            dataJob.map((res, index) => {
              return (
                <tr
                  key={res.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-2 py-4">{index + 1}</td>
                  <td className="px-2 py-4">{res.title}</td>
                  <td className="px-2 py-4">
                    {res.job_description.substr(0, 50) + "..."}
                  </td>
                  <td className="px-2 py-4">
                    {res.job_qualification.substr(0, 50) + "..."}
                  </td>
                  <td className="px-2 py-4">{res.job_type}</td>
                  <td className="px-2 py-4">{res.job_tenure}</td>
                  <td className="px-2 py-4">{res.job_status}</td>
                  <td className="px-2 py-4">{res.company_name}</td>
                  <td className="px-2 py-4">
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                      src={res.company_image_url}
                      alt=""
                    />
                  </td>
                  <td className="px-2 py-4">{res.company_city}</td>
                  <td className="px-2 py-4">{res.salary_min}</td>
                  <td className="px-2 py-4">{res.salary_max}</td>
                  <td className="px-2 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        color="warning"
                        value={res.id}
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        color="failure"
                        value={res.id}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
