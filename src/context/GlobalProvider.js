import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();

  // Handle Login
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputLogin({ ...inputLogin, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let { email, password } = inputLogin;
    axios
      .post(`https://dev-example.sanbercloud.com/api/login `, {
        email,
        password,
      })
      .then((res) => {
        let { token } = res.data;
        Cookies.set("token", token);

        navigate("/Dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //Handle Registration
  const [inputRegistration, setInputRegistration] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
  });

  const handleChangeRegistration = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputRegistration({ ...inputRegistration, [name]: value });
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    let { name, image_url, email, password } = inputRegistration;
    axios
      .post(`https://dev-example.sanbercloud.com/api/register `, {
        name,
        image_url,
        email,
        password,
      })
      .then((res) => {
        navigate("/Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //Handle Search and Filter

  const [dataJob, setDatajob] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [filterStateJobType, setFilterStateJobType] = useState(null);
  const [filterStateCity, setFilterStateCity] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    job_type: "",
    job_tenure: "",
    company_city: "",
  });

  const handleSearchInput = (event) => setSearch(event.target.value);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setDatajob(res.data.data);
        let searchData = res.data.data.filter((res) => {
          return Object.values(res)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
        });
        setDatajob([...searchData]);
      });
  };

  const handleChangeFilter = (event) => {
    if (event.target.value !== "Job Type") {
      setFilter({ ...filter, [event.target.name]: event.target.value });
    } else {
      setFilter({ ...filter, [event.target.name]: "" });
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setDatajob(res.data.data);
        console.log(res.data.data);
        let filterData = res.data.data.filter((res) => {
          return (
            res.job_type === filter.job_type ||
            res.company_city === filter.company_city
          );
        });

        console.log(filterData);
        setDatajob([...filterData]);
      });
  };

  // Edit and Delete

  const handleDelete = (event) => {
    let idData = parseInt(event.currentTarget.value);
    console.log(event.target.value);
    axios
      .delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setFetchStatus(true);
      });
  };

  const handleEdit = (event) => {
    let idData = parseInt(event.currentTarget.value);
    navigate(`/Dashboard/JobVacancy/Form/${idData}`);
  };

  // Form
  const [currentId, setCurrentId] = useState(-1);

  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: "",
    salary_max: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "title") {
      setInput({ ...input, title: value });
    } else if (name === "job_description") {
      setInput({ ...input, job_description: value });
    } else if (name === "job_qualification") {
      setInput({ ...input, job_qualification: value });
    } else if (name === "job_type") {
      setInput({ ...input, job_type: value });
    } else if (name === "job_tenure") {
      setInput({ ...input, job_tenure: value });
    } else if (name === "job_status") {
      setInput({ ...input, job_status: value });
    } else if (name === "company_name") {
      setInput({ ...input, company_name: value });
    } else if (name === "company_image_url") {
      setInput({ ...input, company_image_url: value });
    } else if (name === "company_city") {
      setInput({ ...input, company_city: value });
    } else if (name === "salary_min") {
      setInput({ ...input, salary_min: value });
    } else if (name === "salary_max") {
      setInput({ ...input, salary_max: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = input;
    if (currentId === -1) {
      axios
        .post(
          "https://dev-example.sanbercloud.com/api/job-vacancy",
          {
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
          navigate("/Dashboard/JobVacancy");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios
        .put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${currentId}`,
          {
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
          navigate("/Dashboard/JobVacancy");
        })
        .catch((error) => {
          alert(error);
        });

      setCurrentId(-1);
    }
  };

  // Handle Reset Password

  const [inputResetPassword, setInputResetPassword] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const handleChangeResetPassword = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputResetPassword({ ...inputResetPassword, [name]: value });
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    let { current_password, new_password, new_confirm_password } =
      inputResetPassword;
    axios
      .post(
        `https://dev-example.sanbercloud.com/api/change-password `,
        {
          current_password,
          new_password,
          new_confirm_password,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        navigate("/Dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  let state = {
    inputLogin,
    setInputLogin,
    inputRegistration,
    setInputRegistration,
    dataJob,
    setDatajob,
    fetchStatus,
    setFetchStatus,
    filterStateJobType,
    setFilterStateJobType,
    filterStateCity,
    setFilterStateCity,
    search,
    setSearch,
    filter,
    setFilter,
    input,
    setInput,
    currentId,
    setCurrentId,
    inputResetPassword,
    setInputResetPassword,
  };

  let handleFunction = {
    handleChangeLogin,
    handleLogin,
    handleChangeRegistration,
    handleRegistration,
    handleSearchInput,
    handleSearchSubmit,
    handleChangeFilter,
    handleFilterSubmit,
    handleDelete,
    handleEdit,
    handleInput,
    handleSubmit,
    handleChangeResetPassword,
    handleResetPassword,
  };
  return (
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
